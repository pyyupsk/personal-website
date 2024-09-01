import { buttonVariants } from '@/components/ui/button';
import { highlights } from '@/constants/highlights';
import { skills } from '@/constants/skills';
import { email } from '@/constants/socials';
import { commonMetaData } from '@/lib/meta';
import Link from 'next/link';

const experience = new Date().getFullYear() - 2019;

export function generateMetadata() {
    const metaData = commonMetaData({
        description: `Passionate software engineer with ${experience} years of experience in web development. Specializing in React, Node.js, and cloud tech, I create scalable, user-friendly solutions. Explore my diverse projects and skills in JavaScript, Python, and DevOps.`,
        title: 'Independent Programmer | Pongsakorn Thipayanate',
    });

    return metaData;
}

export default function Page() {
    return (
        <div className="space-y-6">
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
