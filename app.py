from flask import Flask, request, render_template, jsonify
import json

app = Flask(__name__)

# Load FAQs from JSON file
with open('faq.json', 'r') as file:
    faqs = json.load(file)

def find_relevant_faqs(query):
    results = []
    for category, faqs_list in faqs.items():
        for faq in faqs_list:
            if query.lower() in faq['question'].lower() or query.lower() in faq['answer'].lower():
                results.append(faq)
    return results

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/search', methods=['POST'])
def search():
    query = request.json.get('query', '')
    if query:
        results = find_relevant_faqs(query)
        return jsonify(results)
    return jsonify([])

if __name__ == '__main__':
    app.run(debug=True)
