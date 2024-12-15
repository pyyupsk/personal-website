import { marked } from 'marked';
import markedShiki from 'marked-shiki';
import { cache } from 'react';
import { codeToHtml } from 'shiki';

const parser = cache(async (markdown: string) => {
    const html = marked
        .use(
            markedShiki({
                async highlight(code, lang) {
                    return await codeToHtml(code, {
                        lang,
                        themes: {
                            dark: 'min-dark',
                            light: 'min-light',
                        },
                    });
                },
            }),
        )
        .parse(markdown);

    return html;
});

const processMarkdownWithCache = cache(async (markdown: string) => {
    const html = await parser(markdown);

    const wordCount = markdown.trim().split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / 150);

    return {
        html,
        readingTime,
    };
});

export async function convertMarkdownToPlainText(markdown: string): Promise<string> {
    const html = await marked.parse(markdown);
    const plainText = html.replace(/<\/?[^>]+(>|$)/g, '');
    return plainText.replace(/\s+/g, ' ').trim();
}

export async function processMarkdown(markdown: string) {
    return processMarkdownWithCache(markdown);
}
