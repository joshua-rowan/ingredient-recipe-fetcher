// Get the modal
var modal = null;

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
  setTimeout(() => {
    modal = modalArea;
  }, 1);
}

// work on this functionality
window.onclick = function (event) {
  if (modal != null) {
    if (!event.target.classList.contains("modal-item"))
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
  var allModals = event.target.parentElement.parentElement;
  allModals.style.display = "none";
  modal = null;
}
