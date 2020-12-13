<?php

session_start(); 
session_destroy();

$db = mysqli_connect('localhost', 'root', '', 'gamedb');

$clearCoords = "TRUNCATE TABLE coordsClickedOn";
$clearPositions = "TRUNCATE TABLE playerPositions";

$db->query($clearCoords);
$db->query($clearPositions);

header('location: ../MainPage/Main.php')

?>