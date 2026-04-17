# SpacesByTWC — Deployment Guide

## Overview
- **App**: spacesbytw c (Space diagnosis + consultation booking)
- **Stack**: React 18 + Vite + Vercel Serverless Functions
- **Backend**: Google Apps Script + Google Sheets
- **Dashboard password**: `UsiTwcSpaces2026`

---

## Step 1 — Upload to GitHub

1. Go to github.com → New repository
2. Name it: `spacesbytw c` (or `spacesbytw c-app`)
3. Set to Public
4. Upload ALL files from the `spacesbytw c` folder (maintain folder structure)
5. Click "Commit changes"

---

## Step 2 — Deploy to Vercel

1. Go to vercel.com → New Project
2. Import your `spacesbytw c` GitHub repository
3. Framework preset: **Vite**
4. Build command: `npm run build`
5. Output directory: `dist`
6. Click **Deploy**

Your app will be live at `spacesbytw c.vercel.app` (or similar).

---

## Step 3 — Set Up Google Apps Script

1. Go to **sheets.google.com** → Create a new spreadsheet
2. Name it: **SpacesByTWC Data**
3. Click **Extensions → Apps Script**
4. Delete all default code
5. Open the file **SpacesByTWC-AppsScript.gs** from your outputs folder in VSCode or TextEdit
6. Select all (⌘A) and copy (⌘C)
7. Paste into the Apps Script editor
8. Click the floppy disk icon to save (name the project "SpacesByTWC")
9. Click **Deploy → New deployment**
   - Type: **Web app**
   - Description: SpacesByTWC backend
   - Execute as: **Me**
   - Who has access: **Anyone**
10. Click **Deploy** → Authorise access when prompted
11. **Copy the Web App URL** — you will need it in Step 4

---

## Step 4 — Add Environment Variables in Vercel

1. In your Vercel project → **Settings → Environment Variables**
2. Add the following:

| Name | Value |
|------|-------|
| `GOOGLE_SCRIPT_URL_SPACES` | (paste your Apps Script URL from Step 3) |
| `DASHBOARD_SECRET_SPACES` | `UsiTwcSpaces2026` |

3. Click **Save** for each
4. Go to **Deployments** → click the three dots on the latest deployment → **Redeploy**

---

## Step 5 — Test

- **Home page**: `your-app.vercel.app/`
- **Quiz**: `your-app.vercel.app/quiz`
- **Results**: Complete the quiz — results page shows archetype and recommended service
- **Book**: `your-app.vercel.app/book` — submit a test enquiry
- **Dashboard**: `your-app.vercel.app/dashboard` → password: `UsiTwcSpaces2026`
- Check your Google Sheet — you should see two tabs: **Assessments** and **Bookings**

---

## Space Archetypes

| Archetype | Matched Service |
|-----------|----------------|
| The Sanctuary | Wellbeing Space Design |
| The Focus Zone | Workplace Optimisation |
| The Social Hub | Home Transformation |
| The Creative Studio | Creative Space Consultation |
| The Flow Space | Space Audit & Redesign |
| The Retreat | Outdoor Living Design |

---

## Notes
- The Apps Script file must be copied from the .gs file in VSCode — do NOT copy from the chat window (smart quotes will break it)
- Both sheets (Assessments and Bookings) are auto-created on first submission
- The dashboard shows archetype distribution and conversion rate (assessments → bookings)
