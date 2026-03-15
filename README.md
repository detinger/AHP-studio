# AHP Studio

An interactive studio for the Analytic Hierarchy Process (AHP). Build models, compare criteria, and derive consistent priorities using a structured mathematical framework.

## Getting Started

This is a Next.js application. To run it locally on your computer, follow these steps:

1.  **Clone or Download** the project files to your local machine.
2.  **Install Dependencies**: Open your terminal in the project folder and run:
    ```bash
    npm install
    ```
3.  **Run Development Server**:
    ```bash
    npm run dev
    ```
4.  **View the App**: Open [http://localhost:9002](http://localhost:9002) in your browser (the port is configured to 9002 in this project).

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS
- **Components**: Radix UI / ShadCN
- **Charts**: Recharts
- **Icons**: Lucide React
- **Logic**: Custom AHP engine in TypeScript

## Project Structure

- `src/app`: Application routes and pages.
- `src/components`: Reusable UI components (AHP-specific and ShadCN).
- `src/lib`: Core AHP engine logic and template data.
