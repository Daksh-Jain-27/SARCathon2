async function searchFaq() {
    const query = document.getElementById('query').value;
    const response = await fetch('/search', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: query })
    });
    const faqs = await response.json();
    displayResults(faqs);
}

function displayResults(faqs) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';
    if (faqs.length === 0) {
        resultsDiv.innerHTML = '<p>No matching FAQs found.</p>';
    } else {
        faqs.forEach(faq => {
            const faqDiv = document.createElement('div');
            faqDiv.classList.add('faq-item');
            faqDiv.innerHTML = `<h4>${faq.question}</h4><p>${faq.answer}</p>`;
            resultsDiv.appendChild(faqDiv);
        });
    }
}
