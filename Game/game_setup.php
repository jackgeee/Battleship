<?php
session_start();
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <title>Game Setup</title>
    <link rel="stylesheet" type="text/css" href="gameStyling.css">
    <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@700&display=swap" rel="stylesheet">
    <style>
        #canvas_container {
            /* to create a new stacking context */
            position: relative;
            width: 500px;
            height: 500px;
        }

        #board_canvas,
        #game_canvas {
            position: absolute;
            top: 0;
            left: 0;
        }
    </style>
    <script src="../node_modules/jquery/dist/jquery.min.js"></script>
    <script src="game_setup.js"></script>
</head>

<body>


    <div class="header">
        <h1>BATTLESHIP</h1>
        <?php if (isset($_SESSION['username'])) : ?>
            <p>Welcome<strong> <em> <?php echo $_SESSION['username'] . "," ?> </strong> </em> Please set your ships</p>
        <?php endif ?>
        <h5>
            Click on a ship to move it to your desired position. Right click to rotate. <br>
            Please click "get positions" before starting the game.
        </h5>
    </div>

    



    <form action="getEnemyInfo.php" method="GET" id="startGame">

        

            <input type='text' name='Ships' id='json'>
            <button type='button' onclick="insSet()">Get Positions</button>
            <button type="submit" name="start_game">Start Game</button>

        

    </form>


    <section id="canvas_container">
        <canvas width="700" height="500" id="board_canvas"></canvas>
        <canvas width="700" height="500" id="game_canvas"></canvas>
    </section>


    <script>
        draw_board();
    </script>
    <script>
        draw_ships();
        onEvent();

        function insSet() {
            var ins = document.getElementById('json');
            ins.value = JSON.stringify(ships.map((s) => s.getJsonInfo()));
        }
    </script>
</body>

</html>