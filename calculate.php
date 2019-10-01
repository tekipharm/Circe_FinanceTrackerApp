<?php
session_start();
    
if(isset($_POST['history'])){
    $link = mysqli_connect('localhost','root', '','aaaa') or die("Couldn't make connection.");

    $title = mysqli_escape_string($link, $_POST ['title']);
    $description = mysqli_escape_string($link, $_POST['description']);
    $item = mysqli_escape_string($link, $_POST['item']);
    $amount=mysqli_escape_string($link, $_POST['amount']);
        if(empty($title)|| empty($description) || empty($item) || empty($amount)){
            die ("All fields are Required");
            }
                else{
        $sql = "INSERT INTO dash(title,descriptions,item,amount)VALUES('$title',
                '$description',
                '$item',
                '$amount',
                )";
                $result = mysqli_query($link , $sql);
                $_SESSION['user']=$lastname;
                $_SESSION['success']='ACCOUNT CREATED SUCCESSFULLY';
            header('location:dashboard.php');
                }
    }
 ?>
       