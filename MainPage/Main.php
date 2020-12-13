<?php
session_start();
?>

<!DOCTYPE html>
<html>
<head>
    <title>Main Menu</title>
    <link rel="stylesheet" type="text/css" href="mainPageStyling.css">
    <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@700&display=swap" rel="stylesheet">
</head>

<body>

<div class="header">
    <h2>Main Menu</h2>
    <?php if (isset($_SESSION['username'])) : ?>
            <p>Welcome,<strong> <em> <?php echo $_SESSION['username'] . "!"?> </strong> </em> </p>
    <?php endif ?>
</div>

<div class="content">
   <ul style="list-style-type:none;">
       <li>
           <a href="../Game/game_setup.php">Play Game</a>
           <br>
           <a href="leaderboard.php">Leaderboard</a>
           <br>
           <a href="help.php">Help</a>
           <br>
           <a href="contact.php">Contact</a>
           <br>
           <a href="../Registration/login.php">Sign Out</a>
       </li>
   </ul>
</div>

</body>
</html>