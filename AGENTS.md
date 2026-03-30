# AGENTS.md

## Project Overview
- React + Vite + TypeScript frontend for the Stern Jewish Business Association website
- Production site: `https://nyu-sjba.com`
- Backend API docs: `https://api.nyu-sjba.org/docs.json`
     - Fetch backend docs with: `curl -L https://api.nyu-sjba.org/docs.json`
- This frontend is deployed using Vercel

## Styling & Design System
- Follow `STYLE.md` as the authoritative design system
     - When altering, deleting, or adding a reusable style feature, such as a component, global token, or design philosophy, always update the documentation at `STYLE.md`
- Use global tokens from `src/index.css`
- Keep page-specific layout/styling in page or component CSS files
- Reuse components from `src/components` when practical
- Match the visual language of newer pages; avoid one-off redesigns

## API & Data
- Use the frontend API wrapper in `src/api/dataService.ts`
- Prefer documented backend contracts over assumptions
- Media assets should use thumbnails where available and preload full images only for interactive views

## Working Rules
- Prefer `rg` / `rg --files` for codebase search
- Do not revert unrelated user changes
- Avoid destructive git commands unless explicitly requested
- Prefer non-interactive commands and minimal diffs