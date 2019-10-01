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
    <link rel="stylesheet" href="stylesheet.css">
    <link rel="stylesheet" href="bootstrap.css">
    <style>
      body section#finance-history article.viewSelectBtn-conatiner, body section#finance-history article.viewSelectBtn-conatiner div.container{
        grid-template-rows: auto;
      }

      body section#finance-history article.viewSelectBtn-conatiner div.container{
        width: 100%;
        max-width: 95%;
        margin: 10px auto;
      }

      body section#finance-history article.viewSelectBtn-conatiner div.container div.viewSelectBtn-btns {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        margin: auto;
        -webkit-box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.4);
                box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.4);
      }

      body section#finance-history article.viewSelectBtn-conatiner div.container div.viewSelectBtn-btns button.viewSelectBtn {
        width: 60px;
        height: 45px;
        border: 0;
        background-color: #011B33;
        color: #fff;
        text-transform: uppercase;
      }

      body section#finance-history article.viewSelectBtn-conatiner div.container div.viewSelectBtn-btns button.viewSelectBtn.selected {
        background-color: #fff;
        color: #011B33;
        -webkit-transition: ease-in 0.5s;
        transition: ease-in 0.5s;
      }
      p#txt-select-view{
        text-align: center;
        text-transform: uppercase;
        margin: auto;
      }
  </style>
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
              <button id="show-finance-history">
                <img src="./images/history-clock-button.png" alt="icon for add item button" class="add-Item-img" title="Add item symbol">
                <p>History</p>
              </button>
            </li>
          <li class="logout-container container">
            <button id="logout">
              <img src="./images/logout.png" alt="icon for log out item button" class="log-out-img">
              <a href="login.php"><p>logout</p></a>
            </button>
          </li>
        </ul>
      </nav>
    </header>
    <main>
    
      
      <section id="dashboard-charts-sect">
      </section>
      <section id="finance-history">
        <h1>List of Finance Record</h1>
        <article class="viewSelectBtn-conatiner">
            <div class="container">
                <div class="viewSelectBtn-btns">
                    <p id="txt-select-view">select  view</p>
                    <button id="view-all" class="viewSelectBtn All" title = "View All">all</button>
                    <button id="view-week" class="viewSelectBtn week spanish" title = "View Week">week</button>
                    <button id="view-month" class="viewSelectBtn month" title = "View Month">month</button>
                    <button id="view-year" class="viewSelectBtn year" title = "View Year">year</button>
                </div>
            </div>
        </article>
        <article id="finance-history-List"></article>
      </section>
      <section id="add-items-sect">
      <p class="alert alert-primary" role="alert"   style="text-align:center;"  id="invalidpassword">
        <?php 
        if(isset($_SESSION['user'])){
          echo  'Welcome' . " ". $_SESSION['user'];
          }

         
          ?>
        <article>
          <h1>Add Finance Record</h1>
          <form action="" id="add-finance-record-form">
            <label for="finance-record-title">
              Title:
              <input type="text" name="title" id="finance-record-title" placeholder="e.g Shoprite Receipt" required>
            </label>
            <label for="finance-record-description">
              Description:
              <input type="text" name="description" id="finance-record-description" placeholder="e.g I had an emergency buy" required>
            </label>
            <!-- List of items purchased -->
            <fieldset id="item-list">
              <legend>List of Item(s)</legend>
              <div class="item first-item">
                <label>
                  Items:
                  <input class="itemName" type="text" name="item" class="finance-record-items" placeholder="e.g Carrot" required>
                </label>
                <label>
                  Amount(₦):
                  <input class="itemAmt" type="number" name="amount" id="finance-record-amt" placeholder="6000" min="0" required>
                </label>
                <button class="add-item" title="Add another item.">+</button>
              </div>
            </fieldset>
            
            <label for="finance-record-total-amt">
              Total Amount(₦) -<p style="color:red"> auto display your inputted amount:</p>
              <input type="number" name="amount" id="finance-record-total-amt" min="0" readonly>
            </label>
            <label for="finance-record-date">
              Date of transaction:
              <input type="date" name="record-date" id="finance-record-date" required>
            </label>
            <input type="submit" value="Add to Record" id="submit-finance-record">
            <p >CLICK ON THE HISTORY TO FIND THE TOTAL DETAILS</p>
          </form>
        </article>
        <footer>
            <nav class="footer-menu">
              <ul>
                <li><a href="./about.html" class="menu-items" title="Go to About Page">About</a></li>
                <li><a href="./faq.html" class="menu-items"  title="Go to FAQ Page">FAQ</a></li>
              </ul>
            </nav>
          </footer>
      </section>
    </main>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <script src="./js/app.js"></script>
  </body>
</html>
