const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const gridSize = 20;
const tileCount = canvas.width / gridSize;

let snake = [{ x: 10, y: 10 }];
let dx = 1;
let dy = 0;

let food = spawnFood();

function spawnFood() {
  let position;
  do {
    position = {
      x: Math.floor(Math.random() * tileCount),
      y: Math.floor(Math.random() * tileCount)
    };
  } while (snake.some(segment => segment.x === position.x && segment.y === position.y));
  return position;
}

function gameLoop() {
  const head = { x: snake[0].x + dx, y: snake[0].y + dy };

  if (
    head.x < 0 || head.x >= tileCount ||
    head.y < 0 || head.y >= tileCount ||
    snake.some(segment => segment.x === head.x && segment.y === head.y)
  ) {
    clearInterval(gameInterval);
    alert("Гра закінчена!");
    return;
  }

  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    food = spawnFood();
  } else {
    snake.pop();
  }

  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "red";
  ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);

  ctx.fillStyle = "lime";
  for (let part of snake) {
    ctx.fillRect(part.x * gridSize, part.y * gridSize, gridSize - 2, gridSize - 2);
  }
}

function setDirection(dir) {
  switch (dir) {
    case "up":
      if (dy === 0) { dx = 0; dy = -1; }
      break;
    case "down":
      if (dy === 0) { dx = 0; dy = 1; }
      break;
    case "left":
      if (dx === 0) { dx = -1; dy = 0; }
      break;
    case "right":
      if (dx === 0) { dx = 1; dy = 0; }
      break;
  }
}

document.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowUp": setDirection("up"); break;
    case "ArrowDown": setDirection("down"); break;
    case "ArrowLeft": setDirection("left"); break;
    case "ArrowRight": setDirection("right"); break;
  }
});

const gameInterval = setInterval(gameLoop, 150);
