// Add event listener to the form when it is submitted
$(document).ready(function(){
document.getElementById('user-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission behavior

    // Get the value entered in the 'ingredient' input field
    let ingredient = document.getElementById('ingredient').value;

    // Check if the ingredient field is empty
    if (ingredient === '') {
        displayError('Please enter an ingredient.');
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

    // Calls Youtube script
    videoSearch();

});

// Start of Youtube API script

    var YOUTUBE_KEY = "AIzaSyD8ErezZUPBFLnVZefQzomDWZSPrnWXGuo"
    
    function videoSearch() {

        $("#recipe-1-video").empty()

      
        var recipeTitle = $("#recipe-1")[0].textContent + " recipe";
        console.log(recipeTitle);
       
        var maxResults = 1
       

        $.get("https://www.googleapis.com/youtube/v3/search?key=" + YOUTUBE_KEY + '&type=video&part=snippet&maxResults=' + maxResults + '&q=' + recipeTitle,function(data){
            console.log(data)

            data.items.forEach(item => {
                var video = `
                <iframe width="420" height="315" scr="http://www.youtube.com/embed/${item.id.videoId}" frameborder="0" allowfullscreen></iframe>
                `
                console.log(video)

                $("#recipe-1-video").append(video)

            });
        })
    }
})
// End of Youtube API script