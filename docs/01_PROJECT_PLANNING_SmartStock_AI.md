
# 01_PROJECT_PLANNING.md

# SmartStock AI — Complete Project Planning (Part 1)

**Project Version:** v1.0

**Difficulty:** Intermediate (6.5/10)

**Tech Stack:** MERN + Basic Machine Learning (Python)

---

# Table of Contents

1. Project Vision
2. Problem Statement
3. Project Objectives
4. User Roles
5. Features
6. Functional Requirements
7. Non-Functional Requirements
8. Project Modules
9. Folder Structure
10. Development Roadmap
11. Git Commit Plan
12. Project Milestones

---

# 1. Project Vision

SmartStock AI is an inventory management application designed for small businesses such as grocery stores, pharmacies, electronics shops, and retail stores.

The goal is to replace Excel/manual inventory tracking with a smart web application that predicts stock demand and suggests when to reorder products.

---

# 2. Problem Statement

Traditional inventory systems only store stock information.

Problems:

- Stock runs out unexpectedly.
- Overstock wastes money.
- No prediction of future demand.
- Managers manually analyze sales.

SmartStock AI solves these issues using analytics and basic machine learning.

---

# 3. Project Objectives

## Business Goals

- Reduce stock shortages.
- Reduce overstock.
- Improve inventory visibility.
- Provide sales analytics.

## Technical Goals

- Build a complete MERN application.
- Implement role-based authentication.
- Create REST APIs.
- Integrate Python ML prediction API.

---

# 4. User Roles

## Admin

Permissions:

- Manage users.
- Manage products.
- Manage categories.
- Manage suppliers.
- View dashboard.
- View reports.

## Manager

Permissions:

- Manage products.
- Update inventory.
- Record sales.
- View reports.
- View AI predictions.

## Staff

Permissions:

- Record sales.
- Update stock.
- View inventory.
- View assigned products.

---

# 5. Feature List

## Authentication

- Register
- Login
- Logout
- Forgot Password
- Reset Password
- JWT Authentication

## Dashboard

- KPI Cards
- Sales Chart
- Revenue Chart
- Low Stock Alerts
- Recent Activities

## Product Management

- Add Product
- Update Product
- Delete Product
- Product Images
- Search
- Filters

## Inventory

- Stock In
- Stock Out
- Stock History
- Minimum Stock Alert

## Sales

- Record Sale
- Sales History
- Invoice Number
- Customer Name

## Suppliers

- Supplier CRUD
- Supplier Details
- Supplier History

## Reports

- Monthly Sales Report
- Inventory Report
- CSV Export

## AI Features

- Demand Prediction
- Reorder Suggestions
- Fast Moving Products
- Slow Moving Products

---

# 6. Functional Requirements

### Authentication

Users must log in securely using JWT tokens.

### Products

Admin and Manager can manage products.

### Inventory

Every stock change creates a history record.

### Dashboard

Dashboard displays live analytics from MongoDB.

### ML Module

Sales history is sent to Python API for prediction.

---

# 7. Non-Functional Requirements

- Responsive UI
- Secure JWT Authentication
- MongoDB Atlas Cloud Database
- RESTful API Architecture
- Error Handling
- Input Validation

---

# 8. Project Modules

| Module | Status |
|--------|--------|
| Authentication | Phase 1 |
| Dashboard | Phase 6 |
| Products | Phase 2 |
| Inventory | Phase 3 |
| Sales | Phase 4 |
| Suppliers | Phase 5 |
| Reports | Phase 6 |
| AI Prediction | Phase 7 |

---

# 9. Folder Structure

```text
client/
  assets/
  components/
  layouts/
  pages/
  routes/
  services/
  utils/

server/
  config/
  controllers/
  middleware/
  models/
  routes/
  services/
  utils/

ml/
  app.py
  predictor.py
  train_model.py
```

---

# 10. Development Roadmap

## Day 1

- GitHub repository
- React setup
- Express setup
- MongoDB connection
- Tailwind CSS

## Day 2

- Authentication
- JWT
- OTP Reset Password

## Day 3

- Product CRUD
- Categories
- Search
- Image Upload

## Day 4

- Inventory Module
- Stock History
- Low Stock Alerts

## Day 5

- Sales Module
- Dashboard Cards
- Revenue Graph

## Day 6

- Supplier Module
- Reports
- CSV Export

## Day 7

- AI Prediction API
- Demand Forecast

## Day 8

- Connect ML with Dashboard

## Day 9

- Dark Mode
- Notifications
- Responsive UI

## Day 10

- Deployment
- GitHub README
- Resume Content

---

# 11. Git Commit Plan

```text
Initial project setup
Setup Tailwind CSS
Complete authentication module
Build product CRUD
Add inventory module
Create sales module
Add supplier module
Build dashboard analytics
Integrate ML prediction
Add reports export
Responsive UI improvements
Deploy project
```

---

# 12. Project Milestones

### Milestone 1

Authentication complete.

### Milestone 2

Inventory CRUD complete.

### Milestone 3

Sales dashboard working.

### Milestone 4

AI demand prediction integrated.

### Milestone 5

Project deployed on Vercel + Render + MongoDB Atlas.

---

# Deliverables After Part 1

- README.md
- Project Planning
- Git Workflow
- Roadmap
- Folder Structure

**Next File:** `02_UI_UX_GUIDE.md`
