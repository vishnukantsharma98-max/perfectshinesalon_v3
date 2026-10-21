# Perfect Shine Unisex Salon — Luxury "Soft Rose & Pearl" Visual Overhaul & New Pages

An end-to-end transformation of the salon web application into the ultra-premium "Soft Rose & Pearl" aesthetic shown in the reference designs, featuring new Gallery and About pages, a reusable interactive Frequently Asked Questions (FAQ) accordion for Home and Contact pages, and high-fidelity visual styling while strictly preserving all booking logic and mobile cart workflows.

## User Review & Critical Decisions

> [!IMPORTANT]
> The following key decisions have been confirmed and will guide the build:

- **Confirmed Salon Branding**: Standardized across the entire application as **PERFECT SHINE UNISEX SALON** with the refined gold/rose "PS" crest monogram logo.
- **Confirmed Visual Assets**: Utilizing high-resolution crops from your uploaded reference mockups combined with curated luxury beauty and salon interior imagery.
- **Confirmed FAQ Placement**: An interactive accordion component addressing common client inquiries (timings, appointments, walk-ins, payment methods, and cancellation policies) will be integrated into both the **Home Page** and the **Contact Page**.
- **Critical Inviolable Constraints**:
  - `BookingContext`, price calculation utilities, and WhatsApp dispatch logic remain 100% untouched.
  - Mobile service selection flow (Add to Booking buttons, drawer/sheet counter, and sticky bottom cart) remains intact.
  - All Framer Motion page transition variants and scroll reveal animations remain fully preserved.

---

## 1. Overview & Core Concept

- **What It Does**: Provides an editorial, magazine-grade web presence for Perfect Shine Unisex Salon. Visitors can explore popular services, browse salon interiors and transformation galleries, read the salon's heritage and meet the team, get immediate answers through an interactive FAQ accordion, and seamlessly book appointments directly or via WhatsApp.
- **Target Audience**: Discerning salon clients in search of premium hair styling, bridal makeup, skincare, nail artistry, and unisex grooming in an inviting, hygienic luxury sanctuary.
- **Key Value**: Delivers an opulent, high-trust digital storefront that matches the physical salon experience, driving conversions through clear pricing, social proof, and one-tap booking.

---

## 2. User Experience & Visual Design

### Visual Identity & Theme
- **Color Palette**:
  - Dominant Canvas: Crisp clean white (`#FFFFFF`) with warm paper tones.
  - Accent Atmosphere: Soft blush and rose-petal washes (`bg-rose-50/50`, `bg-[#FFF1F2]`, `border-rose-100`).
  - Brand Primary Accent: Vivid salon magenta/rose (`#D61C4E`, `hover:bg-[#B81541]`).
  - Text & Structural Contrast: Deep charcoal `#18181B` for readability and `#71717A` for muted metadata.
  - Luxury Foil Accents: Warm champagne and soft gold border details.
- **Typography & Scale**:
  - Display & Headings: `Cormorant Garamond` (and `Playfair Display`), italicized editorial accents, refined letter-spacing, and `text-wrap: balance`.
  - Body & UI Controls: `Plus Jakarta Sans`, clean, crisp, with `font-medium` for buttons and navigation links.
  - Tabular Figures: `tabular-nums` for all pricing (e.g., `₹799`, `₹2,499`) and durations (`60 min`).
- **UI Elements & Spatial Math**:
  - Soft pill-shaped primary action buttons (`rounded-full px-6 py-3`).
  - Large organic rounded container corners (`rounded-3xl` and `rounded-2xl`).
  - Subtle floral petal corner motifs and curved aesthetic SVG background contours.

### Key Pages & User Flows

1. **Global Navigation & Top Bar**:
   - Single-line top bar with brand PS monogram, wordmark, 5 nav links (`Home`, `Services`, `Gallery`, `About`, `Contact`), bag badge with live selected count, and "Book Now" CTA pill.
   - Mobile bottom bar with smooth Framer Motion active dot indicator and quick access to all key sections.

