// Get the modal

// Get the button that opens the modal
var btn1 = document.getElementById("myBtn-1");
var btn2 = document.getElementById("myBtn-2");
var btn3 = document.getElementById("myBtn-3");
var btn4 = document.getElementById("myBtn-4");
var btn5 = document.getElementById("myBtn-5");

// Get the <span> element that closes the modal

// When the user clicks on the button, open the modal

// added the code below
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
  modalArea.style.display = "block";
}

// work on this functionality
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

// added below
var allSpans = document.getElementsByTagName("span");
for (let i = 0; i < allSpans.length; i++) {
  var currentSpan = allSpans[i];
  currentSpan.addEventListener("click", hideModal);
}

// the modal is still open even though the content disappears
var allModals = document.getElementsByClassName("modal");
function hideModal(event) {
  console.log(event);
  console.log(event.target);
  var allModals = event.target.parentElement;
  allModals.style.display = "none";
}
