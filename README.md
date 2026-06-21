# 🥗 Calorie Tracker & Macro Dashboard

A full-stack **MERN** (MongoDB, Express, React, Node) application that acts as a
daily food journal. It calculates nutritional intake in real time, manages a
strict calorie budget per fitness goal, and visually warns the user when they
overeat.

> **Design principle:** _All_ business logic — nutrient scaling, aggregation,
> percentages, and the over-budget validation — happens on the **server**. The
> React frontend only collects input and renders API responses.

---

## ✨ Features

| # | Feature | Notes |
|---|---------|-------|
| 1 | **Fitness Goal toggle** | Weight Loss / Maintenance (default) / Muscle Gain. Switching instantly recalculates targets & percentages **without wiping meal history**. |
| 2 | **Food logging panel** | Type food + portion, or click **Image Upload** to simulate an AI scan (1s loader → auto-fills Rice / 200g). |
| 3 | **Nutrient scaling** | `actualValue = (portion / 100) × baseNutrient`, computed server-side. |
| 4 | **Daily dashboard** | Large calorie bar (Blue→Green gradient) + 3 macro meters (Protein/Carbs/Fat). |
| 5 | **Over-budget alert** | Bar turns Crimson Red and a Framer Motion modal pops up the moment you exceed the target. |
| 6 | **Daily history** | Responsive card grid; delete a meal to recompute totals instantly. |

UI: dark mode, glassmorphism cards, Tailwind, Lucide icons, Framer Motion
animations, Recharts macro donut, React Hot Toast notifications, loading
skeletons, empty state, and an error boundary.

---

## 🧱 Tech Stack

**Frontend:** React + Vite · Tailwind CSS · React Query (`@tanstack/react-query`) ·
Axios · React Hot Toast · Framer Motion · Recharts · Lucide React

**Backend:** Node.js + Express · MongoDB + Mongoose · MVC architecture · REST APIs

---

## 📁 Project Structure

```
vibecoding/
├── backend/
│   ├── config/         # db.js — Mongo connection
│   ├── controllers/    # request/response handlers (thin)
│   ├── middleware/     # errorHandler.js (404 + central errors)
│   ├── models/         # Meal.js, Goal.js (Mongoose schemas)
│   ├── routes/         # meal / goal / dashboard routers
│   ├── services/       # business logic: nutrient, goal, dashboard
│   ├── utils/          # foodDatabase.js, goalTargets.js
│   ├── .env.example
│   └── server.js       # app entrypoint
│
└── frontend/
    ├── src/
    │   ├── components/  # UI building blocks
    │   ├── context/     # BudgetAlertContext (modal trigger)
    │   ├── hooks/       # React Query hooks (useMeals/useGoals/useDashboard)
    │   ├── layouts/     # MainLayout
    │   ├── pages/       # Dashboard
    │   ├── services/    # axios API wrappers
    │   ├── utils/       # constants, formatters, query keys
    │   ├── App.jsx
    │   └── main.jsx
    ├── .env.example
    └── vite.config.js   # dev proxy /api -> :5000
```

---

## 🔌 REST API

Base URL: `http://localhost:5000/api`

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET`  | `/health` | Health check + supported foods |
| `POST` | `/meals` | Add meal. Body: `{ "foodName": "Rice", "portion": 200 }`. Nutrients computed server-side. |
| `GET`  | `/meals` | List all meals (newest first) |
| `DELETE` | `/meals/:id` | Delete a meal |
| `GET`  | `/dashboard` | Totals, percentages, `remainingCalories`, `exceeded` flag |
| `GET`  | `/goals` | Current goal + targets |
| `PUT`  | `/goals` | Change goal. Body: `{ "goal": "muscle-gain" }` |

**Goal values:** `weight-loss` · `maintenance` · `muscle-gain`

**Daily targets:**

| Goal | Calories | Protein | Carbs | Fat |
|------|---------|---------|-------|-----|
| Weight Loss | 1800 | 140g | 180g | 50g |
| Maintenance | 2200 | 150g | 250g | 70g |
| Muscle Gain | 2800 | 180g | 320g | 90g |

**Food database (per 100g):**

| Food | Cal | Protein | Carbs | Fat |
|------|-----|---------|-------|-----|
| Chicken Breast | 165 | 31 | 0 | 3.6 |
| Rice | 130 | 2.7 | 28 | 0.3 |
| Egg | 155 | 13 | 1 | 11 |
| Banana | 89 | 1 | 23 | 0.3 |
| Oats | 389 | 17 | 66 | 7 |

---

## 🔄 End-to-End Flow

```
User types "Chicken Breast" + 200g  ──▶  POST /api/meals
                                          │
              nutrientService.calculateNutrients()  (200/100 × base)
                                          │
                       Meal saved in MongoDB with computed macros
                                          │
React Query invalidates ["meals"] + ["dashboard"]  ◀── 201 Created
                                          │
        GET /api/dashboard  ──▶  dashboardService sums all meals,
                                 compares to active goal targets,
                                 returns percentages + `exceeded`
                                          │
   Progress bars animate · if exceeded → bar turns red + modal opens
