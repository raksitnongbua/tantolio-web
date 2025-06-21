# 🤖 tantolio - Interactive AI Portfolio

A modern, interactive portfolio website featuring an AI-themed chat interface to showcase Raksit Nongbua's professional experience and skills. The name "tantolio" combines "Tan" (nickname) + "portfolio" to create an engaging, personalized portfolio experience.

![Next.js](https://img.shields.io/badge/Next.js-15.3.4-black)
![React](https://img.shields.io/badge/React-19.0.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-v4-blue)
![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-latest-green)

## ✨ Features

### 🤖 Interactive AI Chat Experience
- **"Tantolio AI" Assistant**: Portfolio-focused chat bot with personality
- **Smart Auto-Scroll**: Only scrolls when user is near bottom (improved UX)
- **Scroll to Bottom Button**: Easy navigation back to latest messages
- **Markdown Support**: Rich text rendering with clickable links
- **Realistic Interactions**: Typing indicators, message delays, and natural flow
- **Smart Suggestions**: Context-aware question prompts

### 🌍 Comprehensive Internationalization
- **Bilingual Support**: Complete English and Thai translations
- **Locale Switcher**: Easy language switching with flag icons
- **Server-side Management**: Persistent preferences with cookies
- **Professional Localization**: Industry-standard i18n implementation

### 🎨 Modern UI/UX Excellence
- **Dual Theme System**: Dark/light mode with smooth transitions
- **Interactive Backgrounds**: Mouse-tracking star particles
- **Responsive Design**: Mobile-first approach optimized for all devices
- **Accessibility First**: Screen reader support and keyboard navigation
- **Smooth Animations**: Enhanced scrolling and interaction feedback

### 🏗️ Technical Architecture
- **Modern Stack**: Next.js 15 + React 19 + TypeScript 5
- **Component-Driven**: shadcn/ui with custom components
- **Performance Optimized**: Server Components and smart state management
- **Type Safety**: 100% TypeScript coverage with strict mode
- **Clean Code**: Follows "coding is as simple as writing" philosophy

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ (LTS recommended)
- pnpm (recommended) or npm

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/tantolio-v2.git
cd tantolio-v2

# Install dependencies
pnpm install

# Run development server with Turbopack
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the portfolio.

### Development Scripts

```bash
# Development
pnpm dev          # Start dev server with Turbopack
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint checks
```

## 🏛️ Architecture

### Project Structure

```
src/
├── app/                    # Next.js 15 App Router
│   ├── layout.tsx         # Root layout with providers
│   ├── page.tsx           # Home page (chat interface)
│   ├── not-found.tsx      # Custom 404 page
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── chat/             # Chat-specific components
│   │   ├── animated-avatar.tsx
│   │   ├── chat-header.tsx
│   │   ├── chat-message.tsx
│   │   ├── typing-effect.tsx
│   │   └── typing-indicator.tsx
│   ├── ui/               # shadcn/ui components
│   ├── portfolio-chat.tsx # Main chat interface
│   ├── markdown-renderer.tsx # Custom markdown support
│   ├── locale-switcher.tsx
│   └── theme-toggle.tsx
├── i18n/                 # Internationalization config
│   ├── config.ts
│   ├── locale.ts
│   └── request.ts
├── lib/                  # Core business logic
│   ├── portfolio-data.ts # Professional data
│   ├── chat-responses.ts # Bot responses & logic
│   └── utils.ts         # Utility functions
├── types/                # TypeScript definitions
├── utils/                # Helper functions
└── messages/             # Translation files
    ├── en.json          # English translations
    └── th.json          # Thai translations
```

### Key Components

```typescript
<PortfolioChat>           // Main chat interface
  <ChatHeader>            // Header with avatar, title, controls
    <LocaleSwitcher />    // Language switching
    <ThemeToggle />       // Dark/light mode
  </ChatHeader>
  
  <ScrollArea>            // Messages container with smart scroll
    <ChatMessage />       // Individual messages with markdown
    <TypingIndicator />   // Bot thinking animation
  </ScrollArea>
  
  <ScrollToBottomButton /> // Appears when scrolled up
  <ChatSuggestions />     // Question suggestions
  <ChatInput />           // Message input field
</PortfolioChat>
```

## 🛠️ Tech Stack

### Core Framework
- **[Next.js 15](https://nextjs.org/)** - React framework with App Router
- **[React 19](https://react.dev/)** - Latest React with Server Components
- **[TypeScript 5](https://www.typescriptlang.org/)** - Type-safe development

### Styling & UI
- **[Tailwind CSS v4](https://tailwindcss.com/)** - Utility-first CSS with variables
- **[shadcn/ui](https://ui.shadcn.com/)** - High-quality component library
- **[Radix UI](https://www.radix-ui.com/)** - Accessible primitives
- **[Lucide React](https://lucide.dev/)** - Beautiful icon library
- **[next-themes](https://github.com/pacocoursey/next-themes)** - Theme management

### Internationalization
- **[next-intl](https://next-intl-docs.vercel.app/)** - Professional i18n solution
- **Server-side locale management** - Cookie-based persistence
- **Type-safe translations** - Full TypeScript support

### Development Experience
- **[Turbopack](https://turbo.build/pack)** - Fast development builds
- **[ESLint](https://eslint.org/)** - Code linting and quality
- **pnpm** - Fast, efficient package manager

## 📱 Features Deep Dive

### AI Chat Experience
The portfolio simulates an intelligent AI assistant ("Tantolio AI") that provides structured information about Raksit's professional background.

**Chat Capabilities:**
- **Personal Introduction**: Developer philosophy and personality
- **Detailed Work Experience**: Company information with clickable links
- **Technical Skills**: Categorized expertise and technologies
- **Contact Information**: Professional contact details
- **Smart Responses**: Context-aware answers to portfolio questions

### Advanced UX Features

#### Smart Scrolling System
- **Auto-scroll Intelligence**: Only scrolls when user is near bottom (100px threshold)
- **Reading Preservation**: Doesn't interrupt when user is reading content
- **Scroll to Bottom Button**: Appears when scrolled away, smooth return to latest
- **Scroll Position Detection**: Real-time monitoring with performance optimization

#### Rich Content Rendering
- **Markdown Support**: Custom renderer for bold text, links, and formatting
- **Clickable Company Links**: Direct links to Bitkub and ProGaming websites
- **No Duplication**: Fixed overlapping regex issues for clean rendering
- **Company Logos**: Visual assets for professional presentation

### Internationalization Excellence
Professional bilingual support with:

```typescript
// Translation usage
const t = useTranslations();
const response = t('chat.whoIsRaksit', {
  name: 'Raksit Nongbua',
  nickname: 'Tan',
  title: 'Software Development Team Lead',
  company: 'Bitkub',
  location: 'Thailand'
});
```

**Translation Features:**
- **Complete Coverage**: All UI elements and content
- **Parameter Support**: Dynamic content injection
- **Fallback System**: Graceful degradation with English defaults
- **Professional Quality**: Native-level translations

## 🎯 Portfolio Content

The portfolio showcases Raksit Nongbua's expertise across:

### Professional Experience
- **Software Development Team Lead** at Bitkub (2024-Present)
- **Senior Frontend Developer** at Bitkub (2022-2024)
- **Junior Frontend Developer** at Bitkub (2021-2022)
- **Web Developer & Game Developer** at ProGaming (2016-2021)

### Technical Specializations
- **Authentication Systems**: OAuth 2.0, bitkub-auth, session management
- **Frontend Architecture**: React, Next.js, TypeScript, design systems
- **Team Leadership**: Code review, mentoring, technical architecture
- **Design Systems**: Design tokens pioneer, component libraries
- **Full-stack Development**: Node.js, databases, cloud services
- **Game Development**: Unity, C#, cross-platform development

### Personal Philosophy
> *"Coding is as simple as writing!"* - Focus on clean, readable code that's easy to understand and maintain.

## 🔧 Development

### Environment Setup

```bash
# Optional: Create environment file
touch .env.local

# Example contents
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Customizing Content

**Portfolio Data**: `src/lib/portfolio-data.ts`
```typescript
export const portfolioData = {
  personal: { /* Personal information */ },
  skills: { /* Technical skills by category */ },
  projects: [ /* Project showcase */ ],
  experience: [ /* Work experience */ ]
};
```

**Chat Responses**: `src/lib/chat-responses.ts`
```typescript
// Add new response types
if (aliasedMessage.includes('your-new-topic')) {
  responseKey = 'newTopic';
}
```

**Translations**: `messages/en.json` & `messages/th.json`
```json
{
  "chat": {
    "newTopic": "Your new response content"
  }
}
```

### Adding Features

1. **New Chat Topics**: Add to chat responses and translations
2. **UI Components**: Use shadcn/ui or create custom components
3. **Styling**: Follow Tailwind CSS utility patterns
4. **State Management**: Use React hooks and context when needed

## 📈 Performance

- **Bundle Size**: ~48kB optimized main bundle
- **Build Time**: Fast builds with Turbopack
- **Runtime Performance**: Optimized with React 19 features
- **Accessibility**: Full screen reader and keyboard support
- **Mobile Performance**: Optimized for mobile devices

### Build Output
```
Route (app)                                 Size  First Load JS
┌ ƒ /                                    48.2 kB         166 kB
└ ƒ /_not-found                            136 B         102 kB
```

## 🚀 Deployment

### Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/tantolio-v2)

```bash
# Deploy to Vercel
npx vercel

# Or connect GitHub repository in Vercel dashboard
```

### Other Platforms

The application works on any Next.js-compatible platform:
- **Netlify** - Full Next.js support
- **AWS Amplify** - Server-side rendering support
- **Railway** - Container deployment
- **DigitalOcean App Platform** - Modern deployment

### Build Configuration

```typescript
// next.config.ts
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

export default withNextIntl({
  experimental: {
    turbo: {
      // Turbopack configuration
    }
  }
});
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- **Code Style**: Follow "coding is as simple as writing" philosophy
- **TypeScript**: Use strict mode and proper typing
- **Components**: Keep single responsibility principle
- **Accessibility**: Ensure WCAG compliance
- **Testing**: Test across different devices and languages
- **Performance**: Optimize for Core Web Vitals

## 📚 Documentation

- **[CLAUDE.md](./CLAUDE.md)** - Development context and project guidance
- **Component Documentation** - Inline JSDoc comments
- **Type Definitions** - Comprehensive TypeScript interfaces

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 About

**Raksit Nongbua (Tan)** - Software Development Team Lead at Bitkub  
*"I am a developer. My coding guideline is 'coding is as simple as writing!' for easy reading and fixing."*

### Professional Background
- **Current Role**: Team Lead at Thailand's leading cryptocurrency exchange
- **Expertise**: Authentication systems, frontend architecture, design systems
- **Philosophy**: Clean, maintainable code that reads like good writing
- **Experience**: Both game development and web development background

### Interests
- 🎮 Playing games
- 🎬 Watching movies  
- 🎵 Listening to music
- 💻 Learning new technologies
- 👥 Working as part of a team

### Contact
- **Email**: tan.raksit@gmail.com
- **Location**: Thailand 🇹🇭
- **GitHub**: [@yourusername](https://github.com/yourusername)
- **LinkedIn**: [Raksit Nongbua](https://linkedin.com/in/raksit-nongbua)

---

Built with ❤️ using modern web technologies and clean architecture principles.

*🤖 Enhanced development experience with [Claude Code](https://claude.ai/code)*