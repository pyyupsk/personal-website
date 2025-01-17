import { languageColors } from '@/constants/language-colors';
import { marked } from 'marked';
import markedShiki from 'marked-shiki';
import { cache } from 'react';
import { codeToHtml } from 'shiki';

const parser = cache(async (markdown: string) => {
    marked.use({
        renderer: {
            code({ lang, text }) {
                return `___CODE_BLOCK_START___${lang || ''}___${text}___CODE_BLOCK_END___`;
            },
        },
    });

    const html = await marked
        .use(
            markedShiki({
                async highlight(code, lang) {
                    const highlighted = await codeToHtml(code, {
                        lang,
                        themes: {
                            dark: 'min-dark',
                            light: 'min-light',
                        },
                    });

                    if (!lang) return highlighted;

                    const langColor = languageColors[lang.toLowerCase()] || '#303036';

                    return `<figure>
                        <figcaption class="code-title flex items-center rounded-t-md border border-b-0 border-border bg-card p-3 font-mono text-card-foreground">
                            <span class="mr-1.5 w-[10px] h-[10px] rounded-full" style="background-color: ${langColor}"></span>
                            <span class='flex-grow'>${lang}</span>
                        </figcaption>
                        ${highlighted}
                    </figure>`;
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
