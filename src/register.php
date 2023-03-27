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
        <h1>Register</h1>
        <form action="/register.php" method="post">
          <label for="email">E-mail:</label><br>
          <input type="text" id="email" name="email" placeholder="name@example.com"><br>
          <label for="pass">Password:</label><br>
          <input type="password" id="pass" name="pass"><br>
          <label for="pass-confirm">Confirm Password:</label><br>
          <input type="password" id="pass-confirm" name="pass-confirm"><br>
          <?php
          $parms = array(
            'email', 45,
            'pass', -1,
            'pass-confirm', -1
          );

          $id_mask = array(
            'E-mail',
            'Password',
            'Confirm Password'
          );

          if(post_validate($parms, $id_mask)) {
            if($_POST['pass-confirm'] != $_POST['pass']) {
              echo '\'Password\' field and \'Confirm Password\' field doesnt match!<br>';
            } else {
              echo user_register($_POST['email'], $_POST['pass']) . '<br>';
            }
            echo '<br>';
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
