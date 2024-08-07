import rehypeShiki, { RehypeShikiOptions } from "@shikijs/rehype";
import {
    transformerMetaHighlight,
    transformerNotationDiff,
    transformerNotationFocus,
} from "@shikijs/transformers";
import rehypeCodeTitles from "rehype-code-titles";
import rehypeExternalLinks from "rehype-external-links";
import rehypeSanitize from "rehype-sanitize";
import rehypeStringify from "rehype-stringify";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

const options: RehypeShikiOptions = {
    theme: "vesper",
    transformers: [
        transformerNotationDiff(),
        transformerMetaHighlight(),
        transformerNotationFocus(),
    ],
};

const processor = unified()
    .use(remarkParse) // Convert into markdown AST
    .use(remarkRehype) // Transform to HTML AST
    .use(rehypeSanitize) // Sanitize HTML input
    .use(rehypeExternalLinks, { rel: ["noopener", "noreferrer"], target: "_blank" }) // Convert external links
    .use(rehypeCodeTitles) // Add code block titles
    .use(rehypeShiki, options) // Add syntax highlighting
    .use(rehypeStringify); // Convert AST into serialized HTML

export async function processMarkdown(markdown: string): Promise<string> {
    const result = await processor.process(markdown);
    return result.toString();
}
