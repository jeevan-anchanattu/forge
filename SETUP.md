# GitHub Pages Deployment — Setup Guide

## Overview

This project is configured to automatically build and deploy to **GitHub Pages** on every push to the `dev` branch.

Live dev URL: **https://jeevan-anchanattu.github.io/forge/**

---

## One-Time Setup (Do This Once)

### 1. Enable GitHub Pages in Repo Settings

1. Go to → **https://github.com/jeevan-anchanattu/forge/settings/pages**
2. Under **Build and deployment**:
   - Source: `Deploy from a branch`
   - Branch: `gh-pages` / `/ (root)`
3. Click **Save**

> The `gh-pages` branch is created automatically by the GitHub Actions workflow on the first successful deploy.

### 2. Create and Push the `dev` Branch

```bash
git checkout -b dev
git push -u origin dev
```

### 3. Trigger the First Deploy

Any push to `dev` will trigger the pipeline. You can also push an empty commit:

```bash
git commit --allow-empty -m "ci: trigger initial deploy"
git push
```

---

## How the Pipeline Works

```
Push to dev
     │
     ▼
GitHub Actions (.github/workflows/deploy-pages.yml)
     │
     ├─ npm ci                  (install dependencies)
     ├─ npm run build           (vite build with base='/forge/')
     │
     ▼
dist/ deployed → gh-pages branch → GitHub Pages CDN
     │
     ▼
https://jeevan-anchanattu.github.io/forge/
```

The build uses `VITE_MOCK_API=true` so the app runs on mock data — no backend needed.

---

## Adding Firebase Backend Later

When you're ready to connect Firebase:

1. Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
2. Add Firebase credentials as **GitHub Secrets** in your repo:
   - `VITE_FIREBASE_API_KEY`
   - `VITE_FIREBASE_AUTH_DOMAIN`
   - `VITE_FIREBASE_PROJECT_ID`
3. Set `VITE_MOCK_API=false` in the workflow env block
4. Update `src/shared/api/index.ts` to call Firebase instead of mock handlers

---

## Adding a Production (`main` branch) Deploy Later

When you're ready for a production environment:

1. Add a second job (or a separate workflow) that triggers on `push: branches: [main]`
2. Point it to a different hosting URL (e.g. Vercel, Firebase Hosting, or a second GitHub Pages repo)
3. Use different `VITE_*` env vars for production vs dev

---

## Local Development

Local dev is unaffected — `npm run dev` still runs on `http://localhost:3000` with the base path set to `/`.
