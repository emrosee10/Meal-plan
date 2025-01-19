// Fetch products from Open Food Facts based on user input
document.getElementById('diet-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const diet = document.getElementById('diet').value;
    const maxCalories = document.getElementById('maxCalories').value;
    const minProteins = document.getElementById('maxProteins').value;
    const searchTerm = document.getElementById('search').value;

    // Construct the API URL with parameters based on user input
    let apiUrl = `https://world.openfoodfacts.org/api/v2/search?categories=${searchTerm}&labels=${diet}&fields=product_name,nutriments,ingredients_text,labels`;
    
    if (maxCalories) {
        apiUrl += `&nutriments.calories.lt=${maxCalories}`;
    }
    if (minProteins) {
        apiUrl += `&nutriments.proteins.gt=${minProteins}`;
    }

    // Fetch data from Open Food Facts API
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const resultsContainer = document.getElementById('results');
            resultsContainer.innerHTML = ''; // Clear previous results

            // Display search results
            data.products.forEach(product => {
                const resultItem = document.createElement('div');
                resultItem.classList.add('result-item');

                const productName = product.product_name || 'No name available';
                const calories = product.nutriments ? product.nutriments.calories : 'N/A';
                const proteins = product.nutriments ? product.nutriments.proteins : 'N/A';
                const ingredients = product.ingredients_text || 'No ingredients available';
                const labels = product.labels ? product.labels.join(', ') : 'No labels available';

                resultItem.innerHTML = `
                    <h3>${productName}</h3>
                    <p><strong>Calories:</strong> ${calories}</p>
                    <p><strong>Proteins:</strong> ${proteins} g</p>
                    <p><strong>Ingredients:</strong> ${ingredients}</p>
                    <p><strong>Labels:</strong> ${labels}</p>
                `;

                resultsContainer.appendChild(resultItem);
            });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            document.getElementById('results').innerHTML = 'Error fetching data. Please try again later.';
        });
});
