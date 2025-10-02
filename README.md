# AniMachi - Anime Community Hub

A production-ready full-stack web application for anime fans to share memes, edits, discussions, and connect with fellow otakus.

## 🚀 Features

- **Home Page**: Trending anime edits/memes in responsive grid with likes and comments
- **Community Page**: Create polls, discussions, and upload memes/edits (full CRUD)
- **Watchlist Page**: Personal anime tracking (Planning, Watching, Completed, etc.)
- **Meme/Edits Upload**: Media upload with Cloudinary integration
- **Search & Filter**: Server-side search of anime titles from AniList API
- **User Profiles**: Avatar, bio, uploads, and activity tracking
- **Dark/Light Mode**: Tailwind + shadcn theme toggle
- **Authentication**: NextAuth.js with email/password and Google OAuth
- **API Integration**: AniList API for anime data and trending content
- **Caching**: Redis (Upstash) for optimized API responses
- **SEO**: next-seo for meta tags and structured data
- **Testing**: Jest + React Testing Library
- **Analytics**: Vercel Analytics integration

## 🛠 Tech Stack

- **Frontend**: Next.js 14 (App Router) + TypeScript
- **UI**: TailwindCSS + shadcn/ui + Framer Motion
- **Backend**: Next.js API Routes
- **Database**: Supabase (PostgreSQL)
- **Authentication**: NextAuth.js
- **Validation**: Zod
- **Media**: Cloudinary
- **Caching**: Redis (Upstash)
- **Deployment**: Vercel
- **Testing**: Jest + React Testing Library

## 📋 Prerequisites

- Node.js 18+
- pnpm (recommended) or npm
- Supabase account
- Google OAuth credentials (optional)
- Cloudinary account (optional)

## 🚀 Getting Started

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd animachi
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Set up Supabase**

   - Create a new project at [supabase.com](https://supabase.com)
   - Run the SQL migration in `supabase/migrations/001_initial_schema.sql`
   - Copy your project credentials

4. **Configure environment variables**
   Create `.env.local` in the root directory:

   ```env
   # Supabase
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
   SUPABASE_DATABASE_URL=your-supabase-database-url

   # NextAuth
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-nextauth-secret

   # OAuth (optional)
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret

   # Cloudinary (optional)
   CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
   CLOUDINARY_API_KEY=your-cloudinary-api-key
   CLOUDINARY_API_SECRET=your-cloudinary-api-secret

   # Redis (optional)
   REDIS_URL=your-redis-url

   # AniList API
   ANILIST_API_URL=https://graphql.anilist.co
   ```

5. **Run database migrations**

   ```bash
   # If using Supabase CLI
   supabase db push
   ```

6. **Start the development server**

   ```bash
   pnpm run dev
   ```

7. **Open [http://localhost:3000](http://localhost:3000)**

## 🧪 Testing

```bash
# Run tests
pnpm test

# Run tests with coverage
pnpm test --coverage
```

## 🚀 Deployment

### Vercel Deployment

1. **Connect your repository to Vercel**
2. **Add environment variables** in Vercel dashboard
3. **Deploy**

### Manual Deployment

```bash
# Build for production
pnpm run build

# Start production server
pnpm start
```

## 📁 Project Structure

```
animachi/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   ├── community/         # Community pages
│   ├── profile/           # User profile pages
│   └── watchlist/         # Watchlist pages
├── components/            # Reusable UI components
│   ├── ui/               # shadcn/ui components
│   └── providers.tsx     # React providers
├── lib/                   # Utility libraries
│   ├── auth.ts           # NextAuth configuration
│   ├── supabase.ts       # Supabase client
│   └── utils.ts          # Helper functions
├── supabase/              # Database migrations
│   └── migrations/
├── types/                 # TypeScript type definitions
├── .env.local            # Environment variables
├── tailwind.config.ts    # Tailwind configuration
└── next.config.ts       # Next.js configuration
```

## 🔧 Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm test` - Run tests

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [AniList](https://anilist.co/) for anime data
- [Supabase](https://supabase.com/) for backend services
- [Next.js](https://nextjs.org/) for the framework
- [shadcn/ui](https://ui.shadcn.com/) for UI components

## 📞 Support

For support, email support@animachi.com or join our Discord community.

---

Built with ❤️ for anime fans worldwide
