import { commonMetaData } from '@/lib/meta';

export function generateMetadata() {
    const metaData = commonMetaData({
        description:
            'Discover the story of Pongsakorn Thipayanate, a passionate self-taught programmer. Learn about his unconventional path, commitment to coding, and future goals in SaaS development. Follow his evolving journey and innovations.',
        title: 'Meet Pongsakorn Thipayanate: A Self-Taught Programmer’s Journey',
    });

    return metaData;
}

export default function Page() {
    const age = new Date().getFullYear() - new Date('2003-01-23').getFullYear();

    return (
        <article className="space-y-3">
            <p>
                Hello! My name is Pongsakorn Thipayanate, but most people know me as{' '}
                <code>First</code>, currently {age} years old. I’ve carved a path as a self-taught
                programmer. Though I don’t have a traditional education, my passion for coding
                drives me to work on projects from the moment I wake up until I fall asleep. My
                journey hasn&apos;t been linear, but every twist and turn has shaped me into the
                developer I am today.
            </p>
            <p>
                Growing up, I was a mischievous child with a knack for technology. Despite my
                unconventional educational path, where I switched schools and faced setbacks, I
                discovered my true passion when I got my first computer. I dove headfirst into
                programming, teaching myself everything I could. This hands-on approach made me
                realize that formal education wasn&apos;t my only route to success. Today, I&apos;m
                working toward completing my Mathayom 6 degree through non-formal education, with
                plans to pursue a bachelor&apos;s degree in the future.
            </p>
            <p>
                My strengths lie in my ability to think systematically and manage complex system
                architectures. I’m focused on ensuring security at every level—whether it&apos;s
                database management, API development, or type safety. I thrive on challenges, using
                a methodical approach to reverse engineering, always asking &quot;why&quot; to get
                to the heart of any problem.
            </p>
            <p>
                My philosophy is simple: &quot;Start with why.&quot; I’m driven by curiosity and a
                desire to understand how things work, which fuels my passion for reverse engineering
                and constant improvement. If something doesn’t work, I call it version 1 and keep
                refining it until it does.
            </p>
            <p>
                You might think coding all day leaves little room for hobbies, but honestly, coding
                is both my work and my play. It’s what I love to do, and I wouldn’t have it any
                other way.
            </p>
            <p>
                In the next five years, I see myself earning a bachelor’s degree and diving deeper
                into the world of SaaS development. My aim is to create innovative software
                solutions that generate income while continuing to learn and grow in my career. This
                website will evolve with me, showcasing my journey every step of the way.
            </p>
        </article>
    );
}
