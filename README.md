# STACKLY Food Truck

> **Tagline:** Big Flavours. Fresh Moves. Street Food Reimagined.  
> **Live GitHub Pages URL:** Compatible with direct root deployment.

---

## 🍔 Project Overview
**STACKLY Food Truck** is a modern, high-energy street food web application built purely with **HTML5, CSS3, and Vanilla JavaScript** (Zero backends / Zero server-side languages). The design embodies a contemporary urban street food culture, utilizing high-contrast charcoal aesthetics, warm food photography, playful typography, and buttery-smooth animations powered by **GSAP, ScrollTrigger, and Lenis**.

---

## 🎨 Brand Identity & Theme Palette
The design system strictly adheres to **exactly 3 brand colors**:

| Color | Hex | Role |
|---|---|---|
| **Charcoal Black** | `#171717` | Primary background, high-contrast dark sections, buttons |
| **Cream White** | `#F5F0E6` | Base page canvas background, crisp contrast cards |
| **Street Yellow** | `#F4B323` | Vibrant street food accent, CTAs, badges, highlights |

### Typography
- **Headings:** `'Bebas Neue'`, sans-serif — bold, condensed, urban street personality.
- **Body:** `'Poppins'`, sans-serif — modern, crisp, highly readable across mobile and desktop.
- **Special Labels:** `Poppins SemiBold`, uppercase with `letter-spacing: 2px`.

---

## 📱 Strict Mobile Responsiveness & Overflow Prevention
The entire codebase has been developed with horizontal overflow prevention (`overflow-x: hidden` with fluid clamp variables) and verified across key viewport breakpoints:
- `375px` (iPhone SE / compact mobile)
- `390px` (iPhone 12 / 13 / 14 / 15)
- `414px` (iPhone Plus / Pro Max)
- `768px` (iPad Portrait / tablets)
- `1024px` (iPad Landscape / laptops)
- `1280px` (Standard Desktop)
- `1440px` (High-res Desktop)
- `1920px` (Full HD / Ultra-wide)

---

## 📂 File & Folder Structure
```
food-truck-business/
│
├── index.html                # Home Page (Hero + 10 Detailed Content Sections)
├── menu.html                 # Menu Page (Hero + 8 Content Sections + Search & Filtering)
├── food-details.html         # Food Details & Nutrition Specifications
├── locations.html            # Locations Page (Hero + 8 Sections + Live Schedule & Map)
├── about.html                # About Page (Hero + 8 Sections + Origin Story & Philosophy)
├── contact.html              # Contact Page (Hero + 8 Sections + 4 Branch Offices & FAQ)
├── 404.html        # Event Booking & Live Catering Calculator
├── cart.html                 # Shopping Cart with LocalStorage sync
├── checkout.html             # Multi-step Express Checkout & Truck Selection
├── order-tracking.html       # Real-time Order Progress Timeline & Digital Passcode
├── login.html                # Role-based Login (Client / Admin) with validation
├── signup.html               # Registration Page with validation
├── 404.html                  # Custom 404 Error Page with GSAP floating animation
│
├── AdminDashboard.html       # Admin Operations Console (Chart.js + KPI Counters)
├── ClientDashboard.html      # Client Customer Hub (Tracking, Reorder, Bookings)
│
├── css/
│   ├── style.css             # Core design tokens, global resets, navbar, footer
│   ├── responsive.css        # Breakpoint rules (375px to 1920px) & overflow fixes
│   ├── animations.css        # Keyframes, GSAP helper classes, floating food
│   ├── menu.css              # Category tabs, filter search bar, dish cards
│   ├── food-details.css      # Image gallery, portion selector, nutrition grid
│   ├── locations.css         # Interactive map pins, schedule table, stops cards
│   ├── contact.css           # Contact info, branch offices grid, FAQ accordion
│   ├── booking.css           # Event packages, guest count slider, live quote
│   ├── cart.css              # Cart item rows, promo discounts, subtotal
│   ├── checkout.css          # Multi-step checkout, truck radio selection
│   └── dashboard.css         # Charcoal dashboard sidebar, cream panels, tables
│
├── js/
│   ├── main.js               # Global menu catalogue, LocalStorage cart manager, toasts
│   ├── navigation.js         # Sticky transparent-to-charcoal header, mobile drawer
│   ├── lenis.js              # Lenis smooth scroll synced with GSAP ScrollTrigger
│   ├── animations.js         # GSAP hero reveals, scroll trigger staggers
│   ├── menu.js               # Category filter, debounced search, dietary filters
│   ├── food-details.js       # Dish data binding, portion selection, quantity
│   ├── cart.js               # Cart table render, promo code engine, totals
│   ├── checkout.js           # Form validation, active order persistence
│   ├── locations.js          # Day schedule highlight, interactive pin pings
│   ├── booking.js            # Live guest count calculation, quotation generator
│   ├── validation.js         # Client-side email/phone validation routines
│   ├── auth.js               # Role-based redirection (Admin vs Client)
│   ├── admin-dashboard.js    # Chart.js charts, animated KPI counter numbers
│   └── client-dashboard.js   # Customer orders, quick reorder, support tickets
│
├── assets/
│   ├── Brand-logo.webp       # Lossless WebP brand logo
│   └── images/
│       ├── hero/             # Hero banners (all WebP, 70-90 KB)
│       ├── burgers/          # Smash burger photos (WebP, 70-90 KB)
│       ├── wraps/            # Artisan wraps photos (WebP, 70-90 KB)
│       ├── sides/            # Loaded fries & snacks (WebP, 70-90 KB)
│       ├── drinks/           # Shakes & craft coolers (WebP, 70-90 KB)
│       ├── combos/           # Meal bundle boxes (WebP, 70-90 KB)
│       ├── food-truck/       # Mobile kitchen units (WebP, 70-90 KB)
│       ├── events/           # Festival catering photos (WebP, 70-90 KB)
│       ├── team/             # Founder chef portraits (WebP, 70-90 KB)
│       └── gallery/          # Kitchen grill action (WebP, 70-90 KB)
│
└── README.md
```

---

## ⚡ Image Optimization Verification
Every single photograph and visual asset has been formatted exclusively as **WEBP** with file weights strictly tuned to the **70 KB to 90 KB** window for optimal mobile page load speed and GitHub Pages delivery:
- `Brand-logo.webp`: ~78 KB
- `hero-*.webp`: 72–80 KB
- `burgers/*.webp`: 80–87 KB
- `wraps/*.webp`: 72–84 KB
- `sides/*.webp`: 72–87 KB
- `drinks/*.webp`: 72–82 KB
- `combos/*.webp`: 75–82 KB

---

## 🔐 Authentication & Role-Based Flow
- **Login (`login.html`)**: Select "Client" or "Admin" in `Login As`.
  - Choosing **Admin** redirects to `AdminDashboard.html`.
  - Choosing **Client** redirects to `ClientDashboard.html`.
  - User can enter any valid email and password format.
- **Signup (`signup.html`)**: Validates full name, email, role selection and password before redirecting to `login.html`.
- **Top-left Navigation**: Includes direct `← Back to Home` on both Auth pages.

---

## 🚀 GitHub Pages Deployment Guide
1. Push this entire project repository to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial STACKLY Food Truck commit"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```
2. In GitHub, navigate to **Settings** > **Pages**.
3. Under **Build and deployment** > **Source**, choose **Deploy from a branch**.
4. Select `main` branch and `/ (root)` folder. Click **Save**.
5. Your website will be live in 1–2 minutes!

