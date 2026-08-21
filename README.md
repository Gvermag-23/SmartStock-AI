
# SmartStock AI – README.md

> AI-Powered Inventory Management System built with **MERN + Basic Machine Learning**

## Project Overview

SmartStock AI is an intermediate full-stack inventory management system for small retail businesses.
It helps manage products, sales, inventory, suppliers, and provides AI-based demand prediction and reorder suggestions.

## Tech Stack

- React + Vite
- Tailwind CSS
- Node.js + Express
- MongoDB Atlas
- JWT Authentication
- Python (Flask + Scikit-learn)
- Recharts

## Features

### Authentication
- Login/Register
- Forgot Password (OTP)
- JWT Authentication
- Role-based Access (Admin, Manager, Staff)

### Dashboard
- KPI Cards
- Sales Analytics
- Low Stock Alerts
- Recent Activities

### Product Management
- CRUD Products
- Categories
- Product Images
- SKU
- Search & Filters

### Inventory
- Stock In / Stock Out
- Stock History
- Minimum Stock Alert

### Sales
- Record Sales
- Customer Details
- Invoice ID
- Sales History

### Supplier Management
- Supplier CRUD
- Contact Information
- Purchase History

### Reports
- Monthly Sales Report
- Inventory Report
- Export CSV

### AI Features
- Demand Prediction
- Reorder Suggestions
- Fast & Slow Moving Products

## Folder Structure

```text
smartstock-ai/
├── client/
├── server/
├── ml/
├── docs/
└── README.md
```

## Project Architecture

Frontend → Express API → MongoDB

Frontend → Express API → Python ML API → Prediction → Dashboard

## User Roles

### Admin
- Manage Users
- Products
- Suppliers
- Reports
- Dashboard

### Manager
- Products
- Inventory
- Sales
- Reports

### Staff
- Sales Entry
- Stock Update
- Inventory History

## Machine Learning

Input:
- Sales History
- Product Stock
- Date

Output:
- Predicted Demand
- Reorder Quantity

Model:
- Linear Regression

## Future Scope

- Barcode Scanner
- QR Code Inventory
- Email Notifications
- Razorpay Payment Integration

## Resume Description

Built a Smart Inventory Management System using the MERN Stack with AI-powered demand forecasting.
Implemented JWT authentication, role-based access control, inventory tracking, sales analytics, supplier management, CSV export, and a Python ML service for stock prediction.

---

## Documentation Series

This project contains the following documentation files inside `docs/`:

1. 01_PROJECT_PLANNING.md
2. 02_UI_UX_GUIDE.md
3. 03_DATABASE_SCHEMA.md
4. 04_BACKEND_API_GUIDE.md
5. 05_ML_GUIDE.md
6. 06_DEPLOYMENT_GUIDE.md

> This README is Part 1 of the SmartStock AI Master Documentation Series.
