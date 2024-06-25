import { readdir, readFile } from 'fs/promises';
import path from 'path';
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

const POST_DIR = path.join(process.cwd(), 'src', 'content', 'posts');

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

export type Post = {
    slug: string;
    content: string;
    frontmatter: Frontmatter;
};

export async function getSlugs(): Promise<string[]> {
    try {
        const entries = await readdir(POST_DIR);
        const files = entries.filter((file) => file.endsWith('.md'));
        const posts = await Promise.all(
            files.map(async (file) => {
                const slug = parameterize(path.basename(file, '.md'));
                return slug;
            }),
        );
        return posts;
    } catch (error) {
        console.error(`Failed to read posts from directory ${POST_DIR}`, error);
        return [];
    }
}

export async function getSortedPosts() {
    const allBlogPosts = await getCollection(POST_DIR);
    const sorted = allBlogPosts.sort((a, b) => {
        const dateA = new Date(a.frontmatter.published);
        const dateB = new Date(b.frontmatter.published);
        return dateA > dateB ? -1 : 1;
    });
    return sorted;
}

export async function getCategoryList(): Promise<Category[]> {
    const allBlogPosts = await getCollection(POST_DIR);
    const categories = allBlogPosts
        .map((post) => post.frontmatter.categories)
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

export async function getPostBySlug(slug: string) {
    const allBlogPosts = await getCollection(POST_DIR);
    const post = allBlogPosts.find((post) => post.slug === slug);

    if (!post) {
        return null;
    }

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
            theme: 'one-light',
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
        .process(post.content);

    return { ...post, content: processor.toString() };
}

async function getCollection(dir: string): Promise<Post[]> {
    try {
        const entries = await readdir(dir);
        const files = entries.filter((file) => file.endsWith('.md'));
        const posts = await Promise.all(
            files.map(async (filename) => {
                const filePath = path.join(dir, filename);
                const fileContents = await readFile(filePath, 'utf8');
                const { content, data: frontmatter } = matter(fileContents);
                const slug = parameterize(path.basename(filename, '.md'));
                return {
                    slug,
                    content,
                    frontmatter,
                } as Post;
            }),
        );
        return posts;
    } catch (error) {
        console.error(`Failed to read posts from directory ${dir}`, error);
        return [];
    }
}
