const matSize = 50;
var sumToWin = 0;
let shipClickedOn = undefined;
let clickXTransform = 0;
let clickYTransform = 0;
const background = document.createElement("img");
background.src = "../src/images/space.png";
const spaceShips = document.createElement("img");
spaceShips.src = "../src/images/newShips.png";
const hit_image = document.createElement("img");
hit_image.src = "../src/images/hit.png";
const miss_image = document.createElement("img");
miss_image.src = "../src/images/miss_image.png";


const positions = JSON.parse(
  document.getElementById("enemyPositions").innerHTML
);


const playerPositions = JSON.parse(
  document.getElementById("playerPositions").innerHTML
);


class Ship {
  constructor(type, x_1, y_1, lengthwise) {
    this.type = type;
    this.x_1 = x_1;
    this.y_1 = y_1;
    this.lengthwise = lengthwise;
    this.x_2 = 0;
    this.y_2 = 0;

    if (lengthwise)
    {
     this.x_2 = typeOfShips[this.type].size * matSize + this.x_1;
     this.y_2 = matSize + this.y_1;
   } 

   else 
   {
     this.x_2 = matSize + this.x;
     this.y_2 = typeOfShips[this.type].size * matSize + this.y_1;
   }

  }
  get x() { return this.x_1; }

   set x(x) 
  {

    this.x_1 = x;

    if (this.lengthwise) {
      this.x_2 = typeOfShips[this.type].size * matSize + this.x_1;
    }

    else {
      this.x_2 = matSize + this.x_1; 
    }
    // this.x_2 = (this.lengthwise ? typeOfShips[this.type].size : 1) * matSize + this.x_1; 
  }

get y() { return this.y_1; }

set y(y) 
{

  this.y_1 = y;
  if (this.lengthwise) {
    this.y_2 = matSize + this.y_1;
  }
  else {
    this.y_2 = typeOfShips[this.type].size * matSize + this.y_1;
  }
  
}

get horizontal() { return this.lengthwise; }

set horizontal(horizontal) 
{
  this.lengthwise = horizontal;
  this.x = this.x_1;
  this.y = this.y_1;
}

  draw(fillerEnvironment) {

    fillerEnvironment.save();

    if (this.lengthwise) 
    {
      fillerEnvironment.translate(this.x, this.y);
      fillerEnvironment.rotate(-Math.PI / 2);
      fillerEnvironment.translate(-this.x, -this.y);
      fillerEnvironment.translate(-matSize, 0);
    }
    
    const shipType = typeOfShips[this.type];
    fillerEnvironment.drawImage(
      spaceShips,
      shipType.left * matSize,
      shipType.top * matSize,
      matSize,
      shipType.size * matSize,
      this.x,
      this.y,
      matSize,
      shipType.size * matSize
    );
    fillerEnvironment.restore();
  }

  getJsonInfo() {
    const x = (this.x) / matSize;
    const y = (this.y) / matSize;
    const positions = new Array(ShipType[this.type].size)
      .fill(0)
      .map((_, index) => (this.horizontal ? [x + index, y] : [x, index + y]));
    return {
      positions,
    };
  }
}

const typeOfShips = [
  // Carrier
  {
    size: 5,
    top: 0,
    left: 0,
    name: "Carrier",
  },
  // Battleship
  {
    size: 4,
    top: 1,
    left: 1,
    name: "BattleShip",
  },
  // Submarine
  {
    size: 3,
    top: 1,
    left: 2,
    name: "Submarine",
  },
  // Destroyer
  {
    size: 3,
    top: 2,
    left: 3,
    name: "Destroyer",
  },
  // Patrol Boat
  {
    size: 2,
    top: 0,
    left: 3,
    name: "Patrol Boat",
  },
];

// const background = document.createElement("img");
// background.src = "../src/images/waterCropped.png";


//shadow_image.src = "/src/images/ships-silhouette.png";



// console.log(positions);

var coordArray = [];
var directionArray = [];

function extractInitCoord(i) {
  coordArray.push(positions[i]["positions"][0]);
}

for (var x = 0; x < 5; x++) {
  extractInitCoord(x);
}

function extractDirection(i) {
  directionArray.push(positions[i]["direction"]);
}

for (var x = 0; x < 5; x++) {
  extractDirection(x);
}

for (var x = 0; x < 5; x++) {
  if (directionArray[x] === "vertical") {
    directionArray[x] = false;
  } else directionArray[x] = true;
}

//////////////////////////////////////////////////////////////////////////////////

var playerCoordArray = [];
var playerDirectionArray = [];

function extractPlayerInitCoord(i) {
  playerCoordArray.push(playerPositions[i]["positions"][0]);
}

for (var x = 0; x < 5; x++) {
  extractPlayerInitCoord(x);
}

function extractPlayerDirection(i) {
  playerDirectionArray.push(playerPositions[i]["direction"]);
}

