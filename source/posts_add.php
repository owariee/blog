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
        user_permission_guard(1);
      ?>
      <div id="blog-container">
        <div id="blog-post-list">
        <h1>Add Post</h1><br>
        <form action="/posts_add.php" method="post">
          <label for="title">Title:</label><br>
          <input class="input-full" type="text" id="title" name="title"><br>
          <label for="date">Date:</label><br>
          <input class="input-full" type="text" id="date" name="date"><br>
          <label for="content">Content:</label><br>
          <textarea class="input-full" id="content" name="content" rows="5" cols="33"></textarea><br>
          <?php
          $parms = array(
            'title', 255,
            'date', 12,
            'content', 1000
          );

          $id_mask = array(
            'Title',
            'Date',
            'Content'
          );

          if(post_validate($parms, $id_mask)) {
            post_register($_POST['title'], $_POST['date'], $_POST['content']);
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
