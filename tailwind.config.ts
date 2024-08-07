import tailwindTypography from "@tailwindcss/typography";
import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";
import { fontFamily } from "tailwindcss/defaultTheme";

const config = {
    darkMode: ["class"],
    content: [
        "./pages/**/*.{ts,tsx}",
        "./components/**/*.{ts,tsx}",
        "./app/**/*.{ts,tsx}",
        "./src/**/*.{ts,tsx}",
    ],
    prefix: "",
    theme: {
        container: {
            center: true,
            padding: "1rem",
            screens: {
                "2xl": "768px",
            },
        },
        extend: {
            fontFamily: {
                sans: ["var(--font-sans)", ...fontFamily.sans],
                mono: ["var(--font-mono)", ...fontFamily.mono],
            },
            typography: {
                DEFAULT: {
                    css: {
                        color: "hsl(var(--foreground)) !important",
                        "--tw-prose-body": "hsl(var(--foreground)) !important",
                        "--tw-prose-headings": "hsl(var(--foreground)) !important",
                        "--tw-prose-links": "hsl(var(--foreground)) !important",
                        "--tw-prose-bullets": "hsl(var(--foreground)) !important",
                        "--tw-prose-quotes": "hsl(var(--foreground)) !important",
                        "--tw-prose-quote-borders": "hsl(var(--foreground)) !important",
                        "--tw-prose-code": "#fff !important",
                        "--tw-prose-pre-bg": "#101010 !important",
                        "h1, h2, h3, h4, h5, h6": {
                            "margin-top": "1rem !important",
                            "margin-bottom": "1rem !important",
                        },
                    },
                },
            },
            colors: {
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                primary: {
                    DEFAULT: "hsl(var(--primary))",
                    foreground: "hsl(var(--primary-foreground))",
                },
                secondary: {
                    DEFAULT: "hsl(var(--secondary))",
                    foreground: "hsl(var(--secondary-foreground))",
                },
                destructive: {
                    DEFAULT: "hsl(var(--destructive))",
                    foreground: "hsl(var(--destructive-foreground))",
                },
                muted: {
                    DEFAULT: "hsl(var(--muted))",
                    foreground: "hsl(var(--muted-foreground))",
                },
                accent: {
                    DEFAULT: "hsl(var(--accent))",
                    foreground: "hsl(var(--accent-foreground))",
                },
                popover: {
                    DEFAULT: "hsl(var(--popover))",
                    foreground: "hsl(var(--popover-foreground))",
                },
                card: {
                    DEFAULT: "hsl(var(--card))",
                    foreground: "hsl(var(--card-foreground))",
                },
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
            keyframes: {
                "accordion-down": {
                    from: { height: "0" },
                    to: { height: "var(--radix-accordion-content-height)" },
                },
                "accordion-up": {
                    from: { height: "var(--radix-accordion-content-height)" },
                    to: { height: "0" },
                },
                "pulse-glow": {
                    "0%": {
                        boxShadow: "0 0 0 0 hsl(var(--primary))",
                    },
                    "50%": {
                        boxShadow: "0 0 0 7px rgba(59, 130, 246, 0)",
                    },
                    "100%": {
                        boxShadow: "0 0 0 0 rgba(59, 130, 246, 0)",
                    },
                },
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
                "pulse-glow": "pulse-glow 2s ease-in-out infinite",
            },
        },
    },
    plugins: [tailwindTypography, tailwindcssAnimate],
} satisfies Config;

export default config;
