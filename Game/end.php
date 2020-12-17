<?php

session_start(); 
if (isset($_GET['x'], $_GET['y'])) 
{
    $db = mysqli_connect('localhost', 'root', '', 'gamedb');
    $username = $_SESSION['username']; 
    $data = array($_GET['x']/50, $_GET['y']/50);
    $coords = json_encode($data);
    $query = "INSERT INTO coordsClickedOn (username, hasClicked) VALUES ('$username', '$coords')";
    $db->query($query);
    header('location: ../MainPage/Main.php');
    exit();
}
?>