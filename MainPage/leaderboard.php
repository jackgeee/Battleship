 

<!DOCTYPE html>
<html>

<head>

<title>Leaderboard</title>

<br>

<link rel="stylesheet" type="text/css" href="mainPageStyling.css">
<link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Oswald:wght@700&display=swap" rel="stylesheet">
</head>

<body>

<p style="text-align: center;">
    <a href="Main.php"> Back to Main Menu </a>
</p>

<div class="leaderboard">


<form method="POST">
<button type="submit" class="btn" name = "GamesWonDescending">Games Won Descending</button>
<button type="submit" class="btn" name = "GamesWonAscending">Games Won Ascending</button>
<button type="submit" class="btn" name = "TimePlayedDescending">Time Played Descending</button>
<button type="submit" class="btn" name = "TimePlayedAscending">Time Played Ascending</button>
<button type="submit" class="btn" name = "GamesPlayedDescending">Games Played Descending</button>
<button type="submit" class="btn" name = "GamesPlayedAscending">Games Played Ascending</button>
</form>

</div>

<br>

<?php 
//////////////////////////////// Games Won Descending /////////////////////////////
session_start(); 

if(isset($_POST['GamesWonDescending'])) {

$db = mysqli_connect('localhost', 'root', '', 'registration');

$sortByGamesWon = "SELECT gamesWon, username FROM users ORDER BY gamesWon DESC";

$GamesWonSorted = mysqli_query($db, $sortByGamesWon);

while ($row = $GamesWonSorted->fetch_assoc()) {

    
    echo "<p style='color:white; text-align: center; border-style: outset; margin: auto; width: 50%; background: #c41230; border-color: red;'>"  . $row['username'] . ": " . $row['gamesWon'] . "<br>" . "</p>";

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

    
    echo "<p style='color:white; text-align: center; border-style: outset; margin: auto; width: 50%; background: #c41230; border-color: red;'>" . $row['username'] . ": " . $row['gamesWon'] . "<br>" . "</p>" ;

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

    
    echo "<p style='color:white; text-align: center; border-style: outset; margin: auto; width: 50%; background: #c41230; border-color: red;'>" .  $row['username'] . ": " . $row['timePlayed'] . "<br>" . "</p>" ;

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

    
    echo "<p style='color:white; text-align: center; border-style: outset; margin: auto; width: 50%; background: #c41230; border-color: red;'>" .  $row['username'] . ": " . $row['timePlayed'] . "<br>" . "</p>" ;

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

    
    echo "<p style='color:white; text-align: center; border-style: outset; margin: auto; width: 50%; background: #c41230; border-color: red;'>" .  $row['username'] . ": " . $row['gamesPlayed'] . "<br>" . "</p>" ;

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
    
        
        echo "<p style='color:white; text-align: center; border-style: outset; margin: auto; width: 50%; background: #c41230; border-color: red;'>" .  $row['username'] . ": " . $row['gamesPlayed'] . "<br>"  . "</p>";
    
    }
    }
    

?>


</body>



</html>