for (var x = 0; x < 5; x++) {
  extractPlayerDirection(x);
}

for (var x = 0; x < 5; x++) {
  if (playerDirectionArray[x] === "vertical") {
    playerDirectionArray[x] = false;
  } else playerDirectionArray[x] = true;
}

const ships = [
  new Ship(
    0,
    coordArray[0][0] * matSize,
    coordArray[0][1] * matSize,
    directionArray[0]
  ),
  new Ship(
    1,
    coordArray[1][0] * matSize,
    coordArray[1][1] * matSize,
    directionArray[1]
  ),
  new Ship(
    2,
    coordArray[2][0] * matSize,
    coordArray[2][1] * matSize,
    directionArray[2]
  ),
  new Ship(
    3,
    coordArray[3][0] * matSize,
    coordArray[3][1] * matSize,
    directionArray[3]
  ),
  new Ship(
    4,
    coordArray[4][0] * matSize,
    coordArray[4][1] * matSize,
    directionArray[4]
  ),
];


const playerShips = [
  new Ship(
    0,
    playerCoordArray[0][0] * matSize,
    playerCoordArray[0][1] * matSize,
    playerDirectionArray[0]
  ),
  new Ship(
    1,
    playerCoordArray[1][0] * matSize,
    playerCoordArray[1][1] * matSize,
    playerDirectionArray[1]
  ),
  new Ship(
    2,
    playerCoordArray[2][0] * matSize,
    playerCoordArray[2][1] * matSize,
    playerDirectionArray[2]
  ),
  new Ship(
    3,
    playerCoordArray[3][0] * matSize,
    playerCoordArray[3][1] * matSize,
    playerDirectionArray[3]
  ),
  new Ship(
    4,
    playerCoordArray[4][0] * matSize,
    playerCoordArray[4][1] * matSize,
    playerDirectionArray[4]
  ),
];


function draw_enemy_board() {
  // if images are not done loading
  // try again in a bit
  if (!background.complete) {
    window.requestAnimationFrame(draw_enemy_board);
    return;
  }
  const board = document.getElementById("enemy_board_canvas");
  const context = board.getContext("2d");
  const pattern = context.createPattern(background, "repeat");
  context.fillStyle = pattern;
  context.fillRect(0, 0, 500, 500);
  context.drawImage(background, 0, 0, 500, 500);
  for (let row = 0; row < 10; row += 1) {
    for (let col = 0; col < 10; col += 1) {
      let top = row * matSize;
      let left = col * matSize;
      context.fillStyle = "green";
      context.fillRect(left - 2, top - 2, matSize, 4);
      context.fillRect(left - 2, top - 2, 4, matSize);
      context.fillRect(left - 2, top - 2 + matSize, matSize, 4);
      context.fillRect(left - 2 + matSize, top - 2, 4, matSize);
      // context.fillRect(left, top, matSize, matSize);
      // context.fillRect(left + 1, top + 1, matSize - 2, matSize - 2);
    }
  }
}

function draw_player_board() {
  // if images are not done loading
  // try again in a bit
  if (!background.complete) {
    window.requestAnimationFrame(draw_player_board);
    return;
  }
  const board = document.getElementById("player_board_canvas");
  const context = board.getContext("2d");
  const pattern = context.createPattern(background, "repeat");
  context.fillStyle = pattern;
  context.fillRect(0, 0, 500, 500);
  context.drawImage(background, 0, 0, 500, 500);
  for (let row = 0; row < 10; row += 1) {
    for (let col = 0; col < 10; col += 1) {
      let top = row * matSize;
      let left = col * matSize;
      context.fillStyle = "green";
      context.fillRect(left - 2, top - 2, matSize, 4);
      context.fillRect(left - 2, top - 2, 4, matSize);
      context.fillRect(left - 2, top - 2 + matSize, matSize, 4);
      context.fillRect(left - 2 + matSize, top - 2, 4, matSize);
    }
  }
}

function draw_enemy_ships() {
  // if images are not done loading
  // try again in a bit
  if (!spaceShips.complete) {
    window.requestAnimationFrame(draw_enemy_ships);
    return;
  }
  const game = document.getElementById("enemy_game_canvas");
  const context = game.getContext("2d");
  context.globalAlpha = 0.0;
  context.clearRect(0, 0, 500, 500);
  if (shipClickedOn !== undefined) {
    const left = 50 * Math.round(ships[shipClickedOn].x / 50);
    const top = 50 * Math.round(ships[shipClickedOn].y / 50);
  }
  ships.forEach((s) => s.draw(context));
}

function draw_player_ships() {
  // if images are not done loading
  // try again in a bit
  if (!spaceShips.complete) {
    window.requestAnimationFrame(draw_player_ships);
    return;
  }
  const game = document.getElementById("player_game_canvas");
  const context = game.getContext("2d");
  context.globalAlpha = 1.0;
  context.clearRect(0, 0, 500, 500);
  if (shipClickedOn !== undefined) {
    const left = 50 * Math.round(playerShips[shipClickedOn].x / 50);
    const top = 50 * Math.round(playerShips[shipClickedOn].y / 50);
  }
  playerShips.forEach((s) => s.draw(context));
}

