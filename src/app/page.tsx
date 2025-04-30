/* eslint-disable @next/next/no-img-element */
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getJSONData } from "@/lib/serverUtils";
import Link from "next/link";
import {
  EnvelopeClosedIcon,
  GitHubLogoIcon,
  LinkedInLogoIcon,
  TwitterLogoIcon,
  GlobeIcon,
} from "@radix-ui/react-icons";
import { Avatar } from "@/components/ui/avatar";
import Image from "next/image";
import { FileDownIcon } from "lucide-react";

export default async function Home() {
  const data = await getJSONData();

  return (
    <main>
      {/* Banner Section */}
      <section
        id="home"
        className="container max-w-5xl mx-auto py-12 md:py-16 lg:py-20"
      >
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12">
          <div className="w-1/2 mx-auto lg:w-1/3">
            <Image
              src="/assets/profile.jpg"
              width={300}
              height={311}
              alt="Developer"
              className="mx-auto aspect-square overflow-hidden object-cover object-center rounded-full"
            />
          </div>
          <div className="w-full lg:w-2/3 space-y-4">
            <div className="space-y-2">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tighter ">
                Hey 👋, I&apos;m {data.personalInfo.name}
              </h1>
            </div>
            <div className="max-w-[600px] space-y-4 text-gray-500 dark:text-gray-400 lg:text-lg">
              {Array.isArray(data.personalInfo.bio) ? (
                data.personalInfo.bio.map((para, index) => (
                  <p key={index}>{para}</p>
                ))
              ) : (
                <p>{data.personalInfo.bio}</p>
              )}
            </div>

            <div className="space-x-4">
              {data.contactInfo.github && (
                <a
                  href={data.contactInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="secondary" size="icon">
                    <GitHubLogoIcon className="h-4 w-4" />
                  </Button>
                </a>
              )}
              {data.contactInfo.twitter && (
                <a
                  href={data.contactInfo.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="secondary" size="icon">
                    <TwitterLogoIcon className="h-4 w-4" />
                  </Button>
                </a>
              )}
              {data.contactInfo.linkedin && (
                <a
                  href={data.contactInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="secondary" size="icon">
                    <LinkedInLogoIcon className="h-4 w-4" />
                  </Button>
                </a>
              )}
              {data.contactInfo.email && (
                <Link href={`mailto:${data.contactInfo.email}`}>
                  <Button variant="secondary" size="icon">
                    <EnvelopeClosedIcon className="h-4 w-4" />
                  </Button>
                </Link>
              )}
              <a
                href="/resume.pdf"
                download
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="secondary">
                  <FileDownIcon className="h-4 w-4 mr-2" />
                  Download Resume
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section
        id="skills"
        className="container max-w-5xl mx-auto py-12 md:py-16 lg:py-20"
      >
        <h2 className="font-bold text-4xl md:text-5xl mb-12 text-left">
          Skills
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Languages", list: data.skills.languages },
            { label: "Frameworks", list: data.skills.frameworks },
            { label: "Databases", list: data.skills.databases },
            { label: "Tools & Platforms", list: data.skills.tools },
          ].map((group, index) => (
            <div
              key={group.label}
              className={`p-6 rounded-xl shadow-sm bg-muted/10 dark:bg-muted/20`}
            >
              <h4 className="text-xl font-semibold mb-4 text-foreground">
                {group.label}
              </h4>
              <ul className="space-y-2 text-base text-muted-foreground">
                {group.list.map((item) => (
                  <li key={item} className="pl-1.5 list-disc list-inside">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Experience Section */}
      <section
        id="experience"
        className="container max-w-5xl mx-auto py-12 md:py-16 lg:py-20"
      >
        <h2 className="font-bold text-3xl md:text-5xl mb-12">
          Work Experience
        </h2>
        <div className="relative pl-6 after:absolute after:inset-y-0 after:left-0 after:w-px after:bg-gray-500/20 dark:after:bg-gray-400/20 grid gap-10">
          {data.workExperience.map((exp) => (
            <div key={exp.id} className="grid gap-1 relative">
              <div className="aspect-square w-3 bg-gray-900 rounded-full absolute left-0 translate-x-[-29.5px] z-10 top-2 dark:bg-gray-50" />

              <h4 className="text-xl font-medium">
                {exp.role} @{" "}
                <span className="font-semibold">{exp.company}</span>
              </h4>

              <div className="text-gray-500 dark:text-gray-400">
                {exp.startDate} - {exp.endDate}
              </div>

              <div className="mt-2">
                <h6 className="font-medium">Key Responsibilities:</h6>
                <ul className="text-gray-500 text-sm list-disc pl-4">
                  {exp.keyResponsibilities.map((resp) => (
                    <li key={resp}>{resp}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Projects Section */}
      <section
        id="projects"
        className="container max-w-5xl mx-auto py-12 md:py-16 lg:py-20"
      >
        <h2 className="font-bold text-3xl md:text-5xl mb-12">My Projects</h2>
        <div className="grid grid-cols-1 gap-4 lg:gap-6">
          {data.projects.map((project) => (
            <Card key={project.title} className="flex flex-col lg:flex-row">
              <div className="w-full lg:w-1/3 p-2 flex items-center">
                <Image
                  src={project.cover}
                  alt="Project cover"
                  height={200}
                  width={300}
                  className="rounded-md object-cover"
                />
              </div>
              <div className="w-full lg:w-2/3">
                <CardHeader>
                  <CardTitle>{project.title}</CardTitle>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="secondary">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription>{project.description}</CardDescription>
                </CardContent>
                <CardFooter>
                  <div className="flex space-x-3">
                    {project.live_url && (
                      <a
                        href={project.live_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button size="sm">
                          <GlobeIcon className="h-3 w-3 mr-2" />
                          Live Demo
                        </Button>
                      </a>
                    )}
                    {project.code_repo_url && (
                      <a
                        href={project.code_repo_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button size="sm" variant="outline">
                          <GitHubLogoIcon className="h-3 w-3 mr-2" />
                          Open Repository
                        </Button>
                      </a>
                    )}
                  </div>
                </CardFooter>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Education Section */}
      <section
        id="education"
        className="container max-w-5xl mx-auto py-12 md:py-16 lg:py-20"
      >
        <h2 className="font-bold text-3xl md:text-5xl mb-12">Education</h2>
        <div className="relative pl-6 after:absolute after:inset-y-0 after:left-0 after:w-px after:bg-gray-500/20 dark:after:bg-gray-400/20 grid gap-10">
          {data.education.map((ed) => (
            <div key={ed.id} className="grid gap-1 relative">
              <div className="aspect-square w-3 bg-gray-900 rounded-full absolute left-0 translate-x-[-29.5px] z-10 top-2 dark:bg-gray-50" />
              <h4 className="text-xl font-medium">{ed.degree}</h4>
              <h5 className="font-medium">{ed.institution}</h5>
              <div className="text-gray-500 dark:text-gray-400">
                {ed.startDate} - {ed.endDate}
              </div>
              <p className="mt-2 text-sm text-gray-500">{ed.description}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
