# 🛒 Ecommerce API

A full-featured **RESTful E-Commerce API** built with **Node.js**, **Express**, **TypeScript**, and **Prisma ORM**. It provides complete backend functionality for an online store - including user authentication, product management, shopping cart, order processing, and admin controls.

---

## 📋 Table of Contents

- [Project Overview](#-project-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Prerequisites](#-prerequisites)
- [Installation & Setup](#-installation--setup)
- [Environment Variables](#-environment-variables)
- [Database Setup & Migrations](#-database-setup--migrations)
- [Running the Project](#-running-the-project)
- [API Documentation](#-api-documentation)
- [Error Handling](#-error-handling)
- [Troubleshooting / Common Issues](#-troubleshooting--common-issues)
- [Contributing Guidelines](#-contributing-guidelines)
- [License](#-license)

---

## 🔍 Project Overview

This project is a backend API for an e-commerce platform. It handles:

- **User registration & authentication** with JWT-based sessions.
- **Product catalog** with full-text search capabilities.
- **Shopping cart** management for authenticated users.
- **Order lifecycle** — creation from cart, cancellation, status tracking, and admin-level order management.
- **Address management** — users can store shipping/billing addresses.
- **Role-based access control** — `USER` and `ADMIN` roles with middleware-enforced permissions.

The API is designed with clean separation of concerns: controllers, routes, middlewares, validation schemas, and a custom exception hierarchy.

---

## ✨ Features

| Category          | Highlights                                                                 |
| ----------------- | -------------------------------------------------------------------------- |
| **Authentication** | Signup, login, JWT token issuance (7-day expiry), current user retrieval  |
| **Products**       | CRUD operations, full-text search across name/description/tags (admin-only write access) |
| **Cart**           | Add items, update quantities, remove items, view cart (auto-merge duplicates) |
| **Orders**         | Create from cart (transactional), cancel, view history, order event tracking |
| **Addresses**      | Create, delete, list addresses; set default shipping/billing address       |
| **Users (Admin)**  | List all users, view user details, change user roles, view user orders     |
| **Validation**     | Request body validation with Zod schemas on all endpoints                  |
| **Error Handling** | Custom exception classes with structured JSON error responses              |

---

## 🛠 Tech Stack

| Layer          | Technology                                                      |
| -------------- | --------------------------------------------------------------- |
| **Runtime**    | [Node.js](https://nodejs.org/)                                  |
| **Language**   | [TypeScript](https://www.typescriptlang.org/) (ESNext, ESM)     |
| **Framework**  | [Express 5](https://expressjs.com/)                             |
| **ORM**        | [Prisma 7](https://www.prisma.io/) with MariaDB adapter         |
| **Database**   | [MariaDB](https://mariadb.org/) (MySQL-compatible)              |
| **Auth**       | [JSON Web Tokens](https://jwt.io/) via `jsonwebtoken`           |
| **Hashing**    | [bcrypt](https://www.npmjs.com/package/bcrypt)                  |
| **Validation** | [Zod](https://zod.dev/)                                        |
| **Env Config** | [dotenv](https://www.npmjs.com/package/dotenv)                  |
| **Dev Tools**  | [tsx](https://github.com/privatenumber/tsx), [nodemon](https://nodemon.io/) |

---

## 📁 Project Structure

```
ecommerce/
├── prisma/
│   ├── schema.prisma          # Prisma data models & database schema
│   └── migrations/            # Auto-generated database migrations
├── src/
│   ├── index.ts               # Application entry point (Express server)
│   ├── errorHandler.ts        # Async error wrapper for route handlers
│   ├── config/
│   │   ├── prisma.ts          # Prisma client initialization (MariaDB adapter)
│   │   └── secrets.ts         # Environment variable exports
│   ├── controllers/
│   │   ├── authController.ts  # Signup, login, current user
│   │   ├── productController.ts # Product CRUD & search
│   │   ├── cartController.ts  # Cart add/remove/update/view
│   │   ├── orderController.ts # Order creation, cancellation, status mgmt
│   │   └── userController.ts  # Address & user profile management
│   ├── routes/
│   │   ├── index.ts           # Root router (mounts all sub-routers)
│   │   ├── auth.ts            # /api/auth routes
│   │   ├── product.ts         # /api/product routes
│   │   ├── cart.ts            # /api/cart routes
│   │   ├── order.ts           # /api/order routes
│   │   ├── user.ts            # /api/user routes
│   │   └── address.ts         # /api/address routes
│   ├── middlewares/
│   │   ├── auth.ts            # JWT authentication middleware
│   │   ├── admin.ts           # Admin role authorization middleware
│   │   └── errors.ts          # Global error response middleware
│   ├── schema/
│   │   ├── user.ts            # Zod schemas: signup, login, updateUser, changeRole
│   │   ├── product.ts         # Zod schemas: createProduct, updateProduct
│   │   ├── cart.ts            # Zod schemas: addItemToCart, changeQuantity
│   │   └── address.ts         # Zod schemas: createAddress, updateAddress
│   ├── exceptions/
│   │   ├── root.ts            # Base HttpException class & ErrorCode enum
│   │   ├── bad-request.ts     # 400 Bad Request
│   │   ├── not-found.ts       # 404 Not Found
│   │   ├── unauthorized.ts    # 401 Unauthorized
│   │   ├── validation.ts      # 422 Unprocessable Entity
│   │   ├── internal-exception.ts # 500 Internal (with root cause)
│   │   └── internal-server.ts # 500 Internal Server Error
│   ├── types/
│   │   └── express.d.ts       # Express Request type augmentation (user property)
│   └── generated/
│       └── prisma/            # Auto-generated Prisma Client (gitignored)
├── prisma.config.ts           # Prisma configuration (datasource URL, migration path)
├── nodemon.json               # Nodemon config (watches src/, runs tsx)
├── tsconfig.json              # TypeScript compiler options
├── package.json               # Dependencies & scripts
├── .env                       # Environment variables (gitignored)
├── .env.example               # Environment variable template
└── .gitignore
```

---

## 📌 Prerequisites

Ensure you have the following installed:

- **Node.js** — v18 or later recommended
- **npm** — comes with Node.js
- **MariaDB** — v10.5+ (or a compatible MySQL server)

---

## 🚀 Installation & Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/ecommerce.git
   cd ecommerce
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Create your environment file**

   Copy the example and fill in your values:

   ```bash
   cp .env.example .env
   ```

4. **Configure environment variables** (see [Environment Variables](#-environment-variables) below).

5. **Set up the database** (see [Database Setup & Migrations](#-database-setup--migrations) below).

6. **Start the development server**

   ```bash
   npm start
   ```

---

## 🔐 Environment Variables

Create a `.env` file in the project root with the following variables:

| Variable       | Description                                | Example                               |
| -------------- | ------------------------------------------ | ------------------------------------- |
| `DATABASE_URL` | MariaDB/MySQL connection string            | `mysql://root@localhost:3306/ecommerce` |
| `PORT`         | Port the server listens on                 | `3000`                                |
| `JWT_SECRET`   | Secret key for signing JWT tokens          | `your-strong-secret-key`              |

> **⚠️ Important:** Never commit your `.env` file to version control. The `.gitignore` already excludes it.

---

## 🗄 Database Setup & Migrations

This project uses **Prisma ORM** with the **MariaDB adapter**.

1. **Create the database** in MariaDB:

   ```sql
   CREATE DATABASE ecommerce;
   ```

2. **Run Prisma migrations** to create all tables:

   ```bash
   npx prisma migrate dev --name init
   ```

3. **Generate the Prisma Client** (auto-generated into `src/generated/prisma/`):

   ```bash
   npx prisma generate
   ```

### Data Models

The schema defines 7 models:

| Model           | Description                                          |
| --------------- | ---------------------------------------------------- |
| `User`          | Users with email, hashed password, role (ADMIN/USER) |
| `Address`       | User shipping/billing addresses                      |
| `Product`       | Product catalog (name, description, price, tags)     |
| `CartItem`      | Items in a user's shopping cart                      |
| `Order`         | Orders with net amount, address, and status           |
| `OrderProduct`  | Line items within an order (product + quantity)       |
| `OrderEvent`    | Order status change history (audit trail)             |

---

## ▶️ Running the Project

### Development

```bash
npm start
```

This uses **nodemon** + **tsx** to watch the `src/` directory and auto-restart on file changes.

The server starts at: `http://localhost:3000` (or the port specified in `.env`).

### Production

For production deployments, compile TypeScript and run the output:

```bash
# Uncomment rootDir/outDir in tsconfig.json, then:
npx tsc
node dist/index.js
```

---

## 📖 API Documentation

All endpoints are prefixed with `/api`. Authenticated endpoints require a `Bearer` token in the `Authorization` header.

### Authentication

| Method | Endpoint         | Auth | Description                  |
| ------ | ---------------- | ---- | ---------------------------- |
| POST   | `/api/auth/signup` | ❌   | Register a new user          |
| POST   | `/api/auth/login`  | ❌   | Login and receive JWT token  |
| GET    | `/api/auth/me`     | ✅   | Get current authenticated user |

#### Signup Request Body

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "USER"
}
```

#### Login Request Body

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

---

### Products

| Method | Endpoint                  | Auth  | Description                   |
| ------ | ------------------------- | ----- | ----------------------------- |
| GET    | `/api/product`            | ❌    | List all products             |
| GET    | `/api/product/search?q=`  | ❌    | Full-text search products     |
| GET    | `/api/product/:id`        | ❌    | Get product by ID             |
| POST   | `/api/product`            | 🔒 Admin | Create a new product       |
| PUT    | `/api/product/:id`        | 🔒 Admin | Update a product           |
| DELETE | `/api/product/:id`        | 🔒 Admin | Delete a product           |

#### Create Product Request Body

```json
{
  "name": "Wireless Mouse",
  "description": "Ergonomic wireless mouse with USB receiver",
  "price": 29.99,
  "tags": ["electronics", "accessories", "mouse"]
}
```

---

### Cart

| Method | Endpoint          | Auth | Description                   |
| ------ | ----------------- | ---- | ----------------------------- |
| POST   | `/api/cart`       | ✅   | Add item to cart               |
| GET    | `/api/cart`       | ✅   | Get all cart items             |
| PUT    | `/api/cart/:id`   | ✅   | Update cart item quantity      |
| DELETE | `/api/cart/:id`   | ✅   | Remove item from cart          |

#### Add to Cart Request Body

```json
{
  "productId": 1,
  "quantity": 2
}
```

---

### Orders

| Method | Endpoint                    | Auth      | Description                       |
| ------ | --------------------------- | --------- | --------------------------------- |
| POST   | `/api/order`                | ✅        | Create order from cart            |
| GET    | `/api/order`                | ✅        | List user's orders                |
| GET    | `/api/order/:id`            | ✅        | Get order details (with products & events) |
| GET    | `/api/order/cancel/:id`     | ✅        | Cancel an order                   |
| GET    | `/api/order/index`          | 🔒 Admin  | List all orders (paginated)       |
| GET    | `/api/order/users/:id`      | 🔒 Admin  | List orders for a specific user   |
| PUT    | `/api/order/:id/status`     | 🔒 Admin  | Change order status               |

#### Order Statuses

`PENDING` → `ACCEPTED` → `DELIVERY` → `DELIVERED` / `CANCELLED`

---

### Addresses

| Method | Endpoint            | Auth | Description              |
| ------ | ------------------- | ---- | ------------------------ |
| POST   | `/api/address`      | ✅   | Create a new address     |
| GET    | `/api/address`      | ✅   | List user's addresses    |
| PUT    | `/api/address/:id`  | ✅   | Update user profile      |
| DELETE | `/api/address/:id`  | ✅   | Delete an address        |

#### Create Address Request Body

```json
{
  "lineOne": "123 Main Street",
  "lineTwo": "Apt 4B",
  "city": "New York",
  "country": "USA",
  "pincode": 10001
}
```

---

### Users (Admin)

| Method | Endpoint               | Auth | Description                  |
| ------ | ---------------------- | ---- | ---------------------------- |
| GET    | `/api/user`            | ✅   | List all users (paginated)   |
| GET    | `/api/user/:id`        | ✅   | Get user by ID with addresses |
| PUT    | `/api/user/:id/role`   | ✅   | Change user role (ADMIN only) |

---

## ⚠️ Error Handling

The API uses a custom exception hierarchy for consistent error responses:

```
HttpException (base)
├── BadRequestException      (400)
├── UnauthorizedException    (401)
├── NotFoundException        (404)
├── UnprocessableEntityException (422)
├── InternalException        (500 — wraps root cause)
└── InternalServerException  (500)
```

All errors return a structured JSON response:

```json
{
  "message": "User not found",
  "errorCode": 404,
  "errors": null
}
```

Zod validation errors are automatically caught and returned as `400 Bad Request`.

---

## 🐛 Troubleshooting / Common Issues

### 1. "Error parsing connection string"

- Ensure `DATABASE_URL` in `.env` uses the correct format: `mysql://user:password@host:port/database`
- MariaDB default port is `3306`.

### 2. "401 Unauthorized" on authenticated endpoints

- Include the token in the `Authorization` header as: `Bearer <your-token>`
- Ensure the token has not expired (default: 7 days).
- Verify `JWT_SECRET` matches between when the token was issued and the current server.

### 3. "Property 'product' does not exist on type 'PrismaClient'"

- Run `npx prisma generate` to regenerate the Prisma client after schema changes.
- Ensure the `output` path in `schema.prisma` points to `../src/generated/prisma`.

### 4. Prisma migration issues

- Ensure MariaDB is running and accessible at the `DATABASE_URL`.
- Try `npx prisma migrate reset` to reset and re-apply all migrations (⚠️ this deletes data).

### 5. Port already in use

- Change `PORT` in your `.env` file or terminate the process using the port:
  ```bash
  npx kill-port 3000
  ```

---

<p align="center">
  Built with ❤️ using Node.js, Express, TypeScript & Prisma
</p>
