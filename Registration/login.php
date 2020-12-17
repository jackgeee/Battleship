<?php include('server.php'); ?>
<!DOCTYPE html>
<html>

<head>
    <title>Login</title>
    <link rel="stylesheet" type="text/css" href="loginStyles.css">
    <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@700&display=swap" rel="stylesheet">
</head>

<body>


    <div class="header">
        <h2>
            Login
        </h2>
    </div>


    <form method="POST" action="login.php">
        <?php include('errors.php'); ?>

        <div class="input-group">
            <label>
            <em> <strong> Username </em> </strong>
            </label>

            <input type="text" name="username">

        </div>

        <div class="input-group">

            <label>
            <em>  <strong> Password </em> </strong>
            </label>

            <input type="password" name="password">

        </div>

        <div class="input-group">
            
            <button type="submit" class="btn" name="login_user">Login</button>
        
        </div>

        <p>
            Not registered yet? 
            <br>
            <a style="text-decoration: none;" href="register.php">Sign Up</a>
        </p>

    </form>

</body>

</html>