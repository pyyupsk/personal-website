import { readdir, readFile } from 'fs/promises';
import { basename, join } from 'path';
import rehypeShiki, { RehypeShikiOptions } from '@shikijs/rehype';
import { transformerMetaHighlight, transformerNotationDiff, transformerNotationFocus } from '@shikijs/transformers';
import matter from 'gray-matter';
import { toString } from 'hast-util-to-string';
import { h } from 'hastscript';
import parameterize from 'parameterize';
import autolinkHeadings from 'rehype-autolink-headings';
import rehypeCodeTitles from 'rehype-code-titles';
import rehypeExternalLinks, { Options } from 'rehype-external-links';
import rehypeSlug from 'rehype-slug';
import rehypeStringify from 'rehype-stringify';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';

const ARTICLE_DIR = join(process.cwd(), 'src', 'content', 'articles');

export type Category = {
    name: string;
    count: number;
};

type Frontmatter = {
    title: string;
    published: string;
    categories: string[];
    description: string;
};

export type Article = {
    slug: string;
    content: string;
    frontmatter: Frontmatter;
};

export async function getSlugs(): Promise<string[]> {
    try {
        const entries = await readdir(ARTICLE_DIR);
        const files = entries.filter((file) => file.endsWith('.md'));
        const articles = await Promise.all(
            files.map(async (file) => {
                const slug = parameterize(basename(file, '.md'));
                return slug;
            }),
        );
        return articles;
    } catch (error) {
        console.error(`Failed to read articles from directory ${ARTICLE_DIR}`, error);
        return [];
    }
}

export async function getSortedArticles() {
    const allBlogArticles = await getCollection(ARTICLE_DIR);
    const sorted = allBlogArticles.sort((a, b) => {
        const dateA = new Date(a.frontmatter.published);
        const dateB = new Date(b.frontmatter.published);
        return dateA > dateB ? -1 : 1;
    });
    return sorted;
}

export async function getCategories(): Promise<Category[]> {
    const allBlogArticles = await getCollection(ARTICLE_DIR);
    const categories = allBlogArticles
        .map((article) => article.frontmatter.categories)
        .flat()
        .reduce(
            (acc, category) => {
                if (!acc[category]) {
                    acc[category] = 0;
                }
                acc[category] += 1;
                return acc;
            },
            {} as Record<string, number>,
        );
    return Object.entries(categories).map(([name, count]) => ({ name, count }));
}

async function processMarkdown(markdown: string) {
    const createSROnlyLabel = (text: string) => {
        const escapedText = encodeURIComponent(text);
        const node = h('span.sr-only', `Section titled ${escapedText}`);
        node.properties['is:raw'] = true;
        return node;
    };

    const processor = await unified()
        .use(remarkParse)
        .use(remarkRehype)
        .use(rehypeExternalLinks, {
            rel: ['noopener', 'noreferrer'],
            target: '_blank',
        } as Options)
        .use(rehypeCodeTitles)
        .use(rehypeShiki, {
            theme: 'github-dark-dimmed',
            transformers: [transformerNotationDiff(), transformerMetaHighlight(), transformerNotationFocus()],
        } as RehypeShikiOptions)
        .use(rehypeStringify)
        .use(rehypeSlug)
        .use(autolinkHeadings, {
            behavior: 'append',
            group: ({ tagName }) =>
                h(`div.heading-wrapper.level-${tagName}`, {
                    tabIndex: -1,
                }),
            content: (heading) => [
                h(
                    `span.anchor-icon`,
                    {
                        ariaHidden: 'true',
                    },
                    '#',
                ),
                createSROnlyLabel(toString(heading)),
            ],
        })
        .process(markdown);

    return processor.toString();
}

export async function getArticleBySlug(slug: string) {
    const allBlogArticles = await getCollection(ARTICLE_DIR);
    const article = allBlogArticles.find((article) => article.slug === slug);

    if (!article) {
        return null;
    }

    const processor = await processMarkdown(article.content);

    return { ...article, content: processor };
}

async function getCollection(dir: string): Promise<Article[]> {
    try {
        const entries = await readdir(dir);
        const files = entries.filter((file) => file.endsWith('.md'));
        const articles = await Promise.all(
            files.map(async (filename) => {
                const filePath = join(dir, filename);
                const fileContents = await readFile(filePath, 'utf8');
                const { content, data: frontmatter } = matter(fileContents);
                const slug = parameterize(basename(filename, '.md'));
                return {
                    slug,
                    content,
                    frontmatter,
                } as Article;
            }),
        );
        return articles;
    } catch (error) {
        console.error(`Failed to read articles from directory ${dir}`, error);
        return [];
    }
}
