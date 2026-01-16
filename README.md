```markdown
# Innovesta 2026 - Event Portal

The official landing and registration platform for **Innovesta 2026**, our college's flagship event.  
Built with **Next.js 14+ (App Router)**, **Tailwind CSS v4**, and **SQL**.

---

## 🚀 Tech Stack

* **Framework:** [Next.js](https://nextjs.org/) (App Router)
* **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) (CSS-first config)
* **UI Components:** [shadcn/ui](https://ui.shadcn.com/)
* **Database:** SQL (PostgreSQL recommended) via Drizzle ORM / Prisma
* **Language:** TypeScript
* **Package Manager:** npm

---

## 📂 Project Structure

We follow a strict folder hierarchy to keep the codebase clean for collaboration.

```text
/innovesta
├── app/                  # Pages & Routes
│   ├── globals.css       # Tailwind v4 Theme & Variables
│   ├── layout.tsx        # Root layout (Fonts, Providers)
│   └── page.tsx          # Landing Page
│
├── components/           # UI Components
│   ├── ui/               # 🛑 SHADCN PRIMITIVES (Do not edit these manually)
│   └── sections/         # ✅ CUSTOM SECTIONS (Hero, Navbar, EventCard, etc.)
│
├── db/                   # Database Logic
│   ├── index.ts          # DB Connection Client
│   └── schema.ts         # SQL Table Definitions
│
├── lib/                  # Utilities & Server Logic
│   ├── actions.ts        # Server Actions (Form submissions, Backend logic)
│   └── utils.ts          # Class merger utility for shadcn
│
└── public/               # Static Assets (Images, fonts)
```

---

## 🛠️ Getting Started

Follow these steps to set up the project locally.

### 1. Prerequisites

Ensure you have the following installed:
* Node.js (v18 or higher)
* Git

### 2. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/innovesta.git
cd innovesta
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Environment Setup

We do not push API keys or DB passwords to GitHub.

1. Copy the example environment file:
```bash
cp .env.example .env
```

2. Open `.env` and fill in your local credentials (Database URL, etc.).

### 5. Run the Development Server

```bash
npm run dev
```

Open http://localhost:3000 to view the site.

---

## 🎨 Styling & Tailwind v4

**Important:** This project uses Tailwind CSS v4.

* There is NO `tailwind.config.ts`.
* All theme configuration (colors, fonts, radius) is defined directly in `app/globals.css` using the `@theme inline` directive.
* We use CSS variables for light/dark mode.

---

## 🧱 Contributing Guidelines

### Adding New UI Components

* **Primitives:** If you need a standard UI element (like a Dialog or Dropdown), use shadcn:
```bash
npx shadcn@latest add dialog
```
This adds the file to `components/ui/`. Do not modify these files unless absolutely necessary.

* **Custom Features:** If you are building a section (e.g., "About Us" or "Events List"), create a new component in `components/sections/` (e.g., `AboutSection.tsx`).

### Working with the Database

1. Define your table models in `db/schema.ts`.
2. If you change the schema, run the migration command (check `package.json` for specific DB scripts).
3. Write your database logic (queries/mutations) inside `lib/actions.ts` or specific service files.

### Branching Strategy

* **main:** Production-ready code.
* **dev:** Integration branch (PRs go here).
* **feature/your-feature:** Your working branch.

**Example Workflow:**
```bash
git checkout -b feature/amazing-navbar
# ... do work ...
git commit -m "feat: added responsive navbar"
git push origin feature/amazing-navbar
# Open a Pull Request to 'main'
```

---

## 📝 TODOs & Roadmap

* [x] Setup: Initialize repo and folder structure
* [ ] UI: Build Hero Section
* [ ] UI: Build Navbar & Footer
* [ ] DB: Connect SQL Database (Postgres)
* [ ] Feature: Events Listing Page
* [ ] Feature: Registration Form (Server Actions)

---

## 📄 License

[MIT License](LICENSE) - Feel free to use this project for your college events!

---

## 🤝 Contributors

Built with ❤️ by the Innovesta 2026 Team.
```