function draw_hit(x, y) {
  if (!hit_image.complete) {
    window.requestAnimationFrame(draw_hit);
    return;
  }

  const board = document.getElementById("enemy_board_canvas");
  const context = board.getContext("2d");
  context.drawImage(hit_image, x, y);
}


function draw_miss(x, y) {
  if (!miss_image.complete) {
    window.requestAnimationFrame(draw_miss);
    return;
  }

  const board = document.getElementById("enemy_board_canvas");
  const context = board.getContext("2d");
  context.drawImage(miss_image, x, y);
}

function isArrayInArray(arr, item) {
  var item_as_string = JSON.stringify(item);

  var contains = arr.some(function (ele) {
    return JSON.stringify(ele) === item_as_string;
  });
  return contains;
}

function clickedInsideShip(x, y) 
{
  let shipSelection = undefined;
  ships.forEach((ship, index) => {
    if (ship.x <= x && ship.y <= y && ship.x_2 >= x && ship.y_2 >= y) {
      shipSelection = index;
    }
  });
  return shipSelection;
}

function sendCoords(x,y) {
  //to do fix duplicates
  $.ajax({
    type: "GET",
    url: "coordHandler.php",
    success: function () {
    window.location = "coordHandler.php?x=" + Math.floor(x / matSize) * matSize +"&y="+ Math.floor(y / matSize) * matSize;
    },
  });
}

function sendCoords2(x,y) {
  //to do fix duplicates
  $.ajax({
    type: "GET",
    url: "end.php",
    success: function () {
    window.location = "end.php?x=" + Math.floor(x / matSize) * matSize +"&y="+ Math.floor(y / matSize) * matSize;
    },
  });
}

// function sendCoordsFinal(x,y) {
//   //to do fix duplicates
//   $.ajax({
//     type: "GET",
//     url: "coordHandler.php?",
//     success: function () {
//     window.location = ("../MainPage/Main.php");
//     },
//   });
// }


function reClick(x,y)
{
  x = Math.floor(x/50);
  y = Math.floor(y/50);
  // NOBODY HAS MADE A MOVE YET
  if(document.getElementById("playerCoords").innerHTML === "0")
  {
    return false;
  }
  // Check what coordinates have been logged
  else
  {
    var pArr = JSON.parse(document.getElementById("playerCoords").innerText);
    for(var i = 0; i < pArr.length; i++)
    {
      // found a reclick
      if(pArr[i][0] == x && pArr[i][1] == y)
      {
        alert("NO DOUBLE CLICKS ALLOWED");
        return true;
      }
    }
  }
  return false;
}


function clickedInsideShip2(x, y) {

  if(reClick(x,y))
  {
    return;
  }
  else
  {
    //Make user wait for next turn by removing the button
    var butt = document.getElementById("conf");
    butt.remove();
    var flag = false;
    ships.forEach((ship) => 
    {
      if (ship.x <= x && ship.y <= y && ship.x_2 >= x && ship.y_2 >= y) 
      {
        flag = true;
      }
    });
    // execution based on flag condition
    if (flag)
    {
        alert("HIT! Waiting for enemy move.");
        sumToWin += 1;
    }
    else
    {
      alert("MISS! Waiting for enemy move.");
    }
    sendCoords(x,y);
  }
  }


  function onEnemyEvent() {
    const game = document.getElementById("enemy_game_canvas");
    game.onmousemove = function (e) {
      game.style.cursor = "default";
      const x = e.offsetX;
      const y = e.offsetY;
    };
  
  
  
    game.onclick = function (e) {
      const x = e.offsetX;
      const y = e.offsetY;
      // insertedCode
      var headElement = document.getElementById("confirm");
      headElement.innerHTML = "";
    // if(!flag){
      var inYes = document.createElement("button");
      inYes.setAttribute('onclick','clickedInsideShip2('+x+','+y+')');
      inYes.setAttribute('id','conf');
      inYes.innerText = 'Confirm Attack';
      headElement.append(inYes);
    // }
      // INSERTED END
      if (sumToWin == 17) {
        alert("YOU WON!");
        sumToWin = 0;
      }
    };
    game.oncontextmenu = function (e) {
      const x = e.offsetX;
      const y = e.offsetY;
      if (shipClickedOn !== undefined) {
        e.preventDefault();
        ships[shipClickedOn].horizontal = !ships[shipClickedOn].horizontal;
        [clickXTransform, clickYTransform] = [clickYTransform, clickXTransform];
        ships[shipClickedOn].x = x - clickXTransform;
        ships[shipClickedOn].y = y - clickYTransform;
  
        draw_ships();
      }
    };
  }
  
