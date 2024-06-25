import { SectionComponent, SectionProps } from '@/components/Section';
import { author, bio, education, experience, experienceYears, projects, skills } from '@/data';
import { getSortedPosts } from '@/lib/markdown';
import Link from 'next/link';

const POST_LIMIT = 3;

export default async function Home() {
    const posts = await getSortedPosts();

    const sections: SectionProps[] = [
        {
            title: 'Education',
            data: education.map(({ name, date, degree, description }) => ({
                title: name,
                subtitle: `${date} · ${degree}`,
                description,
            })),
            type: 'list',
        },
        {
            title: 'Experience',
            data: experience.map(({ name, date, description }) => ({
                title: name,
                subtitle: date,
                description,
            })),
            type: 'list',
        },
        {
            title: 'Bio',
            data: bio.map(({ year, description }) => ({
                title: year,
                description,
            })),
            type: 'list',
        },
        {
            title: 'Skills',
            data: skills,
            type: 'grid',
        },
        {
            title: 'Projects',
            data: projects.map(({ title, description, tags, url }) => ({
                title,
                description,
                url,
                items: tags,
            })),
            type: 'grid',
        },
    ];

    return (
        <article className="prose dark:prose-invert max-w-none">
            <section>
                <h1>
                    👋 Hello, I&apos;m {author.name.en} ({author.name.jp}).
                </h1>
                <p>
                    A dedicated full-stack developer who was passionate about creating impactful solutions through
                    technology.
                </p>
                <p>
                    With over {experienceYears} years of experience in the field, I have honed my skills in web
                    development, backend services, and UI/UX design. My journey began at a young age with a fascination
                    for technology, and I quickly transitioned into freelance work, collaborating on diverse projects
                    from web applications to e-commerce platforms. Notably, I contributed as the main developer for the
                    Modified version of the
                    <a href="https://hello.vrchat.com/" target="_blank" rel="noopener noreferrer">
                        VRChat
                    </a>{' '}
                    SDK, enhancing user experiences within the virtual reality community.
                </p>
                <p>
                    My passion lies in solving complex problems and crafting intuitive user experiences that make a
                    difference. I thrive on challenges and am continuously exploring new technologies to expand my skill
                    set and stay ahead in this dynamic field.
                </p>
                <p>
                    Currently, I am contributing to the success of{' '}
                    <a href="https://discord.gg/juniper-nexus" target="_blank" rel="noopener noreferrer">
                        Juniper Nexus
                    </a>
                    , an esports club and guild, where I serve as the administrator and lead developer. In addition to
                    my role at{' '}
                    <a href="https://discord.gg/juniper-nexus" target="_blank" rel="noopener noreferrer">
                        Juniper Nexus
                    </a>
                    , I engage in freelance opportunities, collaborating closely with clients to deliver tailored
                    solutions that meet their unique needs.
                </p>
                <p>
                    Outside of coding, I enjoy exploring new technologies and contributing to open-source projects on
                    GitHub. I am an avid reader with a keen interest in technology trends and advancements. These
                    activities not only provide balance but also inspire my creativity and problem-solving skills.
                </p>
                <p>
                    Thank you for visiting my profile. Whether you&apos;re looking to collaborate on a project or simply
                    interested in connecting, I look forward to hearing from you. Feel free to explore my work on GitHub
                    at{' '}
                    <a href={author.socials.github} target="_blank" rel="noopener noreferrer">
                        pyyupsk
                    </a>{' '}
                    and reach out through{' '}
                    <a href={`mailto:${author.socials.email}`} target="_blank" rel="noopener noreferrer">
                        email
                    </a>
                    .
                </p>
            </section>
            {sections.map((section) => (
                <SectionComponent key={section.title} {...section} />
            ))}
            <section>
                <h3>Writing</h3>
                <ul>
                    {posts.slice(0, POST_LIMIT).map((post) => (
                        <li key={post.slug}>
                            <Link href={`/posts/${post.slug}`} className="text-xl leading-6">
                                {post.frontmatter.title}
                            </Link>
                            <div className="flex gap-2 flex-wrap mt-4">
                                <time dateTime={post.frontmatter.published}>
                                    {new Date(post.frontmatter.published).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                    })}
                                </time>
                                {post.frontmatter.categories.map((category) => (
                                    <Link key={category} href={`/categories/${category}`} className="font-medium">
                                        #{category}
                                    </Link>
                                ))}
                            </div>
                            <p className="line-clamp-3">{post.frontmatter.description || post.content}</p>
                        </li>
                    ))}
                </ul>
                <Link href="/posts">View All Posts →</Link>
            </section>
        </article>
    );
}