2. **Home Page**:
   - **Hero Section**: Left-side Serif headline ("Your Beauty. Our Expertise.") with subtext, dual CTAs ("Book a Service", "Watch Our Story"), and a trust stack ("10,000+ Happy Customers"). Right-side organic curved overlapping salon blowout model portrait.
   - **Features Strip**: 4 icon badges: *Professional Stylists*, *Hygienic & Safe*, *Premium Products*, *Unisex Services*.
   - **Services Rail**: Visual horizontal category cards (Hair Cut, Hair Wash, Colour, Treatment, Makeup, Nails, Men's Grooming, Spa & Massage).
   - **Popular Services Grid**: Polished cards with category tag, name, duration, price, and "Add to Booking ->" action.
   - **Ambience Section**: "A Place to Relax & Rejuvenate" featuring overlapping circular & rounded interior photos and blush background sweep.
   - **Why Choose Us Section**: Value propositions paired with beauty model portrait.
   - **Promotional Banner**: "Get 20% Off on Your First Visit" coupon card (`SHINE20`).
   - **Gallery Teaser**: 6-photo preview linking to the dedicated Gallery page.
   - **Google Reviews & Testimonials**: Verified customer cards with star ratings.
   - **Interactive FAQ Accordion**: 8 expand/collapse questions answering booking, timing, and pricing inquiries.
   - **Conversion CTA Banner**: Direct WhatsApp concierge and online appointment booking.

3. **Services Page (Desktop & Mobile)**:
   - Category filtering rail (Hair, Skin, Makeup, Nails, Men, Spa).
   - Polished responsive grid cards matching the reference aesthetic with clean white backgrounds, high-clarity square photography, duration, price in tabular numerals, and vibrant pink CTA.
   - Retains 100% of the mobile cart sheet, service customization modals, and WhatsApp dispatch.

4. **Gallery Page (NEW)**:
   - Category filter tabs (*All*, *Salon Ambience*, *Hair Transformations*, *Makeup Looks*, *Nail Art*, *Men's Grooming*, *Spa & Massage*).
   - Interactive **Before & After Transformation Slider** (drag-to-compare smooth slider component).
   - High-resolution showcase grid displaying the salon's reception, styling stations, and completed client styles.
   - Virtual tour banner with video trigger and stats counter.

5. **About Page (NEW)**:
   - "Beauty is a Feeling. And You Are It." hero statement.
   - "Our Journey: From a Dream to Your Favourite Salon" story section with 3 salon photos and value pillars (*Quality First*, *Customer Focused*, *Modern & Trendy*).
   - Mission & Vision dual cards.
   - "Meet Our Expert Team" grid featuring stylist portraits (Aarti Sharma, Rohan Verma, Neha Kapoor, Pooja Singh, Vikram Mehta) with specialties and social icons.
   - "Our Trusted Brands" partner logos (L'Oréal, Wella, Schwarzkopf, Streax, O.P.I, Lotus).

6. **Contact Page**:
   - Quick-action contact cards: *Call Us*, *WhatsApp*, *Email Us*, *Visit Us*.
   - Two-column location section: Interactive map view card on the left, physical salon facade and facility amenities on the right.
   - "Send Us a Message" inquiry form with instant validation and direct WhatsApp/email dispatch.
   - Dedicated Frequently Asked Questions accordion section with "Still Have a Question?" help card.

7. **Multi-Column Floral Footer**:
   - Brand column with PS logo, tagline, and social media icons.
   - Quick Links, Our Services list, Contact Information, and Business Operating Hours.
   - Subtle bottom copyright with heart credit.

---

## 3. Key Product Decisions & Trade-Offs

- **Preservation of Booking Logic**:
  - *Chosen Approach*: Keep `BookingContext` and all pricing/cart calculation routines intact while extending `activePage` to include `'gallery'` and `'about'`.
  - *Why*: Guarantees zero regression in appointment creation, cart persistence, or WhatsApp message construction.
- **Dedicated Reusable `FAQSection` Component**:
  - *Chosen Approach*: Build a modular accordion component with categories, search filtering, and animated expand/collapse states using Framer Motion.
  - *Why*: Allows seamless inclusion on both the Home Page and Contact Page with consistent styling and single-source-of-truth FAQ data.
- **Interactive Before & After Slider**:
  - *Chosen Approach*: Implement a zero-dependency HTML5/CSS touch-friendly drag slider for hair and makeup transformations.
  - *Why*: Matches the reference gallery design directly and gives prospective clients engaging visual proof of stylist expertise.

---

## 4. Technical Architecture & Data Strategy

```
┌────────────────────────────────────────────────────────────────────────┐
│                                App.tsx                                 │
│  ThemeProvider ── BookingProvider (Active Page State & Cart Store)    │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
    ┌───────────────────────────────┴───────────────────────────────┐
    │                                                               │
┌───▼──────────────────────┐                            ┌───────────▼─────────────────────┐
│    TopNavigationHeader   │                            │       MobileBottomBar           │
│ [PS Logo | Nav | Bag CTA]│                            │ [Home|Services|Gallery|About|...]│
└───┬──────────────────────┘                            └───────────┬─────────────────────┘
    │                                                               │
    └───────────────────────────────┬───────────────────────────────┘
                                    │
                    ┌───────────────▼──────────────┐
                    │    AnimatePresence (Router)  │
                    └───────┬───────────────┬──────┘
                            │               │
       ┌────────────────────┼───────────────┼───────────────────┐
       │                    │               │                   │
┌──────▼──────┐      ┌──────▼──────┐ ┌──────▼──────┐     ┌──────▼──────┐
│  HomePage   │      │ServicesPage │ │ GalleryPage │     │  AboutPage  │
│ - Hero      │      │(EnrichBook) │ │ - Before/   │     │ - Journey   │
│ - Ambience  │      │ - Catalog   │ │   After     │     │ - Team      │
│ - FAQSection│      │ - Cart/Flow │ │ - Ambience  │     │ - Brands    │
└──────┬──────┘      └──────┬──────┘ └──────┬──────┘     └──────┬──────┘
       │                    │               │                   │
       └────────────────────┼───────────────┴───────────────────┘
                            │
              ┌─────────────▼─────────────┐
              │        ContactPage        │
              │ - Map & Amenities         │
              │ - Contact Form            │
              │ - FAQSection              │
              └─────────────┬─────────────┘
                            │
┌───────────────────────────▼────────────────────────────────────────────┐
│                             Footer                                     │
│  [PS Logo & Social | Quick Links | Services | Contact & Hours]         │
└────────────────────────────────────────────────────────────────────────┘
```

### Component & State Plan
- `src/types/faq.ts`: FAQ data structure (id, question, answer, category).
- `src/data/faqs.ts`: Comprehensive salon FAQs matching client inquiries.
- `src/components/common/FAQSection.tsx`: Reusable accordion component with smooth animated disclosure.
- `src/components/gallery/BeforeAfterSlider.tsx`: Interactive split-image comparison slider.
- `src/components/gallery/GalleryPage.tsx`: Full-fledged Gallery view with category tabs.
- `src/components/about/AboutPage.tsx`: Full About page with journey timeline, team portraits, and brand badges.
- `src/components/home/HomePage.tsx`: Complete overhaul matching reference image with curved hero, features row, ambience section, popular services, and FAQ accordion.
- `src/components/contact/ContactPage.tsx`: Upgraded side-by-side location card, form, and FAQ accordion.
- `src/components/navigation/TopNavigationHeader.tsx` & `MobileBottomBar.tsx`: Updated routes and visual styling.
- `src/components/footer/Footer.tsx`: Multi-column luxury floral footer.

---

## Verification Plan

### Automated Build & Syntax Checks
1. Compile the application using `compile_applet` to ensure zero TypeScript errors or missing imports.
2. Run `lint_applet` to verify code quality and rule compliance.

### Manual & Interactive Verification
1. **Navigation Flow**: Switch between Home, Services, Gallery, About, and Contact across desktop and mobile viewport sizes.
2. **Booking & Cart Logic**: Add services to cart, adjust options, verify price computation in INR, open cart drawer/sheet, and test WhatsApp booking generation.
3. **FAQ Accordion**: Click accordion questions on both Home and Contact pages to verify smooth expansion, collapse, and multi-open stability.
4. **Before & After Slider**: Drag the comparison handle on the Gallery page to test touch and mouse responsiveness.
