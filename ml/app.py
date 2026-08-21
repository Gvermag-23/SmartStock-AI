from flask import Flask, jsonify, request
from flask_cors import CORS
from predictor import StockPredictor
import datetime

app = Flask(__name__)
CORS(app)

predictor = StockPredictor()

@app.route('/health', methods=['GET'])
def health():
    return jsonify({'status': 'OK', 'service': 'SmartStock ML Service'})

@app.route('/predict/<productId>', methods=['GET'])
def predict_product(productId):
    stock = int(request.args.get('stock', 50))
    price = float(request.args.get('price', 100))

    now = datetime.datetime.now()
    day_of_week = now.weekday()
    month = now.month

    result = predictor.predict_demand(day_of_week=day_of_week, month=month, stock=stock, price=price)

    return jsonify({
        'success': True,
        'productId': productId,
        'predictedDemand': result['predictedDemand'],
        'reorderQuantity': result['reorderQuantity'],
        'predictionDate': now.isoformat()
    })

@app.route('/predict/all', methods=['POST'])
def predict_all():
    data = request.json or {}
    products = data.get('products', [])

    results = []
    now = datetime.datetime.now()
    day_of_week = now.weekday()
    month = now.month

    for p in products:
        p_id = p.get('id', 'unknown')
        stock = p.get('stock', 50)
        price = p.get('price', 100)
        name = p.get('name', 'Product')

        res = predictor.predict_demand(day_of_week=day_of_week, month=month, stock=stock, price=price)
        results.append({
            'productId': p_id,
            'productName': name,
            'predictedDemand': res['predictedDemand'],
            'reorderQuantity': res['reorderQuantity'],
            'suggestion': f"Reorder {res['reorderQuantity']} units" if res['reorderQuantity'] > 0 else 'Stock Adequate'
        })

    return jsonify({'success': True, 'predictions': results})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
