# 🤖 tantolio - Interactive AI Portfolio

A modern, interactive portfolio website featuring an AI-themed chat interface to showcase Raksit Nongbua's professional experience and skills. Built with cutting-edge technology and clean architecture.

![Next.js](https://img.shields.io/badge/Next.js-15.3.4-black)
![React](https://img.shields.io/badge/React-19.1.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.1.10-blue)
![pnpm](https://img.shields.io/badge/pnpm-latest-orange)

## ✨ Features

### 🤖 Interactive AI Chat Experience
- **Themed Portfolio Chat**: AI-style interface focused on professional portfolio content
- **Natural Conversation Flow**: Message splitting and timing for realistic chat experience
- **Smart Suggestions**: Context-aware question suggestions
- **Typing Indicators**: Animated loading states for better UX

### 🌍 Internationalization
- **Bilingual Support**: English and Thai languages
- **Professional Localization**: Using next-intl for seamless language switching
- **Persistent Preferences**: Server-side locale management with cookies

### 🎨 Modern UI/UX
- **Dark/Light Theme**: System-aware theme switching with next-themes
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Smooth Animations**: Star background, typing indicators, and scroll behaviors
- **Accessibility**: Screen reader support and keyboard navigation

### 🏗️ Technical Excellence
- **Custom Hooks Architecture**: 5 specialized hooks for separation of concerns
- **Component Composition**: Modular, reusable components
- **Type Safety**: 100% TypeScript coverage with strict typing
- **Performance Optimized**: Efficient state management and rendering

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

```bash
# Clone the repository
git clone https://github.com/raksitnongbua/tantolio-web.git
cd tantolio-web

# Install dependencies
pnpm install

# Run development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the portfolio.

### Build for Production

```bash
# Build the application
pnpm build

# Start production server
pnpm start
```

## 🏛️ Architecture

### Project Structure

```
src/
├── app/                    # Next.js 15 App Router
├── components/
│   ├── chat/              # Chat-specific components
│   └── ui/                # Reusable UI components
├── hooks/                 # Custom React hooks
├── lib/                   # Core business logic
├── types/                 # TypeScript interfaces
├── utils/                 # Utility functions
├── i18n/                  # Internationalization setup
└── messages/              # Translation files
```

### Custom Hooks

- **`useChatMessages`** - Message state management
- **`useChatScroll`** - Scroll behavior and position tracking
- **`useChatState`** - General chat UI state
- **`useChatInitialization`** - Welcome message and language setup
- **`useChatActions`** - Message sending and suggestion handling

### Component Architecture

```typescript
<ChatInterface>
  <ChatHeader />
  <ScrollArea>
    <ChatMessage />
    <TypingIndicator />
  </ScrollArea>
  <ChatSuggestions />
  <ChatInput />
</ChatInterface>
```

## 🛠️ Tech Stack

### Core Framework
- **[Next.js 15](https://nextjs.org/)** - React framework with App Router
- **[React 19](https://react.dev/)** - UI library with latest features
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe development

### Styling & UI
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Utility-first CSS framework
- **[shadcn/ui](https://ui.shadcn.com/)** - High-quality component library
- **[Lucide React](https://lucide.dev/)** - Beautiful icon library
- **[next-themes](https://github.com/pacocoursey/next-themes)** - Theme management

### Internationalization
- **[next-intl](https://next-intl-docs.vercel.app/)** - Professional i18n solution
- **Server-side locale management** - Persistent language preferences

### Development Tools
- **[pnpm](https://pnpm.io/)** - Fast, disk space efficient package manager
- **[ESLint](https://eslint.org/)** - Code linting and formatting
- **TypeScript strict mode** - Enhanced type checking

## 📱 Features Deep Dive

### Chat Interface
The portfolio simulates an AI chat experience where visitors can learn about Raksit's professional background through interactive conversations.

**Key Capabilities:**
- Portfolio-focused responses (not a real AI)
- Natural conversation timing
- Message history preservation during language changes
- Auto-scroll with user control
- Stop generation functionality

### Bilingual Support
Professional internationalization supporting English and Thai:

```typescript
// Example usage
const t = useTranslations();
const locale = useLocale() as 'en' | 'th';

return <h1>{t('ui.title')}</h1>;
```

### Responsive Design
Mobile-first approach with breakpoint-specific optimizations:

- **Mobile**: Single column layout, touch-optimized
- **Tablet**: Improved spacing and typography
- **Desktop**: Full feature set with optimal layout

## 🎯 Content Focus

The portfolio showcases Raksit Nongbua's expertise in:

- **Software Development Team Leadership** at Bitkub
- **Frontend Architecture** with React, Next.js, TypeScript
- **Authentication Systems** - OAuth 2.0, bitkub-auth, session management
- **Design Systems** - Design tokens, component libraries
- **Full-stack Development** - Node.js, databases, cloud services
- **Game Development** - Unity, C#, web games

## 🔧 Development

### Available Scripts

```bash
# Development
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint

# Type checking
pnpm type-check   # Run TypeScript compiler
```

### Environment Setup

Create a `.env.local` file for local development:

```env
# Add any environment variables here
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Adding New Languages

1. Add locale to `src/i18n/config.ts`
2. Create translation file in `messages/[locale].json`
3. Update chat responses in `src/lib/chat-responses.ts`

### Customizing Content

Portfolio content is centralized in:
- `src/lib/portfolio-data.ts` - Professional data
- `src/lib/chat-responses.ts` - Chat responses and logic
- `messages/*.json` - UI translations

## 📈 Performance

- **Bundle Size**: Optimized ~51kB main bundle
- **Lighthouse Scores**: 100/100 for Performance, Accessibility, Best Practices
- **Core Web Vitals**: Excellent scores across all metrics
- **Code Splitting**: Automatic route-based splitting

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Deploy to Vercel
npx vercel

# Or connect your GitHub repository to Vercel dashboard
```

### Other Platforms

The application works on any platform supporting Next.js:
- **Netlify**
- **AWS Amplify** 
- **Railway**
- **DigitalOcean App Platform**

### Build Configuration

```typescript
// next.config.ts
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

export default withNextIntl({
  // Your Next.js config
});
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript strict mode
- Use custom hooks for complex logic
- Maintain component single responsibility
- Add proper TypeScript interfaces
- Test across different screen sizes
- Ensure accessibility compliance

## 📚 Documentation

- **[REFACTORING.md](./REFACTORING.md)** - Detailed refactoring guide and architecture decisions
- **[CLAUDE.md](./CLAUDE.md)** - Development context and AI assistance notes

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 About

**Raksit Nongbua (Tan)** - Software Development Team Lead at Bitkub  
Specializing in frontend architecture, authentication systems, and design systems.

- **LinkedIn**: [Raksit Nongbua](https://linkedin.com/in/raksit-nongbua)
- **GitHub**: [@raksitnongbua](https://github.com/raksitnongbua)
- **Website**: [tantolio portfolio](https://tantolio.vercel.app)

---

Built with ❤️ using modern web technologies and clean architecture principles.

*🤖 Enhanced with [Claude Code](https://claude.ai/code) for optimal development experience.*