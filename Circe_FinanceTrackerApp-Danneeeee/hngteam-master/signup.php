<?php
include ('sign.php');
?>
<!doctype html>
<html class="no-js" lang="en-US">
  <head>
    <meta charset="utf-8">
    <meta name="description" content="HNG Team Circe Task 3">
    <!-- app manifest file
    <link rel="manifest" href="manifest.json"/> -->
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>Finance Application</title>
    <link rel="apple-touch-icon" href="./images/logo.png">
    <meta name="theme-color" content="#787A7C">
    <link rel="icon"  href="./images/logo.png">
    <link rel="stylesheet" href="./stylesheet.css">
    <link rel="stylesheet" href="bootstrap.css">

  </head>

  <body  id="signup-page">
    <!--[if IE]>
      <p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
    <![endif]-->
    <header>
      <a href="./index.html" id="logo">Circe</a>
    </header>
    <main>
        <p class="alert alert-danger" role="alert"  style="display: none;text-align:center " id="invalidpassword">Invalid First Name  </p>
        <p class="alert alert-danger" role="alert"  style="display: none ;text-align:center" id="invalidlastname">Invalid Lastname  </p>
        <p class="alert alert-danger" role="alert"  style="display: none ;text-align:center" id="invalidemail">Invalid Email  </p>
        <p class="alert alert-danger" role="alert"  style="display: none;text-align:center " id="invalidpassword1">Password is empty or less than 4  </p>
        <p class="alert alert-danger" role="alert"  style="display: none;text-align:center " id="invalidpassword2">Password does not match  </p>


      
        <section class="signup-section">
            <article>
                <h1>Create An Account</h1>

                <form  id="signup"  name="myform" method="POST" action="" >   
                 
                    <input type="text" id="userFirstName" autocomplete="given-name" placeholder="First Name" name="firstname">
                    <input type="text" id="userLastName" autocomplete="family-name" placeholder="Last Name" name="lastname">
                    <input type="email" id="userEmail" autocomplete="email" placeholder="Email Address" name="email" >
                    <input type="password" id="userNewPassword" autocomplete="new-password" placeholder="Password" name="password1">
                    <input type="password" id="userVerifyPassword" placeholder="Confirm Password" name="password2">
                    <input type="submit" value="create an account" id="btn-submit-sign-up" name="submit_btn" onclick="signup()">
                    <div class="other-form-functions">
                        <p>Already have an account? <span><a href="login.php">Login</a></span></p>
                    </div>
                </form>
            </article>
        </section>
    </main>
    <script src="js/signup.js"></script>
    <script src="bootstrap.min.js"></script>
  </body>
</html>
