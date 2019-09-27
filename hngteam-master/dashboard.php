<?php
session_start();
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
  <body id="dashboard">
    <!--[if IE]>
      <p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
    <![endif]-->

    <header>
      <a href="./index.html" id="logo">Circe</a>
      <nav class="dashboard-header">
        <ul>
          <li id="welcome">
            <p>Welcome HNG</p>
          </li>
          <li>
            <img src="./images/user.png" alt="" id="user-img">
            
          </li>
          <li class="show-dashboard-container container" style="display: none">
              <button id="show-dashboard">
                <!-- <img src="./images/add-to-list-hand-drawn-interface-symbol.png" alt="icon for add item button" class="add-Item-img" title="Add item symbol"> -->
                <p>Dashboard</p>
              </button>
            </li>
          <li class="add-item-container container">
            <button id="add-item">
              <img src="./images/add-to-list-hand-drawn-interface-symbol.png" alt="icon for add item button" class="add-Item-img" title="Add item symbol">
              <p>Add Item</p>
            </button>
          </li>
          <li class="show-finance-histoory-container container">
              <button id="show-finance-histoory">
                <img src="./images/history-clock-button.png" alt="icon for add item button" class="add-Item-img" title="Add item symbol">
                <p>History</p>
              </button>
            </li>
          <li class="logout-container container">
            <button id="logout">
              <img src="./images/logout.png" alt="icon for log out item button" class="log-out-img">
              <p>logout</p>
            </button>
          </li>
        </ul>
      </nav>
    </header>
    <main>

      <section id="dashboard-charts-sect">
      </section>
      <section id="finance-history">

      </section>
      <section id="add-items-sect">
      <p class="alert alert-danger" role="alert"   style="text-align:center;"  id="invalidpassword">
        <?php 
        if(isset($_SESSION['success']))
        echo $_SESSION['success'];
        
        ?>
        
    </p>
    





        <article>
          <h1>Add Finance Record</h1>
          <form  id="add-finance-record-form" name="myform">
            <label for="finance-record-title">
              Title:
              <input type="text" name="title" id="finance-record-title" placeholder="e.g Shoprite Receipt" required>
            </label>
            <label for="finance-record-description">
              Description:
              <input type="text" name="description" id="finance-record-description" placeholder="e.g I had an emergency buy" required>
            </label>
            <label for="finance-record-items">
              Items:
              <input type="text" name="description" id="finance-record-item" placeholder="Food" required>
              </label>

              <label for="finance-record-items">
              Items:
              <input type="text" name="item" id="finance-record-item2" placeholder="Clothes" required>
              </label>
              
              
            <label for="finance-record-amt">
              amount in Naira (₦):
              <input type="number" name="amount" id="finance-record-amt" placeholder="6000" min="0" required>
            </label>

            <label for="finance-record-amt">
              amount in Naira (₦):
              <input type="number" name="amount" id="finance-record-amt2" placeholder="6000" min="0" required>
            </label>

            <label for="finance-record-date">
              Date of transaction:
              <input type="date" name="record-date" id="finance-record-date" required>
            </label>


            <label for="finance-record-amt" style="color:red;margin-top:5px;font-weight:bolder">
             Result
              <input type="text" name="amount" id="result" placeholder="Result" min="0" required>
            </label>
           

            <input type="submit" value="Calculate" id="submit-finance-record" onclick="calulate()">
            <input type="submit" value="Add to Record" id="submit-finance-record">
          </form>
        </article>
      </section>
    </main>
    <footer>
      <nav class="footer-menu">
        <ul>
          <li><a href="./about.html" class="menu-items" title="Go to About Page">About</a></li>
          <li><a href="./faq.html" class="menu-items"  title="Go to FAQ Page">FAQ</a></li>
        </ul>
      </nav>
    </footer>
    <script src="./js/app.js"></script>
    <script src="calculate.js"></script>
  </body>
</html>
