
# 03_DATABASE_SCHEMA.md

# SmartStock AI — Complete MongoDB Database Schema Guide

**Version:** v1.0

**Tech Stack:** MongoDB Atlas + Mongoose

---

# Table of Contents

1. Database Overview
2. Collections Overview
3. ER Relationship
4. Users Collection
5. Categories Collection
6. Products Collection
7. Suppliers Collection
8. Sales Collection
9. Inventory History Collection
10. Predictions Collection
11. Database Indexes
12. Validation Rules
13. Sample Documents
14. Data Flow

---

# 1. Database Overview

SmartStock AI uses **MongoDB Atlas** with **7 collections**.

### Why MongoDB?

- Flexible schema.
- Easy integration with Mongoose.
- Fast CRUD operations.
- Perfect for MERN applications.

---

# 2. Collections Overview

| Collection | Purpose |
|------------|---------|
| users | Authentication & roles |
| categories | Product categories |
| products | Inventory items |
| suppliers | Supplier information |
| sales | Sales history |
| inventoryHistory | Stock movement history |
| predictions | ML prediction results |

---

# 3. ER Relationship (Text Diagram)

```text
Users
  |
  | creates
  |
Products -------- Categories
   |
   | supplied by
   |
Suppliers
   |
   | sold as
   |
Sales
   |
InventoryHistory
   |
Predictions
```

---

# 4. Users Collection

Purpose: Authentication and authorization.

## Fields

| Field | Type | Required |
|-------|------|----------|
| fullName | String | Yes |
| email | String | Yes |
| password | String | Yes |
| role | String | Yes |
| avatar | String | No |
| isVerified | Boolean | Yes |
| createdAt | Date | Auto |

## Roles

- Admin
- Manager
- Staff

### Sample Document

```json
{
  "fullName":"Gaurav Verma",
  "email":"gaurav@email.com",
  "role":"admin",
  "isVerified":true
}
```

Indexes

- email (unique)

---

# 5. Categories Collection

Purpose: Organize products.

Fields

| Field | Type |
|-------|------|
| name | String |
| description | String |

Example

```json
{
  "name":"Groceries",
  "description":"Daily grocery products"
}
```

---

# 6. Products Collection

Purpose: Store inventory products.

## Fields

| Field | Type |
|-------|------|
| name | String |
| sku | String |
| category | ObjectId |
| supplier | ObjectId |
| price | Number |
| stock | Number |
| minimumStock | Number |
| image | String |
| status | String |

### Status Values

- In Stock
- Low Stock
- Out of Stock

### Example

```json
{
 "name":"Rice",
 "sku":"RIC1001",
 "price":60,
 "stock":120,
 "minimumStock":25
}
```

Indexes

- sku unique.
- category index.

---

# 7. Suppliers Collection

Purpose: Store supplier information.

Fields

| Field | Type |
|-------|------|
| supplierName | String |
| email | String |
| phone | String |
| address | String |

Example

```json
{
 "supplierName":"ABC Traders",
 "phone":"9876543210"
}
```

---

# 8. Sales Collection

Purpose: Record every sale.

Fields

| Field | Type |
|-------|------|
| product | ObjectId |
| customerName | String |
| quantity | Number |
| totalAmount | Number |
| paymentMethod | String |
| invoiceNumber | String |
| soldBy | ObjectId |
| saleDate | Date |

Example

```json
{
 "customerName":"Rahul",
 "quantity":2,
 "paymentMethod":"UPI"
}
```

Indexes

- saleDate
- product

---

# 9. Inventory History Collection

Purpose: Track stock movement.

Fields

| Field | Type |
|-------|------|
| product | ObjectId |
| action | String |
| quantity | Number |
| updatedBy | ObjectId |
| createdAt | Date |

Action values

- Stock In
- Stock Out
- Sale
- Manual Update

Example

```json
{
 "action":"Stock In",
 "quantity":50
}
```

---

# 10. Predictions Collection

Purpose: Store ML results.

Fields

| Field | Type |
|-------|------|
| product | ObjectId |
| predictedDemand | Number |
| reorderQuantity | Number |
| predictionDate | Date |

Example

```json
{
 "predictedDemand":80,
 "reorderQuantity":30
}
```

---

# 11. Database Indexes

| Collection | Index |
|------------|-------|
| users | email |
| products | sku |
| products | category |
| sales | saleDate |
| sales | product |
| predictions | predictionDate |

---

# 12. Validation Rules

Products

- Stock cannot be negative.
- Price greater than zero.
- SKU unique.

Users

- Email unique.
- Password minimum 8 characters.

Sales

- Quantity greater than zero.
- Product required.

---

# 13. Sample Data Flow

## Product Creation

Admin adds product.

Products collection updated.

## Sale

Staff creates sale.

Sales collection updated.

InventoryHistory records stock out.

Products stock decreases.

## Prediction

Backend sends sales history to Python.

Python predicts demand.

Prediction saved in predictions collection.

---

# 14. MongoDB Atlas Collections Structure

```text
smartstock-ai-db

users
categories
products
suppliers
sales
inventoryHistory
predictions
```

---

# Deliverables Completed

- Database Design
- Collections
- Relationships
- Sample Documents
- Validation Rules
- Index Strategy

**Next File:** `04_BACKEND_API_GUIDE.md`
