# Efficient Developments

Responsive React/Vite implementation of the Efficient Developments marketing
website. The repository includes the completed homepage, About, Contact,
Projects, Project Detail, and six service routes.

## Handoff baseline

- Repository: `https://github.com/Go-Digital-Alchemy-Repos/Efficient-Developments.git`
- Working branch: `main`
- Deployment source: Railway automatically deploys GitHub `main`
- Detailed implementation state: [`STATUS.md`](./STATUS.md)
- Project rules: read [`AGENTS.md`](./AGENTS.md) and
  [`ORCHESTRATOR.md`](./ORCHESTRATOR.md) before editing

The handoff was prepared with a clean working tree and all changes pushed to
`origin/main`.

## Set up on another device

Requirements:

- Git
- Node.js 22 LTS or newer
- pnpm through Corepack

```bash
git clone https://github.com/Go-Digital-Alchemy-Repos/Efficient-Developments.git
cd Efficient-Developments
corepack enable
pnpm install --frozen-lockfile
pnpm dev
```

Vite serves the site at `http://localhost:5173` by default. No environment
variables are currently required for local development.

Before editing, confirm the expected baseline:

```bash
git switch main
git pull --ff-only origin main
git status
```

## Available commands

```bash
pnpm dev      # Start the local Vite development server
pnpm lint     # Run ESLint
pnpm build    # Run TypeScript and create the production Vite build
```

There is currently no automated test script. Use lint, build, and browser
inspection of affected routes before pushing changes.

## Implemented routes

- `/`
- `/about`
- `/contact`
- `/projects`
- `/projects/:projectSlug`
- `/services/asphalt-paving`
- `/services/commercial-concrete`
- `/services/residential-concrete`
- `/services/greenways`
- `/services/roads-bridges`
- `/services/underground-utilities`

`/services` redirects to the Asphalt Paving route. Unknown routes redirect to
the homepage.

## Project structure

- `src/pages` — route-level page components and service-page content
- `src/components` — shared layout, navigation, and UI components
- `src/styles/tokens.css` — canonical design tokens
- `src/styles` — shared and route-specific styling
- `src/data/projects.ts` — project listing data
- `public/assets` — local fonts, logos, icons, and imagery
- `src/routes/routeDefinitions.ts` — route/reference/Figma-node map

## Known follow-up work

- Replace placeholder phone, email, address, project, and leadership copy when
  final business content is supplied.
- Connect the Contact form to a real submission endpoint; it currently prevents
  submission and has no backend.
- Add automated tests if the project moves beyond visual acceptance testing.
- Confirm mobile layouts against dedicated Figma mobile frames when available.
- The specified primary green `#7FA67A` has a 2.75:1 contrast ratio against
  white. Exact green-on-white and white-on-green text does not meet WCAG AA;
  resolving that requires an approved foreground or palette adjustment.

## Publishing workflow

Railway is connected to GitHub `main`. Normal handoff work should be committed
and pushed to `main` after lint, build, and browser validation. See
[`STATUS.md`](./STATUS.md) for Railway project and service identifiers.
