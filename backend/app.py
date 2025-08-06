from flask import Flask, request, jsonify
from flask_cors import CORS
from recommendations import get_recommendations
from fees_prediction import predict_fees

app = Flask(__name__)
CORS(app)

@app.route('/')
def home():
    return "Hello from Flask!"

@app.route('/recommendations', methods=['POST'])
def recommendations():
    data = request.get_json()
    age = data.get('age')
    injury = data.get('injury')
    recommendations = get_recommendations(age, injury)
    return jsonify(recommendations)

@app.route('/predict-fees', methods=['POST'])
def predict_fees_route():
    data = request.get_json()
    injury_type = data.get('injury_type')
    location = data.get('location')
    rating = data.get('rating')
    experience = data.get('experience')
    predicted_fee = predict_fees(injury_type, location, rating, experience)
    return jsonify({'predicted_fee': predicted_fee})

if __name__ == '__main__':
    app.run(debug=True)
