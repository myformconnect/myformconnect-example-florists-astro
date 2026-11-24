# Bloom & Beyond Studio – MyFormConnect Demo Website

A demonstration website built with **Astro**, **TypeScript**, and **Vanilla CSS** showcasing how an independent luxury floral design studio integrates **MyFormConnect** / **MyFormCapture** to capture high-value customer enquiries and wedding consultations without missing leads.

---

## 🌸 Form Integration Architecture (per `MYFORMCONNECT_LLM_GUIDE.txt`)

This project strictly follows the **MyFormConnect (MFC) LLM System Prompt & Code Generation Specification (v2.0)**:

### 1. Interactive Scheduling Booking Widget (`src/components/BookingWidget.astro`)
The booking widget uses the exact container structure and hosted asset integration pattern specified in Section [3] of the guide:

```html
<link rel="stylesheet" href="/booking-widget.css" />

<div
  id="mfc-booking-widget"
  data-booking-widget=""
  data-form-uuid="95cb0e2f-9a02-4b30-ab68-5aeb9e1220a7"
  data-api-base="https://myformcapture.com"
  data-submit-url="https://myformcapture.com/f/95cb0e2f-9a02-4b30-ab68-5aeb9e1220a7"
  data-slots-url="https://myformcapture.com/f/95cb0e2f-9a02-4b30-ab68-5aeb9e1220a7/slots"
  data-meeting-title="Wedding & Event Floral Consultation"
  data-meeting-description="30-minute consultation with our floral design team"
  data-meeting-duration="30"
  data-branding-name="MyFormConnect"
  data-branding-url="https://myformcapture.com"
>
  ...
</div>

<script src="/booking-widget.js" defer></script>
```

- **Dedicated Action URL**: `https://myformcapture.com/f/95cb0e2f-9a02-4b30-ab68-5aeb9e1220a7`
- **Dedicated Slots URL**: `https://myformcapture.com/f/95cb0e2f-9a02-4b30-ab68-5aeb9e1220a7/slots`
- **Hosted Assets**: Downloaded into `public/booking-widget.css` and `public/booking-widget.js` for local asset serving and offline resilience.
- **Dynamic Route & Mount Support**: Triggers `DOMContentLoaded` and `turbo:render` events upon hydration.
- **Graceful Fallback**: Includes a `<noscript>` consultation form that submits directly to the booking endpoint.

---

### 2. General Enquiry Forms (`src/components/EnquiryForm.astro`)
All non-booking forms (Home & Contact pages) use a **distinct form action URL** and strictly follow the **6 Golden Rules**:

- **Distinct Action URL**: `https://myformcapture.com/f/5ddb4177-17cc-4600-9af9-39be97a71ee5`
- **Rule 1 (FormData)**: Serialized via `new FormData(form)` — never `JSON.stringify()`.
- **Rule 2 (No Manual Content-Type)**: `Content-Type` is explicitly omitted from headers to let the browser compute the multipart boundary.
- **Rule 3 (AJAX Headers)**: Includes `'Accept': 'application/json'` and `'X-Requested-With': 'XMLHttpRequest'`.
- **Rule 4 (Name Attributes)**: Every form element (`name`, `email`, `phone`, `enquiry_type`, `event_date`, `budget`, `message`) has a descriptive `name` attribute.
- **Rule 5 (Prevent Default)**: Submissions call `e.preventDefault()` with interactive loading, success, and error states.
- **Rule 6 (Honeypot Spam Field)**: Includes `<input type="text" name="_gotcha" style="display:none;" tabindex="-1" autocomplete="off" />`.

---

## 🔗 Quick Form Setup & Direct Form Actions

You can configure or change form endpoints in **three straightforward ways** (full URL or bare UUID):

