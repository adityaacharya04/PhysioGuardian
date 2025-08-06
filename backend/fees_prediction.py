import numpy as np
from sklearn.ensemble import RandomForestRegressor

# Sample data: [injury_type (encoded), location (encoded), rating, experience], fee
X = np.array([
    [0, 0, 4.5, 5, 100],
    [1, 1, 4.0, 2, 80],
    [0, 1, 4.8, 10, 150],
    [2, 0, 3.5, 1, 60],
    [1, 0, 4.2, 4, 90],
])
y = X[:, -1]
X = X[:, :-1]

# Injury type encoding: 0: back, 1: knee, 2: shoulder
# Location encoding: 0: urban, 1: rural

model = RandomForestRegressor(n_estimators=100, random_state=42)
model.fit(X, y)

def predict_fees(injury_type, location, rating, experience):
    # Encode input
    injury_encoded = {'back': 0, 'knee': 1, 'shoulder': 2}.get(injury_type, 0)
    location_encoded = {'urban': 0, 'rural': 1}.get(location, 0)

    features = np.array([[injury_encoded, location_encoded, rating, experience]])
    return model.predict(features)[0]
