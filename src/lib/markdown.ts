import rehypeShiki from '@shikijs/rehype';
import rehypeExternalLinks from 'rehype-external-links';
import rehypeSanitize from 'rehype-sanitize';
import rehypeStringify from 'rehype-stringify';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';

const processor = unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeSanitize)
    .use(rehypeExternalLinks, { rel: ['noopener', 'noreferrer'], target: '_blank' })
    .use(rehypeShiki, {
        themes: {
            dark: 'min-dark',
            light: 'min-light',
        },
    })
    .use(rehypeStringify);

export async function processMarkdown(markdown: string): Promise<string> {
    const result = await processor.process(markdown);
    return result.toString();
}
