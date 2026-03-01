# 📦 Inventory App – React Native + Appwrite

A mobile inventory management app built with React Native (bare workflow) and Appwrite Cloud. Each authenticated user manages their own private product catalog with image uploads.

---

## ✨ Features

- **Authentication** — Register, Login, Logout with persistent sessions
- **Private Inventory** — Each user sees only their own products (scoped by `userId`)
- **Product Listing** — Real-time debounced search, pull-to-refresh, low-stock badges
- **Product Detail** — Hero image, info rows, Edit & Delete actions
- **Add / Edit Product** — Image picker, form validation, Appwrite Storage upload
- **Custom Alerts** — Styled modal popups replacing native alerts throughout the app
- **Vector Icons** — Ionicons used throughout (no emoji in UI)
- **Safe Area** — Handles notches and status bars on all screens

---

## 🛠 Prerequisites

| Tool | Version |
|---|---|
| Node.js | ≥ 18 |
| React Native CLI | Latest |
| Android Studio | Hedgehog or newer |
| Android SDK | API 33+ |
| Java (JDK) | 17 |
| Appwrite Cloud account | [cloud.appwrite.io](https://cloud.appwrite.io) |

---

## ⚙️ Appwrite Cloud Setup

### 1. Create a Project
1. Go to [cloud.appwrite.io](https://cloud.appwrite.io) → create a new project
2. Note the **Project ID** from project settings

### 2. Create the Database & Collection
1. **Databases** → **Create database** — name: `inventory_db`
2. Inside it → **Create collection** — name/ID: `products`
3. Add these **columns**:

| Key | Type | Required |
|---|---|---|
| `name` | Text | ✅ |
| `price` | Float | ✅ |
| `quantity` | Integer | ✅ |
| `category` | Text | ✅ |
| `imageId` | Text | ✅ |
| `userId` | Text | ✅ |

4. **Settings → Permissions** of the `products` collection:
   - Role: **All users** → ✅ Create, Read, Update, Delete

### 3. Create a Storage Bucket
1. **Storage** → **Create bucket** — name: `product_images`, note the **Bucket ID**
2. **Settings → Permissions** of the bucket:
   - Role: **All users** → ✅ Create, Update, Delete
   - Role: **Any** → ✅ Read *(allows images to load without auth headers)*

### 4. Enable Full-Text Search (Optional)
**Database → products → Indexes → Create index:**
- Key: `name_search` | Type: `Fulltext` | Column: `name`

---

## 🚀 Getting Started

### 1. Clone & install

```bash
git clone <your-repo-url>
cd RNHiringTask
npm install
```

### 2. Configure environment variables

Create a `.env` file in the project root:

```env
APPWRITE_ENDPOINT=https://sgp.cloud.appwrite.io/v1
APPWRITE_PROJECT_ID=your_project_id
APPWRITE_DATABASE_ID=your_database_id
APPWRITE_COLLECTION_ID=products
APPWRITE_BUCKET_ID=your_bucket_id
```

> ⚠️ `.env` is in `.gitignore` — never commit it.

### 3. Run on Android

```bash
npx react-native run-android
```

---

## 📁 Project Structure

```
src/
├── components/ui/
│   ├── AppButton.jsx        # Reusable button (primary / auth / outline)
│   └── AppInput.jsx         # Text input with password eye-toggle (Ionicons)
├── config/
│   └── appwrite.js          # Appwrite client & service instances
├── context/
│   ├── AlertContext.jsx     # Global custom modal alert system
│   └── AuthContext.jsx      # Auth state (login, signup, logout, session restore)
├── hooks/
│   ├── useDebounce.js       # Debounce hook for search
│   └── useImagePicker.js    # react-native-image-picker wrapper
├── navigation/
│   ├── AppStack.jsx         # Authenticated screens
│   ├── AuthStack.jsx        # Login / Register screens
│   └── RootNavigator.jsx    # Root navigator (auth gate)
├── screens/
│   ├── auth/
│   │   ├── LoginScreen.jsx
│   │   ├── SignupScreen.jsx
│   │   ├── useLogin.js
│   │   └── useSignup.js
│   └── products/
│       ├── ProductListScreen.jsx
│       ├── ProductDetailScreen.jsx
│       ├── ProductFormScreen.jsx
│       ├── useProductList.js    # Scoped fetch by userId, search, delete
│       ├── useProductDetail.js  # Fetch single product, focus-aware refresh
│       └── useProductForm.js    # Create / edit product with image upload
├── services/
│   ├── authService.js       # Appwrite Auth CRUD
│   ├── productService.js    # Appwrite Database CRUD (userId-filtered)
│   └── storageService.js    # Appwrite Storage upload / delete / URL
└── theme/
    ├── colors.js            # Global color palette
    └── typography.js        # Font styles & spacing tokens
```

---

## 📦 Key Dependencies

| Package | Purpose |
|---|---|
| `appwrite` | Appwrite JS SDK |
| `@react-navigation/native` | Navigation container |
| `@react-navigation/native-stack` | Stack navigator |
| `react-native-safe-area-context` | Notch / status bar handling |
| `react-native-vector-icons` | Ionicons used across all screens |
| `react-native-image-picker` | Camera & gallery access |
| `react-native-config` | `.env` variable access at runtime |

---

## 🔐 Security Notes

- Credentials live in `.env`, excluded from git via `.gitignore`
- Sessions are managed server-side by Appwrite
- Products are scoped by `userId` — users cannot see each other's data
- Product images use public read (`Any` role) so the native `Image` component can load them without sending auth headers
- Write operations require a valid Appwrite session