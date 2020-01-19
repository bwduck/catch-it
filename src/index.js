const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const bananaImg = new Image();
const binImg = new Image();
const canImg = new Image();
const paperImg = new Image();
bananaImg.src =
  "https://images.vexels.com/media/users/3/143061/isolated/lists/aaf71ed4e387a6838e1c521fbecde77a-banana-icon-fruit.png";
binImg.src = "./blue-bin.png";
canImg.src = "./pop-can.png";
paperImg.src = "./paper.png";
const screenWidth = (canvas.width = window.innerWidth - 50);
const width = screenWidth > 500 ? 500 : width;
const height = (canvas.height = window.innerHeight - 100);

const POP_CAN_HEIGHT = 35;
const POP_CAN_WIDTH = 20;
const PAPER_WIDTH = 35;
const PAPER_HEIGHT = 35;
const BANANA_WIDTH = 50;
const BANANA_HEIGHT = 50;
const BIN_WIDTH = 80;
const BIN_HEIGHT = 50;
const RIGHT_KEY = 39;
const LEFT_KEY = 37;
const STOP_KEY = 40;
const MAX_VEL = 8;
const MIN_VEL = 3;
const MAX_ITEMS = 2;

const ITEMS = {
  BANANA: 0,
  POPCAN: 1,
  PAPER: 2
};

var items = []; // array of items
var pause = false; // for debug purposes

// function to generate random number
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function Bin() {
  this.x = random(0, width - BIN_WIDTH);
  this.y = height - BIN_HEIGHT;
}

Bin.prototype.draw = function() {
  ctx.drawImage(binImg, this.x, this.y, BIN_WIDTH, BIN_HEIGHT);
};

Bin.prototype.goRight = function() {
  this.vel = 5;
};

Bin.prototype.goLeft = function() {
  this.vel = -5;
};

Bin.prototype.stop = function() {
  this.vel = 0;
};

Bin.prototype.update = function() {
  const newX = this.x + this.vel;
  if (newX >= 0 && newX <= width - BIN_WIDTH) {
    this.x = newX;
  }

  items.forEach(item => {
    if (this.caughtItem(item)) {
      item.caught = true;
    }
  });
};

Bin.prototype.caughtItem = function(item) {
  return (
    item.x >= bin.x &&
    item.x + item.width <= bin.x + BIN_WIDTH &&
    item.y + item.height > bin.y + MAX_VEL &&
    item.y + item.height < bin.y + 1 + 2 * MAX_VEL
  );
};

var bin = new Bin();

function Item() {
  this.caught = false;
  this.type = random(0, Object.keys(ITEMS).length - 1);
  switch (this.type) {
    case ITEMS.BANANA:
      this.width = BANANA_WIDTH;
      this.height = BANANA_HEIGHT;
      break;
    case ITEMS.POPCAN:
      this.width = POP_CAN_WIDTH;
      this.height = POP_CAN_HEIGHT;
      break;
    case ITEMS.PAPER:
      this.width = PAPER_WIDTH;
      this.height = PAPER_HEIGHT;
  }
  this.x = random(0, width - this.width);
  this.y = 0;
  this.velY = random(MIN_VEL, MAX_VEL);
}

Item.prototype.draw = function() {
  let img = bananaImg;
  switch (this.type) {
    case ITEMS.POPCAN:
      img = canImg;
      break;
    case ITEMS.PAPER:
      img = paperImg;
      break;
  }
  ctx.drawImage(img, this.x, this.y, this.width, this.height);
};

Item.prototype.update = function() {
  this.y = this.y + this.velY;
};

document.addEventListener("keydown", event => {
  switch (event.keyCode) {
    case RIGHT_KEY:
      bin.goRight();
      break;
    case LEFT_KEY:
      bin.goLeft();
      break;
    case STOP_KEY:
      bin.stop();
      break;
  }
});

function loop() {
  if (pause) return;
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "rgba(0, 0, 0, 1)";
  ctx.fillRect(0, 0, width, height);

  while (items.length < MAX_ITEMS) {
    var item = new Item();
    items.push(item);
  }

  bin.draw();
  bin.update();

  items = items
    .filter(item => item.y < height + 50)
    .filter(item => !item.caught);
  for (i = 0; i < items.length; i++) {
    items[i].draw();
    items[i].update();
  }

  requestAnimationFrame(loop);
}
loop();