```

Changing the **Fitness Goal** → `PUT /api/goals` updates the singleton Goal
document’s targets only. React Query invalidates `["goal"]` + `["dashboard"]`
(but **not** `["meals"]`), so percentages recompute while history is preserved.

---

## 🚀 Getting Started (step-by-step for anyone)

### Prerequisites
- **Node.js 18+** — <https://nodejs.org>
- **MongoDB** — either:
  - **Local:** install [MongoDB Community Server](https://www.mongodb.com/try/download/community) (runs at `mongodb://127.0.0.1:27017`), **or**
  - **Cloud (easiest):** create a free [MongoDB Atlas](https://www.mongodb.com/atlas/database) cluster and copy its connection string.

### 1. Clone the repo
```bash
git clone https://github.com/<your-username>/calorie-tracker.git
cd calorie-tracker
```

### 2. Start the backend
```bash
cd backend
npm install
cp .env.example .env       # Windows PowerShell: copy .env.example .env
#  → open .env and set MONGO_URI (local default already works; for Atlas paste your URI)
npm run dev                # starts on http://localhost:5000  (npm start for production)
```
You should see `✅ MongoDB connected` and `🚀 Server running on http://localhost:5000`.

### 3. Start the frontend (in a second terminal)
```bash
cd frontend
npm install
cp .env.example .env       # Windows PowerShell: copy .env.example .env
npm run dev                # opens http://localhost:5173
```

### 4. Use the app
Open **http://localhost:5173**. The Vite dev server proxies `/api` calls to the
backend automatically — no extra config needed.

---

## 🌐 Pushing to GitHub (beginner-friendly)

From the project root (`vibecoding/`):

```bash
# 1. Initialize git (only once)
git init
git add .
git commit -m "feat: Calorie Tracker & Macro Dashboard (MERN)"

# 2. Create an EMPTY repo on github.com (no README/.gitignore), copy its URL, then:
git branch -M main
git remote add origin https://github.com/<your-username>/<repo-name>.git
git push -u origin main
```

> `.env` files and `node_modules/` are already git-ignored, so no secrets are
> committed. Make the repository **Public** so reviewers can access it.

Alternatively, with the GitHub CLI:
```bash
gh repo create <repo-name> --public --source=. --remote=origin --push
```

---

## ✅ Automated Tests

The backend has a test suite (**Vitest + Supertest**) covering the graded
server-side logic. Integration tests run against an **in-memory MongoDB**
(`mongodb-memory-server`), so they never touch your real Atlas cluster and need
no setup.

```bash
cd backend
npm test          # run once
npm run test:watch # watch mode (TDD)
```

Coverage:
- **Unit** (`tests/nutrientService.test.js`) — scaling formula, rounding,
  case-insensitivity, and validation errors (unknown food, invalid portion).
- **Integration** (`tests/api.test.js`) — every endpoint, plus:
  - server recomputes nutrients and **ignores client-supplied values**,
  - dashboard aggregation + the `exceeded` flag,
  - changing the goal **recalculates percentages without wiping meal history**.

> First run downloads a small in-memory mongod binary (cached afterwards).

## 🧪 Quick API smoke test

With both servers running:
```bash
curl http://localhost:5000/api/health
curl -X PUT http://localhost:5000/api/goals -H "Content-Type: application/json" -d "{\"goal\":\"muscle-gain\"}"
curl -X POST http://localhost:5000/api/meals -H "Content-Type: application/json" -d "{\"foodName\":\"Chicken Breast\",\"portion\":200}"
curl http://localhost:5000/api/dashboard
```

---

## 📝 Notes
- Single-user prototype: the Goal is a singleton document; meals are global.
- Numbers are rounded to one decimal place on the server.
- `exceeded` is computed server-side and is the single source of truth for the
  red warning state.
 ## 📸 Application Preview

<p align="center">
  <img src="https://github.com/uv2404/Calorie-Tracker-Macro-Dashboard/blob/main/Calorie%20Tracker%20%26%20Macro%20Dashboard%20and%2010%20more%20pages%20-%20Personal%20-%20Microsoft%E2%80%8B%20Edge%2021-06-2026%2013_15_43.png" alt="Calorie Tracker Screenshot" width="800"/>
</p>
<p align="center">
  <img src="https://github.com/uv2404/Calorie-Tracker-Macro-Dashboard/blob/main/Calorie%20Tracker%20%26%20Macro%20Dashboard%20and%2010%20more%20pages%20-%20Personal%20-%20Microsoft%E2%80%8B%20Edge%2021-06-2026%2013_15_50.png" alt="Calorie Tracker Screenshot](https://github.com/uv2404/Calorie-Tracker-Macro-Dashboard/blob/main/Calorie%20Tracker%20%26%20Macro%20Dashboard%20and%2010%20more%20pages%20-%20Personal%20-%20Microsoft%E2%80%8B%20Edge%2021-06-2026%2013_15_50.png)" width="800"/>
</p>

## License
MIT
