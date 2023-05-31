// Add event listener to the form when it is submitted
$(document).ready(function () {
    retrieveIngredients();
document.getElementById('user-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission behavior

    var SPOONACULAR_KEY = "fa525252038c4c7b9eab77fa927efd6f";
    let ingredient = $('#ingredient').val(); // Get the value entered in the 'ingredient' input field

    if (ingredient === '') {
      displayError('Please enter an ingredient.');
    } else {
      // Calls the ingredientStorage for local storage
      ingredientStorage(ingredient)
      
      fetch(
        `https://api.spoonacular.com/recipes/complexSearch?query=${ingredient}&apiKey=${SPOONACULAR_KEY}`
      )

        .then(response => response.json()) // Parse the response as JSON
        .then(data => {
          // Display recipe data on the page
          $('#recipe-1').text(data.results[0].title);
          $('#recipe-2').text(data.results[1].title);
          $('#recipe-3').text(data.results[2].title);
          $('#recipe-4').text(data.results[3].title);
          $('#recipe-5').text(data.results[4].title);
        })
        // Calls Youtube script
        .then(() => {
          videoSearch()
        })
        .catch(error => console.error('Error:', error)); // Handle any errors that occur during the fetch request
    }

  });

  // Start of Youtube API script
  var tag = document.createElement('script');
  tag.src = "https://www.youtube.com/player_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  var YOUTUBE_KEY = "AIzaSyBHA_8ZW1dMQRFMoF1vXgt2FIsaChA67VU"
  // AIzaSyClmA-vVU22gtzHVrndDe0hRL_GVocH7CQ 
  // AIzaSyBHA_8ZW1dMQRFMoF1vXgt2FIsaChA67VU

  var maxResults = 1

  function videoSearch() {

    for (let i = 1; i < 6; i++) {
      $(`#player-${i}-zone`).html(`<div id="ytplayer-${i}"></div> `);
    }

    for (let i = 1; i < 6; i++) {
      let temp = $(`#recipe-${i}`)[0].textContent + " recipe"
      $.get(`https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_KEY}&type=video&part=snippet&maxResults=${maxResults}&q=${temp}`, function (data) {

        var recipeId = data.items[0].id.videoId

        onYouTubePlayerAPIReady(i, recipeId)

      });
    }

  }

  var player;
  function onYouTubePlayerAPIReady(i, recipeId) {
    player = new YT.Player(`ytplayer-${i}`, {
      height: '150',
      width: '250',
      videoId: recipeId
    });
  }

});
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
