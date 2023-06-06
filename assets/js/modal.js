var modal = null;
var SPOONACULAR_KEY = "12d67bf5a22f4326810fa76a3d3c2793";

var allButtons = document.getElementsByClassName("button");
for (let i = 0; i < allButtons.length; i++) {
  var currentButton = allButtons[i];
  currentButton.addEventListener("click", showModal);
}

function showModal(event) {
  var parent = event.target.parentElement;
  var modalArea = parent.children[1];

  // Get the recipe id from the button's data-recipe-id attribute
  let recipeId = $(event.target).data("recipeId");

  // Fetch the recipe information from the Spoonacular API
  fetch(
    `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${SPOONACULAR_KEY}`
  )
    .then((response) => response.json()) // Convert the response to JSON
    .then((recipe) => {
      // Handle the JSON data
      let ingredientsList = "<ul>";
      recipe.extendedIngredients.forEach((ingredient) => {
        ingredientsList += "<li>" + ingredient.original + "</li>";
      });
      ingredientsList += "</ul>";

      // Fetch the recipe instructions from the Spoonacular API
      return fetch(
        `https://api.spoonacular.com/recipes/${recipeId}/analyzedInstructions?apiKey=${SPOONACULAR_KEY}`
      )
        .then((response) => response.json()) // Convert the response to JSON
        .then((instructionData) => {
          // Handle the JSON data
          let instructions = "<ol>";
          instructionData[0].steps.forEach((step) => {
            instructions += "<li>" + step.step + "</li>";
          });
          instructions += "</ol>";

          let modalContent = modalArea.querySelector(".modal-content");
          modalContent.innerHTML = "";
          modalContent.innerHTML =
            '<span class="close modal-item">&times;</span><h2>' +
            recipe.title +
            " ingredients:" +
            "</h2>" +
            ingredientsList +
            "<h3>Step by step guide:</h3>" +
            instructions;
          modalContent
            .querySelector(".close")
            .addEventListener("click", hideModal);
          modalArea.style.display = "block";

          setTimeout(() => {
            modal = modalArea;
          }, 1);
        });
    })
    .catch((error) => console.error("Error:", error));
}

window.onclick = function (event) {
  if (modal != null) {
    if (!event.target.classList.contains("modal-item"))
      modal.style.display = "none";
  }
};

var allSpans = document.getElementsByTagName("span");
for (let i = 0; i < allSpans.length; i++) {
  var currentSpan = allSpans[i];
  currentSpan.addEventListener("click", hideModal);
}

var allModals = document.getElementsByClassName("modal");
function hideModal(event) {
  var allModals = event.target.parentElement.parentElement;
  allModals.style.display = "none";
  modal = null;
}
