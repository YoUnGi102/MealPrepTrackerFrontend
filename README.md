# 🍽️ MealPrepTracker Frontend

A **Redux + React + TypeScript** frontend application for managing meals, ingredients, and daily calorie tracking. This UI complements the MealPrepTracker backend and provides a sleek, responsive experience for users.

---

## 🚀 Tech Stack

- **React** with **TypeScript**
- **Redux Toolkit** + **Redux Persist**
- **React Router DOM**
- **SASS (SCSS)** with CSS Modules
- **React Toastify** for notifications

---

## 🧠 State Management with Redux Toolkit

- Centralized global state using `@reduxjs/toolkit`
- Persistent store using `redux-persist`

```ts
const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        ignoredPaths: ['_persist'],
      },
    }),
});
```

### Example Slice: `authSlice.ts`

- Uses `createAsyncThunk` to handle login logic
- Manages loading, token state, and error handling

---

## 🌐 Routing with React Router DOM

- Routes are managed using `react-router-dom`
- `HashRouter` is used to support static hosting
- Lazy loading with `React.lazy` and `Suspense`
- Route protection using a `ProtectedRoute` component

```tsx
<Router>
  <Routes>
    <Route
      path="/"
      element={
        <ProtectedRoute>
          <MainPage />
        </ProtectedRoute>
      }
    />
    <Route path="/ingredients" element={<IngredientsPage />} />
  </Routes>
</Router>
```

---

## 🎨 Styling with SASS Modules

This project uses **SASS (SCSS)** for styling, with a modular architecture to scope styles locally and promote reusability through variables and mixins.

### 🔧 Structure

- **SCSS Modules** (e.g., `HomePage.module.scss`) ensure style encapsulation and prevent global CSS conflicts.
- **Shared configuration** is stored in:

  - `_variables.scss` – color palette and global constants
  - `_mixins.scss` – reusable layout and UI utility mixins

### 📁 Example: SCSS Usage

```scss
// _variables.scss
$primary-color: #147832;
$secondary-color: #fff;
```

```scss
// _mixins.scss
@mixin btn-style {
  background-color: $primary-color;
  color: $secondary-color;
  border: 2px solid $primary-color;
  padding: 10px;
  border-radius: 10px;

  &:hover {
    background-color: $secondary-color;
    color: $primary-color;
  }
}
```

```scss
// HomePage.module.scss
@use '../../styles/abstracts/variables' as v;
@use '../../styles/abstracts/mixins' as *;

.homePage {
  @include flex-container;
}

.link {
  @include btn-style;
}
```

```tsx
// HomePage.tsx
<div className={styles.homePage}>
  <Link className={styles.link} to="/ingredients">
    Search Ingredients
  </Link>
</div>
```

---

## 🔔 Notifications with React Toastify

- Toasts shown on events such as login failure, success actions
- Auto-dismiss and positioned top-right

```tsx
<ToastContainer position="top-right" autoClose={3000} />
```

---

## 🧪 Testing (Planned)

- Unit testing with **Jest** + **React Testing Library**
- End-to-end testing with **Cypress** (TBD)

---

## 📦 Folder Structure

```
src/
├── components/         # Reusable UI components
├── features/           # Redux features per domain (auth, ingredients, meal, etc.)
├── routes/             # Route definitions
├── styles/             # SCSS modules and global styles
├── types/              # TypeScript types and interfaces
└── utils/              # Utility functions and constants
```

---

## 🛠️ Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

---

## 💡 Future Improvements

- Dark mode toggle
- Improved accessibility
- Enhanced form validation
- Unit & E2E testing

---

## 👨‍💻 Author

Built with ❤️ by \[Your Name].

Feel free to reach out for collaboration or feedback!

# 🍽️ MealPrepTracker Frontend

A **Redux + React + TypeScript** frontend application for managing meals, ingredients, and daily calorie tracking. This UI complements the MealPrepTracker backend and provides a sleek, responsive experience for users.

