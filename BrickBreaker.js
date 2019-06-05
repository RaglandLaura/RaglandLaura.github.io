
// Abby Ragland, Zeke Merlis, and Ben Fikhman Brick Breaker Project


let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
let ballRadius = 10;
let x = canvas.width / 2;
let y = canvas.height - 30;
let xvel = 4;
let yvel = -5;
let paddleHeight = 10;
let paddleWidth = 75;
let paddleX = (canvas.width-paddleWidth)/2;
let rightPressed = false;
let leftPressed = false;
let brickRowCount = 3;
let brickColumnCount = 5;
let brickWidth = 75;
let brickHeight = 20;
let brickPadding = 10;
let brickOffsetTop = 30;
let brickOffsetLeft = 30;
let score = 0;
let lives = 3;


let bricks = [];
for (let i = 0; i < brickColumnCount; i++) {
    bricks[i] = [];
    for (let r = 0; r < brickRowCount; r++) {
        bricks[i][r] = { x: i, y: r, status: 1};
    }
}


document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

function keyDownHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}

function mouseMoveHandler(e) {
  var relativeX = e.clientX - canvas.offsetLeft;
  if(relativeX > 0 && relativeX < canvas.width) {
    paddleX = relativeX - paddleWidth/2;
  }
}

function collisionDetection() {
  for(let i = 0; i < brickColumnCount; i++) {
    for(let r = 0; r < brickRowCount; r++) {
      let b = bricks[i][r];
      if(b.status == 1) {
        if(x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
          yvel = -yvel;
          b.status = 0;
          score++;
          if(score == brickRowCount * brickColumnCount) {
            alert("YOU WIN, CONGRATS!");
            document.location.reload();
          }
        }
      }
    }
  }
}
function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, 10, 0, Math.PI*2);
  ctx.fillStyle = (150);
  ctx.fill();
  ctx.closePath();
}
function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();

}
function drawBricks() {
  for(let i = 0; i < brickColumnCount; i++) {
    for(let r = 0; r < brickRowCount; r++) {
      if(bricks[i][r].status == 1) {
        let brickX = (i * (brickWidth + brickPadding))+brickOffsetLeft;
        let brickY = (r * (brickHeight + brickPadding))+brickOffsetTop;
        bricks[i][r].x = brickX;
        bricks[i][r].y = brickY;
        ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        ctx.fillStyle = "black";
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}
function drawScore() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.fillText("Score: " + score, 8, 20);
}
function drawLives() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.fillText("Lives: " + lives, canvas.width - 65, 20);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBricks();
  drawBall();
  drawPaddle();
  drawScore();
  drawLives();
  collisionDetection();

  if(x + xvel > canvas.width-ballRadius || x + xvel < ballRadius) {
    xvel = -xvel;
  }
  if(y + yvel < ballRadius) {
    yvel = -yvel;
  }
  else if(y + yvel > canvas.height - ballRadius) {
    if(x > paddleX && x < paddleX + paddleWidth) {
      yvel = -yvel;
    }
    else {
      lives--;
      if(!lives) {
        alert("GAME OVER");
        document.location.reload();
      }
      else {
        x = canvas.width / 2;
        y = canvas.height - 30;
        xvel = 3;
        yvel = -3;
        paddleX = (canvas.width - paddleWidth) / 2;
      }
    }
  }

  if(rightPressed && paddleX < canvas.width - paddleWidth) {
    paddleX += 7;
  }
  else if(leftPressed && paddleX > 0) {
    paddleX -= 7;
  }

  x += xvel;
  y += yvel;
  requestAnimationFrame(draw);
}

draw();