<?php
session_start();
include('connect.php');
$message = ''; 
if(isset($_POST['logins'])){
    // userEmail and userPassword sent from form 
    
    $email = mysqli_real_escape_string($link,$_POST['email']);
    $password1 = mysqli_real_escape_string($link,$_POST['password1']); 
    $password1 = md5 ($password1);
   


    $sql = "Select * from orders where email = '$email' and password1 = '$password1'";
    $query = mysqli_query($link, $sql) or die(mysql_error());
    $result = mysqli_fetch_array($query);
    $count = mysqli_num_rows($query);
    if ($count > 0 ) {
        $row = mysqli_fetch_assoc($query);
        echo $row['firstname'];
        echo $row['lastname'];
        $firstname = $row['firstname'];
        $lastname = $row['lastname'];
        $_SESSION['user']=$lastname;
        header("location:dashboard.php");
    } else {
        $_SESSION['error'] = "YOUR DETAILS ARE NOT CORRECT OR TRY SIGNING UP";
        header("location:login.php");
    
       
    }}
?>
