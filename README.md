# Connect & Earn

A full-stack web application built with modern technologies for connecting users and enabling earning opportunities.

## Project Overview

Connect & Earn is a final year school project designed to demonstrate full-stack web development capabilities using React, TypeScript, and Cloudflare Workers.

## Tech Stack

### Frontend
- **React 19** - UI library
- **TypeScript** - Type-safe JavaScript
- **TanStack Router** - Client-side routing
- **TanStack Query** - Server state management
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible component library
- **React Hook Form** - Form management
- **Zod** - Schema validation

### Backend & Infrastructure
- **TanStack Start** - Full-stack React framework
- **Cloudflare Workers** - Serverless compute
- **Wrangler** - Cloudflare Workers CLI

### Development Tools
- **Vite** - Fast build tool
- **Bun** - JavaScript runtime
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **TypeScript** - Type checking

## Project Structure

```
connect-earn/
├── src/
│   ├── components/       # Reusable React components
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Utility functions and helpers
│   ├── routes/          # Route definitions (TanStack Router)
│   ├── server.ts        # Server-side entry point
│   ├── start.ts         # Application bootstrap
│   ├── router.tsx       # Router configuration
│   ├── styles.css       # Global styles
│   └── routeTree.gen.ts # Auto-generated route tree
├── vite.config.ts       # Vite configuration
├── wrangler.jsonc       # Cloudflare Workers config
├── tsconfig.json        # TypeScript configuration
├── package.json         # Project dependencies
└── eslint.config.js     # ESLint configuration
```

## Getting Started

### Prerequisites
- Node.js 18+ or Bun
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Aioflcu/connect-earn.git
cd connect-earn
```

2. Install dependencies:
```bash
bun install
# or
npm install
```

### Development

Start the development server:
```bash
bun run dev
# or
npm run dev
```

The application will be available at `http://localhost:5173`

### Build

Create a production build:
```bash
bun run build
# or
npm run build
```

Preview the production build:
```bash
bun run preview
# or
npm run preview
```

### Linting & Formatting

Run ESLint:
```bash
bun run lint
# or
npm run lint
```

Format code with Prettier:
```bash
bun run format
# or
npm run format
```

## Key Features

- **Responsive UI** - Works seamlessly on desktop and mobile devices
- **Type Safety** - Full TypeScript support for type-safe code
- **Component Library** - Built with Radix UI for accessible components
- **Form Validation** - Zod schema validation with React Hook Form
- **State Management** - TanStack Query for efficient server state handling
- **Server-Side Rendering** - TanStack Start provides SSR capabilities
- **Cloudflare Integration** - Deploy to Cloudflare Workers for global edge distribution

## File Descriptions

### Core Files
- `vite.config.ts` - Vite configuration with React plugin and TypeScript path support
- `tsconfig.json` - TypeScript compiler options and path aliases
- `eslint.config.js` - ESLint rules for code quality
- `.prettierrc` - Prettier formatting rules
- `wrangler.jsonc` - Cloudflare Workers deployment configuration
- `bunfig.toml` - Bun runtime configuration

### Source Files
- `src/server.ts` - Server-side request handling and SSR setup
- `src/start.ts` - Application entry point and initialization
- `src/router.tsx` - TanStack Router configuration
- `src/styles.css` - Global CSS and Tailwind directives

## Deployment

This project is configured to deploy to Cloudflare Workers:

```bash
bun run build
wrangler deploy
```

## Configuration

### Environment Variables
Create a `.env.local` file in the root directory for local development:
```
# Add your environment variables here
```

## Dependencies

### Key Dependencies
- `@tanstack/react-router` - Routing library
- `@tanstack/react-query` - Server state management
- `@radix-ui/*` - Component primitives
- `react-hook-form` - Form library
- `zod` - Schema validation
- `tailwindcss` - CSS framework

See `package.json` for the complete list of dependencies.

## Contributing

This is a school project, but if you'd like to contribute:

1. Create a feature branch (`git checkout -b feature/amazing-feature`)
2. Commit your changes (`git commit -m 'Add amazing feature'`)
3. Push to the branch (`git push origin feature/amazing-feature`)
4. Open a Pull Request

## License

This project is created for educational purposes.

## Author

**Aioflcu** - Final Year School Project

---

For more information about the technologies used:
- [React Documentation](https://react.dev)
- [TanStack Router](https://tanstack.com/router)
- [Tailwind CSS](https://tailwindcss.com)
- [Vite](https://vitejs.dev)
- [Cloudflare Workers](https://workers.cloudflare.com)