### Option 1: Directly inside the component file
Each form component defines its direct action URL right at the top of its file:
- **Booking Widget** ([src/components/BookingWidget.astro](file:///d:/Work2/myformconnect-example-florists-astro/src/components/BookingWidget.astro#L7)):
  ```typescript
  const DIRECT_BOOKING_ACTION_URL = 'https://myformcapture.com/f/95cb0e2f-9a02-4b30-ab68-5aeb9e1220a7';
  // Or just: '95cb0e2f-9a02-4b30-ab68-5aeb9e1220a7'
  ```
- **General Enquiry Form** ([src/components/EnquiryForm.astro](file:///d:/Work2/myformconnect-example-florists-astro/src/components/EnquiryForm.astro#L7)):
  ```typescript
  const DIRECT_ENQUIRY_ACTION_URL = 'https://myformcapture.com/f/5ddb4177-17cc-4600-9af9-39be97a71ee5';
  // Or just: '5ddb4177-17cc-4600-9af9-39be97a71ee5'
  ```

### Option 2: Directly on the component tag in page files
You can pass the direct URL or UUID as a prop wherever the component is rendered:
- **Home page (`src/pages/index.astro`)**:
  ```astro
  <EnquiryForm formId="home-enquiry-form" actionUrl="https://myformcapture.com/f/5ddb4177-17cc-4600-9af9-39be97a71ee5" />
  ```
- **Contact page (`src/pages/contact.astro`)**:
  ```astro
  <EnquiryForm formId="contact-enquiry-form" actionUrl="https://myformcapture.com/f/5ddb4177-17cc-4600-9af9-39be97a71ee5" />
  <BookingWidget actionUrl="https://myformcapture.com/f/95cb0e2f-9a02-4b30-ab68-5aeb9e1220a7" />
  ```

### Option 3: In the central config file (`src/config/forms.ts`)
```typescript
export const FORMS = {
  GENERAL_ENQUIRY: 'https://myformcapture.com/f/5ddb4177-17cc-4600-9af9-39be97a71ee5',
  BOOKING_WIDGET: 'https://myformcapture.com/f/95cb0e2f-9a02-4b30-ab68-5aeb9e1220a7',
} as const;
```

---

## 🔗 Form Actions Summary

| Component | Form Action URL | UUID | Guide Format |
|-----------|-----------------|------|--------------|
| **Booking Widget** (`#booking`) | `https://myformcapture.com/f/95cb0e2f-9a02-4b30-ab68-5aeb9e1220a7` | `95cb0e2f-9a02-4b30-ab68-5aeb9e1220a7` | `#mfc-booking-widget` container with `data-*` attributes |
| **General Enquiry Form** | `https://myformcapture.com/f/5ddb4177-17cc-4600-9af9-39be97a71ee5` | `5ddb4177-17cc-4600-9af9-39be97a71ee5` | 6 Golden Rules (`FormData`, AJAX headers, honeypot) |

---

## 📁 Project Structure

```text
myformconnect-example-florists-astro/
├── public/
│   ├── booking-widget.css      # Local copy of MFC booking widget styles
│   ├── booking-widget.js       # Local runtime script for MFC booking widget
│   ├── favicon.svg
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── components/
│   │   ├── Header.astro        # Sticky header with mobile navigation & booking CTA
│   │   ├── Footer.astro        # Brand info, service links, fictional demo details
│   │   ├── EnquiryForm.astro   # Standard enquiry form adhering to 6 Golden Rules
│   │   ├── BookingWidget.astro # Interactive scheduling widget per MFC LLM Guide spec
│   │   ├── SectionHeading.astro# Editorial section title component
│   │   ├── ServiceCard.astro   # Service card with feature list & action link
│   │   └── FloralGallery.astro # Responsive visual mosaic gallery
│   ├── config/
│   │   └── forms.ts            # Centralized MyFormCapture URLs & studio demo metadata
│   ├── layouts/
│   │   └── MainLayout.astro    # HTML shell, fonts, SEO tags, LocalBusiness schema
│   ├── pages/
│   │   ├── index.astro         # Home (Hero, Intro, 6 Services, Weddings, Gallery, Process, Form)
│   │   ├── about.astro         # About Us (Story, Philosophy, Studio workspace, Approach)
│   │   ├── services.astro      # Detailed 6 floral design services & differentiators
│   │   └── contact.astro       # Contact & Consultation booking (#booking)
│   └── styles/
│       └── global.css          # Typography, custom properties, form styling & responsive rules
├── MYFORMCONNECT_LLM_GUIDE.txt # Official integration specification guide
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:4321](http://localhost:4321) in your browser.

### 3. Build for Production (SSG)
```bash
npm run build
```
Production static output is generated in `./dist`.
