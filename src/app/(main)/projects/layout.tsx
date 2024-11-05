export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="space-y-6">
            <section className="space-y-3">
                <p className="text-xl text-foreground">Showcasing My Projects</p>
                <p className="leading-relaxed">
                    Explore a selection of my work that demonstrates my expertise in programming and
                    web development. Each project reflects my dedication to building innovative
                    solutions, solving complex problems, and applying cutting-edge technologies.
                    From personal endeavors to freelance projects, these examples highlight my
                    skills and the value I bring to every challenge.
                </p>
            </section>
            {children}
        </div>
    );
}
