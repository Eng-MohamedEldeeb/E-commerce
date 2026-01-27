🛒 E-Commerce Backend API (NestJS)

A scalable and production-ready E-Commerce Backend built with NestJS, designed to handle real-world business logic including orders, payments, discounts, authentication, and admin dashboard operations.

This project focuses on clean architecture, secure payment processing, and modular design.


---

🚀 Tech Stack

NestJS – Backend framework

TypeScript – Strongly typed JavaScript

MongoDB / PostgreSQL (configurable) – Database

Stripe – Payments & discount coupons

JWT – Authentication

Nodemailer – Email service

Redis (optional) – OTP & caching



---

✨ Features Overview

🔐 Authentication & Authorization

User registration & login

JWT-based authentication

Role-based authorization (Admin / User)

Secure password hashing

OTP verification (email-based)



---

📧 OTP & Email Service

Generate and validate OTP codes

Email delivery using Nodemailer

OTP expiration handling

Secure retry & resend logic



---

🧑‍💼 Admin Dashboard Endpoints

Create & manage Categories

Create & manage Brands

Admin-only protected routes

Centralized validation & error handling



---

🛍️ Cart Management

Add products to cart

Remove items from cart

Update item quantities

Empty cart

Auto cart-user binding



---

📦 Orders Management

Place orders from cart

Order validation & stock checking

Order status tracking

Secure user-order ownership



---

💳 Stripe Payment Integration

Create Stripe checkout sessions

Secure payment processing

Stripe Webhook handling

Payment confirmation & order update



---

🎟️ Discounts & Coupons (Stripe)

Generate discount / coupon codes

Apply discounts to orders

Percentage & fixed-amount discounts

Stripe-managed validation



---

🧩 Architecture Highlights

Modular NestJS structure

Separation of concerns (Controllers / Services / DTOs)

Centralized error handling

Environment-based configuration

Scalable & maintainable codebase



---

🔑 Environment Variables

Create a .env file and configure the following:

PORT=3000
DATABASE_URL=your_database_url
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret
STRIPE_WEBHOOK_SECRET=your_webhook_secret
EMAIL_HOST=smtp_host
EMAIL_PORT=587
EMAIL_USER=email@example.com
EMAIL_PASS=email_password


---

▶️ Running the Project

# Install dependencies
npm install

# Run in development
npm run start:dev

# Build for production

# <h1>Routes:</h1>

 <h2>Api-Endpoints: <a href="https://documenter.getpostman.com/view/37407571/2sB2qUp5iQ">Postman Link</a></h2>

<h2>Auth</h2>

<h3>POST</h3>
<p>auth/confirm-email</p>
<p>auth/signup</p>
<p>auth/login</p>

---

<h3>dashboard/category</h3>

<p>GET: getCategories</p>

<p>POST: createCategory</p>

<p>PATCH: updateCategory</p>

---

<h3>dashboard/brand</h3>

<p>GET: getBrands</p>

<p>POST: createBrand</p>

<p>PATCH: updateBrand</p>

---

<h3>seller/coupon</h3>

<p>POST: addCoupon</p>

<h3>seller/coupon/:couponId</h3>

<p>DELETE: deleteCoupon</p>

---

<h3>seller/product</h3>

<p>POST: addProduct</p>

<h3>seller/product/:productId</h3>

<p>PATCH: updateProduct</p>

---

<h3>user/cart</h3>

<p>POST: addToCart</p>

<p>DELETE: clearCart</p>

<h3>user/cart/:productId</h3>

<p>PATCH: removeFromCart</p>

---

<h3>user/order</h3>

<p>POST: createOrder</p>

<h3>user/order/checkout/:orderId</h3>

<p>POST: checkout</p>

<h3>user/order/refund/:orderId</h3>

<p>POST: refund</p>

## <h2>GraphQL:</h2>

<h3>Query:</h3>

<p>getCategories</p>
<p>getBrands</p>
<p>getCoupons</p>
<p>getProducts</p>
<p>getCart</p>
<p>getOrders</p>

# <h3>Mutation:</h3>

<p>addToCart</p>
<p>createOrder</p>
