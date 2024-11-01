import Shiki from '@shikijs/markdown-it';
import MarkdownIt from 'markdown-it';

const md = MarkdownIt().use(
    await Shiki({
        themes: {
            dark: 'min-dark',
            light: 'min-light',
        },
    }),
);

export async function processMarkdown(markdown: string): Promise<{
    html: string;
    readingTime: number;
}> {
    return {
        html: md.render(markdown),
        readingTime: Math.ceil(markdown.split(' ').length / 150),
    };
}
