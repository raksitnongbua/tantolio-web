# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal portfolio website built with Next.js 15 and React 19. The project uses the App Router architecture and incorporates shadcn/ui components with Tailwind CSS for styling.

## Development Commands

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build the application for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint for code quality

## Architecture

### Tech Stack
- **Framework**: Next.js 15 with App Router
- **UI Components**: shadcn/ui with "new-york" style
- **Styling**: Tailwind CSS v4 with CSS variables
- **Theme System**: next-themes for dark/light mode switching
- **Icons**: Lucide React
- **Utilities**: class-variance-authority, clsx, tailwind-merge
- **TypeScript**: Strict mode enabled

### Project Structure
- `src/app/` - Next.js App Router pages and layouts
- `src/lib/` - Utility functions and shared code
- `@/components` - Aliased to components directory (shadcn/ui setup)
- `@/lib` - Aliased to src/lib directory
- `@/components/ui` - shadcn/ui components location

### Key Configuration
- **Path Aliases**: `@/*` maps to `./src/*`
- **shadcn/ui**: Configured with neutral base color, CSS variables, and Lucide icons
- **Fonts**: Geist Sans and Geist Mono from next/font/google
- **Turbopack**: Enabled for faster development builds

### Styling Approach
- Tailwind CSS v4 with CSS variables for theming
- `cn()` utility function in `src/lib/utils.ts` for conditional classes
- Global styles in `src/app/globals.css`

## Development Notes

When adding new components, follow the shadcn/ui pattern and use the configured aliases. The project is set up for RSC (React Server Components) with TypeScript support.

### Theme System
- Uses next-themes for theme management
- Supports light, dark, and system themes
- Theme toggle component available at `@/components/theme-toggle`
- Theme provider configured in root layout with `suppressHydrationWarning`

### Portfolio Chat System
- Interactive AI chat interface for portfolio presentation with "Tantolio AI" assistant
- Portfolio data managed in `src/lib/portfolio-data.ts` (includes nickname "Tan")
- Chat responses logic in `src/lib/chat-responses.ts` with third-person perspective
- AI speaks about Raksit in third person (e.g., "He's Raksit Nongbua, called Tan")
- Current position: Software Development Team Lead at Bitkub
- Detailed expertise: Authentication systems, OAuth, onboarding domain, design tokens, ACL management
- Dual authentication architecture: internal bitkub-auth (micro frontend + DDD) and external OAuth 2.0
- Specialized skills include microservices, domain-driven design, and micro frontend architecture
- Skills display with icons using `src/components/skills-display.tsx`
- Skill-to-icon mapping system in `src/lib/skill-icons.tsx`
- Enhanced interactive star background with mouse tracking and particle effects
- Enhanced scrolling with auto-scroll to bottom and scroll-to-bottom button
- Fixed layout to prevent content overlapping with input areas
- Smooth scrolling behavior and scroll position detection
- Backward compatibility aliases for "your" vs "his" questions