//Start the game
let boxes = Array.from(document.querySelectorAll(".box"));
let dataValue = Array.from(document.querySelectorAll(".box"));
let showTurn = document.querySelector(".showTurn");
let gameMessage = Array.from(document.querySelectorAll(".gameMessage"));
let resetGame = document.getElementById("resetGame");
let winningLine = document.getElementById("winningLine");
let wrapper = document.querySelector(".wrapper");
let xAudio = new Audio("./media/x.mp3");
let oAudio = new Audio("./media/o.mp3");
let winAudio = new Audio("./media/winner.mp3");
let drawAudio = new Audio("./media/draw.mp3");
let audioIcon = document.querySelector(".audioIcon");
let audioProfile = true;
let turn = "X";
let isGameOver = false;
let isDraw = false;

let addMessage = () => {
  let messageBox = document.querySelector(".messageBox");
  let message = document.querySelector(".message p");
  messageBox.classList.add("active");

  if (isGameOver) {
    message.innerText = "WINNER!";
  } else {
    message.innerText = "DRAW!";
  }

  setTimeout(() => {
    message.classList.add("active");
  }, 1200);
};

// onLoad functin
window.addEventListener("load", () => {
  setTimeout(() => {
    wrapper.style.opacity = "1";
    wrapper.style.transform = "scale(1)";
    showTurn.style.opacity = "1";
    audioIcon.style.opacity = ".7";
  }, 500);
});

//to change the turn
const changeTurn = () => {
  return turn === "X" ? (turn = "0") : (turn = "X");
};

//to check win
const checkWin = () => {
  const winArray = [
    [0, 1, 2, 0, 75, 0],
    [0, 3, 6, -165, 245, 90],
    [0, 4, 8, 0, 245, 45],
    [1, 4, 7, 0, 245, 90],
    [3, 4, 5, 0, 245, 0],
    [6, 7, 8, 0, 415, 0],
    [2, 5, 8, 165, 245, 90],
    [2, 4, 6, 0, 245, -45],
  ];

  winArray.forEach((e) => {
    if (
      dataValue[e[0]].dataset.value === dataValue[e[1]].dataset.value &&
      dataValue[e[1]].dataset.value === dataValue[e[2]].dataset.value &&
      dataValue[e[0]].dataset.value !== "" &&
      dataValue[e[0]].dataset.value != null
    ) {
      //to change the win images
      turn === "X"
        ? gameMessage
            .find((e) => e.getAttribute("data-tag") === "X")
            .classList.add("active")
        : gameMessage
            .find((e) => e.getAttribute("data-tag") === "0")
            .classList.add("active");

      audioProfile ? winAudio.play() : false;
      isGameOver = true;
      winningLine.style.transform = `translate(${e[3]}px, ${e[4]}px) rotate(${e[5]}deg)`;
      winningLine.style.opacity = "1";
      setTimeout(() => {
        addMessage();
      }, 1200);
    } else {
      //to check draw
      let checkForDraw = dataValue.every(
        (e) => e.dataset.value != "" && e.dataset.value != undefined
      );
      setTimeout(() => {
        if (checkForDraw && !isGameOver) {
          audioProfile ? drawAudio.play() : false;
          isDraw = true;
          gameMessage.map((e) => e.classList.add("active"));
          addMessage();
        }
      }, 700);
    }
  });
};

//calling functions (Main function)
boxes.map((element) => {
  let boxImg = element.querySelector(".turnVal");
  element.addEventListener("click", () => {
    if (
      (element.getAttribute("data-Value") === "" ||
        element.getAttribute("data-Value") === null) &&
      !isGameOver
    ) {
      element.setAttribute("data-Value", turn);
      boxImg.style.opacity = "1";

      if (turn === "X") {
        element.style.background = "#000";
        boxImg.src = "/media/x.gif";
        audioProfile ? xAudio.play() : false;
        setTimeout(() => {
          boxImg.src = "/media/x.png";
        }, 1400);
      } else {
        element.style.background = "#fff";
        boxImg.src = "/media/o.gif";
        audioProfile ? oAudio.play() : false;
        setTimeout(() => {
          boxImg.src = "/media/O.png";
        }, 1800);
      }

      checkWin();
      changeTurn();
      if (!isGameOver) {
        Array.from(showTurn.children).map((e) => e.classList.remove("active"));
        turn === "X"
          ? Array.from(showTurn.children)
              .find((e) => e.getAttribute("class") === "X-turn")
              .classList.add("active")
          : Array.from(showTurn.children)
              .find((e) => e.getAttribute("class") === "O-turn")
              .classList.add("active");
        // Array.from(showTurn.children).find(e => e.getAttribute("class") === "X-turn").classList.add("active")
      }
    }
  });
});

//for reset button
resetGame.addEventListener("click", () => {
  window.location.reload();
});

//for audio button
audioIcon.addEventListener("click", (e) => {
  let volume = e.target.querySelector("#volume");
  let mute = e.target.querySelector("#mute");

  if (audioProfile) {
    volume.style.opacity = "0";
    mute.style.opacity = "1";
    audioProfile = false;
  } else {
    volume.style.opacity = "1";
    mute.style.opacity = "0";
    audioProfile = true;
  }
});

// to stop the inspect element
document.addEventListener("contextmenu", function (e) {
  e.preventDefault();
});

document.addEventListener("contextmenu", (e) => {
  e.preventDefault();
});

document.addEventListener("keydown", (e) => {
  (e.ctrlKey || 123 == e.keyCode) && (e.preventDefault(), e.stopPropagation());
});

document.addEventListener("keydown", (e) => {
  e.ctrlKey &&
    e.shiftKey &&
    e.keyCode == "I".charCodeAt(0) &&
    (e.preventDefault(), e.stopPropagation());
});

document.addEventListener("keydown", (e) => {
  e.ctrlKey &&
    e.shiftKey &&
    e.keyCode == "J".charCodeAt(0) &&
    (e.preventDefault(), e.stopPropagation());
});

document.addEventListener("keydown", (e) => {
  e.ctrlKey &&
    e.keyCode == "U".charCodeAt(0) &&
    (e.preventDefault(), e.stopPropagation());
});
