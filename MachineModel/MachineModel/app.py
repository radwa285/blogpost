from flask import Flask, request, jsonify
import joblib
import re

# Load the model and TF-IDF vectorizer
model = joblib.load('sentiment_model.pkl')
vectorizer = joblib.load('tfidf_vectorizer.pkl')

# Create Flask app
app = Flask(__name__)

# Function to clean text
def clean_text(text):
    text = re.sub(r"http\S+", "", text)
    text = re.sub(r"#\S+", "", text)
    text = re.sub(r"@\S+", "", text)
    text = re.sub(r"[^A-Za-z\s]", "", text)
    return text

# Endpoint for prediction
@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json(force=True)
        text = data['text']
        clean_text_data = clean_text(text)
        tfidf_text = vectorizer.transform([clean_text_data])
        prediction = model.predict(tfidf_text)
        return jsonify({'prediction': int(prediction[0])})
    except Exception as e:
        return jsonify({'error': str(e)}), 400

# Run the app
if __name__ == '__main__':
    app.run(debug=False)
