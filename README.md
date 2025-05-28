# KLIQT Media Website

A modern, AI-powered content and freelancer platform built with Next.js 14, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Modern Design**: Dark theme with neon accents and smooth animations
- **Responsive**: Mobile-first design that works on all devices
- **AI-Powered**: Integration ready for AI content generation and automation
- **Freelancer Platform**: Built-in portal for freelancers and clients
- **Performance Optimized**: Fast loading with Next.js 14 App Router
- **TypeScript**: Full type safety throughout the application
- **Tailwind CSS**: Utility-first CSS framework with custom KLIQT theme

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom theme
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Database**: Supabase (ready for integration)
- **Deployment**: Vercel/GitHub Pages ready

## 🎨 Design System

### Colors
- **Primary**: `#8AFF00` (Neon Green)
- **Secondary**: `#FF008F` (Hot Pink)
- **Dark**: `#0f0f0f` (Deep Black)
- **Gray**: `#1c1c1c` (Dark Gray)

### Components
- **Buttons**: `.kliqt-btn-primary`, `.kliqt-btn-secondary`
- **Cards**: `.kliqt-card` with hover effects
- **Text**: `.neon-text` for gradient text effects
- **Animations**: Custom keyframes for glow and fade effects

## 📁 Project Structure

```
kliqt-media-website/
├── src/
│   ├── app/
│   │   ├── globals.css          # Global styles and Tailwind
│   │   ├── layout.tsx           # Root layout
│   │   ├── page.tsx             # Homepage
│   │   ├── pricing/
│   │   │   └── page.tsx         # Pricing page
│   │   └── portal/
│   │       └── page.tsx         # Login/Portal page
│   └── components/              # Reusable components (to be added)
├── public/                      # Static assets
├── tailwind.config.ts           # Tailwind configuration
├── tsconfig.json               # TypeScript configuration
└── package.json                # Dependencies
```

## 🚀 Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run development server**:
   ```bash
   npm run dev
   ```

3. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📄 Pages

### Homepage (`/`)
- Hero section with animated elements
- Services showcase (AI Content, Freelancer Network, Agent Platforms)
- Statistics section
- Call-to-action sections

### Pricing (`/pricing`)
- Comprehensive service pricing
- Interactive pricing cards
- Service categories:
  - Website Design & Hosting
  - Mobile App Development
  - AI Automation & Integration
  - Graphic Design & Branding
  - Social Media Marketing
  - LinkedIn & Portfolio Builds

### Portal (`/portal`)
- Authentication forms (Login/Register)
- Role selection (Freelancer/Client)
- Demo access buttons
- Dashboard preview cards

## 🎯 Key Features

### Animations
- Smooth page transitions with Framer Motion
- Hover effects on interactive elements
- Scroll-triggered animations
- Custom glow effects for KLIQT branding

### Responsive Design
- Mobile-first approach
- Breakpoint-specific layouts
- Touch-friendly interactions
- Optimized for all screen sizes

### Performance
- Next.js 14 App Router for optimal performance
- Image optimization ready
- Code splitting and lazy loading
- SEO optimized with metadata

## 🔧 Development

### Adding New Pages
1. Create a new folder in `src/app/`
2. Add a `page.tsx` file
3. Follow the existing pattern for layout and styling

### Custom Components
- Use the established design system
- Follow the `.kliqt-*` naming convention
- Include hover states and animations
- Ensure mobile responsiveness

### Styling Guidelines
- Use Tailwind utility classes
- Leverage custom KLIQT theme colors
- Include dark mode considerations
- Add smooth transitions for interactions

## 🚀 Deployment

### GitHub Pages
The project is configured for easy deployment to GitHub Pages:

```bash
npm run build
npm run export  # If using static export
```

### Vercel
Deploy directly from GitHub repository for automatic deployments.

## 📝 Environment Variables

Create a `.env.local` file for environment-specific variables:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For support and questions:
- Email: support@kliqtmedia.co.uk
- Website: [kliqtmedia.co.uk](https://kliqtmedia.co.uk)

## 📄 License

© 2025 KLIQT Media. All rights reserved.