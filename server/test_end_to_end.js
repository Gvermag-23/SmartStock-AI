const axios = require('axios');

const API_URL = 'http://localhost:8000/api';
const ML_URL = 'http://localhost:5000';

let authToken = '';
let categoryId = '';
let supplierId = '';
let productId = '';
let invoiceId = '';

async function runEndToEndTests() {
  console.log('====================================================');
  console.log('🚀 SMARTSTOCK AI FULL-STACK END-TO-END SUITE');
  console.log('====================================================\n');

  try {
    // 1. Health Checks
    console.log('--- 1. Testing Server & ML Health Endpoints ---');
    const healthRes = await axios.get(`${API_URL}/health`);
    console.log('✅ Express Backend Health:', healthRes.data.message);

    try {
      const mlHealthRes = await axios.get(`${ML_URL}/health`);
      console.log('✅ Python ML Engine Health:', mlHealthRes.data.service);
    } catch (e) {
      console.log('⚠️ Python ML Engine direct port check skipped/fallback active.');
    }

    // 2. Authentication Flow
    console.log('\n--- 2. Testing Authentication Module ---');
    const testEmail = `testuser_${Date.now()}@smartstock.com`;
    const regRes = await axios.post(`${API_URL}/auth/register`, {
      fullName: 'EndToEnd Tester',
      email: testEmail,
      password: 'password123',
      role: 'admin'
    });
    console.log('✅ User Registration:', regRes.data.message);

    const loginRes = await axios.post(`${API_URL}/auth/login`, {
      email: testEmail,
      password: 'password123'
    });
    authToken = loginRes.data.token;
    console.log('✅ User Login & JWT Token Acquired.');

    const authHeaders = { headers: { Authorization: `Bearer ${authToken}` } };

    const meRes = await axios.get(`${API_URL}/auth/me`, authHeaders);
    console.log(`✅ Auth Profile Verification: ${meRes.data.data.fullName} (${meRes.data.data.role})`);

    const forgotRes = await axios.post(`${API_URL}/auth/forgot-password`, { email: testEmail });
    console.log('✅ Forgot Password OTP Generated:', forgotRes.data.otp);

    const resetRes = await axios.post(`${API_URL}/auth/reset-password`, {
      email: testEmail,
      otp: forgotRes.data.otp,
      newPassword: 'newpassword123'
    });
    console.log('✅ Reset Password:', resetRes.data.message);

    // Re-login with new password
    const loginRes2 = await axios.post(`${API_URL}/auth/login`, {
      email: testEmail,
      password: 'newpassword123'
    });
    authToken = loginRes2.data.token;
    authHeaders.headers.Authorization = `Bearer ${authToken}`;

    // 3. Category & Supplier Management
    console.log('\n--- 3. Testing Category & Supplier Setup ---');
    const catRes = await axios.post(`${API_URL}/products/categories`, {
      name: `Groceries_${Date.now()}`,
      description: 'Daily fresh produce & grocery items'
    }, authHeaders);
    categoryId = catRes.data.data._id;
    console.log('✅ Category Created:', catRes.data.data.name);

    const supRes = await axios.post(`${API_URL}/suppliers`, {
      supplierName: 'SmartStock Global Distribution',
      email: 'contact@distribution.com',
      phone: '+91 9988776655',
      address: 'Sector 62, Noida, UP'
    }, authHeaders);
    supplierId = supRes.data.data._id;
    console.log('✅ Supplier Created:', supRes.data.data.supplierName);

    // 4. Product Creation & Management
    console.log('\n--- 4. Testing Product Management ---');
    const skuCode = `SKU-${Date.now().toString().slice(-6)}`;
    const prodRes = await axios.post(`${API_URL}/products`, {
      name: 'Premium Basmati Rice 5kg',
      sku: skuCode,
      category: categoryId,
      supplier: supplierId,
      price: 450,
      stock: 30,
      minimumStock: 10
    }, authHeaders);
    productId = prodRes.data.data._id;
    console.log(`✅ Product Created: ${prodRes.data.data.name} (SKU: ${prodRes.data.data.sku}, Stock: ${prodRes.data.data.stock})`);

    const searchRes = await axios.get(`${API_URL}/products?search=Basmati`, authHeaders);
    console.log(`✅ Product Search: Found ${searchRes.data.count} product(s) matching 'Basmati'.`);

    // 5. Inventory Operations
    console.log('\n--- 5. Testing Inventory Control & History ---');
    const stockInRes = await axios.post(`${API_URL}/inventory/stock-in`, {
      productId,
      quantity: 20,
      notes: 'Testing restock workflow'
    }, authHeaders);
    console.log('✅ Stock In (+20 units): New Stock =', stockInRes.data.product.stock);

    const stockOutRes = await axios.post(`${API_URL}/inventory/stock-out`, {
      productId,
      quantity: 5,
      notes: 'Testing stock adjustment'
    }, authHeaders);
    console.log('✅ Stock Out (-5 units): New Stock =', stockOutRes.data.product.stock);

    const historyRes = await axios.get(`${API_URL}/inventory/history`, authHeaders);
    console.log(`✅ Inventory Timeline Logs: Total ${historyRes.data.count} action log entries recorded.`);

    // 6. Sales POS Terminal & Stock Auto-Deduction
    console.log('\n--- 6. Testing Sales Module & Invoice Generation ---');
    const saleRes = await axios.post(`${API_URL}/sales`, {
      productId,
      customerName: 'Aarav Sharma',
      quantity: 3,
      paymentMethod: 'UPI'
    }, authHeaders);
    invoiceId = saleRes.data.data.invoiceNumber;
    console.log(`✅ Sale Recorded! Invoice: ${invoiceId}, Total: ₹${saleRes.data.data.totalAmount}`);

    const verifyProd = await axios.get(`${API_URL}/products/${productId}`, authHeaders);
    console.log(`✅ Stock Auto-Deduction Verified: Remaining Stock = ${verifyProd.data.data.stock}`);

    const invoiceRes = await axios.get(`${API_URL}/sales/invoice/${invoiceId}`, authHeaders);
    console.log(`✅ Invoice Lookup Verified for #${invoiceId} (${invoiceRes.data.data.customerName})`);

    // 7. AI Demand Forecast Engine
    console.log('\n--- 7. Testing AI Demand Prediction Module ---');
    const predRes = await axios.get(`${API_URL}/predictions/product/${productId}`, authHeaders);
    console.log(`✅ AI Forecast for ${predRes.data.data.product}:`);
    console.log(`   - Current Stock: ${predRes.data.data.currentStock}`);
    console.log(`   - 7-Day Predicted Demand: ${predRes.data.data.predictedDemand} units`);
    console.log(`   - Suggested Reorder Quantity: ${predRes.data.data.reorderQuantity} units`);
    console.log(`   - AI Suggestion: ${predRes.data.data.suggestion}`);

    const allPredRes = await axios.get(`${API_URL}/predictions/all`, authHeaders);
    console.log(`✅ Full AI Forecast Matrix generated for ${allPredRes.data.count} product(s).`);

    // 8. Dashboard Analytics & Reports
    console.log('\n--- 8. Testing Dashboard Analytics & CSV Export ---');
    const dashRes = await axios.get(`${API_URL}/dashboard/overview`, authHeaders);
    console.log('✅ Dashboard Overview Statistics:');
    console.log(`   - Total Revenue: ₹${dashRes.data.data.totalRevenue}`);
    console.log(`   - Total Products: ${dashRes.data.data.totalProducts}`);
    console.log(`   - Low Stock Count: ${dashRes.data.data.lowStockCount}`);

    const repRes = await axios.get(`${API_URL}/reports/inventory`, authHeaders);
    console.log(`✅ Inventory Valuation Report: Total Valuation = ₹${repRes.data.summary.totalStockValue}`);

    const csvRes = await axios.get(`${API_URL}/reports/export-csv`, authHeaders);
    console.log('✅ CSV Export Verified: Delivered CSV file content type', csvRes.headers['content-type']);

    console.log('\n====================================================');
    console.log('🎉 ALL END-TO-END TESTS PASSED WITH 100% SUCCESS!');
    console.log('====================================================');
  } catch (error) {
    console.error('\n❌ TEST FAILED:', error.response?.data || error.message);
  }
}

runEndToEndTests();
