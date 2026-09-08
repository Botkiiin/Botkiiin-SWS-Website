## ✨ Features

- 🌐 Built-in i18n support (English, Dutch)
- 🎨 Modern UI design with Tailwind CSS
- 🌙 Dark/Light theme toggle
- 📱 Responsive layout
- 🔍 SEO optimization
- 📊 Integrated analytics tools
  - Google Analytics
  - Google Adsense
  - Vercel Analytics

## 🚀 Quick Start

### Prerequisites

- Node.js 18.17 or higher
- pnpm 9.0 or higher (recommended)

> **Note**: The project has configured `packageManager` field, we recommend using pnpm for the best experience.

### Installation

3. Install dependencies:

```bash
pnpm install
npm install
yarn
```

4. Copy environment variables:

```bash
cp .env.example .env
```

5. Start the development server:

```bash
pnpm dev
# or npm run dev
```

Visit http://localhost:3000 to view your application.

## ⚙️ Configuration

1. Basic Setup

   - Edit `config/site.ts` for website information
   - Update icons and logo in `public/`
   - Configure `app/sitemap.ts` for sitemap
   - Update `app/robots.ts` for robots.txt

2. i18n Setup
   - Add/modify language files in `i18n/messages/`
   - Configure supported languages in `i18n/routing.ts`
   - Set up i18n routing in `middleware.ts`
   - Create pages under `app/[locale]/`
   - Use the `Link` component from `i18n/routing.ts` instead of Next.js default

## 📝 Content Management

### Static Pages

Manage static page content in `content/[page]/[locale].mdx`.

## 🔍 SEO Optimization

Built-in comprehensive SEO features:

- Server-side rendering and static generation
- Automatic sitemap.xml generation
- robots.txt configuration
- Optimized metadata
- Open Graph support
- Multilingual SEO support

## 📊 Analytics

Enable analytics by adding IDs in `.env`:

```
NEXT_PUBLIC_GOOGLE_ANALYTICS=
NEXT_PUBLIC_GOOGLE_ADSENSE=
```

## 📁 Project Structure

```
nextjs-15-starter/
├── app/                      # App directory
│   ├── [locale]/            # Internationalized routes
│   │   ├── about/           # About page
│   │   ├── services/        # Services page
│   │   ├── trust/           # Trust page
│   │   └── ...              # Other pages
│   ├── api/                 # API routes
│   └── globals/             # Global components
├── components/              # Reusable components
│   ├── ui/                  # Base UI components
│   ├── header/              # Header components
│   ├── footer/              # Footer components
│   └── ...                  # Other components
├── config/                  # Configuration files
├── content/                 # Static content (MDX)
├── i18n/                    # Internationalization
│   ├── messages/            # Translation files
│   ├── routing.ts           # Routing configuration
│   └── request.ts           # Request configuration
├── lib/                     # Utility functions
├── public/                  # Static assets
└── types/                   # Type definitions
```

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Shadcn/ui
- **Internationalization**: next-intl
- **Content**: MDX
- **State Management**: Zustand
- **Deployment**: Vercel
- **Package Manager**: pnpm (recommended)

## 🚀 Deployment

### One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

### Manual Deployment to Vercel

1. Push your code to GitHub
2. Import project in Vercel
3. Configure environment variables
4. Deploy

### Other Platforms

```bash
# Build for production
pnpm build

# Start production server
pnpm start
```

## 💡 Development Best Practices

### Package Manager

- Project configured with `packageManager: "pnpm@10.12.4"`
- Enable Corepack: `corepack enable`
- Team members should use the same pnpm version

### Code Quality

```bash
# Lint code
pnpm lint

# Type checking
pnpm type-check
```

### Internationalization Development

1. Adding new language support:

   - Add new language files in `i18n/messages/`
   - Update `i18n/routing.ts` configuration
   - Create corresponding language directories in `content/`

2. Using translations:

```tsx
import { useTranslations } from 'next-intl';

export default function MyComponent() {
  const t = useTranslations('namespace');
  return <h1>{t('title')}</h1>;
}
```

## 🔧 Troubleshooting

### Common Issues

**1. Package manager version mismatch**

```bash
# Remove node_modules and lockfile
rm -rf node_modules pnpm-lock.yaml
# Reinstall
pnpm install
```

**2. MDX files not displaying**

- Check file path is correct
- Verify frontmatter format
- Ensure `visible` field is set to `published`

**3. Internationalization routing issues**

- Use `Link` component from `i18n/routing.ts`
- Check `middleware.ts` configuration

**4. Styles not working**

- Verify Tailwind CSS class names are correct
- Try restarting development server

### Environment Variables

Ensure `.env` file contains necessary configuration:

```bash
# Copy example config
cp .env.example .env
# Modify as needed
```

## 📄 License

MIT
