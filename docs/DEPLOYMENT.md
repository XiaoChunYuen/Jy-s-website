# Deployment Guide

This project is a Vite + React portfolio site. It should be deployed as a static site.

## Recommended Platform

Use Cloudflare Pages.

## Build Settings

Set these values in Cloudflare Pages:

```text
Framework preset: Vite
Build command: npm run build
Build output directory: dist
Node.js version: 22
```

## Environment Variables

Add these variables in Cloudflare Pages > Settings > Environment variables:

```text
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Use the Supabase anon public key, not the service role key.

## Local Checks Before Deploying

Run:

```bash
npm run lint
npm run build
```

Optional production preview:

```bash
npm run preview
```

## SPA Routing

The `public/_redirects` file is required for direct access to routes such as `/services`, `/resume`, `/contact`, and `/project/:slug`.

Cloudflare Pages copies it into `dist/_redirects` during `npm run build`.

## Custom Domain

After the first deployment, add a custom domain in:

```text
Cloudflare Pages > Custom domains
```

Cloudflare will provide HTTPS automatically.
