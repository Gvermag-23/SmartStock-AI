import os
import joblib
import numpy as np

class StockPredictor:
    def __init__(self):
        base_dir = os.path.dirname(os.path.abspath(__file__))
        self.model_path = os.path.join(base_dir, 'models', 'demand_model.pkl')
        self.model = None
        self.load_model()

    def load_model(self):
        if os.path.exists(self.model_path):
            try:
                self.model = joblib.load(self.model_path)
                print("[ML Predictor] Model loaded successfully.")
            except Exception as e:
                print(f"[ML Predictor] Error loading model: {e}")

    def predict_demand(self, day_of_week=3, month=8, stock=50, price=100):
        if self.model is None:
            # Fallback estimation heuristic if model pickle is missing
            daily = max(5, int(stock * 0.15))
        else:
            features = np.array([[day_of_week, month, stock, price]])
            pred = self.model.predict(features)[0]
            daily = max(1, int(round(pred)))

        weekly_demand = daily * 7
        safety_stock = 10
        reorder_quantity = max(0, weekly_demand - stock + safety_stock)

        return {
            'predictedDemand': weekly_demand,
            'reorderQuantity': reorder_quantity,
            'safetyStock': safety_stock
        }
