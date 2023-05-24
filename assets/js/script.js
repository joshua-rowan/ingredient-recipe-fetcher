// Add event listener to the form when it is submitted
document.getElementById('user-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission behavior

    // Get the value entered in the 'ingredient' input field
    let ingredient = document.getElementById('ingredient').value;

    // Check if the ingredient field is empty
    if (ingredient === '') {
    } else {
        // Make a request to the Spoonacular API using fetch
        fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${ingredient}&apiKey=fa525252038c4c7b9eab77fa927efd6f`)
            .then(response => response.json()) // Parse the response as JSON
            .then(data => {
                // Display recipe data on the page
                document.getElementById('recipe-1').textContent = data.results[0].title;
            })
            .catch(error => console.error('Error:', error)); // Handle any errors that occur during the fetch request
    }
});
