# S&P 500 Prediction Platform

## Overview

This application is a machine learning-powered S&P 500 stock market prediction platform that provides next-day market direction forecasts. The platform uses a Random Forest-inspired algorithm to analyze historical market data and predict whether the S&P 500 will move up or down. It features a modern, fintech-style dashboard with real-time market data integration, prediction history tracking, and interactive visualizations.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React with TypeScript using Vite as the build tool.

**UI Component Library**: Shadcn/ui with Radix UI primitives for accessible, customizable components. The design follows a fintech-inspired aesthetic with Material Design principles for information-dense interfaces.

**Styling**: Tailwind CSS with custom design tokens defined in CSS variables. The application uses a dark mode theme by default with financial color semantics (green for bullish/up trends, red for bearish/down trends).

**State Management**: TanStack Query (React Query) handles server state management, API data fetching, and caching. The query client is configured with disabled refetch intervals and window focus refetching to maintain stable data states.

**Routing**: Wouter for lightweight client-side routing. The application is primarily a single-page dashboard with a 404 fallback.

**Data Visualization**: Recharts library for rendering price charts and financial data visualizations.

**Key Design Decisions**:
- Monospace font (Roboto Mono) for financial figures and predictions to ensure alignment and readability
- Card-based layout for modular metric display
- Progressive enhancement with loading skeletons for better perceived performance
- Mobile-first responsive design with breakpoints at md (768px) and lg (1024px)

### Backend Architecture

**Runtime**: Node.js with Express framework.

**Language**: TypeScript with ES modules.

**API Design**: RESTful endpoints with JSON responses. Key routes include:
- `POST /api/predict` - Generate market predictions based on input data
- `GET /api/market-data` - Fetch real-time S&P 500 data from Yahoo Finance
- `GET /api/predictions` - Retrieve prediction history

**Prediction Algorithm**: Custom implementation inspired by Random Forest methodology. The algorithm analyzes multiple market indicators:
- Price range and daily volatility
- Close vs. open price differential
- Closing position within daily range
- Volume patterns
- Momentum indicators

The scoring system combines weighted features with controlled randomness to simulate model uncertainty, producing confidence scores between 35% and 75%.

**Session Management**: Express-session with PostgreSQL-backed session store using connect-pg-simple for persistent sessions across server restarts.

**Logging**: Custom middleware for request/response logging with timing information and structured console output.

**Development Mode**: Hot module replacement (HMR) using Vite middleware integration in development, with automatic server restart on errors.

### Data Storage

**Database**: PostgreSQL accessed via Drizzle ORM.

**Schema Design**:
- `users` table: Basic authentication with username/password
- `predictions` table: Stores prediction history with market data snapshots (open, high, low, close, volume), predicted direction, confidence scores, and actual outcomes

**ORM Choice Rationale**: Drizzle ORM provides type-safe database queries with minimal runtime overhead. It generates TypeScript types from schema definitions and supports PostgreSQL-specific features.

**Migration Strategy**: Drizzle Kit manages schema migrations with files stored in `/migrations` directory.

**Data Validation**: Zod schemas generated from Drizzle schemas using drizzle-zod ensure type safety and runtime validation across the stack.

### External Dependencies

**Third-Party APIs**:
- **Yahoo Finance**: Real-time S&P 500 market data fetching (open, high, low, close, volume, previous close). The application makes HTTP requests to Yahoo Finance's public API endpoints to retrieve current market information.

**UI Component Dependencies**:
- **Radix UI**: Unstyled, accessible component primitives (dialogs, dropdowns, tooltips, etc.)
- **Lucide React**: Icon library for consistent iconography

**Development Tools**:
- **Replit Plugins**: Vite plugins for runtime error overlays, cartographer (code navigation), and development banners in Replit environment
- **ESBuild**: Production bundling for server-side code with selective dependency bundling to reduce cold start times

**Build Process**: 
- Client builds to `dist/public` via Vite
- Server bundles to `dist/index.cjs` via ESBuild with external dependencies except for a defined allowlist (reduces syscall overhead)
- Production serves static files from `dist/public` with SPA fallback routing

**TypeScript Configuration**: Shared types between client and server via path aliases (`@/*` for client, `@shared/*` for shared schemas).