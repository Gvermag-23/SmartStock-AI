
# 02_UI_UX_GUIDE.md

# SmartStock AI — Complete UI/UX Guide

Version: v1.0

This document is the complete frontend blueprint for SmartStock AI. Build every screen before connecting APIs.

---

# Design System

## Color Palette

| Purpose | Color |
|---------|-------|
| Primary | #2563EB |
| Success | #16A34A |
| Warning | #F59E0B |
| Danger | #DC2626 |
| Background | #F8FAFC |
| Dark Background | #0F172A |
| Card | White |

## Fonts

- Poppins
- Inter

## Icons

Use `react-icons` only.

---

# Layout Structure

Sidebar (Desktop)

- Dashboard
- Products
- Inventory
- Sales
- Suppliers
- Reports
- AI Forecast
- Settings
- Logout

Navbar

- Search Bar
- Notifications
- Theme Toggle
- User Avatar

---

# Screen List

1. Login
2. Register
3. Dashboard
4. Products
5. Add Product
6. Inventory
7. Sales
8. Supplier
9. Reports
10. Forecast
11. Notifications
12. Profile
13. Settings
14. Low Stock
15. Dark Dashboard

---

# Screen 1 — Login Page

## Components

- Logo
- Email Input
- Password Input
- Remember Me
- Login Button
- Forgot Password
- Register Link

## Validation

- Email Required
- Password Required
- Error Toast

---

# Screen 2 — Register Page

Fields

- Full Name
- Email
- Phone
- Password
- Confirm Password
- Role

---

# Screen 3 — Dashboard

## KPI Cards

- Total Products
- Total Revenue
- Low Stock
- Today's Sales

## Charts

- Sales Trend
- Revenue Trend
- Category Pie Chart

## Widgets

- Recent Activity
- Low Stock Products
- Top Selling Products

---

# Screen 4 — Product List

Table Columns

- Image
- Product Name
- SKU
- Category
- Stock
- Price
- Status
- Actions

Actions

- Edit
- Delete
- View

Features

- Search
- Filter
- Pagination

---

# Screen 5 — Add Product

Fields

- Product Image
- Name
- SKU
- Category
- Price
- Stock
- Minimum Stock
- Supplier

Buttons

- Save Product
- Reset

---

# Screen 6 — Inventory

Cards

- Available Stock
- Low Stock
- Out of Stock

Table

- Product
- Quantity
- Last Updated

Buttons

- Stock In
- Stock Out

---

# Screen 7 — Sales Module

Form

- Customer Name
- Product
- Quantity
- Payment Method

Table

- Invoice ID
- Customer
- Total
- Date

---

# Screen 8 — Supplier Module

Fields

- Supplier Name
- Email
- Phone
- Address

Table

- Supplier
- Products
- Contact

---

# Screen 9 — Reports

Cards

- Monthly Revenue
- Monthly Orders

Buttons

- Export CSV
- Download Report

---

# Screen 10 — AI Forecast

Cards

- Predicted Demand
- Suggested Reorder Quantity

Chart

- Next 7 Days Demand Forecast

Table

- Product
- Current Stock
- Prediction
- Suggestion

---

# Screen 11 — Notifications

Notification Types

- Low Stock
- Sale Completed
- New Product Added

---

# Screen 12 — Profile

Sections

- Personal Information
- Change Password
- Update Profile Image

---

# Screen 13 — Settings

Options

- Dark Mode
- Company Name
- Company Logo
- Email Settings

---

# Screen 14 — Low Stock Page

Table

- Product
- Current Stock
- Minimum Stock
- Supplier

Button

- Restock

---

# Screen 15 — Dark Dashboard

Same dashboard with Tailwind dark mode.

---

# Responsive Design

## Desktop

Sidebar visible.

## Tablet

Sidebar collapses.

## Mobile

Bottom navigation.

---

# Frontend Folder Structure

```text
src/
├── assets/
├── components/
│   ├── cards/
│   ├── charts/
│   ├── forms/
│   ├── navbar/
│   ├── sidebar/
│   └── tables/
├── layouts/
├── pages/
├── routes/
├── services/
├── utils/
└── context/
```

---

# Component Checklist

- Navbar
- Sidebar
- KPI Card
- Sales Chart
- Revenue Chart
- Product Table
- Inventory Table
- Supplier Table
- Notification Card
- Search Bar
- Filter Dropdown
- Theme Toggle

---

# Tailwind Components

Buttons

- Primary Button
- Secondary Button
- Danger Button

Inputs

- Text Input
- Password Input
- Search Input

Cards

- Analytics Card
- Info Card
- Alert Card

Tables

- Responsive Product Table
- Sales Table
- Supplier Table

---

# State Management

Use Context API.

Contexts

- AuthContext
- ThemeContext
- NotificationContext

---

# Page Development Order

1. Login
2. Dashboard Layout
3. Sidebar/Navbar
4. Product Pages
5. Inventory Pages
6. Sales Pages
7. Supplier Pages
8. Reports
9. Forecast
10. Settings

---

# Deliverables

After completing this document, the frontend UI is fully planned and ready for React implementation.

**Next File:** 03_DATABASE_SCHEMA.md
