const mongoose = require('mongoose');

const SupplierSchema = new mongoose.Schema(
  {
    supplierName: { type: String, required: true, trim: true },
    email: { type: String, default: '' },
    phone: { type: String, required: true },
    address: { type: String, default: '' }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Supplier', SupplierSchema);
