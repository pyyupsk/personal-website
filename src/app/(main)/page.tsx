import { commonMetaData } from '@/lib/meta';

const age = new Date().getFullYear() - new Date('2003-01-23').getFullYear();

export function generateMetadata() {
    const metaData = commonMetaData({
        description: `Learn about Phongsakorn 'First' Tippayanet, a ${age}-year-old self-taught programmer who turned a passion for coding into a career. Explore his unconventional educational path, core skills, and personal inspiration.`,
        title: 'About First – The Journey of a Self-Taught Developer',
    });

    return metaData;
}

export default function Page() {
    return (
        <article className="space-y-3">
            <p className="!text-base !text-foreground">
                Hi, I&apos;m First &mdash; A Passionate Developer Obsessed with Code.
            </p>
            <p>
                From dawn till dusk, I immerse myself in code, turning ideas into reality with a
                focus on systematic thinking, security, and efficiency.
            </p>
            <p>
                My name is Pongsakorn <code>First</code> Thipayanate, and I&apos;m a {age}-year-old
                self-taught developer who codes from sunrise to sunset. Despite a non-traditional
                educational path, my passion for programming and relentless curiosity have driven me
                to master the art of coding.
            </p>
            <p>
                I grew up in Phichit Province, where my love for technology began early. My journey
                has been unconventional—full of challenges and self-discovery. I&apos;ve transferred
                schools, dropped out, and eventually found my way through self-study. Today,
                I&apos;m back in non-formal education to complete my high school diploma, with the
                goal of earning a bachelor&apos;s degree and advancing my career in tech.
            </p>
            <p>
                I have a knack for systematic thinking, and I enjoy designing and managing system
                architectures with a focus on security. Whether it&apos;s ensuring database
                integrity, API security, or type safety, I&apos;m committed to building reliable and
                scalable solutions.
            </p>
            <p>
                I&apos;m driven by a constant need to understand &apos;why.&apos; This curiosity
                fuels my approach to reverse engineering and continuous learning. When something
                doesn&apos;t work, I call it &apos;version 1&apos; and keep iterating until it does.
            </p>
            <p>
                When I&apos;m not coding… Well, I&apos;m always coding! It&apos;s both my work and
                my hobby.
            </p>
            <p>
                In the next five years, I see myself not only with a bachelor&apos;s degree but also
                as a developer who is continually learning and creating. My goal is to develop
                Software as a Service (SaaS) products that make a difference while constantly
                refining my skills.
            </p>
        </article>
    );
}
