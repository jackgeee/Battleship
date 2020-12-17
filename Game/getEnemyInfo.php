<?php
session_start();
$db = mysqli_connect('localhost', 'root','', 'gamedb');


if (isset($_GET['Ships'])) {
    $username = $_SESSION['username'];
    $data = ($_GET['Ships']);
 
     
    
    $query = "INSERT INTO playerPositions (username, positions) VALUES ('$username', '$data')";
    $db->query($query);

    $user_check_query = "SELECT username FROM playerPositions";

    $result = mysqli_query($db, $user_check_query);


   while ($result->num_rows == 1) {
    $_SESSION['p1'] = 1;
    $user_check_query = "SELECT username FROM playerPositions";
    $result = mysqli_query($db, $user_check_query);

    }

    if ($result->num_rows > 1) {
        if(!isset($_SESSION['p1']))
        {
            $_SESSION['p1'] = 2;
        }

        while ($row = $result->fetch_assoc()) {

            if ($row['username'] == $_SESSION['username']) {
                $player = $row['username'];
                $queryPlayer = "SELECT positions FROM playerPositions WHERE username = '$player'";
                $result2 = mysqli_query($db, $queryPlayer);
                $playerPositions = $result2->fetch_assoc();
                $pos1 = $playerPositions["positions"];
                $_SESSION['playerPositions'] = $pos1;
            }

            if ($row['username'] != $_SESSION['username']) {

                $_SESSION['otherPlayer'] = $row['username'];
                $otherPlayer = $row['username'];
                $queryOtherPlayer = "SELECT positions FROM playerPositions WHERE username = '$otherPlayer'";
                $result3 = mysqli_query($db, $queryOtherPlayer);
                $enemyPositions = $result3->fetch_assoc();
                $pos2 = $enemyPositions["positions"];
                $_SESSION['enemyPositions'] = $pos2; 
            }
            
        }
    }
    header('location: draw_enemy_board.php');
    exit();
  
}
?>