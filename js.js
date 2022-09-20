let imgdiv = Array.from(document.querySelectorAll(".images .img"));
let startBtn = document.querySelector(".startGame span ");
let startDiv = document.querySelector(".startGame  ");
let startspan = document.querySelector(".startGame span");
let newGameBtn = document.querySelector(".MemoryGame button");
let imgs = document.querySelectorAll(".images img ");
let icons = document.querySelectorAll(".images i ");
let nameSpan = document.querySelector(".headData div:first-child span");
let wrongAnsSpan = document.querySelector(".headData div:last-child span");
let popup = document.querySelector(".startGame .popup");
let okBtn = document.querySelector(".startGame .popup button");
let inputName = document.querySelector(".startGame .popup input");
let audiosuccess = document.querySelector(".success");
let audiofail = document.querySelector(".fail");

//components
let wrongAnswers = 0;
let numOfTries = 0;
let try1, try2;
let prevIndex;

//start the game
startBtn.onclick = function () {
  //remove start btn
  startspan.style.display = "none";

  //display popup
  popup.style.display = "block";
};

//ok btn and start
okBtn.onclick = function () {
  // remove all popup
  popup.style.display = "none";
  startDiv.style.display = "none";

  //resort the array randomly using order property
  nameSpan.innerHTML = inputName.value || "Mahmoud";
  console.log(inputName.value);
  //display imgs for .5s
  setTimeout(function () {
    for (let i = 0; i < imgdiv.length; i++) {
      imgdiv[i].style.transform = "none";
    }
  }, 500);
};

//reload
newGameBtn.onclick = function () {
  window.location.reload();
};

//resort data
let itemsOrder = shuffle([...imgdiv.keys()]);
console.log(itemsOrder);
//   set order
imgdiv.forEach((element, index) => {
  element.style.order = itemsOrder[index];
});

//click on the icon "?"
document.onclick = function (e) {
  for (let index = 0; index < icons.length; index++) {
    if (e.target == icons[index]) {
      //increment tries count
      numOfTries++;

      //display the photo
      imgdiv[index].style.cssText +=
        "transform: translateX(-100%) rotateY(-180deg)";

      // first try
      if (numOfTries === 1) {
        try1 = icons[index].getAttribute("data-name");
        prevIndex = index;
      }

      //second try
      if (numOfTries === 2) {
        try2 = icons[index].getAttribute("data-name");
        numOfTries = 0;
        //not same photo
        if (try1 !== try2) {
          //increment wrong anses
          wrongAnswers++;

          //make sync
          setTimeout(function () {
            imgdiv[prevIndex].style.transform = "none";
            imgdiv[index].style.transform = "none";
            wrongAnsSpan.innerHTML =
              wrongAnswers < 10 ? `0${wrongAnswers}` : wrongAnswers;
          }, 1000);
          //   audiofail.play();
          //   setTimeout(() => {
          //     audiofail.pause();
          //   }, 500);
        }

        // the same
        else {
          //   audiosuccess.play();
          //   setTimeout(() => {
          //     audiosuccess.pause();
          //   }, 500);
        }
      }
    }
  }
};
function shuffle(array) {
  let current = array.length;
  let rand;
  while (current) {
    rand = Math.floor(Math.random() * array.length);
    current--;
    [array[current], array[rand]] = [array[rand], array[current]];
  }
  return array;
}
