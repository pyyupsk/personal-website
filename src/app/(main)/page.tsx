import { buttonVariants } from '@/components/ui/button';
import { highlights } from '@/constants/highlights';
import { skills } from '@/constants/skills';
import { email } from '@/constants/socials';
import { generateMetadata } from '@/lib/metadata';
import { openGraph } from '@/lib/open-graph';

import { Clock } from './_components/clock';
import { DiscordProfile } from './_components/discord-profile';

export const metadata = generateMetadata({
    description:
        'P. Thipayanate (pyyupsk) is an independent software engineer with 5 years of experience specializing in web applications using React, Node.js, and cloud technologies. Explore his portfolio, projects, and insights on software development.',
    image: openGraph({
        button: 'View Projects',
        description:
            "P. Thipayanate's portfolio showcases expertise in scalable and user-friendly web applications.",
        title: 'P. Thipayanate | Software Engineer',
    }),
    title: 'P. Thipayanate | Software Engineer & Independent Programmer',
});

export default function Page() {
    return (
        <div className="space-y-6">
            <section className="flex items-center justify-between gap-1.5 rounded-md border bg-card p-3">
                <DiscordProfile />
                <Clock />
            </section>
            <section className="space-y-3">
                <p className="text-xl">Independent Programmer</p>
                <p className="leading-relaxed">
                    I&apos;m a passionate software engineer with {new Date().getFullYear() - 2019}{' '}
                    years of experience in building web applications. I specialize in React,
                    Node.js, and cloud technologies. My goal is to create efficient, scalable, and
                    user-friendly solutions that make a positive impact.
                </p>
            </section>
            <section className="space-y-3">
                <p className="leading-relaxed">
                    Throughout my career, I&apos;ve had the opportunity to work on diverse projects
                    and grow my skills:
                </p>
                <ul className="list-inside list-disc space-y-1.5">
                    {highlights.map((highlight) => (
                        <li key={highlight}>{highlight}</li>
                    ))}
                </ul>
            </section>
            <section className="space-y-3">
                <p className="leading-relaxed">My key skills include:</p>
                <ul className="list-inside list-disc space-y-1.5">
                    {skills.map((skill) => (
                        <li key={skill}>{skill}</li>
                    ))}
                </ul>
            </section>
            <section className="space-y-3">
                <p className="leading-relaxed">
                    I&apos;m always open to new opportunities and collaborations. If you&apos;d like
                    to discuss a project or just want to connect, feel free to reach out.
                </p>
                <a className={buttonVariants()} href={email.href} rel="noreferrer" target="_blank">
                    Get in touch
                </a>
            </section>
        </div>
    );
}
