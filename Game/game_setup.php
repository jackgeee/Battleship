<?php 
session_start(); 
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <title>Game Setup</title>
    <style>
        #canvas_container {
            /* to create a new stacking context */
            position: relative;
            width: 700px;
            height: 500px;
        }

        #board_canvas,
        #game_canvas {
            position: absolute;
            top: 0;
            left: 0;
        }
    </style>
    <script src = "../node_modules/jquery/dist/jquery.min.js"></script>
    <script src="game_setup.js"></script>
</head>

<body>

    <h1>BATTLESHIP</h1>

    <?php if (isset($_SESSION['username'])) : ?>
        <p>Welcome <strong> <?php echo $_SESSION['username'] . "." ?> </strong> Please set your ships</p>
    <?php endif ?>


    <h5>Click to select and place, right click to rotate</h5>
    <section id="canvas_container">
        <canvas width="700" height="500" id="board_canvas"></canvas>
        <canvas width="700" height="500" id="game_canvas"></canvas>
    </section>
<!-- 
    <form action="getEnemyInfo.php" method="GET" id="startGame">

       
            <button type="submit" class="btn" name="start_game" onclick="startGame()">Start Game</button>
    

    </form> -->

    <form action="getEnemyInfo.php" method="GET" id="startGame">

       <input type='text' name='Ships' id='json'>
       <input type='button' onclick="insSet()">
        <button type="submit" class="btn" name="start_game">Start Game</button>
    

    </form>


    <script>
        draw_board();
    </script>
    <script>
        draw_ships();
        setup_event_handlers();
        function insSet()
        {
            var ins = document.getElementById('json');
            ins.value = JSON.stringify(ships.map((s) => s.describe()));
        }
    </script>
</body>

</html>