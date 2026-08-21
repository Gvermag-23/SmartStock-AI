const mongoose = require('mongoose');

const PredictionSchema = new mongoose.Schema(
  {
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    predictedDemand: { type: Number, required: true },
    reorderQuantity: { type: Number, required: true },
    predictionDate: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Prediction', PredictionSchema);
