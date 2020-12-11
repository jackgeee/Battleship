 

<!DOCTYPE html>
<html>

<head>

Leaderboard

<br>

</head>

<body>

<form method="POST">
<input type="submit" name = "GamesWonDescending">Games Won Descending</input>
</form>

<form method="POST">
<input type="submit" name = "GamesWonAscending">Games Won Ascending</input>
</form>

<form method="POST">
<input type="submit" name = "TimePlayedDescending">Time Played Descending</input>
</form>

<form method="POST">
<input type="submit" name = "TimePlayedAscending">Time Played Ascending</input>
</form>

<form method="POST">
<input type="submit" name = "GamesPlayedDescending">Games Played Descending</input>
</form>

<form method="POST">
<input type="submit" name = "GamesPlayedAscending">Games Played Ascending</input>
</form>

<?php 
//////////////////////////////// Games Won Descending /////////////////////////////
session_start(); 

if(isset($_POST['GamesWonDescending'])) {

$db = mysqli_connect('localhost', 'root', '', 'registration');

$sortByGamesWon = "SELECT gamesWon, username FROM users ORDER BY gamesWon DESC";

$GamesWonSorted = mysqli_query($db, $sortByGamesWon);

while ($row = $GamesWonSorted->fetch_assoc()) {

    
    echo $row['username'] . ": " . $row['gamesWon'] . "<br>" ;

}
}

?>

<?php 
//////////////////////////////// Games Won Ascending /////////////////////////////
if(isset($_POST['GamesWonAscending'])) {

$db = mysqli_connect('localhost', 'root', '', 'registration');

$sortByGamesWon = "SELECT gamesWon, username FROM users ORDER BY gamesWon ASC";

$GamesWonSorted = mysqli_query($db, $sortByGamesWon);

while ($row = $GamesWonSorted->fetch_assoc()) {

    
    echo $row['username'] . ": " . $row['gamesWon'] . "<br>" ;

}
}

?>

<?php 
//////////////////////////////// Time Played Descending /////////////////////////////
if(isset($_POST['TimePlayedDescending'])) {

$db = mysqli_connect('localhost', 'root', '', 'registration');

$sortByTimePlayed = "SELECT timePlayed, username FROM users ORDER BY timePlayed DESC";

$TimePlayedSorted = mysqli_query($db, $sortByTimePlayed);

while ($row = $TimePlayedSorted->fetch_assoc()) {

    
    echo $row['username'] . ": " . $row['timePlayed'] . "<br>" ;

}
}

?>

<?php 
//////////////////////////////// Time Played Ascending /////////////////////////////
if(isset($_POST['TimePlayedAscending'])) {

$db = mysqli_connect('localhost', 'root', '', 'registration');

$sortByTimePlayed = "SELECT timePlayed, username FROM users ORDER BY timePlayed ASC";

$TimePlayedSorted = mysqli_query($db, $sortByTimePlayed);

while ($row = $TimePlayedSorted->fetch_assoc()) {

    
    echo $row['username'] . ": " . $row['timePlayed'] . "<br>" ;

}
}

?>

<?php 
////////////////////////////// Games Played Descending /////////////////////////////
if(isset($_POST['GamesPlayedDescending'])) {

$db = mysqli_connect('localhost', 'root', '', 'registration');

$sortByGamesPlayed = "SELECT gamesPlayed, username FROM users ORDER BY gamesPlayed DESC";

$GamesPlayedSorted = mysqli_query($db, $sortByGamesPlayed);

while ($row = $GamesPlayedSorted->fetch_assoc()) {

    
    echo $row['username'] . ": " . $row['gamesPlayed'] . "<br>" ;

}
}

?>

<?php 
//////////////////////////////// Games Played Ascending /////////////////////////////
if(isset($_POST['GamesPlayedAscending'])) {

    $db = mysqli_connect('localhost', 'root', '', 'registration');
    
    $sortByGamesPlayed = "SELECT gamesPlayed, username FROM users ORDER BY gamesPlayed ASC";
    
    $GamesPlayedSorted = mysqli_query($db, $sortByGamesPlayed);
    
    while ($row = $GamesPlayedSorted->fetch_assoc()) {
    
        
        echo $row['username'] . ": " . $row['gamesPlayed'] . "<br>" ;
    
    }
    }
    

?>


</body>



</html>