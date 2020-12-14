// console.log(enemyShipsPos);

/*
shiphits
for enemyclicks
    for enemyShipsPos[i]["positions"][j]);
        enemyclikc = shio pos
        shiphits++


if shiphits > shippos
     shipsunk
*/



function arrayAlreadyHasArray(arr, subarr){
    for(var i = 0; i<arr.length; i++){
        let checker = false
        for(var j = 0; j<arr[i].length; j++){
            if(arr[i][j] === subarr[j]){
                checker = true
            } else {
                checker = false
                break;
            }
        }
        if (checker){
            return true
        }
    }
    return false
}

function shipSunk() {
      

// console.log(ecoordArray);

// console.log(playerClicks);

// console.log(playerShipsPos);

const CarrierPos = enemyShipsPos[0]["positions"];
const BattleshipPos = enemyShipsPos[1]["positions"];
const SubmarinePos = enemyShipsPos[2]["positions"];
const DestroyerPos = enemyShipsPos[3]["positions"];
const PatrolPos = enemyShipsPos[4]["positions"];

// console.log(CarrierPos);
// console.log(ecoordArray);

/////////////////////// CARRIER SUNK? ////////////////////////////

var CarrierSunk;
console.log(CarrierPos);
console.log(playerClicks);
for (var i = 0; i < CarrierPos.length; i++) {
    if(arrayAlreadyHasArray(playerClicks, CarrierPos[i]))  {
        CarrierSunk = true;
    }    
    else{
        CarrierSunk = false; 
    break;
    }   
}
if(CarrierSunk){

    var CarrierSunkalerted = localStorage.getItem('CarrierSunkalerted') || '';
    if (CarrierSunkalerted != 'yes') {
     alert("Carrier sunk");
     localStorage.setItem('CarrierSunkalerted','yes');
    }

}

/////////////////////// BATTLESHIP SUNK? ////////////////////////////

var BattleshipSunk;
for (var i = 0; i < BattleshipPos.length; i++) {
    if(arrayAlreadyHasArray(playerClicks, BattleshipPos[i]))  {
        BattleshipSunk = true;
    }    
    else{
        BattleshipSunk = false; 
    break;
    }   
}
if(BattleshipSunk){

    var BattleShipSunkalerted = localStorage.getItem('BattleShipSunkalerted') || '';
    if (BattleShipSunkalerted != 'yes') {
     alert("Battleship sunk");
     localStorage.setItem('BattleShipSunkalerted','yes');
    }

}

/////////////////////// SUBMARINE SUNK? ////////////////////////////

var SubmarineSunk;
for (var i = 0; i < SubmarinePos.length; i++) {
    if(arrayAlreadyHasArray(playerClicks, SubmarinePos[i]))  {
        SubmarineSunk = true;
    }    
    else{
        SubmarineSunk = false; 
    break;
    }   
}
if(SubmarineSunk){

    var SubmarineSunkalerted = localStorage.getItem('SubmarineSunkalerted') || '';
    if (SubmarineSunkalerted != 'yes') {
     alert("Submarine sunk");
     localStorage.setItem('SubmarineSunkalerted','yes');
    }

}

/////////////////////// DESTROYER SUNK? ////////////////////////////

var DestroyerSunk;
for (var i = 0; i < DestroyerPos.length; i++) {
    if(arrayAlreadyHasArray(playerClicks, DestroyerPos[i]))  {
       DestroyerSunk = true;
    }    
    else{
       DestroyerSunk = false; 
    break;
    }   
}
if(DestroyerSunk){

    var DestroyerSunkalerted = localStorage.getItem('DestroyerSunkalerted') || '';
    if (DestroyerSunkalerted != 'yes') {
     alert("Destroyer sunk");
     localStorage.setItem('DestroyerSunkalerted','yes');
    }

}

/////////////////////// PATROL BOAT SUNK? ////////////////////////////
    
var PatrolSunk;
for (var i = 0; i < PatrolPos.length; i++) {
    if(arrayAlreadyHasArray(playerClicks, PatrolPos[i]))  {
       PatrolSunk = true;
    }    
    else{
       PatrolSunk = false; 
    break;
    }   
}
if(PatrolSunk){

    var PatrolSunkalerted = localStorage.getItem('PatrolSunkalerted') || '';
    if (PatrolSunkalerted != 'yes') {
     alert("Patrol Boat sunk");
     localStorage.setItem('PatrolSunkalerted','yes');
    }

}

if (CarrierSunk && BattleshipSunk && SubmarineSunk && DestroyerSunk && PatrolSunk) {
    window.localStorage.clear() 
}
}


//////////////////////////////////////////////////////////////////////////


// if (localStorage.getItem('CarrierSunkalerted') == 'yes') {
//     console.log("here");
//     document.getElementById("enemyCarrier").innerHTML = "Carrier Sunk!";
// }

