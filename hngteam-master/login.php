<?php
include ('log.php');
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
  <body id="login-page">
    <!--[if IE]>
      <p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
    <![endif]-->

    <header>
      <a href="./index.html" id="logo">Circe</a>
    </header>
    <main>

        <p class="alert alert-danger" role="alert"  style="display: none ;text-align:center" id="invalidemail">Invalid email  </p>
        <p class="alert alert-danger" role="alert"  style="display: none;text-align:center " id="invalidpassword1">Password is incorrect  </p>

        <section class="login-section">
            <article>
                <h1>Login</h1>
                <form  id="login" name="myform" action="" method="post">
                    <input type="email" id="userEmail" autocomplete="email" placeholder="Email Address" name="email" >
                    <input type="password" id="userNewPassword" autocomplete="new-password" placeholder="Password" name="password1">
                    <input type="submit" name="logins" value="Login" id="btn-submit-sign-up" onclick="login()" >

                    <div class="other-form-functions">
                        <p>Dont have an account? <span><a href="signup.php">Create one</a></span></p>
                    </div>
                </form>
            </article>
        </section>
    </main>
    <script src="bootstrap.min.js"></script>
    <script src="js/login.js"></script>
  </body>
</html>
