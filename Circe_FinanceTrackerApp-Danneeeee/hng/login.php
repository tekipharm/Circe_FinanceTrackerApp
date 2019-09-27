<?php
include('connect.php');
$message = ''; 
if(isset($_POST['submit'])){
    // userEmail and userPassword sent from form 
    
    $userEmail = mysqli_real_escape_string($link,$_POST['userEmail']);
    $userPassword = mysqli_real_escape_string($link,$_POST['userPassword']);    


    $sql1 = "Select * from admin where userEmail = '$userEmail' and userPassword = '$userPassword'";
    $query = mysqli_query($link, $sql1) or die(mysql_error());
    $result = mysqli_fetch_array($query);
    $count = mysqli_num_rows($query);
    if ($count ==1 ) {
        $_SESSION['login_user'] = $userEmail;
        $_SESSION['login_id'] = $result['id'];
        header("location: dashboard.php");
    } else {
        $message = '<p class="text-warning">Invalid login credentials</p>';
       
    }}
?>
