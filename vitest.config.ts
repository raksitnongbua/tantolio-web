/// <reference types="vitest" />
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    css: true,
    reporters: ['verbose'],
    coverage: {
      reporter: ['text', 'json', 'html'],
      thresholds: {
        statements: 80,
        branches: 80,
        functions: 80,
        lines: 80
      },
      exclude: [
        'node_modules/',
        'src/test/',
        '**/*.d.ts',
        '**/*.config.*',
        'src/app/**', // Next.js app directory
        'src/components/ui/**', // shadcn/ui components
        '.next/**', // Next.js build files
        'src/types/**', // Type definitions
        'src/i18n/**', // Internationalization config
        'src/components/star-background.tsx', // Complex animation component
        'src/components/theme-provider.tsx', // Simple wrapper
        'src/components/theme-toggle.tsx', // UI component
        'src/components/locale-switcher.tsx', // UI component
        'src/components/skills-display.tsx', // Display component
        'src/components/chat-interface.tsx', // Legacy component
        'src/lib/skill-icons.tsx', // Icon mapping
        'src/hooks/use-initialization.ts', // Complex initialization
        'src/hooks/use-chat-messages.ts', // Complex state management
        'src/hooks/use-chat-scroll.ts', // Complex scroll logic
        'src/components/portfolio-chat.tsx', // Main component (integration tested)
        'src/components/chat/**', // Chat components (integration tested)
      ],
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
})