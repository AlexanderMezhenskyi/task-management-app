# 📘 Task Management App (Vue 3 + TypeScript + Vite)

A task and project management application built with Vue 3, TypeScript, and Vite. This app allows users to create and manage projects and tasks, and organize them by priority and status.

---

## 🛠 Tech Stack

- **Vue 3** with Composition API
- **TypeScript**
- **Vite** for lightning-fast builds
- **Pinia** for state management
- **CSS** for styling
- **Vitest** & **Playwright** for testing
- **ESLint** & **Prettier** for linting/formatting
- **GitHub Pages** for deployment

---

## 🎯 Features

- User authentication (login/logout)
- Create and edit projects
- Add and manage tasks within projects
- Filter tasks by priority and status
- Sorting tasks by priority and status
- Update task status: `Pending`, `In Progress`, `Completed`
- Set task priority: `High`, `Medium`, `Low`
- Highlight overdue tasks automatically
- Responsive design for mobile support
- Unit and E2E tests

---

## 🌐 Live Demo

The application is deployed on GitHub Pages:  
👉 [task-management-app](https://alexandermezhenskyi.github.io/task-management-app/)

---

## 🚀 Getting Started

To set up the project locally, follow these steps:

1. **Install Dependencies**  
   Run the following command in the root directory to install all libraries defined in `package.json`:

   ```bash
   yarn install
   ```

2. **Start Development Server**  
   Launch the Vite development server:

   ```bash
   yarn dev
   ```

   After startup, the app will be available at the URL shown in the terminal ([http://localhost:5173/task-management-app/](http://localhost:5173/task-management-app/)).

3. **Build for Production**  
   Create an optimized production build:

   ```bash
   yarn build
   ```

   The build output will be located in the `dist` directory.

4. **Preview Production Build Locally**  
   Serve the built application locally to test the production version:

   ```bash
   yarn preview
   ```
---

## 🧩 Available Scripts

The `package.json` file includes several useful scripts. Run them using:

```bash
yarn <script_name>
```

| Script                           | Description                                                             |
|----------------------------------|-------------------------------------------------------------------------|
| `dev`                            | Starts the Vite dev server with Hot Module Replacement.                 |
| `build`                          | Bundles the app for production into the `dist` folder.                  |
| `build-only`                     | Builds the app without running TypeScript type checks.                  |
| `type-check`                     | Runs TypeScript type checking using `vue-tsc` without building.         |
| `preview`                        | Serves the production build locally using a static file server.         |
| `lint`                           | Runs ESLint to ensure code style consistency.                           |
| `format`                         | Runs Prettier to enforce code formatting rules.                         |
| `predeploy`                      | Automatically runs `yarn build` before deploying to GitHub Pages.       |
| `deploy`                         | Deploys the `dist` folder to GitHub Pages using the `gh-pages` package. |
| `test:unit`                      | Runs Unit Tests with Vitest.                                            |
| `test:e2e`                       | Runs the end-to-end tests with Playwright.                              |
| `test:e2e --project=chromium`    | Runs the tests only on Chromium.                                        |
| `test:e2e tests/example.spec.ts` | Runs the tests of a specific file.                                      |
| `test:e2e --debug`               | Runs the tests in debug mode.                                           |

## 📡 API

The app simulates an API layer using mocked asynchronous functions.
Error handling, async delays, and auth simulation are built-in.
