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

type RenderSection =
    | {
          title: string;
          data: { title: string | number; subtitle?: string; description: string }[];
          type: 'list';
      }
    | {
          title: string;
          data: { title: string | number; description: string; items: string[] }[];
          type: 'grid';
      };

export default async function Home() {
    const posts = await getSortedPosts();

    const renderSection = ({ title, data, type }: RenderSection) => (
        <section>
            <h3>{title}</h3>
            {type === 'list' ? (
                <ul>
                    {data.map(({ title, subtitle, description }) => (
                        <li key={title}>
                            <h4>{title}</h4>
                            {subtitle && <p>{subtitle}</p>}
                            <p>{description}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {data.map(({ title, description, items }) => (
                        <div key={title} className="prose dark:prose-invert">
                            <h4>{title}</h4>
                            <p className="line-clamp-2">{description}</p>
                            {items && (
                                <div className="flex flex-wrap gap-1">
                                    {items.map((item) => (
                                        <Badge key={item} size="sm">
                                            {item}
                                        </Badge>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </section>
    );

    return (
        <article className="prose dark:prose-invert max-w-none">
            <h1>
                👋 Hi there! I&apos;m {author.name.en} ({author.name.jp})
            </h1>
            <p>
                I am a full-stack developer with over {experienceYears} years of experience. I am passionate about
                creating innovative solutions that have a positive impact on people&apos;s lives. As a freelance
                developer, I am constantly seeking new challenges to take on. If you would like to{' '}
                <a href={`mailto:${author.socials.email}`} target="_blank" rel="noopener noreferrer">
                    contact me
                </a>
                , please feel free to contact me. Currently, I am working at{' '}
                <a href="https://discord.gg/juniper-nexus" target="_blank" rel="noopener noreferrer">
                    Juniper Nexus
                </a>
                , an esports club and guild. Feel free to explore some of my code and projects on{' '}
                <a href={author.socials.github} target="_blank" rel="noopener noreferrer">
                    GitHub
                </a>
                .
            </p>
            <h2>About Me</h2>
            <p>
                Enthusiastic and results-driven freelance developer with a strong background in web development. I am
                passionate about creating responsive and efficient web solutions and dedicated to delivering
                high-quality work. I am seeking opportunities to utilize my skills and expertise in innovative projects.
            </p>
            {renderSection({
                title: 'Education',
                data: education.map(({ name, date, degree, description }) => ({
                    title: name,
                    subtitle: `${date} · ${degree}`,
                    description,
                })),
                type: 'list',
            })}
            {renderSection({
                title: 'Experience',
                data: experience.map(({ name, date, description }) => ({
                    title: name,
                    subtitle: date,
                    description,
                })),
                type: 'list',
            })}
            {renderSection({
                title: 'Bio',
                data: bio.map(({ year, description }) => ({
                    title: year,
                    description,
                })),
                type: 'list',
            })}
            {renderSection({
                title: 'Skills',
                data: skills,
                type: 'grid',
            })}
            {renderSection({
                title: 'Projects',
                data: projects.map((project) => ({
                    title: project.title,
                    description: project.description,
                    items: project.tags,
                })),
                type: 'grid',
            })}
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
