<?php
$message = '';
    
if(isset($_POST['submit'])){
    include('connect.php');
        $userFirstName = mysqli_escape_string($conn, $_POST ['userFirstName']);
        $userLastName = mysqli_escape_string($conn, $_POST ['userLastName']);
        $userEmail = mysqli_escape_string($conn, $_POST['userEmail']);
        $userNewPassword = mysqli_escape_string($conn, $_POST['userNewPassword']);
        $userVerifyPassword = mysqli_escape_string($conn, $_POST['userVerifyPassword']);
        if(empty(userFirstName) || empty($userLastName) || empty($userEmail) || empty($userNewPassword) || empty($userVerifyPassword)){
            die ("All fields are Required");
            }
            elseif ( strlen ( $userFirstName ) < 3 || strlen ( userFirstName ) > 20) {
                $message .= '<div class="alert alert-danger" role="alert">Full name must be between 3 and 20 characters</div>';
                }
                elseif ( strlen ( $userLastName ) < 3 || strlen ( userLastName ) > 20) {
                $message .= '<div class="alert alert-danger" role="alert">Full name must be between 3 and 20 characters</div>';
                }
                elseif ( strlen ( $userEmail ) < 3 || strlen( $userEmail ) > 50) {
                $message .= '<div class="alert alert-danger" role="alert">userEmail must be between 3 and 50 characters</div>';
                }
                elseif ( strlen ( $userNewPassword ) != 11) {
                $message .= '<div class="alert alert-danger" role="alert">password should be at least 11 digits long</div>';
                }
                if($userNewPassword == $userVerifyPassword){
                    $userNewPassword = md5 ($userNewPassword);
                    $userVerifyPassword = md5 ($userVerifyPassword);
                }
                else{
                    die ("Error: Password does not match". "<br>".$sql."<br>".mysqli_error($conn));
                }
        $sql = "INSERT INTO table(userFirstName , userEmail,  userNewPassword, userVerifyPassword)
        VALUES('userFirstName', 
                'userLastName',
                '$userEmail',
                '$userNewPassword',
                '$userVerifyPassword',
                 NOW())";
                $result = mysqli_query($conn , $sql);
        if($result){
        $message .= '<div class="alert alert-success" role="alert">
        Record Saved Successfully <button class="btn"><a href = "landing.html">Home</a></button></div>';
        }
        else{
            $message .= '<div class="alert alert-danger" role="alert">
            Record not Saved ' . mysqli_error($conn) . '<button class="btn"><a href = "index.html">Home</a></button>
            </div>';
        
        }
    }
 ?>
 