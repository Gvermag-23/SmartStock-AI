import os
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
import joblib

def train_model():
    base_dir = os.path.dirname(os.path.abspath(__file__))
    dataset_path = os.path.join(base_dir, 'dataset', 'sales_data.csv')
    model_dir = os.path.join(base_dir, 'models')
    os.makedirs(model_dir, exist_ok=True)
    model_path = os.path.join(model_dir, 'demand_model.pkl')

    if not os.path.exists(dataset_path):
        print(f"[ML Train] Dataset not found at {dataset_path}")
        return

    df = pd.read_csv(dataset_path)
    df.dropna(inplace=True)

    X = df[['dayOfWeek', 'month', 'stock', 'price']]
    y = df['quantitySold']

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    model = LinearRegression()
    model.fit(X_train, y_train)

    score = model.score(X_test, y_test)
    print(f"[ML Train] Model trained with R^2 score: {score:.4f}")

    joblib.dump(model, model_path)
    print(f"[ML Train] Saved trained model to {model_path}")

if __name__ == '__main__':
    train_model()
