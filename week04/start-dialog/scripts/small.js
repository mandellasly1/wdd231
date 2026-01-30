const openButton = document.querySelector("#openButton");
const dialogBox = document.querySelector("#dialogBox");
const closeButton = document.querySelector("#closeButton");

// "Show the dialog" button open the dialog modally
openButton.addEventListener("click", () => {
    dialogBox.showModal();
});

// "Close" button closes the dialog 
closeButton.addEventListener("click", () => {
    dialogBox.close();
});