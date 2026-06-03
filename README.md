# luisdiazgranados.com

Personal portfolio and blog for Luis Diaz Granados — computer engineer, Purdue alum.

## Stack

- **Framework:** Next.js 16 (App Router, Turbopack)
- **Styling:** Tailwind CSS 4
- **Font:** Authentic Sans
- **Blog:** Substack RSS integration with server-side fetching
- **ASCII art:** figlet for dynamic post title generation

## Features

- Interactive ASCII paint background on desktop (homepage)
- Glassmorphic hover previews for projects with video/image media
- Mobile-responsive layout with tap-to-expand project cards
- Blog page pulls posts from Substack RSS, auto-revalidates every hour
- Post titles rendered as ASCII art cycling through 12 different fonts
- HTML content sanitized server-side with DOMPurify
- Console easter egg

## Development

```bash
npm install
npm run dev
```

## Project Structure

```
app/
  page.tsx              # Homepage
  layout.tsx            # Root layout
  globals.css           # Global styles + article prose
  blog/
    page.tsx            # Blog listing (server component, RSS fetch)
    BlogContent.tsx     # Blog listing UI (client component)
    substack.ts         # Substack RSS fetcher + sanitizer
    [slug]/
      page.tsx          # Individual post (server component)
      PostContent.tsx   # Post UI (client component)
components/
  background/
    AsciiPaintBackground.tsx
  ConsoleMessage.tsx
```
