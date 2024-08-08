export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
    return <main className="grid h-screen place-content-center">{children}</main>;
}

export const revalidate = 3600; // Revalidate at most every 1 hour
