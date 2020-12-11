<?php include('server.php'); ?>
<!DOCTYPE html>
<html>

<head>
    <title>Registration</title>
    <link rel="stylesheet" type="text/css" href="loginStyles.css">
    <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@700&display=swap" rel="stylesheet">
</head>

<body>

    <div class="header">
        <h2>
            Register
        </h2>
    </div>

    <form method="post" action="register.php">
        <?php include('errors.php'); ?>

        <div class="input-group">
            <label>
            <em> <strong> Username </em> </strong> 
            </label>

            <input type="text" name="username" value="<?php echo $username; ?>">
        </div>

        <div class="input-group">

            <label>
            <em>  <strong> Password </em> </strong>
            </label>

            <input type="password" name="password_1">

        </div>

        <div class="input-group">

            <label>Confirm Password</label>

            <input type="password" name="password_2">
            
        </div>

        <div class="input-group">
            <button type="submit" class="btn" name="reg_user">Register</button>
        </div>

        <p>
            Already a member? <a href="login.php">Sign in</a>
        </p>

    </form>

</body>

</html>