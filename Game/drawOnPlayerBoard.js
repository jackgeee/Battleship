const enemyclicks = JSON.parse(
  document.getElementById("enemyCoords").innerHTML
);
document.getElementById("enemyCoords").style.display == "none";

const playerClicks = JSON.parse(
  document.getElementById("playerCoords").innerHTML
);
document.getElementById("playerCoords").style.display == "none";

const enemyShipsPos = JSON.parse(
  document.getElementById("enemyPositions").innerHTML
);
document.getElementById("enemyPositions").style.display == "none";

const playerShipsPos = JSON.parse(
  document.getElementById("playerPositions").innerHTML
);
document.getElementById("playerPositions").style.display == "none";

const player_miss_image = document.createElement("img");
player_miss_image.src = "../src/images/playerMiss.png";

// for ecorrds
//     for ppos
//         if ecords == pos
//             draw hit
//         else
//             draw miss
// console.log(enemyclicks);
// console.log(playerShipsPos);

var ecoordArray = [];
var pcoordArray = [];
var sumtowin = 0;
var sumtoloose = 0;

function extractECoord(i) {
  for (let j = 0; j < enemyShipsPos[i]["positions"].length; j++) {
    ecoordArray.push(enemyShipsPos[i]["positions"][j]);
  }
}

function extractPCoord(i) {
  for (let j = 0; j < playerShipsPos[i]["positions"].length; j++) {
    pcoordArray.push(playerShipsPos[i]["positions"][j]);
  }
}

for (var x = 0; x < 5; x++) {
  extractECoord(x);
}

for (var x = 0; x < 5; x++) {
  extractPCoord(x);
}

function drawHits() {
  if (!hit_image.complete) {
    window.requestAnimationFrame(drawHits);
    return;
  }

  const pboard = document.getElementById("enemy_board_canvas");
  const pcontext = pboard.getContext("2d");
  // console.log(ecoordArray);
  // console.log(playerClicks);

  for (var j = 0; j < playerClicks.length; j++) {
    var flag = true;
    for (var i = 0; i < ecoordArray.length; i++) {
      var ex = playerClicks[j][0];
      var ey = playerClicks[j][1];
      var px = ecoordArray[i][0];
      var py = ecoordArray[i][1];
      if (ex == px && ey == py) {
        // console.log(ex, ey, px, py);
        pcontext.drawImage(hit_image, px * 50, py * 50);
        flag = false;
        sumtowin++;
      }
      //context.drawImage(hit_image, x, y)
    }
    if (flag) pcontext.drawImage(miss_image, (ex * 50), ey * 50);
  }

  const eboard = document.getElementById("player_board_canvas");
  const econtext = eboard.getContext("2d");
  for (var j = 0; j < enemyclicks.length; j++) {
    var flag = true;
    for (var i = 0; i < ecoordArray.length; i++) {
      var ex = enemyclicks[j][0];
      var ey = enemyclicks[j][1];
      var px = pcoordArray[i][0];
      var py = pcoordArray[i][1];
      if (ex == px && ey == py) {
        // console.log(ex, ey, px, py);
        econtext.drawImage(hit_image, (px * 50), py * 50);
        flag = false;
        sumtoloose++;
      }
      //context.drawImage(hit_image, x, y)
    }
    if (flag) econtext.drawImage(player_miss_image, ex * 50, ey * 50);
  }
  if (sumtowin > 16) {
    alert("You win");
    
  }
  if (sumtoloose > 16) {
    alert("You LOSE");
  }
}


  
