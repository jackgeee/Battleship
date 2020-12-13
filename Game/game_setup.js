const matSize = 50;
const image_perimeter = matSize * 1.125;
const transformX = 200;
const background = document.createElement("img");
background.src = "../src/images/space.png";
const spaceShips = document.createElement("img");
spaceShips.src = "../src/images/newShips.png";


// The array which is used to construct each Space Ship
const typeOfShips = [
  {
    size: 5,
    imageRefTop: 0,
    imageRefLeft: 0,
    name: "Carrier",
  },

  {
    size: 4,
    imageRefTop: 1,
    imageRefLeft: 1,
    name: "BattleShip",
  },

  {
    size: 3,
    imageRefTop: 1,
    imageRefLeft: 2,
    name: "Submarine",
  },

  {
    size: 3,
    imageRefTop: 2,
    imageRefLeft: 3,
    name: "Destroyer",
  },

  {
    size: 2,
    imageRefTop: 0,
    imageRefLeft: 3,
    name: "Patrol Ship",
  },
];
// const background = document.createElement("img");
// background.src = "../src/images/space.png";
// const spaceShips = document.createElement("img");
// spaceShips.src = "../src/images/newShips.png";


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


  // this.y_2 =
  //     (this.lengthwise ? 1 : typeOfShips[this.type].size) * matSize +
  //     this.y_1;

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
      shipType.imageRefLeft * matSize,
      shipType.imageRefTop * matSize,
      matSize,
      shipType.size * matSize,
      this.x,
      this.y,
      matSize,
      shipType.size * matSize
    );
    fillerEnvironment.restore();
  }

  drawShipsInBoard(fillerEnvironment, imageRefTop, imageRefLeft) {

    const shipType = typeOfShips[this.type];
    const offset = (spaceShips - matSize) / 2;

    imageRefLeft = offset * (this.horizontal ? shipType.size : 1);
    imageRefTop = offset * (this.horizontal ? 1 : shipType.size);
    
    fillerEnvironment.save();
    if (this.lengthwise) {
      fillerEnvironment.translate(imageRefLeft, imageRefTop);
      fillerEnvironment.rotate(-Math.PI / 2);
      fillerEnvironment.translate(-imageRefLeft, -imageRefTop);
      fillerEnvironment.translate(-image_perimeter, 0);
    }
    fillerEnvironment.drawImage(
      spaceShips,
      shipType.imageRefLeft * image_perimeter,
      shipType.imageRefTop * image_perimeter,
      image_perimeter,
      shipType.size * image_perimeter,
      imageRefLeft,
      imageRefTop,
      image_perimeter,
      shipType.size * image_perimeter
    );
    fillerEnvironment.restore();
  }
  
  describe() {
    const x = (this.x - transformX) / matSize;
    const y = (this.y) / matSize;
    const positions = new Array(typeOfShips[this.type].size)
      .fill(0)
      .map((_, index) => (this.horizontal ? [x + index, y] : [x, index + y]));
    return {
      positions,
      direction: this.horizontal ? "horizontal" : "vertical",
      type: typeOfShips[this.type].name,
    };
  }
}

const ships = [
  new Ship(0, 0, 250, false),
  new Ship(1, 50, 300, false),
  new Ship(2, 100, 350, false),
  new Ship(3, 150, 350, false),
  new Ship(4, 200, 400, false),
];

function draw_board() {
  // if images are not done loading
  // try again in a bit
  if (!background.complete) {
    window.requestAnimationFrame(draw_board);
    return;
  }
  const board = document.getElementById("board_canvas");
  const context = board.getContext("2d");
  // const pattern = context.createPattern(background, "repeat");
  // context.fillStyle = pattern;
  context.fillRect(0, 0, 500, 500);
  context.drawImage(background, 0, 0, 500, 500);
  for (let row = 0; row < 10; row += 1) {
    for (let col = 0; col < 10; col += 1) {
      let imageRefTop = row * matSize;
      let imageRefLeft = col * matSize;
      context.fillStyle = "green";
      context.fillRect(imageRefLeft, imageRefTop - 2, matSize, 4);
      context.fillRect(imageRefLeft, imageRefTop - 2, 4, matSize);
      context.fillRect(imageRefLeft, imageRefTop - 2 + matSize, matSize, 4);
      context.fillRect(imageRefLeft + matSize, imageRefTop - 2, 4, matSize);
    }
  }
}
// orig

// if (!spaceShips.complete || !shadow_image.complete) {
function draw_ships() {
  // if images are not done loading
  // try again in a bit
  if (!spaceShips.complete) {
    window.requestAnimationFrame(draw_ships);
    return;
  }
  const game = document.getElementById("game_canvas");
  const context = game.getContext("2d");
  context.clearRect(0, 0, 700, 500);
  if (selected_ship !== undefined) {
    const imageRefLeft = 50 * Math.round(ships[selected_ship].x / 50);
    const imageRefTop = 50 * Math.round(ships[selected_ship].y / 50);
    if (imageRefLeft >= 200) {
      ships[selected_ship].drawShipsInBoard(context, imageRefTop, imageRefLeft);
    }
  }
  ships.forEach((s) => s.draw(context));
}


function find_ship(x, y) {
  let ss = undefined;
  ships.forEach((ship, index) => {
    if (ship.x <= x && ship.y <= y && ship.x_2 >= x && ship.y_2 >= y) {
      ss = index;
    }
  });
  return ss;
}
let selected_ship = undefined;
let mousex_1_offset = 0;
let mousey_1_offset = 0;

function setup_event_handlers() {
  const game = document.getElementById("game_canvas");
  game.onmousemove = function (e) {
    game.style.cursor = "default";
    const x = e.offsetX;
    const y = e.offsetY;
    const ship = find_ship(x, y);
    if (ship !== undefined) {
      game.style.cursor = "move";
    }
    if (selected_ship !== undefined) {
      ships[selected_ship].x = x - mousex_1_offset;
      ships[selected_ship].y = y - mousey_1_offset;
      draw_ships();
    }
  };

  game.onclick = function (e) {
    const x = e.offsetX;
    const y = e.offsetY;
    if (selected_ship !== undefined) {
      ships[selected_ship].x =
        matSize * Math.round(ships[selected_ship].x / matSize);
      ships[selected_ship].y =
        matSize * Math.round(ships[selected_ship].y / matSize);
      selected_ship = undefined;
      draw_ships();
      return;
    }
    selected_ship = find_ship(x, y);
    if (selected_ship == undefined) {
      return;
    }
    mousex_1_offset = x - ships[selected_ship].x;
    mousey_1_offset = y - ships[selected_ship].y;
  };
  game.oncontextmenu = function (e) {
    const x = e.offsetX;
    const y = e.offsetY;
    if (selected_ship !== undefined) {
      e.preventDefault();
      ships[selected_ship].horizontal = !ships[selected_ship].horizontal;
      [mousex_1_offset, mousey_1_offset] = [mousey_1_offset, mousex_1_offset];
      ships[selected_ship].x = x - mousex_1_offset;
      ships[selected_ship].y = y - mousey_1_offset;
      draw_ships();
    }
  };
}
function startGame() {
  var tmp = ships.map((s) => s.describe());

  var jsonShips = JSON.stringify(tmp);

  $.ajax({
    type: "GET",
    url: "getEnemyInfo.php",
    data: { jsonShips: jsonShips },
    success: function (data) {
      window.location = "getEnemyInfo.php?Ships=" + jsonShips;
    },
  });
}