---

## 🚀 Tech Stack

- **React** with **TypeScript**
- **Redux Toolkit** + **Redux Persist**
- **React Router DOM**
- **SASS (SCSS)** with CSS Modules
- **React Toastify** for notifications

---

## 🧠 State Management with Redux Toolkit

- Centralized global state using `@reduxjs/toolkit`
- Persistent store using `redux-persist`

```ts
const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        ignoredPaths: ['_persist'],
      },
    }),
});
```

### Example Slice: `authSlice.ts`

- Uses `createAsyncThunk` to handle login logic
- Manages loading, token state, and error handling

---

## 🌐 Routing with React Router DOM

- Routes are managed using `react-router-dom`
- `HashRouter` is used to support static hosting
- Lazy loading with `React.lazy` and `Suspense`
- Route protection using a `ProtectedRoute` component

```tsx
<Router>
  <Routes>
    <Route
      path="/"
      element={
        <ProtectedRoute>
          <MainPage />
        </ProtectedRoute>
      }
    />
    <Route path="/ingredients" element={<IngredientsPage />} />
  </Routes>
</Router>
```

---

## 🎨 Styling with SASS Modules

This project uses **SASS (SCSS)** for styling, with a modular architecture to scope styles locally and promote reusability through variables and mixins.

### 🔧 Structure

- **SCSS Modules** (e.g., `HomePage.module.scss`) ensure style encapsulation and prevent global CSS conflicts.
- **Shared configuration** is stored in:

  - `_variables.scss` – color palette and global constants
  - `_mixins.scss` – reusable layout and UI utility mixins

### 📁 Example: SCSS Usage

```scss
// _variables.scss
$primary-color: #147832;
$secondary-color: #fff;
```

```scss
// _mixins.scss
@mixin btn-style {
  background-color: $primary-color;
  color: $secondary-color;
  border: 2px solid $primary-color;
  padding: 10px;
  border-radius: 10px;

  &:hover {
    background-color: $secondary-color;
    color: $primary-color;
  }
}
```

```scss
// HomePage.module.scss
@use '../../styles/variables' as v;
@use '../../styles/mixins' as *;

.homePage {
  @include flex-container;
}

.link {
  @include btn-style;
}
```

```tsx
// HomePage.tsx
<div className={styles.homePage}>
  <Link className={styles.link} to="/ingredients">
    Search Ingredients
  </Link>
</div>
```

---

## 🔔 Notifications with React Toastify

- Toasts shown on events such as login failure, success actions
- Auto-dismiss and positioned top-right

```tsx
<ToastContainer position="top-right" autoClose={3000} />
```

---

## 🧪 Testing (Planned)

- Unit testing with **Jest** + **React Testing Library**
- End-to-end testing with **Cypress** (TBD)

---

## 📦 Folder Structure

```
src/
├── components/         # Reusable UI components
├── features/           # Redux features per domain (auth, ingredients, meal, etc.)
├── routes/             # Route definitions
├── styles/             # SCSS modules and global styles
├── types/              # TypeScript types and interfaces
└── utils/              # Utility functions and constants
```

---

## 🛠️ Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

---

## 💡 Future Improvements

- Dark mode toggle
- Improved accessibility
- Enhanced form validation
- Unit & E2E testing

---

## 🌐 Live Demo

### 🔧 Backend (API)

- **Base URL**: [`https://mealpreptracker.onrender.com/api/`](https://mealpreptracker.onrender.com/api/)
- **Swagger Docs**: [`https://mealpreptracker.onrender.com/api-docs/`](https://mealpreptracker.onrender.com/api-docs/)
  > Interactive API documentation auto-generated with Swagger.

### 🖥️ Frontend (Client)

- **Website**: [`https://mealpreptrackerfrontend.onrender.com/`](https://mealpreptrackerfrontend.onrender.com/)

---

## 👨‍💻 Author

Built by Tomáš Greš.

Feel free to reach out for collaboration or feedback!
