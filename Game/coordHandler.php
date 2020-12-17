<?php

session_start(); 

if (isset($_GET['x'], $_GET['y'])) {



    $db = mysqli_connect('localhost', 'root', '', 'gamedb');
    $username = $_SESSION['username']; 

    


    $data = array($_GET['x']/50, $_GET['y']/50);
    $coords = json_encode($data);

    $query = "INSERT INTO coordsClickedOn (username, hasClicked) VALUES ('$username', '$coords')";
    $db->query($query);

}
// query to handle turns:
$bottomQuery = "SELECT username, hasClicked FROM coordsClickedOn ORDER BY id DESC";
$eResult = mysqli_query($db, $bottomQuery);
$row = $eResult->fetch_assoc();

// wait until an enemy coord has been logged
while($row['username'] == $username)
{
    $eResult = mysqli_query($db, $bottomQuery);
    $row = $eResult->fetch_assoc();
}

//ORIG
    $enemy_check_query = "SELECT hasClicked FROM coordsClickedOn WHERE username != '$username'";
    $player_check_query = "SELECT hasClicked FROM coordsClickedOn WHERE username = '$username'";
    $enemyresult = mysqli_query($db, $enemy_check_query);
    $playerresult = mysqli_query($db, $player_check_query);


    $enemypos = array();
    
    // echo "Enemy posistions". "<br>";
    while ($row = $enemyresult->fetch_assoc()) {
        // echo ($row['hasClicked']); 
        // echo "<br>";
       array_push($enemypos, $row['hasClicked']);  
    }
    $_SESSION['enemyCoords'] = $enemypos;

    $playerpos = array();
    // echo "<br>". "Player posistions". "<br>";
    while ($row = $playerresult->fetch_assoc()) {
        array_push($playerpos, $row['hasClicked']);  
     }
    $_SESSION['playerCoords'] = $playerpos;

    // echo "Enemy coords: ";
    // echo "<br>";

    // foreach($_SESSION['enemyCoords'] as $result) {
    //     echo $result . '<br>';
    // }

    // echo "<br>";

    // echo "Player coords: ";
    // echo "<br>";
    // // var_dump($_SESSION['playerCoords']);
    // foreach($_SESSION['playerCoords'] as $result) {
    //     echo $result . '<br>';
    // }

    header('location: draw_enemy_board.php');



?>