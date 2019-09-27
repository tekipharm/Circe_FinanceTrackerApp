<?php
$message = '';
    
if(isset($_POST['submit_btn'])){
    include('connect.php');
        $firstname = mysqli_escape_string($link, $_POST ['firstname']);
        $lastname = mysqli_escape_string($link, $_POST ['lastname']);
        $email = mysqli_escape_string($link, $_POST['email']);
        $password1 = mysqli_escape_string($link, $_POST['password1']);
        $password2 = mysqli_escape_string($link, $_POST['password2']);
        if(empty($firstname) || empty($lastname) || empty($email) || empty($password1) || empty($password2)){
            die ("All fields are Required");
            }
            elseif ( strlen ( $firstname ) < 3 || strlen ( $firstname ) > 20) {
                $message .= '<div class="alert alert-danger" role="alert">Full name must be between 3 and 20 characters</div>';
                }
                elseif ( strlen ( $lastname ) < 3 || strlen ( $lastname ) > 20) {
                $message .= '<div class="alert alert-danger" role="alert">Full name must be between 3 and 20 characters</div>';
                }
                elseif ( strlen ( $email ) < 3 || strlen( $email ) > 50) {
                $message .= '<div class="alert alert-danger" role="alert">email must be between 3 and 50 characters</div>';
                }
                elseif ( strlen ( $password1 ) != 11) {
                $message .= '<div class="alert alert-danger" role="alert">password should be at least 11 digits long</div>';
                }
                if($password1 == $password2){
                    $password1 = md5 ($password1);
                    $password2 = md5 ($password2);
                }
                else{
                    die ("Error: Password does not match". "<br>".$sql."<br>".mysqli_error($link));
                }
        $sql = "INSERT INTO orders(firstname ,lastname, email,  password1, password2)
        VALUES('$firstname', 
                '$lastname',
                '$email',
                '$password1',
                '$password2')";
                $result = mysqli_query($link , $sql);
        if($result){
        $message .= '<div class="alert alert-success" role="alert">
        Record Saved Successfully <button class="btn"><a href = "dashboard.php">home</a></button></div>';
        header('location:dashboard.php');
        }
        else{
            $message .= '<div class="alert alert-danger" role="alert">
            Record not Saved ' . mysqli_error($link) . '<button class="btn"><a href = "index.html">Home</a></button>
            </div>';
        
        }
    }
 ?>