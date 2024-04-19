const myCanvas = document.getElementById("myCanvas");
const canvasHeight = myCanvas.height;
const canvasWidth = myCanvas.width;
const ctx = myCanvas.getContext("2d");
let circle_x = 100;
let circle_y = 60;
let radius = 20;
let xSpeed = 20;
let ySpeed = 20;

let ground_x = 100;
let ground_y = 500;
let ground_width = 200;
let ground_height = 5;

let count = 0;

let blockWidth = 50;
let blockHeight = 50;
let blockCount = 10;
let blockArray = [];
class block {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = blockWidth;
    this.height = blockHeight;
    this.visible = true;
    blockArray.push(this);
  }

  drawBlock() {
    ctx.fillStyle = "orange";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  touchBall(ballX, ballY) {
    return (
      ballX >= this.x - radius &&
      ballX <= this.x + this.width + radius &&
      ballY >= this.y - radius &&
      ballY <= this.y + this.height + radius
    );
  }
}

function getRandomNumber(min, max) {
  return min + Math.floor(Math.random() * (max - min));
}

function checkBlockIsOverLapping(x, y) {
  //確認有無和板子重疊
  if (y > ground_y - blockHeight && y <= ground_y + ground_height) return true;

  //確認有無和格子重疊
  for (let i = 0; i < blockArray.length; i++) {
    if (blockArray[i].x == x && blockArray[i].y == y) {
      return true;
    }
  }

  return false;
}

function createBlock() {
  let newX = 0;
  let newY = 0;
  let isOverLapping = false;
  for (let i = 0; i < blockCount; i++) {
    do {
      newX = getRandomNumber(0, canvasWidth - blockWidth);
      newY = getRandomNumber(0, canvasHeight - blockHeight);
      isOverLapping = checkBlockIsOverLapping(newX, newY);
    } while (isOverLapping);

    new block(newX, newY);
  }
}
createBlock();

myCanvas.addEventListener("mousemove", (e) => {
  ground_x = e.clientX;
});

function drawCircle() {
  //判斷是否撞到磚塊
  blockArray.forEach((b) => {
    if (b.visible) {
      if (b.touchBall(circle_x, circle_y)) {
        if (circle_x >= b.x + b.width || circle_x <= b.x) {
          xSpeed *= -1;
        }

        if (circle_y >= b.y + b.height || circle_y <= b.y) {
          ySpeed *= -1;
        }

        count++;
        b.visible = false;
      }
    }
  });

  if (count >= blockCount) {
    alert("遊戲結束");
    clearInterval(myGame);
  }

  //判斷球是否撞到板子
  if (
    circle_x >= ground_x - radius &&
    circle_x <= ground_x + ground_width + radius &&
    circle_y >= ground_y - radius &&
    circle_y <= ground_y + ground_height + radius
  ) {
    if (ySpeed > 0) {
      circle_y -= 40;
    } else {
      circle_y += 40;
    }
    ySpeed *= -1;
  }

  //判斷球是否撞到邊界
  if (circle_y >= canvasHeight - radius || circle_y <= 0) {
    ySpeed *= -1;
  }

  if (circle_x >= canvasWidth - radius || circle_x <= 0) {
    xSpeed *= -1;
  }

  circle_x += xSpeed;
  circle_y += ySpeed;

  //畫出背景
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvasWidth, canvasWidth);

  blockArray.forEach((block) => {
    if (block.visible) block.drawBlock();
  });

  //畫出版子
  ctx.fillStyle = "lightgreen";
  ctx.fillRect(ground_x, ground_y, ground_width, ground_height);

  ctx.beginPath();
  ctx.arc(circle_x, circle_y, radius, 0, 2 * Math.PI);
  ctx.stroke();
  ctx.fillStyle = "yellow";
  ctx.fill();
}

let myGame = setInterval(drawCircle, 25);
