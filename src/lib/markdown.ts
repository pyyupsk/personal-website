import MarkdownIt from 'markdown-it';

const md = MarkdownIt();

export async function processMarkdown(markdown: string): Promise<{
    html: string;
    readingTime: number;
}> {
    const { default: Shiki } = await import('@shikijs/markdown-it');

    md.use(
        await Shiki({
            themes: {
                dark: 'min-dark',
                light: 'min-light',
            },
        }),
    );

    return {
        html: md.render(markdown),
        readingTime: Math.ceil(markdown.split(' ').length / 150),
    };
}
