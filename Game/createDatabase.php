<?php

$gamedb = mysqli_connect('localhost', 'root', '');

if ($gamedb->connect_error) {
    die("Connection failed: " . $gamedb->connect_error);
  }


  $createGamedb = "CREATE DATABASE gamedb";
  if ($gamedb->query($createGamedb) === TRUE) {
    echo "Gamedb created successfully";
  } else {
    echo "Error creating database: " . $gamedb->error;
  }

$gamedb->close();

  
$registrationdb = mysqli_connect('localhost', 'root', '');
  

  if ($registrationdb->connect_error) {
      die("Connection failed: " . $registrationdb->connect_error);
    }

  $createRegistrationdb = "CREATE DATABASE registration";
  if ($registrationdb->query($createRegistrationdb) === TRUE) {
    echo "Registrationdb created successfully";
  } else {
    echo "Error creating database: " . $registrationdb->error;
  }
  
$registrationdb->close();

  
$gamedb = mysqli_connect('localhost', 'root', '', 'gamedb');

    $createCoordsClickedon = "CREATE TABLE `coordsClickedOn` (
    `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `username` varchar(100) NOT NULL,
    `hasClicked` varchar(100) NOT NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=latin1";

    $createPlayerPositions = "CREATE TABLE `playerPositions` (
    `username` varchar(100) NOT NULL,
    `positions` varchar(500) NOT NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=latin1";

    $gamedb->query($createCoordsClickedon);
    $gamedb->query($createPlayerPositions);


$gamedb->close();


$registrationdb = mysqli_connect('localhost', 'root', '', 'registration');

    $createUsers = "CREATE TABLE `users` (
    `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `username` varchar(100) NOT NULL,
    `password` varchar(100) NOT NULL, 
    `gamesWon` Integer(100) NOT NULL,
    `timePlayed` Integer(100) NOT NULL,
    `gamesPlayed` Integer(100) NOT NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=latin1";

    
    
    if ($registrationdb->query($createUsers) === TRUE) {
      echo "Table Users created successfully";
    } else {
      echo "Error creating table: " . $registrationdb->error;
    }
    
    

    $insertRandomData1 = "INSERT INTO users (username, password, gamesWon, timePlayed, gamesPlayed) VALUES ('Obama', '911', '5', '5', '5')"; //default values ? error
    $insertRandomData2 = "INSERT INTO users (username, password, gamesWon, timePlayed, gamesPlayed) VALUES ('Hubert', '911', '2', '10', '7')";
    $insertRandomData3 = "INSERT INTO users (username, password, gamesWon, timePlayed, gamesPlayed) VALUES ('Todd', '911', '0', '80', '12')";
    $insertRandomData4 = "INSERT INTO users (username, password, gamesWon, timePlayed, gamesPlayed) VALUES ('Matin', '911', '1', '16', '9')";
    $insertRandomData5 = "INSERT INTO users (username, password, gamesWon, timePlayed, gamesPlayed) VALUES ('Thanos', '911', '8', '15', '33')";

    if ($registrationdb->query($insertRandomData1) === TRUE) {
      echo "Data1 created successfully";
    } else {
      echo "Error creating database: " . $registrationdb->error;
    }
    
    $registrationdb->query($insertRandomData2);
    $registrationdb->query($insertRandomData3);
    $registrationdb->query($insertRandomData4);
    $registrationdb->query($insertRandomData5);

$registrationdb->close();

header('location: game_setup.php')
?>