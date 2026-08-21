const mongoose = require('mongoose');

const InventoryHistorySchema = new mongoose.Schema(
  {
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    action: {
      type: String,
      enum: ['Stock In', 'Stock Out', 'Sale', 'Manual Update'],
      required: true
    },
    quantity: { type: Number, required: true },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    notes: { type: String, default: '' }
  },
  { timestamps: true }
);

module.exports = mongoose.model('InventoryHistory', InventoryHistorySchema);
