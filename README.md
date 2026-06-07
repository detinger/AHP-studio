# AHP Studio

A browser-based workspace for structuring and analyzing decisions with the
Analytic Hierarchy Process (AHP). Define criteria and alternatives, express
preferences through pairwise comparisons, check judgment consistency, and
compare the resulting priorities visually.

## Features

- Build a decision hierarchy from custom criteria and alternatives.
- Compare criteria and alternatives with Saaty's 1-9 preference scale.
- Automatically maintain reciprocal values in each comparison matrix.
- Calculate local priorities, final alternative scores, and consistency ratios.
- Explore results through ranked charts and an interactive hierarchy diagram.
- Start from six preconfigured decision templates.
- Review AHP concepts and the fundamental comparison scale in the learning area.
- Use the workspace on desktop and mobile layouts.

## How It Works

The workspace is organized into three steps:

1. **Structure** - enter the criteria that influence the decision and the
   alternatives being evaluated.
2. **Compare** - compare criteria against one another, then compare every
   alternative under each criterion.
3. **Results** - review criteria weights, consistency feedback, synthesized
   alternative scores, and the full decision hierarchy.

A consistency ratio below `0.10` is generally treated as acceptable. A higher
value indicates that the pairwise judgments may need revision.

> [!NOTE]
> Models currently live in browser memory. Refreshing or leaving the builder
> resets unsaved work.

## Getting Started

### Prerequisites

- Node.js 20 or newer
- npm

### Installation

```bash
git clone <repository-url>
cd AHP-studio
npm install
npm run dev
```

Open [http://localhost:9002](http://localhost:9002).

For a production build:

```bash
npm run build
npm run start
```

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Turbopack development server on port `9002`. |
| `npm run build` | Create an optimized production build. |
| `npm run start` | Start the production server after a build. |
| `npm run typecheck` | Run TypeScript checks without emitting files. |
| `npm run lint` | Run the configured Next.js lint command. |
| `npm run genkit:dev` | Start the Genkit development UI. |
| `npm run genkit:watch` | Start Genkit in watch mode. |

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Product overview, AHP introduction, and template gallery. |
| `/builder` | Interactive decision-model workspace. |
| `/builder?template=<id>` | Workspace initialized with a selected template. |
| `/learn` | AHP fundamentals and preference-scale reference. |

## Calculation Model

The calculation engine:

1. normalizes each comparison-matrix column;
2. averages each normalized row to estimate its priority weight;
3. calculates `lambda max`, the consistency index, and the consistency ratio;
4. combines criteria weights with alternative weights to produce final scores.

Random Index values are included for matrices up to size 10. The implementation
is in [`src/lib/ahp-engine.ts`](src/lib/ahp-engine.ts).

## Tech Stack

- [Next.js 15](https://nextjs.org/) with the App Router
- [React 19](https://react.dev/) and TypeScript
- [Tailwind CSS](https://tailwindcss.com/)
- [Radix UI](https://www.radix-ui.com/) and shadcn/ui components
- [Recharts](https://recharts.org/) for result visualizations
- [Lucide](https://lucide.dev/) for icons
- [Firebase App Hosting](https://firebase.google.com/docs/app-hosting)
- [Genkit](https://genkit.dev/) scaffolded for future AI-assisted features

## Project Structure

```text
src/
|-- app/
|   |-- builder/          # Interactive AHP workspace
|   |-- learn/            # Educational content
|   |-- globals.css       # Theme and global styles
|   `-- page.tsx          # Landing page
|-- components/
|   |-- ahp/              # AHP inputs, matrices, diagrams, and charts
|   `-- ui/               # Shared UI primitives
|-- hooks/                # Reusable React hooks
|-- lib/
|   |-- ahp-engine.ts     # Weight, consistency, and synthesis calculations
|   `-- templates.ts      # Preconfigured decision models
`-- ai/                   # Genkit configuration
```

## Adding a Template

Add an object that satisfies `AHPTemplate` to
[`src/lib/templates.ts`](src/lib/templates.ts). Each template contains:

- a unique `id`, display `name`, and `description`;
- a list of `criteria` and `alternatives`;
- one reciprocal criteria comparison matrix;
- one reciprocal alternatives matrix for every criterion.

Matrix dimensions must match their corresponding item counts, diagonal values
must be `1`, and opposite cells should be reciprocals.

## Deployment

The repository includes [`apphosting.yaml`](apphosting.yaml) for Firebase App
Hosting. Run `npm run build` locally before deployment to catch production-build issues.
