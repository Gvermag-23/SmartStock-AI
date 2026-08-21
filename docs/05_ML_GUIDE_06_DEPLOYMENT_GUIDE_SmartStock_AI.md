
# 05_ML_GUIDE.md

# SmartStock AI — Machine Learning Guide

**Version:** v1.0

**Tech Stack:** Python • Pandas • NumPy • Scikit-learn • Flask

---

# Table of Contents

1. ML Module Overview
2. Project Architecture
3. Folder Structure
4. Dataset Design
5. Data Collection
6. Data Cleaning
7. Feature Engineering
8. Model Selection
9. Training Pipeline
10. Flask Prediction API
11. Express Integration
12. Dashboard Integration
13. Future Improvements

---

# 1. ML Module Overview

The ML module predicts product demand using historical sales data.

## What AI Does

- Predict next week's demand.
- Suggest reorder quantity.
- Identify fast-moving products.
- Identify slow-moving products.

No deep learning is used.

---

# 2. Architecture

React Dashboard

↓

Express Backend

↓

Python Flask API

↓

Scikit-learn Model

↓

Prediction Result

---

# 3. ML Folder Structure

```text
ml/
├── app.py
├── predictor.py
├── train_model.py
├── requirements.txt
├── dataset/
│   └── sales_data.csv
└── models/
    └── demand_model.pkl
```

---

# 4. Python Packages

Install

```bash
pip install pandas numpy scikit-learn flask joblib
```

requirements.txt

```text
Flask
pandas
numpy
scikit-learn
joblib
```

---

# 5. Dataset Design

Create `sales_data.csv`.

Columns

| Column | Description |
|--------|-------------|
| date | Sale date |
| product | Product name |
| category | Category |
| quantitySold | Units sold |
| stock | Stock available |
| price | Selling price |
| dayOfWeek | Monday–Sunday |
| month | Month number |

Example

| date | product | quantitySold | stock |
|------|---------|--------------|------|
|2026-08-01|Rice|12|100|
|2026-08-02|Rice|18|88|
|2026-08-03|Rice|15|70|

---

# 6. Data Cleaning

Steps

- Remove null values.
- Convert date column.
- Extract day and month.
- Remove duplicate rows.

Libraries

- pandas
- numpy

---

# 7. Feature Engineering

Input Features

- Day of Week
- Month
- Current Stock
- Previous Sales
- Price

Target

- Quantity Sold

---

# 8. Model Selection

## Linear Regression

Purpose

Predict product demand.

Why?

- Easy to understand.
- Fast training.
- Good for beginner ML projects.

Alternative

Random Forest Regressor.

---

# 9. Training Pipeline

Steps

1. Load CSV.
2. Split train/test.
3. Train model.
4. Save using Joblib.

Output

`models/demand_model.pkl`

---

# 10. Flask Prediction API

## Endpoint

GET `/predict/<productId>`

Returns

```json
{
 "product":"Rice",
 "predictedDemand":75,
 "reorderQuantity":30
}
```

Response Fields

- predictedDemand
- reorderQuantity
- predictionDate

---

# 11. Express Integration

Backend Route

GET `/api/predictions/product/:id`

Flow

Express fetches sales history.

Sends request to Flask API.

Returns prediction to React.

---

# 12. Dashboard Integration

Cards

- Predicted Demand
- Reorder Suggestion

Chart

Next 7-Day Forecast.

Table

| Product | Current Stock | Prediction | Suggestion |
|---------|---------------|------------|------------|
| Rice | 30 | 75 | Buy 45 |
| Milk | 15 | 40 | Buy 30 |

---

# 13. Fast vs Slow Moving Products

Logic

Sort products by monthly sales.

Top 5

Fast Moving.

Bottom 5

Slow Moving.

Dashboard widgets use this data.

---

# 14. Reorder Suggestion Formula

Reorder Quantity

= Predicted Demand - Current Stock + Safety Stock

Safety Stock

Example: 10 units.

---

# 15. ML API Testing

Test Cases

- Product Exists.
- Product Doesn't Exist.
- Empty Sales History.

Expected Error Response

```json
{
 "success":false,
 "message":"Prediction unavailable"
}
```

---

# 16. Future ML Improvements

- Seasonal Forecasting.
- Holiday Sales Prediction.
- XGBoost Model.
- Supplier Lead-Time Prediction.

---

# Deliverables

- Dataset Design
- ML Pipeline
- Flask API
- Dashboard Integration

---

# 06_DEPLOYMENT_GUIDE.md

# SmartStock AI — Deployment Guide

---

# Deployment Architecture

Frontend → Vercel

Backend → Render

Database → MongoDB Atlas

ML API → Render

---

# Environment Variables

## Frontend

```env
VITE_API_URL=https://backend-url.onrender.com/api
```

## Backend

```env
PORT=8000
MONGODB_URI=...
JWT_SECRET=...
ML_API_URL=https://ml-api.onrender.com
```

## ML API

```env
MODEL_PATH=models/demand_model.pkl
```

---

# MongoDB Atlas Setup

1. Create Cluster.
2. Create Database `smartstock-ai-db`.
3. Add Network Access.
4. Create Database User.
5. Copy Connection String.

---

# Backend Deployment (Render)

Steps

1. Push GitHub repo.
2. Create Web Service.
3. Select server folder.
4. Add environment variables.
5. Deploy.

---

# Frontend Deployment (Vercel)

Steps

1. Import GitHub repo.
2. Select client folder.
3. Add VITE_API_URL.
4. Deploy.

---

# ML API Deployment

Deploy Flask app separately on Render.

Expose `/predict` endpoint.

---

# Production Checklist

- MongoDB Connected
- JWT Working
- CORS Configured
- Environment Variables Added
- Image Upload Working
- Prediction API Connected

---

# GitHub Repository Checklist

- README.md
- Screenshots
- Documentation Folder
- Environment Example
- .gitignore
- License

---

# Resume Description

Built SmartStock AI using React, Node.js, Express, MongoDB, Tailwind CSS, JWT Authentication, Recharts, and Python Flask with Scikit-learn for demand prediction. Implemented role-based inventory management, analytics dashboard, supplier management, reports export, and AI-powered reorder suggestions.

---

# Final Deliverables

- README.md
- Project Planning
- UI/UX Guide
- Database Schema
- Backend API Guide
- ML Guide
- Deployment Guide

**SmartStock AI Documentation Series Completed.**
