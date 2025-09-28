# 🏠 Property Management React App

A modern React application for managing and booking properties. This app allows **admins** to create properties, manage availability, and confirm bookings, while **guests/users** can browse properties, view details, and book available properties.

---

## 📂 Project Structure

### Root Files

- `package.json` – Project dependencies and scripts.
- `package-lock.json` – Dependency version lock.
- `postcss.config.js` – PostCSS configuration.
- `tailwind.config.js` – Tailwind CSS configuration.

### Public Folder

- `index.html` – Main HTML template.
- `favicon.ico` – Website favicon.
- `logo192.png` & `logo512.png` – App logos.
- `manifest.json` – PWA configuration.
- `robots.txt` – SEO crawler rules.

### Src Folder

#### Core App

- `index.js` – App entry point.
- `App.js` – Main App component with routes.
- `App.css` & `index.css` – Styles.
- `logo.svg` – Default logo.
- `reportWebVitals.js` – Performance monitoring.
- `setupTests.js` – Testing setup.

#### API & Services

- `api/axios.js` – Axios instance for HTTP requests.
- `services/*Service.js` – API service files for auth, bookings, properties, availability.

#### Redux / State Management

- `app/store.js` – Redux store configuration.
- `features/auth/authSlice.js` – Authentication state slice.

#### Components

- `components/*` – Reusable UI components (Header, Footer, Loader, Pagination, ToastPortal, AdminLayout).

#### Middleware / Route Guards

- `middleware/AdminRoute.js` – Protects admin routes.
- `middleware/GuestRoute.js` – Protects guest-only routes.

#### Pages

- `pages/admin/*` – Admin panel pages for dashboard, properties, bookings, availability.
- `pages/guest/*` – Guest pages to list properties and book.

#### Routes

- `routes/AdminRoutes.js` – Admin route definitions.
- `routes/GuestRoutes.js` – Guest route definitions.

---

## 🚀 Features

- Admin CRUD for properties.
- Admin booking confirmation.
- Guest property listing and booking.
- Property availability management.
- Toast notifications and loading indicators.
- Responsive UI using Tailwind CSS.

---

## ⚡ Setup

1. Clone the repository:

```bash
git clone https://github.com/abbasitmemon/property-web-app.git
cd property-web-app
```

2. Copy `.env.example` to `.env` and update environment variables:

```bash
cp .env.example .env
```

3. Install dependencies:

```bash
npm install
```

4. Start the development server:

```bash
npm start
```

Open in browser: [http://localhost:3000](http://localhost:3000)

---

## 🧭 Routes

### Guest Routes

- `/` → Property listings (`Properties`)
- `/property/:id` → Property details (`PropertyDetails`)
- `/book/:id` → Booking page (`Booking`)

### Admin Routes

- `/admin/login` → Admin login
- `/admin/dashboard` → Admin dashboard
- `/admin/properties/new` → Create new property
- `/admin/properties/edit/:id` → Edit property
- `/admin/properties/view/:id` → View property
- `/admin/properties/:id/availability` → Manage availability
- `/admin/properties/:id/availability/edit` → Edit availability
- `/admin/bookings` → View all bookings
- `/admin/bookings/view/:id` → View booking details

---

## 💡 Notes

- All API requests are handled via Axios in `src/api/axios.js`.
- Redux is used for authentication and global state management.
- Admin and guest routes are protected using middleware.
- Tailwind CSS is used for styling.

---
