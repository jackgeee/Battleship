<!DOCTYPE html>
<html>


<div hidden id="enemyPositions">
    <?php
    session_start();
    echo $_SESSION['enemyPositions'];
    ?>
</div>

<div hidden id="playerPositions">
    <?php
    echo $_SESSION['playerPositions'];
    ?>
</div>


<div hidden id="enemyCoords">
    <?php
    $temp = true;
    echo '[';
      foreach($_SESSION['enemyCoords'] as $result) {
          if ($temp) {
            echo  ($result);
          }
          $temp = false;
        echo "," . ($result);
      }
    echo ']';
    ?>
</div>


<div hidden id="playerCoords">
    <?php
    $temp = true;
    echo '[';
    foreach($_SESSION['playerCoords'] as $result) {
        if ($temp) {
        echo ($result);
        }
        $temp = false;
        echo "," . ($result);
    }
    echo ']';
    ?>
</div>

<head>



    <style>
        #canvas_container {
            /* to create a new stacking context */
            position: relative;
            width: 500px;
            height: 500px;
        }

        #enemy_board_canvas {
            position: absolute;
            top: 0;
            left: 0;

        }

        #enemy_game_canvas {
            position: absolute;
            top: 0;
            left: 0;

        }

        #player_board_canvas {
            position: absolute;
            top: 0;
            left: 0;

        }

        #player_game_canvas {
            position: absolute;
            top: 0;
            left: 0;

        }

    </style>

    <script src="../node_modules/jquery/dist/jquery.min.js"></script>
    <script src="draw_enemy_board.js"></script>
    <script src="drawOnPlayerBoard.js"></script>
    <script src="tracker.js"></script>






</head>

<body>


    



    <section id="canvas_container">
        <canvas width="500" height="500" id="enemy_board_canvas"></canvas>
        <canvas width="500" height="500" id="enemy_game_canvas"></canvas>
    </section>

    <br>
    <br>
    <br>

    <section id="canvas_container">
        <canvas width="500" height="500" id="player_board_canvas"></canvas>
        <canvas width="500" height="500" id="player_game_canvas"></canvas>
        
    </section>

    <form action="destroyAll.php" method="GET" id="QUIT"> 

    <input type="submit" value="Quit Game">

    </form>
    



    <script>
        draw_enemy_board();
    </script>
    <script>
        draw_enemy_ships();
        setup_enemy_event_handlers();
    </script>

    <script>
        draw_player_board();
    </script>
    <script>
        draw_player_ships();
        // setup_player_event_handlers();
        drawHits();
        shipSunk();
    </script>

        
        <!-- // include "coordHandler.php";
        // $templen = count($enemypos);
        // //everysecond do this
        //         $enemypos = array();
        //         while ($row = $enemyresult->fetch_assoc()) {
        //             // echo ($row['hasClicked']); 
        //             // echo "<br>";
        //             array_push($enemypos, $row['hasClicked']);  
        //         }
        //         if($templen > count($enemypos)){
        //             //call coordhandler
        //         } -->
                
             
      


</body>



</html>