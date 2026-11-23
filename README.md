# Afriva Web

React + Vite + React Router. Run: `npm install && npm run dev`

## Structure
- `app/` – App shell, providers, route table
- `config/` – routes and navigation (single source of truth)
- `components/ui` – Button, Input, Card (reused everywhere)
- `components/layout` – Navbar, Footer, MainLayout, DashboardLayout
- `components/common` – Section and other shared blocks
- `features/auth` – context, service, route guards, config-driven AuthForm
- `hooks/` – useForm; `utils/` – validators, storage
- `services/apiClient.js` – the only place that calls `fetch`
- `data/` – page copy; `pages/` – thin page components; `styles/` – tokens + global CSS

## Connecting Python later
Set `VITE_API_URL` in `.env` (see `.env.example`). Auth then calls `POST /auth/login` and `POST /auth/register`
expecting `{ user: { name, email }, token }`. Without it, a localStorage mock is used.
Add a new API area: create `features/<name>/<name>Service.js` using `api.get/post`.

## Matching Figma
Edit `src/styles/tokens.css` (colours, fonts, spacing) and `src/data/*.js` (copy).
