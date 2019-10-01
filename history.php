<?php
session_start();
include('connect.php');
$message = ''; 
    // userEmail and userPassword sent from form 
    

    $sql = "SELECT dash.title  FROM  dash  LEFT JOIN orders ON orders.dash=orders.id  " ;
     $results=$link->query($sql);
    if($results->num_rows){
        while($row=$results->fetch_object()){
            
                echo "{$row->title} <br>" ;
        }
    }

    

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    
</body>
</html>
