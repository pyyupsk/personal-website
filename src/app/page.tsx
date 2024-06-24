import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { author } from '@/data/author';
import { bio } from '@/data/bio';
import { education } from '@/data/education';
import { experience, experienceYears } from '@/data/experience';
import { projects } from '@/data/projects';
import { skills } from '@/data/skills';
import { getSortedPosts } from '@/lib/markdown';
import dayjs from 'dayjs';
import Link from 'next/link';

const POST_LIMIT = 3;

export default async function Home() {
    const posts = await getSortedPosts();

    return (
        <article className="prose dark:prose-invert max-w-none">
            <h1>
                👋 Hi there! I&apos;m {author.name.en} ({author.name.jp})
            </h1>
            <p>
                I am a full-stack developer with over {experienceYears} years of experience. I am passionate about
                creating innovative solutions that have a positive impact on people&apos;s lives. As a freelance
                developer, I am constantly seeking new challenges to take on. If you would like to{' '}
                <Link href={`mailto:${author.socials.email}`} target="_blank" rel="noopener noreferrer">
                    contact me
                </Link>
                , please feel free to contact me. Currently, I am working at{' '}
                <Link href="https://discord.gg/juniper-nexus" target="_blank" rel="noopener noreferrer">
                    Juniper Nexus
                </Link>
                , an esports club and guild. Feel free to explore some of my code and projects on{' '}
                <Link href={author.socials.github} target="_blank" rel="noopener noreferrer">
                    GitHub
                </Link>
                .
            </p>
            <h2>About Me</h2>
            <p>
                Enthusiastic and results-driven freelance developer with a strong background in web development. I am
                passionate about creating responsive and efficient web solutions and dedicated to delivering
                high-quality work. I am seeking opportunities to utilize my skills and expertise in innovative projects.
            </p>
            <h3>Education</h3>
            <ul>
                {education.map((edu) => (
                    <li key={edu.name}>
                        <h4>{edu.name}</h4>
                        <p>
                            {edu.date} · {edu.degree}
                        </p>
                        <p>{edu.description}</p>
                    </li>
                ))}
            </ul>
            <h3>Experience</h3>
            <ul>
                {experience.map((exp) => (
                    <li key={exp.name}>
                        <h4>{exp.name}</h4>
                        <p>{exp.date}</p>
                        <p>{exp.description}</p>
                    </li>
                ))}
            </ul>
            <h3>Bio</h3>
            <ul>
                {bio.map((bio) => (
                    <li key={bio.year}>
                        <h4>{bio.year}</h4>
                        <p>{bio.description}</p>
                    </li>
                ))}
            </ul>
            <h3>Skills</h3>
            <div className="grid grid-cols-2 gap-4">
                {skills.map((skill) => (
                    <div key={skill.title}>
                        <h4>{skill.title}</h4>
                        <p className="line-clamp-2">{skill.description}</p>
                        <div className="flex flex-wrap gap-1">
                            {skill.items.map((item) => (
                                <Badge key={item} size="sm">
                                    {item}
                                </Badge>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            <h3>Projects</h3>
            <div className="grid grid-cols-2 gap-4">
                {projects.map((project) => (
                    <div key={project.title}>
                        <h4>
                            <Link href={project.url} target="_blank" rel="noopener noreferrer">
                                {project.title}
                            </Link>
                        </h4>
                        <p className="line-clamp-2">{project.description}</p>
                        <div className="flex flex-wrap gap-1">
                            {project.tags.map((tag) => (
                                <Badge key={tag} size="sm">
                                    {tag}
                                </Badge>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            <h3>Writing</h3>
            <ul>
                {posts.slice(0, POST_LIMIT).map((post) => (
                    <li key={post.slug}>
                        <header className="flex flex-col gap-4">
                            <h4 className="w-fit border-b-2 border-b-foreground px-[2px] text-foreground">
                                <Link href={`/posts/${post.slug}`}>{post.frontmatter.title}</Link>
                            </h4>
                            <div className="pl-[0.1875rem]">
                                <span>Posted at</span>{' '}
                                <time>{dayjs(post.frontmatter.published).format('MMMM D, YYYY')}</time>
                                {post.frontmatter.categories.map((category) => (
                                    <Link
                                        key={category}
                                        href={`/categories/${category}`}
                                        className="ml-4 font-semibold"
                                    >
                                        #{category}
                                    </Link>
                                ))}
                            </div>
                        </header>
                        <p className="line-clamp-4 pl-[0.1875rem]">{post.frontmatter.description || post.content}</p>
                    </li>
                ))}
            </ul>
            <div className="flex justify-end">
                <Link href="/posts" className="normal">
                    <Button variant="outline" size="sm">
                        View All Posts
                    </Button>
                </Link>
            </div>
        </article>
    );
}
