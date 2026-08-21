
# 04_BACKEND_API_GUIDE.md

# SmartStock AI — Complete Backend API Guide

**Version:** v1.0

**Stack:** Node.js + Express + MongoDB + JWT

---

# Table of Contents

1. Backend Architecture
2. Folder Structure
3. Request Flow
4. Environment Variables
5. Middleware
6. Authentication APIs
7. Product APIs
8. Inventory APIs
9. Sales APIs
10. Supplier APIs
11. Dashboard APIs
12. Prediction APIs
13. Reports APIs
14. Error Handling
15. API Testing Guide

---

# 1. Backend Architecture

React → Express API → MongoDB

React → Express API → Python ML API

---

# 2. Folder Structure

```text
server/
├── config/
├── controllers/
├── middleware/
├── models/
├── routes/
├── services/
├── utils/
├── validations/
├── app.js
├── server.js
└── package.json
```

---

# 3. Environment Variables (.env)

```env
PORT=8000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
JWT_EXPIRE=7d
EMAIL_USER=your_email
EMAIL_PASS=your_password
ML_API_URL=http://localhost:5000
```

---

# 4. Middleware

## auth.middleware.js

Purpose

- Verify JWT token.
- Attach user to request.

## role.middleware.js

Roles

- Admin
- Manager
- Staff

Usage

- Admin only routes.
- Manager routes.
- Staff routes.

## upload.middleware.js

Uses Multer.

Accepts

- Product Image

## error.middleware.js

Returns consistent API responses.

Example

```json
{
 "success": false,
 "message": "Product not found"
}
```

---

# 5. Authentication APIs

## Register

POST `/api/auth/register`

Request

```json
{
 "fullName":"Gaurav",
 "email":"gaurav@email.com",
 "password":"12345678",
 "role":"manager"
}
```

Response

```json
{
 "success": true,
 "message":"Account Created"
}
```

---

## Login

POST `/api/auth/login`

Returns JWT Cookie.

---

## Logout

POST `/api/auth/logout`

Clears cookie.

---

## Forgot Password

POST `/api/auth/forgot-password`

Sends OTP.

---

## Reset Password

POST `/api/auth/reset-password`

Changes password.

---

# 6. Product APIs

Base Route

`/api/products`

## GET Products

Returns all products.

## GET Product by ID

`/api/products/:id`

## POST Product

Admin/Manager only.

Fields

- name
- sku
- category
- supplier
- stock
- price

## PUT Product

Update product.

## DELETE Product

Soft delete.

---

# 7. Inventory APIs

Base Route

`/api/inventory`

## Stock In

POST `/stock-in`

Request

```json
{
 "productId":"123",
 "quantity":25
}
```

## Stock Out

POST `/stock-out`

## Inventory History

GET `/history`

Returns stock movement timeline.

---

# 8. Sales APIs

Base Route

`/api/sales`

## Create Sale

POST `/`

Updates stock automatically.

## Get Sales

GET `/`

Pagination supported.

## Get Sale by Invoice

GET `/invoice/:invoiceId`

---

# 9. Supplier APIs

Base Route

`/api/suppliers`

## GET Suppliers

## POST Supplier

## PUT Supplier

## DELETE Supplier

---

# 10. Dashboard APIs

Base Route

`/api/dashboard`

## Overview

Returns

- Revenue
- Products
- Low Stock
- Orders

## Sales Chart

Returns monthly sales.

## Top Products

Returns top selling products.

## Recent Activities

Returns inventory history.

---

# 11. Prediction APIs

Base Route

`/api/predictions`

## Predict Demand

GET `/product/:productId`

Returns

```json
{
 "predictedDemand":60,
 "reorderQuantity":20
}
```

## Predict All Products

GET `/all`

---

# 12. Reports APIs

Base Route

`/api/reports`

## Monthly Sales

GET `/monthly-sales`

## Inventory Report

GET `/inventory`

## Export CSV

GET `/export-csv`

Downloads CSV.

---

# 13. API Response Format

Success

```json
{
 "success": true,
 "message":"Fetched Successfully",
 "data":[]
}
```

Error

```json
{
 "success": false,
 "message":"Unauthorized"
}
```

---

# 14. HTTP Status Codes

| Code | Meaning |
|------|---------|
|200|Success|
|201|Created|
|400|Bad Request|
|401|Unauthorized|
|403|Forbidden|
|404|Not Found|
|500|Server Error|

---

# 15. Backend Development Order

Day 2

- Authentication
- JWT
- OTP

Day 3

- Product CRUD
- Category CRUD

Day 4

- Inventory APIs

Day 5

- Sales APIs

Day 6

- Supplier APIs

Day 7

- Dashboard APIs

Day 8

- Prediction APIs

Day 9

- Reports APIs

---

# 16. Postman Testing Checklist

Authentication

- Register
- Login
- Logout
- Forgot Password
- Reset Password

Products

- Add Product
- Update Product
- Delete Product
- Search Product

Inventory

- Stock In
- Stock Out
- History

Sales

- Create Sale
- Get Sales

Suppliers

- CRUD Supplier

Reports

- Monthly Report
- Export CSV

Predictions

- Predict Product
- Predict All Products

---

# Deliverables

- Express Folder Structure
- Middleware Planning
- REST API Documentation
- Request/Response Examples
- Development Order
- Postman Checklist

**Next File:** `05_ML_GUIDE.md`
