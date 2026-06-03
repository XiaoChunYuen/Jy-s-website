# Portfolio Page Visual Upgrade Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the resume, services, and contact pages feel more complete by simplifying the resume page, adding editable image support for services/contact, and redesigning the frontend sections.

**Architecture:** Reuse existing Supabase `site_settings` for page-level images so no database schema migration is required. Keep service rows in the existing `services` table, but render them in a richer editorial layout. Contact methods remain in `social_links`, with page image and copy/open behavior on the frontend.

**Tech Stack:** React, TypeScript, Vite, Tailwind CSS utilities, Framer Motion, Supabase Storage and `site_settings`.

---

### Task 1: Extend CMS Content Fields

**Files:**
- Modify: `src/cms/defaults.ts`
- Modify: `src/cms/CMSContext.tsx`

- [ ] Add `servicesFeatureImage` and `contactFeatureImage` to `CMSContent`.
- [ ] Add default `services_feature_image` and `contact_feature_image` settings.
- [ ] Map those settings into `content` inside `CMSContext`.

### Task 2: Add Admin Image Uploads

**Files:**
- Modify: `src/cms/AdminDashboard.tsx`

- [ ] Add services page image state, hidden file input, upload handler, preview, and save through `site_settings`.
- [ ] Add contact page image state, hidden file input, upload handler, preview, and save through `site_settings`.
- [ ] Keep existing service/contact table saves unchanged.

### Task 3: Redesign Services Page

**Files:**
- Modify: `src/pages/Services.tsx`

- [ ] Reduce empty header height and add a feature image panel when configured.
- [ ] Render services as editorial alternating image/text blocks using the page image as the visual companion.
- [ ] Keep fallback content and CTA section working.

### Task 4: Redesign Contact Page

**Files:**
- Modify: `src/pages/Contact.tsx`

- [ ] Reduce empty header height and create a two-column contact composition.
- [ ] Show uploaded contact image when available.
- [ ] Keep copy buttons and optional open buttons for valid links.
- [ ] Add clipboard fallback for stricter browsers.

### Task 5: Simplify Resume Title

**Files:**
- Modify: `src/pages/Resume.tsx`
- Modify: `src/cms/defaults.ts`

- [ ] Use “个人简历” / “Resume” as default page title.
- [ ] Avoid showing the old “经历与教育” title when no custom title is configured.

### Task 6: Verify and Publish

**Commands:**
- `npm run lint`
- `npm run build`
- `git status --short`
- `git commit -m "Improve services and contact pages"`
- `git push origin main`
