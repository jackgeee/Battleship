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
    foreach ($_SESSION['enemyCoords'] as $result) {
        if ($temp) {
            echo ($result);
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
    foreach ($_SESSION['playerCoords'] as $result) {
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

    <link rel="stylesheet" type="text/css" href="gameStyling.css">
    <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@700&display=swap" rel="stylesheet">

    <script src="../node_modules/jquery/dist/jquery.min.js"></script>
    <script src="draw_enemy_board.js"></script>
    <script src="drawOnPlayerBoard.js"></script>
    <script src="tracker.js"></script>






</head>

<body>


    <div class="boards" id="boards">
        <section id="canvas_container" class="canvas1">

            <canvas class="canvas" width="500" height="500" id="enemy_board_canvas"></canvas>
            <canvas class="canvas" width="500" height="500" id="enemy_game_canvas"></canvas>

        </section>


        <section id="canvas_container" class="canvas2">

            <canvas class="canvas1" width="500" height="500" id="player_board_canvas"></canvas>
            <canvas class="canvas1" width="500" height="500" id="player_game_canvas"></canvas>

        </section>

    </div>


    <div class="header">
        <?php if (isset($_SESSION['username'])) : ?>
            <p>You better win<strong> <em> <?php echo $_SESSION['username'] . "!" ?> </strong> </em> </p>
            <div id="timerLabelsec">Loading...</div>
            <button onclick="resetStartTime()"></button>
        <?php endif ?>
    </div>

    <div class="content">

        <p class="enemyName">  <?php echo $_SESSION['otherPlayer'] ?> </p>
        
        <p class="playerName">  <?php echo $_SESSION['username'] ?>   </p>
        
    </div>

    <div class="gameMenu">

        <form action="destroyAll.php" method="GET" id="QUIT">
            <input type="submit" value="Quit Game" class="inputs">
        </form>

    </div>




    <!-- 
    <script>
        
        var minutesLabel = document.getElementById("minutes");
        var secondsLabel = document.getElementById("seconds");
        var totalSeconds = 0;
        setInterval(setTime, 1000);

        function setTime() {
            ++totalSeconds;
            secondsLabel.innerHTML = pad(totalSeconds % 60);
            minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
            localStorage.setItem('savedSeconds', secondsLabel);
            localStorage.setItem('savedMinutes', minutesLabel);
        }

        function pad(val) {
            var valString = val + "";
            if (valString.length < 2) {
                return "0" + valString;
            } else {
                return valString;
            }
        }
    </script> -->

    <script>
        
        function resetStartTime() {
            startTime = new Date();
            window.localStorage.setItem('startTime', startTime);
            return startTime;
        }

        document.addEventListener('DOMContentLoaded', function(event) {
            // get timestamp
            startTime = new Date(window.localStorage.getItem('startTime') || resetStartTime());
            // start timer
            window.setInterval(function() {
                var secsDiff = new Date().getTime() - startTime.getTime();
                document.getElementById('timerLabelsec').innerText = Math.floor(secsDiff / 1000) + ' sec';
            }, 1000);
        });
    </script>


    <script>
        draw_enemy_board();
    </script>
    <script>
        draw_enemy_ships();
        onEnemyEvent();
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