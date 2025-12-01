# Notes App

A lightweight, React + Redux note-taking app with categories, pinning, search, sorting, and a theme system (light / dark / system). Built with Vite + Tailwind (Tailwind v4 + `@tailwindcss/vite`) — minimal dependencies, zero runtime theme libraries.

## Quick summary
- Local-first notes stored in Redux (persist to localStorage optional)
- Categories, pinning, move-between-categories
- Search, sort, pinned grouping, grid/list toggle
- Full-note modal editor with autosave, keyboard shortcuts (Ctrl+S, Esc), and “last edited” timestamps
- Theme switcher: `system | light | dark` (applies via `data-theme` on `<html>` and CSS variables)

---

## Tech stack
- React (Vite)
- Redux Toolkit
- Tailwind CSS (v4) via `@tailwindcss/vite`
- nanoid for IDs
- JS utilities (no heavy date libs)

---

## Features
- Create / edit / soft-delete / restore notes
- Categories management (create / rename / delete)
- Tags (labels) support (optional)
- Sort by date/title/category / pinned-first behavior
- Full-screen note modal with autosave and keyboard shortcuts
- Theme switching (system / light / dark) with CSS variables
- `formatTimeAgo` utility for human-friendly timestamps

---

## Dev setup

1. Clone
```bash
git clone <repo-url>
cd notes-app
```
2. Install
```bash
pnpm install
```
3. Run dev server
```bash
pnpm dev
# open http://localhost:5173
```
4. Build
```bash
pnpm build
```
5. Preview build
```bash
pnpm preview
```
# Project structure
```bash
src/
  features/          # redux slices (notes, categories, theme)
  components/
    notes/           # NoteList, NoteCard, NoteModal, AddNote, EditNote
    category/        # CategoryList, CategoryItem, AddCategory
    layout/          # AppLayout, Sidebar, Mainarea
  utils/
    formatTimeAgo.js
  index.css
  main.jsx
```

## Why I Built This

I built this project to improve my understanding of how real note-taking tools work under the hood:

- Structuring React components for scalable UI
- Managing data and UI states cleanly using Redux Toolkit
- Implementing sorting, searching, and filtering logic for large lists
- Understanding performance patterns (memoization, stable handlers)
- Working with timestamps, formatters, and state-driven UI
- Building a theme system using CSS variables (light/dark/system)
- Organizing multi-feature apps for future expansion

This app was intentionally built without heavy libraries — the goal was to learn how to implement the core logic myself instead of relying on prebuilt solutions.
