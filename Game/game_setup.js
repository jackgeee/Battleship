const grid_size = 50;
const shadow_size = grid_size * 1.125;
const grid_offset_X = 200;
const grid_offset_Y = 0;
const ShipType = [
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
const water_image = document.createElement("img");
water_image.src = "../assets/images/water.png";
const ship_image = document.createElement("img");
ship_image.src = "../assets/images/ships.png";
const shadow_image = document.createElement("img");
//shadow_image.src = "/assets/images/ships-silhouette.png";
class Ship {
  constructor(type, _x, _y, _horizontal) {
    this.type = type;
    this._x = _x;
    this._y = _y;
    this._horizontal = _horizontal;
    this.far_x = 0;
    this.far_y = 0;
    if (_horizontal) {
      this.far_x = ShipType[this.type].size * grid_size + this._x;
      this.far_y = grid_size + this._y;
    } else {
      this.far_x = grid_size + this.x;
      this.far_y = ShipType[this.type].size * grid_size + this._y;
    }
  }
  get x() {
    return this._x;
  }
  set x(x) {
    this._x = x;
    this.far_x =
      (this._horizontal ? ShipType[this.type].size : 1) * grid_size + this._x;
  }
  get y() {
    return this._y;
  }
  set y(y) {
    this._y = y;
    this.far_y =
      (this._horizontal ? 1 : ShipType[this.type].size) * grid_size + this._y;
  }
  get horizontal() {
    return this._horizontal;
  }
  set horizontal(horizontal) {
    this._horizontal = horizontal;
    // recalculate far_*
    this.x = this._x;
    this.y = this._y;
  }
  draw(ctx) {
    ctx.save();
    if (this._horizontal) {
      ctx.translate(this.x, this.y);
      ctx.rotate(-Math.PI / 2);
      ctx.translate(-this.x, -this.y);
      ctx.translate(-grid_size, 0);
    }
    const s_type = ShipType[this.type];
    ctx.drawImage(
      ship_image,
      s_type.left * grid_size,
      s_type.top * grid_size,
      grid_size,
      s_type.size * grid_size,
      this.x,
      this.y,
      grid_size,
      s_type.size * grid_size
    );
    ctx.restore();
  }
  draw_shadow(ctx, top, left) {
    const s_type = ShipType[this.type];
    const offset = (ship_image - grid_size) / 2;
    left = offset * (this.horizontal ? s_type.size : 1);
    top = offset * (this.horizontal ? 1 : s_type.size);
    ctx.save();
    if (this._horizontal) {
      ctx.translate(left, top);
      ctx.rotate(-Math.PI / 2);
      ctx.translate(-left, -top);
      ctx.translate(-shadow_size, 0);
    }
    ctx.drawImage(
      ship_image,
      s_type.left * shadow_size,
      s_type.top * shadow_size,
      shadow_size,
      s_type.size * shadow_size,
      left,
      top,
      shadow_size,
      s_type.size * shadow_size
    );
    ctx.restore();
  }
  describe() {
    const x = (this.x - grid_offset_X) / grid_size;
    const y = (this.y - grid_offset_Y) / grid_size;
    const positions = new Array(ShipType[this.type].size)
      .fill(0)
      .map((_, index) => (this.horizontal ? [x + index, y] : [x, index + y]));
    return {
      positions, direction: this.horizontal ? "horizontal" : "vertical", type: ShipType[this.type].name
    };
  }
}
const ships = [
  new Ship(0, 0, 35, false),
  new Ship(1, 50, 10, false),
  new Ship(2, 100, 10, false),
  new Ship(3, 100, 175, false),
  new Ship(4, 50, 225, false),
];
function draw_board() {
  // if images are not done loading
  // try again in a bit
  if (!water_image.complete) {
    window.requestAnimationFrame(draw_board);
    return;
  }
  const board = document.getElementById("board_canvas");
  const context = board.getContext("2d");
  const pattern = context.createPattern(water_image, "repeat");
  context.fillStyle = pattern;
  context.fillRect(0, 0, 700, 500);
  context.drawImage(water_image, 0, 0, 700, 500);
  for (let row = 0; row < 10; row += 1) {
    for (let col = 0; col < 10; col += 1) {
      let top = row * grid_size;
      let left = col * grid_size + 200;
      context.fillStyle = "white";
      context.fillRect(left - 2, top - 2, grid_size, 4);
      context.fillRect(left - 2, top - 2, 4, grid_size);
      context.fillRect(left - 2, top - 2 + grid_size, grid_size, 4);
      context.fillRect(left - 2 + grid_size, top - 2, 4, grid_size);
      // context.fillRect(left, top, grid_size, grid_size);
      // context.fillRect(left + 1, top + 1, grid_size - 2, grid_size - 2);
    }
  }
}
function draw_ships() {
  // if images are not done loading
  // try again in a bit
  if (!ship_image.complete || !shadow_image.complete) {
    window.requestAnimationFrame(draw_ships);
    return;
  }
  const game = document.getElementById("game_canvas");
  const context = game.getContext("2d");
  context.clearRect(0, 0, 700, 500);
  if (selected_ship !== undefined) {
    const left = 50 * Math.round(ships[selected_ship].x / 50);
    const top = 50 * Math.round(ships[selected_ship].y / 50);
    if (left >= 200) {
      ships[selected_ship].draw_shadow(context, top, left);
    }
  }
  ships.forEach((s) => s.draw(context));
}
function find_ship(x, y) {
  let ss = undefined;
  ships.forEach((ship, index) => {
    if (ship.x <= x && ship.y <= y && ship.far_x >= x && ship.far_y >= y) {
      ss = index;
    }
  });
  return ss;
}
let selected_ship = undefined;
let mouse_X_offset = 0;
let mouse_Y_offset = 0;

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
      ships[selected_ship].x = x - mouse_X_offset;
      ships[selected_ship].y = y - mouse_Y_offset;
      draw_ships();
    }
  };

  game.onclick = function (e) {
    const x = e.offsetX;
    const y = e.offsetY;
    if (selected_ship !== undefined) {
      ships[selected_ship].x =
        grid_size * Math.round(ships[selected_ship].x / grid_size);
      ships[selected_ship].y =
        grid_size * Math.round(ships[selected_ship].y / grid_size);
      selected_ship = undefined;
      draw_ships();
      return;
    }
    selected_ship = find_ship(x, y);
    if (selected_ship == undefined) {
      return;
    }
    mouse_X_offset = x - ships[selected_ship].x;
    mouse_Y_offset = y - ships[selected_ship].y;
  };
  game.oncontextmenu = function (e) {
    const x = e.offsetX;
    const y = e.offsetY;
    if (selected_ship !== undefined) {
      e.preventDefault();
      ships[selected_ship].horizontal = !ships[selected_ship].horizontal;
      [mouse_X_offset, mouse_Y_offset] = [mouse_Y_offset, mouse_X_offset];
      ships[selected_ship].x = x - mouse_X_offset;
      ships[selected_ship].y = y - mouse_Y_offset;
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