var modal = null;
var SPOONACULAR_KEY = 'b2632f0e4a134023bd9e442f179164f5';

var allButtons = document.getElementsByClassName("button");
console.log(allButtons);
for (let i = 0; i < allButtons.length; i++) {
  var currentButton = allButtons[i];
  currentButton.addEventListener("click", showModal);
}

function showModal(event) {
  console.log(event);
  console.log(event.target);
  var parent = event.target.parentElement;
  console.log(parent);
  var modalArea = parent.children[1];
  console.log(modalArea);

   // Get the recipe id from the button's data-recipe-id attribute
  let recipeId = $(event.target).data('recipeId');

  // Fetch the recipe information from the Spoonacular API
  fetch(`https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${SPOONACULAR_KEY}`)
    .then(response => response.json())  // Convert the response to JSON
    .then(recipe => {  // Handle the JSON data
   let ingredientsList = '<ul>';
   recipe.extendedIngredients.forEach(ingredient => {
   ingredientsList += '<li>' + ingredient.original + '</li>';
     });
     ingredientsList += '</ul>';
  
  let modalContent = modalArea.querySelector(".modal-content");
  modalContent.innerHTML = '';
  modalContent.innerHTML = '<span class="close modal-item">&times;</span><h2>' + recipe.title + '</h2>' + ingredientsList;
  modalContent.querySelector(".close").addEventListener("click", hideModal);
  modalArea.style.display = "block";
  
  setTimeout(() => {
    modal = modalArea;
  }, 1);
})
.catch(error => console.error('Error:', error)); 
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
  console.log(event);
  console.log(event.target);
  var allModals = event.target.parentElement.parentElement;
  allModals.style.display = "none";
  modal = null;
}
