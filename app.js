const startBtn = document.querySelector("#start");
const screens = document.querySelectorAll(".screen");
const timeList = document.querySelector("#time-list");
const timeEl = document.querySelector("#time");
const board = document.querySelector("#board");

const colors = ['red', 'yellow', 'white', '#16d9e3', 'blueviolet', 'burlywood'];

const randomColor = (arr) => arr[Math.floor(Math.random() * arr.length)];

console.log(randomColor(colors))

let time = 0;
let score = 0;

startBtn.addEventListener("click", (event) => {
  event.preventDefault();

  screens[0].classList.add("up");
});

timeList.addEventListener("click", (event) => {
  if (event.target.classList.contains("time-btn")) {
    time = parseInt(event.target.getAttribute("data-time"));
    screens[1].classList.add("up");

    startGame();
  }
});

board.addEventListener("click", (event) => {
  if (event.target.classList.contains("circle")) {
    score++;
    event.target.remove();
    createRandomCircle();
  }
});


function startGame() {
  setInterval(decreaseTime, 1000);
  setTime(time);
  createRandomCircle();
}

function decreaseTime() {
  if (time === 0) {
    finishGame();
  } else {
    let current = --time;
    if (current < 10) {
      current = `0${current}`;
    }
    setTime(current);
  }
}

function setTime(value) {
  timeEl.innerHTML = `00:${value}`;
}

function finishGame() {
    timeEl.parentNode.classList.add('hide')
  board.innerHTML = `<h1>Ваш счёт: <span class = 'primary'>${score}</span></h1>`;
}

function createRandomCircle() {
  const size = getRandomNubmer(10, 60);

  const { width, height } = board.getBoundingClientRect();

  const circle = document.createElement("div");

  const x = getRandomNubmer(0, width - size);
  const y = getRandomNubmer(0, height - size);

  circle.classList.add("circle");

  circle.style.background = `${randomColor(colors)}`;
  circle.style.width = `${size}px`;
  circle.style.height = `${size}px`;
  circle.style.top = `${y}px`;
  circle.style.left = `${x}px`;

  board.append(circle);
}

function getRandomNubmer(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}
