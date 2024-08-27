import rehypeShiki, { type RehypeShikiOptions } from '@shikijs/rehype';
import {
    transformerMetaHighlight,
    transformerNotationDiff,
    transformerNotationFocus,
} from '@shikijs/transformers';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeCodeTitles from 'rehype-code-titles';
import rehypeExternalLinks from 'rehype-external-links';
import rehypeSanitize from 'rehype-sanitize';
import rehypeStringify from 'rehype-stringify';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';

const options: RehypeShikiOptions = {
    themes: {
        dark: 'min-dark',
        light: 'min-light',
    },
    transformers: [
        transformerNotationDiff(),
        transformerMetaHighlight(),
        transformerNotationFocus(),
    ],
};

const processor = unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeSanitize)
    .use(rehypeExternalLinks, { rel: ['noopener', 'noreferrer'], target: '_blank' })
    .use(rehypeAutolinkHeadings, { behavior: 'wrap' })
    .use(rehypeCodeTitles)
    .use(rehypeShiki, options)
    .use(rehypeStringify);

export async function processMarkdown(markdown: string): Promise<string> {
    const result = await processor.process(markdown);
    return result.toString();
}
