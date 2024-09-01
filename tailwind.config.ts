import type { Config } from 'tailwindcss';

import tailwindTypography from '@tailwindcss/typography';
import { fontFamily } from 'tailwindcss/defaultTheme';
import tailwindAnimate from 'tailwindcss-animate';

const config = {
    content: [
        './pages/**/*.{ts,tsx}',
        './components/**/*.{ts,tsx}',
        './app/**/*.{ts,tsx}',
        './src/**/*.{ts,tsx}',
    ],
    darkMode: ['class'],
    plugins: [tailwindTypography, tailwindAnimate],
    prefix: '',
    theme: {
        container: {
            center: true,
            padding: '1rem',
            screens: {
                '2xl': '600px',
            },
        },
        extend: {
            animation: {
                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up': 'accordion-up 0.2s ease-out',
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)',
            },
            colors: {
                accent: {
                    DEFAULT: 'hsl(var(--accent))',
                    foreground: 'hsl(var(--accent-foreground))',
                },
                background: 'hsl(var(--background))',
                border: 'hsl(var(--border))',
                card: {
                    DEFAULT: 'hsl(var(--card))',
                    foreground: 'hsl(var(--card-foreground))',
                },
                destructive: {
                    DEFAULT: 'hsl(var(--destructive))',
                    foreground: 'hsl(var(--destructive-foreground))',
                },
                foreground: 'hsl(var(--foreground))',
                input: 'hsl(var(--input))',
                muted: {
                    DEFAULT: 'hsl(var(--muted))',
                    foreground: 'hsl(var(--muted-foreground))',
                },
                popover: {
                    DEFAULT: 'hsl(var(--popover))',
                    foreground: 'hsl(var(--popover-foreground))',
                },
                primary: {
                    DEFAULT: 'hsl(var(--primary))',
                    foreground: 'hsl(var(--primary-foreground))',
                },
                ring: 'hsl(var(--ring))',
                secondary: {
                    DEFAULT: 'hsl(var(--secondary))',
                    foreground: 'hsl(var(--secondary-foreground))',
                },
            },
            fontFamily: {
                mono: ['var(--font-geist-mono)', ...fontFamily.mono],
                sans: ['var(--font-geist-sans)', ...fontFamily.sans],
            },
            keyframes: {
                'accordion-down': {
                    from: { height: '0' },
                    to: { height: 'var(--radix-accordion-content-height)' },
                },
                'accordion-up': {
                    from: { height: 'var(--radix-accordion-content-height)' },
                    to: { height: '0' },
                },
            },
            typography: {
                DEFAULT: {
                    css: {
                        '.rehype-code-title': {
                            '@apply rounded-t-md border-x border-t bg-card px-3 py-1.5 text-card-foreground':
                                {},
                        },
                        '.rehype-code-title + pre': {
                            '@apply mt-0 rounded-t-none': {},
                        },
                        ':not(pre) > code': {
                            '@apply whitespace-break-spaces rounded bg-muted px-[0.2em] py-[0.15em] text-[85%]':
                                {},
                        },
                        a: {
                            '@apply transition-all duration-100 hover:text-foreground': {},
                        },
                        'a[aria-current="true"]': {
                            '@apply text-foreground': {},
                        },
                        blockquote: {
                            '@apply mt-6 border-l-2 pl-6 italic text-muted-foreground': {},
                        },
                        code: {
                            '@apply relative rounded-md bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold text-foreground':
                                {},
                        },
                        'code::after': {
                            content: '""',
                        },
                        'code::before': {
                            content: '""',
                        },
                        h1: {
                            '@apply my-1.5 scroll-m-20 font-semibold tracking-tight text-foreground text-xl':
                                {},
                        },
                        h2: {
                            '@apply my-1.5 scroll-m-20 font-semibold tracking-tight text-foreground pb-2 text-lg':
                                {},
                        },
                        h3: {
                            '@apply my-1.5 scroll-m-20 font-semibold tracking-tight text-foreground text-base':
                                {},
                        },
                        h4: {
                            '@apply my-1.5 scroll-m-20 font-semibold tracking-tight text-foreground text-sm':
                                {},
                        },
                        h5: {
                            '@apply my-1.5 scroll-m-20 font-semibold tracking-tight text-foreground':
                                {},
                        },
                        h6: {
                            '@apply my-1.5 scroll-m-20 font-semibold tracking-tight text-foreground':
                                {},
                        },
                        ol: {
                            '@apply text-muted-foreground': {},
                        },
                        p: {
                            '@apply text-muted-foreground': {},
                        },
                        pre: {
                            '@apply overflow-x-auto rounded-md border p-3 text-muted-foreground':
                                {},
                        },
                        strong: {
                            '@apply text-foreground': {},
                        },
                        ul: {
                            '@apply text-muted-foreground': {},
                        },
                    },
                },
            },
        },
    },
} satisfies Config;

export default config;
