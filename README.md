# Bloom & Beyond Studio

A premium florist studio website built with **Astro (SSG)**, **TypeScript**, and **Vanilla CSS**. Features integrated customer enquiry forms and an interactive consultation booking calendar powered by **MyFormConnect** / **MyFormCapture**.

---

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Run local dev server (http://localhost:4321)
npm run dev

# 3. Build for production (output in ./dist)
npm run build
```

---

## 📝 Form Action Configuration

You can update form endpoints easily by pasting either your **full action URL** or just the **form UUID**.

### Option 1: In `src/config/forms.ts` (Recommended)
Edit endpoints in one central place:

```typescript
export const FORMS = {
  // General Enquiry Form (Home & Contact pages)
  GENERAL_ENQUIRY: 'https://myformcapture.com/f/5ddb4177-17cc-4600-9af9-39be97a71ee5',

  // Consultation Booking Widget (/contact#booking)
  BOOKING_WIDGET: 'https://myformcapture.com/f/95cb0e2f-9a02-4b30-ab68-5aeb9e1220a7',
} as const;
```
*(You can also paste just the bare UUID like `'95cb0e2f-9a02-4b30-ab68-5aeb9e1220a7'`)*

### Option 2: Directly in Component Files
Each form component also defines its direct action URL at the top of the file:
- **`src/components/EnquiryForm.astro`**: `DIRECT_ENQUIRY_ACTION_URL`
- **`src/components/BookingWidget.astro`**: `DIRECT_BOOKING_ACTION_URL`

### Option 3: Via Component Props
Override endpoints directly where the component is rendered:

```astro
<EnquiryForm actionUrl="https://myformcapture.com/f/YOUR-UUID" />
<BookingWidget actionUrl="https://myformcapture.com/f/YOUR-UUID" />
```

---

## 📁 Project Structure

```text
├── public/
│   ├── images/               # Service & gallery images
│   ├── booking-widget.css    # Booking calendar styles
│   └── booking-widget.js     # Booking calendar script
├── src/
│   ├── components/           # Reusable UI & form components
│   │   ├── BookingWidget.astro
│   │   ├── EnquiryForm.astro
│   │   ├── FloralGallery.astro
│   │   ├── Header.astro
│   │   └── Footer.astro
│   ├── config/
│   │   └── forms.ts          # Form endpoints & site info
│   ├── layouts/
│   │   └── MainLayout.astro  # HTML shell, fonts, SEO metadata
│   ├── pages/
│   │   ├── index.astro       # Home page
│   │   ├── about.astro       # About studio page
│   │   ├── services.astro    # Services page
│   │   └── contact.astro     # Contact & booking page
│   └── styles/
│       └── global.css        # Design tokens & global CSS
└── astro.config.mjs
```
