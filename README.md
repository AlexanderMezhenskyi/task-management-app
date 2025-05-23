# 📘 Project Documentation (Vue 3 + TypeScript + Vite)

This template should help get you started developing with Vue 3 in Vite.

## 🌐 Live Demo

The application is deployed on GitHub Pages:  
👉 [task-management-app](https://alexandermezhenskyi.github.io/task-management-app/)

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

| Script                            | Description                                                             |
|-----------------------------------|-------------------------------------------------------------------------|
| `dev`                             | Starts the Vite dev server with Hot Module Replacement.                 |
| `build`                           | Bundles the app for production into the `dist` folder.                  |
| `build-only`                      | Builds the app without running TypeScript type checks.                  |
| `type-check`                      | Runs TypeScript type checking using `vue-tsc` without building.               |
| `preview`                         | Serves the production build locally using a static file server.         |
| `lint`                            | Runs ESLint to ensure code style consistency.                           |
| `format`                          | Runs Prettier to enforce code formatting rules.                         |
| `predeploy`                       | Automatically runs `yarn build` before deploying to GitHub Pages.       |
| `deploy`                          | Deploys the `dist` folder to GitHub Pages using the `gh-pages` package. |
| `test:unit`                       | Run Unit Tests with Vitest.                                             |
| `test:e2e`                        | Runs the end-to-end tests with Playwright.                                        |
| `test:e2e --project=chromium`| Runs the tests only on Chromium.                                        |
| `test:e2e tests/example.spec.ts`| Runs the tests of a specific file.                                      |
| `test:e2e --debug`| Runs the tests in debug mode.                                           |

