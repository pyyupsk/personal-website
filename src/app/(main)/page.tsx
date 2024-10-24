import { buttonVariants } from '@/components/ui/button';
import { highlights } from '@/constants/highlights';
import { skills } from '@/constants/skills';
import { email } from '@/constants/socials';
import { commonMetaData } from '@/lib/meta';
import { openGraph } from '@/lib/open-graph';
import { Link } from 'next-view-transitions';

import { Clock } from './_components/clock';
import { DiscordProfile } from './_components/discord-profile';

const experience = new Date().getFullYear() - 2019;

export function generateMetadata() {
    const metadata = commonMetaData({
        description: `Passionate software engineer with ${experience} years of experience in web development. Specializing in React, Node.js, and cloud tech, I create scalable, user-friendly solutions. Explore my diverse projects and skills in JavaScript, Python, and DevOps.`,
        image: openGraph({
            button: 'Let’s Collaborate',
            description:
                'Experienced software engineer specializing in React, Node.js, and scalable solutions.',
            title: 'Independent Programmer',
        }),
        title: 'Independent Programmer | Pongsakorn Thipayanate',
    });

    return metadata;
}

export default function Page() {
    return (
        <div className="space-y-6">
            <section className="flex items-center justify-between gap-1.5 rounded-md border bg-card p-3">
                <DiscordProfile />
                <Clock />
            </section>
            <section className="space-y-3">
                <p className="text-xl text-foreground">Independent Programmer</p>
                <p className="leading-relaxed">
                    I&apos;m a passionate software engineer with {experience} years of experience in
                    building web applications. I specialize in React, Node.js, and cloud
                    technologies. My goal is to create efficient, scalable, and user-friendly
                    solutions that make a positive impact.
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
                <Link className={buttonVariants()} href={email.href} target="_blank">
                    Get in touch
                </Link>
            </section>
        </div>
    );
}
