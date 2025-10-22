# Tawseela Customer App — Expo Boilerplate & Guide

> ملف جاهز لتأسيس تطبيق الزبائن (MVP) لتوصيلة، باستخدام Expo Router + NativeWind + Redux Toolkit + Axios.

---

## 🎯 الهدف
تطبيق موبايل بسيط يخدم الزبائن في القرى:
- عرض المحلات المحلية.
- طلب منتجات بسهولة.
- تتبع حالة الطلب.
- تجربة تسجيل دخول بسيطة (OTP داخلي بدون تكلفة).

---

## ⚙️ التكنولوجيا
- **React Native (Expo Router)** — لبناء الواجهة.
- **NativeWind** — لتصميم سريع وسهل.
- **Redux Toolkit** — لإدارة الحالة.
- **Axios** — للاتصال بالـ backend.
- **React Query** — لإدارة التحميل والـ caching.
- **Firebase Auth (اختياري)** — لتجارب OTP لاحقًا.

---

## 🧩 الشاشات الأساسية
| الشاشة | الوظيفة |
|---------|----------|
| `WelcomeScreen` | شاشة البداية والتسجيل |
| `OtpScreen` | إدخال كود التحقق |
| `HomeScreen` | عرض المحلات |
| `StoreScreen` | تفاصيل المحل ومنتجاته |
| `CartScreen` | سلة المشتريات |
| `OrderStatusScreen` | متابعة الطلب |
| `ProfileScreen` | إعدادات الحساب |

---

## 🏗️ هيكل المشروع المقترح
```
app/
  _layout.tsx
  index.tsx              ← Home
  (auth)/
    login.tsx
    otp.tsx
  (store)/
    [storeId].tsx
  (cart)/
    index.tsx
  (orders)/
    [orderId].tsx
lib/
  api.ts                 ← Axios client
  store.ts               ← Redux setup
  hooks/
    useAuth.ts
    useCart.ts
components/
  StoreCard.tsx
  ProductCard.tsx
  Header.tsx
  Button.tsx
  Input.tsx
```

---

<!-- ## ⚡️ أوامر التأسيس
```bash
npx create-expo-app tawseela-client
cd tawseela-client
npm i nativewind @reduxjs/toolkit react-redux axios react-query
npx expo install react-native-safe-area-context react-native-screens -->
```

---

## 🧩 lib/api.ts
```ts
import axios from "axios";

export const api = axios.create({
  baseURL: "http://YOUR_LOCAL_IP:4000/api",
  timeout: 10000,
});
```

---

## 🧠 lib/store.ts
```ts
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import cartReducer from "../features/cartSlice";

export const store = configureStore({
  reducer: { auth: authReducer, cart: cartReducer },
});
```

---

## 🔑 Auth Slice (features/authSlice.ts)
```ts
import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, token: null },
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
```

---

## 🧾 MVP Flow
1. المستخدم يدخل رقم الموبايل → `request-otp`.
2. السيرفر يولّد كود (يُعرض داخليًا في النسخة المجانية).
3. المستخدم يدخل الكود → `verify-otp` → JWT → حفظ في Redux.
4. الصفحة الرئيسية تعرض المحلات.
5. المستخدم يضيف منتجات للسلة → ينشئ طلب.
6. حالة الطلب تُعرض من `/orders/status`.

---

## ✅ أول Sprint (3 شاشات فقط)
1. **Login / OTP** (واجهة عربية بسيطة).
2. **Home**: عرض المحلات من API.
3. **Cart**: إضافة منتجات وإرسال طلب.

---

## 🚀 التوسع لاحقًا
- إضافة Socket.io لتحديث الطلبات.
- Firebase OTP للتحقق الحقيقي.
- خريطة GeoJSON للمحلات والسواقين.
- Chat بين العميل والسواق.

---

## 💡 نصيحة
ابدأ بإطلاق نسخة داخلية تجريبية على Expo Go أولاً. 
بعدها، لما تتأكد من استقرار الـ flow، اعمل build Android APK للتوزيع في القرى.

---

_هذا الملف يمثل الأساس لبناء تطبيق الزبائن لتوصيلة. جاهز للتنفيذ المباشر داخل Expo Router._

