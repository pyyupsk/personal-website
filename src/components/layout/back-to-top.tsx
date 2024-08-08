"use client";

import { cn } from "@/lib/utils";
import { useScroll } from "framer-motion";
import * as React from "react";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";

export function BackToTop() {
    const { scrollYProgress } = useScroll();
    const [show, setShow] = useState<boolean>(false);

    useEffect(() => {
        const handleScroll = () => {
            if (scrollYProgress.get() > 0.1) {
                setShow(true);
            } else {
                setShow(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [scrollYProgress]);

    return (
        <Button
            variant="secondary"
            size="sm"
            className={cn("fixed bottom-10 right-10 z-40 transition-all", {
                "animate-fade-in": show,
                "opacity-0": !show,
                "opacity-100": show,
                "animate-fade-out": !show,
            })}
            onClick={() => window.scrollTo(0, 0)}
        >
            &uarr; Back to top
        </Button>
    );
}
