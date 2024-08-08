# Personal Website

Welcome to my personal website! This project is built using Next.js 14 with TypeScript, Tailwind CSS, Shadcn UI, Clerk Authentication, Supabase (PostgreSQL), and Prisma ORM. Below you'll find instructions on how to set up and run the project locally.

## Table of Contents

-   [Personal Website](#personal-website)
    -   [Table of Contents](#table-of-contents)
    -   [Features](#features)
    -   [Getting Started](#getting-started)
    -   [Technologies](#technologies)
    -   [Folder Structure](#folder-structure)
    -   [Scripts](#scripts)
    -   [Contributing](#contributing)
    -   [License](#license)

## Features

-   **Next.js 14**: For server-side rendering and static site generation.
-   **TypeScript**: For type safety and improved development experience.
-   **Tailwind CSS**: For utility-first CSS styling.
-   **Shadcn UI**: A collection of components to accelerate development.
-   **Clerk Authentication**: For user authentication and management.
-   **Supabase (PostgreSQL)**: For database management.
-   **Prisma ORM**: For database querying and schema management.

## Getting Started

To get started with the project, follow these steps:

1. **Clone the Repository**

    ```bash
    git clone https://github.com/pyyupsk/personal-website.git
    cd personal-website
    ```

2. **Install Dependencies**

    Ensure you have [Node.js](https://nodejs.org/) installed, then run:

    ```bash
    npm install
    ```

3. **Set Up Environment Variables**

    Create a `.env` file in the root directory and add the required environment variables. For example:

    ```env
     DATABASE_URL=<your-database-url>
     DIRECT_URL=<your-direct-url>

     NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=<your-clerk-publishable-key>
     CLERK_SECRET_KEY=<your-clerk-secret-key>
     NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
     NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
    ```

    Refer to the [`.env.example`](.env.example) file for a template.

4. **Run Migrations**

    If you're using Prisma, run the following command to apply migrations:

    ```bash
    npx prisma migrate dev
    ```

5. **Start the Development Server**

    ```bash
    npm run dev
    ```

    Open your browser and navigate to [`http://localhost:3000`](http://localhost:3000) to see the website in action.

## Technologies

-   **Next.js 14**: Framework for React applications.
-   **TypeScript**: Superset of JavaScript adding static types.
-   **Tailwind CSS**: Utility-first CSS framework.
-   **Shadcn UI**: Component library for rapid UI development.
-   **Clerk**: Authentication service for user management.
-   **Supabase**: Open-source backend-as-a-service with PostgreSQL.
-   **Prisma**: Next-generation ORM for Node.js and TypeScript.

## Folder Structure

Here's a brief overview of the folder structure:

-   `prisma/` - Prisma schema and migration files.
-   `public/` - Static assets like images.
-   `src` - The application's source code.
    -   `action/` - Server-side actions.
    -   `app/` - Application components.
    -   `assets/` - Static assets like images.
    -   `components/` - Reusable React components.
    -   `config/` - Configuration files.
    -   `constants/` - Constants and environment variables.
    -   `fonts/` - Next.js fonts.
    -   `lib/` - Utility functions of the library.
    -   `styles/` - Tailwind CSS stylesheets.
    -   `utils/` - Utility functions of the library.
    -   `env` - Environment variables.
    -   `middleware.ts` - Clerk authentication middleware.

## Scripts

-   `npm run dev` - Start the development server.
-   `npm run build` - Build the project for production.
-   `npm run start` - Start the project in production mode.
-   `npm run lint` - Run ESLint to check for code quality issues.
-   `npm run format:fix` - Format code using Prettier.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your changes. Make sure to follow the coding style and add tests for any new features.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Feel free to reach out if you have any questions or need assistance. Happy coding!
