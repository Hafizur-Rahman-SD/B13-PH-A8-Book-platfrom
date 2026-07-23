# BookBloom — Online Book Borrowing Platform

**Assignment Category:** category-A8-Mango

BookBloom is a modern online book borrowing platform built with Next.js, Tailwind CSS, DaisyUI, and BetterAuth. Users can browse books, sign in or register, view details, borrow titles, and manage their profiles.

## Live URL

- Local: [http://localhost:3000](http://localhost:3000)
- Production: _Add your Vercel/Render URL after deployment_

## Key Features

- Responsive layout for mobile, tablet, and desktop
- Home page with banner, marquee, featured books, and extra sections
- All Books page with search bar and category sidebar filter
- Private book details route (login required) with borrow action
- Private profile route with separate update information page
- Email/password registration and login with toast feedback
- Google OAuth social login (when credentials are configured)
- BetterAuth + MongoDB user storage
- Swiper.js carousel for new arrivals
- Books served via `/api/books` REST endpoints

## Tech Stack

- **Next.js 14** (App Router, JavaScript only)
- **Tailwind CSS** + **DaisyUI**
- **BetterAuth** with MongoDB adapter
- **MongoDB Atlas**
- **react-hot-toast**
- **Swiper.js**

## NPM Packages Used

| Package | Purpose |
|---------|---------|
| `next` | React framework |
| `react` / `react-dom` | UI library |
| `tailwindcss` | Utility-first CSS |
| `daisyui` | UI component library |
| `better-auth` | Authentication |
| `@better-auth/mongo-adapter` | MongoDB adapter for BetterAuth |
| `mongodb` | Database driver |
| `react-hot-toast` | Toast notifications |
| `swiper` | Book carousel |
| `@heroicons/react` | Icons |
| `@tailwindcss/typography` | Typography plugin |

## Environment Variables

Copy `.env.example` to `.env.local` and fill in your values:

```env
MONGODB_URI=your_mongodb_connection_string
BETTER_AUTH_URL=http://localhost:3000
BETTER_AUTH_SECRET=your_random_secret_key
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

> **Never commit `.env.local` to GitHub.** It is already listed in `.gitignore`.

### Google OAuth Setup

1. Create a project in [Google Cloud Console](https://console.cloud.google.com/)
2. Enable OAuth credentials
3. Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
4. For production, also add: `https://your-domain.com/api/auth/callback/google`
5. Paste `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` into `.env.local`

## Run Locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy (Vercel)

1. Push repo to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add all environment variables from `.env.local`
4. Set `BETTER_AUTH_URL` and `NEXT_PUBLIC_BETTER_AUTH_URL` to your production domain
5. Deploy

## Project Structure

```
src/
├── app/
│   ├── api/auth/[...all]/   # BetterAuth handler
│   ├── api/books/           # Books REST API
│   ├── books/               # All books + details pages
│   ├── login/               # Login page
│   ├── register/            # Register page
│   ├── profile/             # Profile + update routes
│   └── page.js              # Home page
├── components/              # Reusable UI components
├── data/books.js            # 12-book JSON dataset
└── lib/                     # Auth configuration
```

## Routes

| Route | Access | Description |
|-------|--------|-------------|
| `/` | Public | Home page |
| `/books` | Public | All books with search & filter |
| `/books/[id]` | Private | Book details & borrow |
| `/login` | Public | Login form |
| `/register` | Public | Registration form |
| `/profile` | Private | User profile |
| `/profile/update` | Private | Update name & photo |
yrjr
