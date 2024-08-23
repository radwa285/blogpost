import pandas as pd
import re
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, classification_report
import joblib
import os
from imblearn.over_sampling import SMOTE

# Read data from CSV file
data = pd.read_csv("tweets.csv")

# Clean text function: removes URLs, hashtags, mentions, and non-letter characters
def clean_text(text):
    text = re.sub(r"http\S+", "", text)  
    text = re.sub(r"#\S+", "", text)     
    text = re.sub(r"@\S+", "", text)    
    text = re.sub(r"[^A-Za-z\s]", "", text)  
    return text

data['clean_tweet'] = data['tweet'].apply(clean_text)


#print("Original and Cleaned Text:")
#print(data[['tweet', 'clean_tweet']].head())


# Split data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(data['clean_tweet'], data['label'], test_size=0.2, random_state=42)

# Transform text data to TF-IDF features
vectorizer = TfidfVectorizer(max_features=5000)
X_train_tfidf = vectorizer.fit_transform(X_train)
X_test_tfidf = vectorizer.transform(X_test)


# Apply SMOTE to balance the dataset
smote = SMOTE(random_state=42)
X_train_resampled, y_train_resampled = smote.fit_resample(X_train_tfidf, y_train)



# Build and train the logistic regression model
model = LogisticRegression(max_iter=1000)
model.fit(X_train_resampled, y_train_resampled)

# Predict and evaluate the model
y_pred = model.predict(X_test_tfidf)
accuracy = accuracy_score(y_test, y_pred)
report = classification_report(y_test, y_pred)

print('Accuracy:', accuracy)
print(report)


# Save the model in the current directory
model_path = os.path.join(os.getcwd(), 'sentiment_model.pkl')
vectorizer_path = os.path.join(os.getcwd(), 'tfidf_vectorizer.pkl')

joblib.dump(model, model_path)
joblib.dump(vectorizer, vectorizer_path)

