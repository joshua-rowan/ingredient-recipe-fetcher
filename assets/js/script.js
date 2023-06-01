// Add event listener to the form when it is submitted
$(document).ready(function(){
  //retrieveIngredients();
document.getElementById('user-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission behavior

    var SPOONACULAR_KEY = "7e276a12a73b44419214ef5b1b3f773a";
    let ingredient = $('#ingredient').val(); // Get the value entered in the 'ingredient' input field

    if (ingredient === '') {
      displayError('Please enter an ingredient.');
    } else {
      // Calls the ingredientStorage for local storage
      //ingredientStorage(ingredient)
      
      fetch(
        `https://api.spoonacular.com/recipes/complexSearch?query=${ingredient}&apiKey=${SPOONACULAR_KEY}`
      )
        .then(response => response.json()) // Parse the response as JSON
        .then(data => {
          // Display recipe data on the page
          // Display recipe images on the page
        
          $('#recipe-1').text(data.results[0].title);
          $('#recipe-1-img').attr("src", data.results[0].image);
        
          $('#recipe-2').text(data.results[1].title);
          $('#recipe-1-img').attr("src", data.results[1].image);

          $('#recipe-3').text(data.results[2].title);
          $('#recipe-1-img').attr("src", data.results[2].image);

          $('#recipe-4').text(data.results[3].title);
          $('#recipe-1-img').attr("src", data.results[3].image);

          $('#recipe-5').text(data.results[4].title);
          $('#recipe-1-img').attr("src", data.results[4].image);

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
                <iframe width="420" height="315" src="http://www.youtube.com/embed/${item.id.videoId}" frameborder="0" allowfullscreen></iframe>
                `
                console.log(video)

                $("#recipe-1-video").append(video)

            });
        })
    }
})
// End of Youtube API script

//Previous Search Storage and Retrieval

function ingredientStorage(ingredient) {
  let searches = localStorage.getItem("ingredientSearches");

  if (searches) {
    searches = JSON.parse(searches);

    if(!searches.includes(ingredient)) {
      searches.push(ingredient);
    }
  } else {
    searches = [ingredient];
  }

  localStorage.setItem("ingredientSearches", JSON.stringify(searches));
};

function retrieveIngredients() {
  let searches = localStorage.getItem("ingredientSearches");

  if (searches) {
    searches = JSON.parse(searches);

    let oldSearchesDiv = document.getElementById("old-searches");

    oldSearchesDiv.innerHTML = "";

    searches.forEach(function(ingredient) {
      let button = document.createElement("button");
      button.textContent = ingredient;
      button.classList.add("btn", "btn-primary", "mb-2", "old-search-btn");
      button.style.backgroundColor = "#6c757d";

      button.addEventListener("click", function() {
        document.getElementById("ingredient").value = ingredient;
        document.getElementById("user-form").dispatchEvent(new Event("submit"));
      });

      let buttonContainer = document.createElement("div");
      buttonContainer.classList.add("d-grid");
      buttonContainer.appendChild(button);

      oldSearchesDiv.appendChild(buttonContainer);
    })
  }
}
