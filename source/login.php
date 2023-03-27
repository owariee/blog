<!DOCTYPE html5>
<html>
	<head>
		<title>Gabriel's Blog</title>
		<link rel="stylesheet" href="styles.css">
	<head>
	<body>
		<div id="blog-block">
      <?php
        require 'navbar.php';
        known_user_not_allowed();
      ?>
      <div id="blog-container">
        <div id="blog-post-list">
        <h1>Login</h1><br>
        <form action="/login.php" method="post">
          <label for="email">E-mail:</label><br>
          <input type="text" id="email" name="email" placeholder="name@example.com"><br>
          <label for="pass">Password:</label><br>
          <input type="password" id="pass" name="pass"><br>
          <input type="checkbox" id="cookie" name="cookie" value="Bike">
          <label for="cookie"> Stay connected!</label><br><br>
          <?php
            $parms = array(
            'email', 45,
            'pass', -1
          );

          $id_mask = array(
            'E-mail',
            'Password'
          );

          if(post_validate($parms, $id_mask)) {
            if(!isset($_POST['cookie'])) {
              $use_cookie = false;
            } else {
              $use_cookie = true;
            }
            echo try_login($_POST['email'], $_POST['pass'], $use_cookie) . '<br>';
          } else {
            $message = generic_message_content();
            if($message != NULL) {
              echo $message . '<br>';
            }
          }
          ?>
          <input type="submit" value="Submit">
        </form>
        </div>
			</div>
		</div>
		<div id="blog-img-place">
			<img src="images/kennen.gif"
				alt="Dont put your mouse here!"
				onclick="window.scrollTo(0, 0)">
		</div>
	</body>
</html>
