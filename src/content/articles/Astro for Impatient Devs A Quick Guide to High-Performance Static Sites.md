---
title: 'Astro for Impatient Devs: A Quick Guide to High-Performance Static Sites'
published: 2024-07-01
categories: ['Web Development', 'JavaScript', 'Static Sites']
description: "Discover the power of Astro, a static-first web framework that allows you to build high-performance static sites with zero client-side JavaScript. This guide covers Astro's key features, setup, and best practices for impatient developers."
---

# Astro for Impatient Devs: A Quick Guide to High-Performance Static Sites

Astro is a powerful, static-first web framework that is praised for its easy-to-use APIs and content-driven philosophy. Designed to ship highly performant static sites with zero client-side JavaScript, Astro leverages its innovative Islands architecture to add sprinkles of interactivity where needed. If you're a developer with some JavaScript experience, this guide is a whirlwind tour of Astro's greatest features. Let's get started!

![Astro Logo](https://astro.build/assets/press/astro-logo-dark.svg)

## Getting Started with Astro

To kick things off, run the Astro install wizard using your favorite package manager. Here's a quick setup guide:

```bash
# Using npm
npm create astro@latest

# Using yarn
yarn create astro

# Using pnpm
pnpm create astro@latest
```

It's recommended to use TypeScript and install the sample files to get a good first look at Astro. Once installed, start the development server:

```bash
npm run dev
```

Astro also offers plugins for popular code editors like VS Code and JetBrains, enhancing your development experience.

## Project Structure

Astro projects follow a conventional structure:

-   **Public Directory:** Serves static files.
-   **Source Directory:** Contains your website content.
-   **Components Directory:** Holds your components written in Astro or other front-end frameworks.
-   **Layouts Directory:** Contains Astro components defining page structures shared by multiple pages.
-   **Pages Directory:** A required directory where your website content is served.
-   **Styles Directory:** Typically used for CSS files.

Here's a visual representation of the directory structure:

```plaintext
project-root/
├── public/
│   ├── robots.txt
│   ├── favicon.svg
│   └── social-image.png
├── src/
│   ├── components/
│   │   ├── Header.astro
│   │   └── Button.jsx
│   ├── layouts/
│   │   └── PostLayout.astro
│   ├── pages/
│   │   ├── posts/
│   │   │   ├── post1.md
│   │   │   ├── post2.md
│   │   │   └── post3.md
│   │   └── index.astro
│   └── styles/
│       └── global.css
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

## Creating Components

Astro components are templating components with no client-side runtime by default. They are composed of two parts: the component script and the component template.

### Sample Astro Component

Here's an example of an Astro component that displays a greeting message:

```astro
---
// Component Script
const { name } = Astro.props;
---

<!-- Component Template -->
<h1>Hello, {name}!</h1>
```

### Adding Interactivity

For client-side interactivity, you can add a `<script>` tag within your component template:

```astro
---
const { count } = Astro.props;
---

<button id="increment-btn">Count: {count}</button>

<script>
  document.getElementById('increment-btn').addEventListener('click', () => {
    alert('Button clicked!');
  });
</script>
```

## Routing and Pages

Astro uses file-based routing, making it straightforward to define your site's pages. Create an Astro component or markdown file in the `pages` directory:

### Sample Page Component

```astro
---
import Layout from '../layouts/MainLayout.astro';
---

<Layout>
  <h1>Welcome to My Astro Site</h1>
  <p>This is the homepage.</p>
</Layout>
```

### Custom 404 Page

Create a `404.astro` or `404.md` file at the root of the `pages` directory to define a custom 404 page:

```astro
<h1>Page Not Found</h1>
<p>Sorry, we couldn't find the page you were looking for.</p>
```

## Markdown and MDX

Astro supports markdown and MDX (Markdown with JSX) for content creation. Include front matter YAML for metadata:

```markdown
---
title: 'My Blog Post'
date: '2024-07-01'
layout: '../layouts/MainLayout.astro'
---

# My Blog Post

Welcome to my blog post written in Markdown!
```

For MDX, install the MDX integration and use JavaScript within your markdown files:

```bash
npm install @astrojs/mdx
```

## Optimizing Images

Astro provides tools for image optimization. Import images from the source directory for automatic optimization:

```astro
---
import { Image } from '@astrojs/image';
import myImage from '../assets/my-image.jpg';
---

<Image src={myImage} alt="My Image" />
```

```html
<!-- Image is optimized, properties are set automatically -->
<img
    src="/_astro/my_image.hash.webp"
    width="1600"
    height="900"
    decoding="async"
    loading="lazy"
    alt="A description of my image."
/>
```

## Enhancing Your Site with Integrations

Astro integrations add functionality to your site, such as Tailwind CSS for styling or server-side rendering capabilities. Install integrations using the Astro CLI tool:

```bash
npx astro add tailwind
```

## Conclusion

Astro is a comprehensive framework designed to help developers create fast, static websites with minimal effort. Whether you're building a blog, portfolio, or any other type of site, Astro's powerful features and easy-to-use APIs make it an excellent choice. Explore the [Astro documentation](https://docs.astro.build) for more in-depth information and start building your next project today!

![Astro Template](https://raw.githubusercontent.com/pyyupsk/astro-template/main/.github/assets/preview.png)

Check out my [open-source Astro template site](https://github.com/pyyupsk/astro-template) for a production example. Happy coding!
