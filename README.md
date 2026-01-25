# ExoosisApp

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.1.1.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

## API-Driven Architecture

This frontend is designed to be fully API-driven. The Angular app expects a backend (ASP.NET Core 8 recommended) that exposes structured endpoints for every feature. During local development, the app uses the in-memory API provider defined in `MockDataService` to emulate these endpoints.

### Core Endpoints (expected by the frontend)

- `GET /api/solutions` - Solution catalog for the solutions page.
- `GET /api/products` - Product list for feature discovery.
- `GET /api/products/:id` - Product detail payload for the product details page.
- `GET /api/enterpriseSoftware` - Enterprise software platform payload.
- `GET /api/jobs` - Career listings.
- `GET /api/jobs/:id` - Job detail view.
- `POST /api/jobApplications` - Job application submissions.

### Authentication

API requests include a `Bearer` token if one is stored in `localStorage` under `exoosis_auth_token`. The backend should validate JWT or OAuth tokens accordingly.
