# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal portfolio website built with Next.js 15 and React 19. The project uses the App Router architecture and incorporates shadcn/ui components with Tailwind CSS for styling.

## Development Commands

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build the application for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint for code quality
- `npm run test` - Run test suite with Vitest
- `npm run test:watch` - Run tests in watch mode
- `npm run test:ui` - Run tests with UI interface
- `npm run test:coverage` - Generate test coverage report

## Recent Major Updates

### Smart Scrolling System (Latest)
- **Intelligent Auto-Scroll**: Only auto-scrolls when user is within 100px of bottom
- **Reading Preservation**: No interruption when user scrolls up to read content
- **Scroll to Bottom Button**: Floating button appears when scrolled away from bottom
- **Performance Optimized**: useCallback for scroll detection, proper dependency management

### Content Restructure
- **Personal Introduction**: Developer philosophy, personality, hobbies, and life goals
- **Detailed Work Experience**: Professional history with company links and technical details
- **Markdown Support**: Custom renderer for rich text, links, and formatting without duplication
- **Company Assets**: Bitkub and ProGaming logos with clickable website links

### Localization Enhancements
- **Complete Translation System**: All UI elements and content in English/Thai
- **Professional Quality**: Native-level translations with cultural considerations
- **Locale Switcher**: Easy language switching with flag icons in header
- **Alias System**: Comprehensive chat response matching for both languages

## Architecture

### Tech Stack
- **Framework**: Next.js 15 with App Router
- **UI Components**: shadcn/ui with "new-york" style
- **Styling**: Tailwind CSS v4 with CSS variables
- **Theme System**: next-themes for dark/light mode switching
- **Icons**: Lucide React
- **Utilities**: class-variance-authority, clsx, tailwind-merge
- **TypeScript**: Strict mode enabled
- **Testing**: Vitest with React Testing Library and jsdom

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
- Interactive AI chat interface with "Tantolio AI" assistant (portfolio presentation, not real AI)
- Portfolio data managed in `src/lib/portfolio-data.ts` with company logos and websites
- Chat responses in `src/lib/chat-responses.ts` with comprehensive alias system
- Personal philosophy: "Coding is as simple as writing!" for clean, readable code
- Two content types: personal introduction and detailed work experience
- **Personal Content**: Developer philosophy, hobbies (games, movies, music), life goals
- **Professional Content**: Detailed work experience with clickable company links
- **Bilingual Content**: Complete English/Thai translations with professional quality
- **Smart Auto-Scroll**: Only scrolls when user is near bottom (100px threshold)
- **Scroll to Bottom Button**: Appears when scrolled up, smooth return to latest messages
- **Markdown Rendering**: Custom renderer for rich text, bold formatting, and clickable links
- **Company Integration**: Bitkub ([bitkub.com](https://www.bitkub.com/)) and ProGaming ([progaming.co.th](https://www.progaming.co.th/))
- **UX Improvements**: Reading preservation, no interruption during content consumption
- Enhanced interactive star background with mouse tracking and particle effects
- Fixed duplicate content rendering with non-overlapping regex patterns

## Testing Framework

### Test Setup
- **Vitest**: Fast test runner with TypeScript support and ESM compatibility
- **React Testing Library**: Component testing utilities for user-centric tests
- **jsdom**: Browser environment simulation for DOM testing
- **@testing-library/jest-dom**: Additional DOM matchers for better assertions

### Test Structure
```
src/
├── lib/__tests__/           # Business logic tests
│   ├── utils.test.ts        # Utility function tests
│   ├── portfolio-data.test.ts # Data structure validation
│   └── chat-responses.test.ts # Chat bot logic tests
├── utils/__tests__/         # Utility function tests
│   └── message-utils.test.ts # Message processing logic
├── hooks/__tests__/         # Custom hook tests
│   └── use-chat-state.test.ts # Chat state management
└── components/__tests__/    # Component and integration tests
    ├── markdown-renderer.test.tsx # Markdown processing
    ├── typing-indicator.test.tsx  # UI components
    └── portfolio-chat.integration.test.tsx # End-to-end flows
```

### Test Coverage Areas
- **Unit Tests**: 113 tests covering all utility functions and business logic
- **Component Tests**: React components with user interactions and edge cases
- **Integration Tests**: Chat conversation flows and user experience scenarios
- **Data Validation**: Portfolio data structure integrity and content quality
- **Error Handling**: Graceful degradation and fallback behaviors

### Testing Best Practices
- Co-locate tests with source files using `__tests__` directories
- Test user behavior, not implementation details
- Use descriptive test names that explain the expected behavior
- Mock external dependencies (next-intl, next-themes, etc.)
- Test edge cases and error conditions
- Maintain test reliability with proper setup/teardown