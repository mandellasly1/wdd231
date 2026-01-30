const openButton = document.querySelector("#openButton");
const dialogBox = document.querySelector("#dialogBox");
const closeButton = document.querySelector("#closeButton");
const dialogBoxtext = document.querySelector("#dialogBox div");

// "Show the dialog" button open the dialog modally
openButton1.addEventListener("click", () => {
    dialogBox.showModal();
    dialogBoxtext.innerHTML = "One Apple contains 95 calories"
});

openButton2.addEventListener("click", () => {
    dialogBox.showModal();
    dialogBoxtext.innerHTML = "One Oranges contains 45 calories"
});

openButton3.addEventListener("click", () => {
    dialogBox.showModal();
    dialogBoxtext.innerHTML = "One Banana contains 105 calories"
});

// "Close" button closes the dialog 
closeButton.addEventListener("click", () => {
    dialogBox.close();
});