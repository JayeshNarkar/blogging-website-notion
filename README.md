# Medium Note Taking

This project is a Notion clone that aims to replicate the core functionalities of Notion using a backend built with Cloudflare Workers (Hono), Prisma (SQL), and Zod for validation. The frontend is developed using React.

## Features

- Sign up and sign in functionality using the common npm package, which exports Zod objects for validation.
- Create and update blog posts with the help of the common npm package for shared Zod objects.
- Seamless integration between the frontend and backend, leveraging type inference for Zod objects.

## Technologies Used

- Backend:
  - Cloudflare Workers (Hono): A serverless platform for running server-side code.
  - Prisma: An open-source database toolkit for SQL databases.
  - Zod: A TypeScript-first schema validation library.
- Common:
  - An npm package created and deployed, exporting Zod objects for sign in, sign up, create blog, and update blog functionalities.
- Frontend:
  - React: A popular JavaScript library for building user interfaces.

## Solved Problems:

- Organization and Accessibility: This note-taking app addresses the problem of scattered and disorganized notes by providing a centralized platform for capturing and managing them.
- Time Management: The auto-saving feature eliminates the need for manual saving, potentially saving users time and preventing data loss due to accidental closure.
- Responsiveness and User Experience: The dynamic and responsive UI ensures a consistent and visually appealing experience across different devices and screen sizes.

## Getting Started

To get started with this Notion clone, follow the steps below:

1. Clone the repository.
2. Install the necessary dependencies for both the backend and frontend.
3. Set up the database using Prisma and configure the Cloudflare Workers environment.
4. Start the backend server using Cloudflare Workers.
5. Start the frontend development server.
6. Access the application in your browser.

For detailed instructions on setting up and running the project, please refer to the project's documentation.

## License

This project is licensed under the [MIT License](LICENSE).
