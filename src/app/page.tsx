import { SectionComponent, SectionProps } from '@/components/Section';
import { author, bio, education, experience, experienceYears, projects, skills } from '@/data';
import { getSortedArticles } from '@/lib/markdown';
import Link from 'next/link';

const ARTICLE_LIMIT = 3;

export default async function Home() {
    const articles = await getSortedArticles();

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
                <h1 className="mt-0">
                    👋 Hello, I&apos;m {author.name.en} (<span className="font-serifjp">{author.name.jp}</span>).
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
                    Modified version of the{' '}
                    <Link href="https://hello.vrchat.com/" target="_blank" rel="noopener noreferrer">
                        VRChat
                    </Link>{' '}
                    SDK, enhancing user experiences within the virtual reality community.
                </p>
                <p>
                    My passion lies in solving complex problems and crafting intuitive user experiences that make a
                    difference. I thrive on challenges and am continuously exploring new technologies to expand my skill
                    set and stay ahead in this dynamic field.
                </p>
                <p>
                    Currently, I am contributing to the success of{' '}
                    <Link href="https://discord.gg/juniper-nexus" target="_blank" rel="noopener noreferrer">
                        Juniper Nexus
                    </Link>
                    , an esports club and guild, where I serve as the administrator and lead developer. In addition to
                    my role at{' '}
                    <Link href="https://discord.gg/juniper-nexus" target="_blank" rel="noopener noreferrer">
                        Juniper Nexus
                    </Link>
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
                    <Link href={author.socials.github} target="_blank" rel="noopener noreferrer">
                        pyyupsk
                    </Link>{' '}
                    and reach out through{' '}
                    <Link href={`mailto:${author.socials.email}`} target="_blank" rel="noopener noreferrer">
                        email
                    </Link>
                    .
                </p>
            </section>
            {sections.map((section) => (
                <SectionComponent key={section.title} {...section} />
            ))}
            <section>
                <h2>Articles & Tutorials</h2>
                <ul>
                    {articles.slice(0, ARTICLE_LIMIT).map((article) => (
                        <li key={article.slug}>
                            <h3>
                                <Link href={`/articles/${article.slug}`} prefetch={false}>
                                    {article.frontmatter.title}
                                </Link>
                            </h3>
                            <div className="flex gap-2 flex-wrap mt-4">
                                <time>
                                    {new Date(article.frontmatter.published).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                    })}
                                </time>
                                {article.frontmatter.categories.map((category) => (
                                    <Link key={category} href={`/categories/${category}`} prefetch={false}>
                                        #{category}
                                    </Link>
                                ))}
                            </div>
                            <p className="line-clamp-3">{article.frontmatter.description || article.content}</p>
                        </li>
                    ))}
                </ul>
                <Link href="/articles" className="after:arrow-right" prefetch={false}>
                    View All Articles
                </Link>
            </section>
        </article>
    );
}
