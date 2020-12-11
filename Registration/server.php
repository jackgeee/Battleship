<?php
session_start(); 

$username = "";
$errors = array();

$db = mysqli_connect('localhost', 'root', '', 'registration');



if (isset($_POST['reg_user']))  // if reg_user button clicked...

{
// receive input values from HTML form
$username = mysqli_real_escape_string($db, $_POST['username']);
$password_1 = mysqli_real_escape_string($db, $_POST['password_1']);
$password_2 = mysqli_real_escape_string($db, $_POST['password_2']);

//validation, push errors to array
if (empty($username)) { array_push($errors, "Username is required"); }
if (empty($password_1)) { array_push($errors, "Password is required"); }
if ($password_1 != $password_2) { array_push($errors, "The two passwords do not match"); }

// check if user already exists
$user_check_query = "SELECT * FROM users WHERE username = '$username'";
$result = mysqli_query($db, $user_check_query);
$user = mysqli_fetch_assoc($result);

if ($user) {
    if ($user['username'] === $username) {
        array_push($errors, "Username already exists"); 
    }
}

// if no errors, create user
if (count($errors) == 0) {
    $password = md5($password_1); 
    $query = "INSERT INTO users (username, password, gamesWon, timePlayed, gamesPlayed) VALUES ('$username', '$password', '0', '0', '0')"; //default values ? error
    $db->query($query);
    $_SESSION['username'] = $username; 
    $_SESSION['success'] = "User created and logged in"; 
    header('location: index.php');
    
}

}

// login user 

if (isset($_POST['login_user'])) {
    $username = mysqli_real_escape_string($db, $_POST['username']);
    $password = mysqli_real_escape_string($db, $_POST['password']);

    if (empty($username)) {
        array_push($errors, "Username is required");
    }

    if(empty($password)) {
        array_push($errors, "Password is required");
    }

    if(count($errors) == 0) {
        $password = md5($password); 
        $query = "SELECT * FROM users WHERE username = '$username' AND password = '$password'";
        $results = $db->query($query);
        if (mysqli_num_rows($results) == 1) {
            $_SESSION['username'] = $username; 
            $_SESSION['success'] = "Logged in";
            header('location: ../Game/game_setup.php'); 
        }

        else {
            array_push($errors, "Wrong username or password");
        }
    }
}
 
?>