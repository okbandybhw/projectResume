const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

//蛇一單位的長度
const unit = 20;
const row = canvas.height / unit;
const column = canvas.width / unit;

window.addEventListener("keydown", changeDirection);
let d = "Right"; //前進方向
let canChangeDirection = true;
function changeDirection(e) {
  if (!canChangeDirection) return;

  if (e.key == "ArrowLeft" && d != "Right") {
    d = "Left";
  } else if (e.key == "ArrowRight" && d != "Left") {
    d = "Right";
  } else if (e.key == "ArrowUp" && d != "Down") {
    d = "Up";
  } else if (e.key == "ArrowDown" && d != "Up") {
    d = "Down";
  }

  canChangeDirection = false;
}

//物件的工作是儲存蛇的x、y座標
let snake = [];
function createSnake() {
  snake[0] = {
    x: 80,
    y: 0,
  };

  snake[1] = {
    x: 60,
    y: 0,
  };

  snake[2] = {
    x: 40,
    y: 0,
  };

  snake[3] = {
    x: 20,
    y: 0,
  };
}
createSnake();

class Fruit {
  constructor() {
    this.setNewPos();
  }

  setNewPos() {
    let new_x = 0;
    let new_y = 0;

    let overLapping = false;
    function checkOverLapping(x, y) {
      for (let i = 0; i < snake.length; i++) {
        if (x == snake[i].x && x == snake[i].y) {
          overLapping = true;
          return;
        } else {
          overLapping = false;
        }
      }
    }

    do {
      new_x = Math.floor(Math.random() * column) * unit;
      new_y = Math.floor(Math.random() * row) * unit;
      checkOverLapping(new_x, new_y);
    } while (overLapping);

    this.x = new_x;
    this.y = new_y;
  }

  drawFruit() {
    ctx.fillStyle = "yellow";
    ctx.fillRect(this.x, this.y, unit, unit);
  }
}
let myFruit = new Fruit();

let score = 0;
let highestScore = 0;
loadHighestScore();
document.getElementById("myScore").innerHTML = "目前分數:" + score;
document.getElementById("myScore2").innerHTML = "最高分數:" + highestScore;

function draw() {
  //確認蛇是不是撞到自己
  for (let i = 1; i < snake.length; i++) {
    if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
      clearInterval(myGame);
      alert("遊戲結束");
      return;
    }
  }

  //將背景重置為全黑
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.height, canvas.width);

  myFruit.drawFruit();

  for (let i = 0; i < snake.length; i++) {
    if (i == 0) {
      ctx.fillStyle = "lightgreen";
    } else {
      ctx.fillStyle = "lightblue";
    }

    ctx.strokeStyle = "white";

    //假如蛇的頭超出Canvas範圍的話要從另一邊出來
    if (snake[i].x >= canvas.width) {
      snake[i].x = 0;
    }
    if (snake[i].x < 0) {
      snake[i].x = canvas.width - unit;
    }
    if (snake[i].y >= canvas.height) {
      snake[i].y = 0;
    }
    if (snake[i].y < 0) {
      snake[i].y = canvas.height - unit;
    }

    ctx.fillRect(snake[i].x, snake[i].y, unit, unit);
    ctx.strokeRect(snake[i].x, snake[i].y, unit, unit);
  }

  //計算出下一偵蛇頭的位置
  let snakeX = snake[0].x;
  let snakeY = snake[0].y;
  if (d == "Right") {
    snakeX += unit;
  } else if (d == "Left") {
    snakeX -= unit;
  } else if (d == "Down") {
    snakeY += unit;
  } else if (d == "Up") {
    snakeY -= unit;
  }

  let newHead = {
    x: snakeX,
    y: snakeY,
  };

  //確認蛇是否有吃到果實
  if (snake[0].x == myFruit.x && snake[0].y == myFruit.y) {
    //產生新的果實
    //增加分數
    myFruit.setNewPos();
    score++;
    setHighestScore(score);
    document.getElementById("myScore").innerHTML = "目前分數:" + score;
  } else {
    snake.pop();
  }
  snake.unshift(newHead);

  canChangeDirection = true;
}

function loadHighestScore() {
  console.log(localStorage.getItem("highestScore"));
  if (localStorage.getItem("highestScore") == null) highestScore = 0;
  else highestScore = Number(localStorage.getItem("highestScore"));
}

function setHighestScore(score) {
  if (score > highestScore) {
    highestScore = score;
    localStorage.setItem("highestScore", highestScore);
  }
}

let myGame = setInterval(draw, 100);
