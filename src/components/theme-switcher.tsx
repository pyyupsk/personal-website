"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { MonitorIcon, MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeSwitcher() {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();

    useEffect(() => setMounted(true), []);

    if (!mounted) return <Skeleton className="h-8 w-24 rounded-full" />;

    return (
        <div className="inline-flex items-center rounded-full h-8 text-muted-foreground shadow-[0_0_0_1px] shadow-border">
            {["system", "light", "dark"].map((t) => (
                <button
                    key={t}
                    className={cn(
                        "inline-flex items-center justify-center rounded-full h-8 w-8 text-sm font-medium transition-colors",
                        "hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
                        theme === t && "shadow-[0_0_0_1px] shadow-border text-foreground",
                    )}
                    onClick={() => setTheme(t)}
                    aria-label={`Use ${t} theme`}
                >
                    {t === "system" && <MonitorIcon className="h-4 w-4" />}
                    {t === "light" && <SunIcon className="h-4 w-4" />}
                    {t === "dark" && <MoonIcon className="h-4 w-4" />}
                </button>
            ))}
        </div>
    );
}
