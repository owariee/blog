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
        <h1>Edit Post</h1><br>
        <form action="/posts_edit.php" method="post">
          <?php
          $parms = array('id', 10000);
          $id_mask = array('Id');

          if(get_validate($parms, $id_mask)) {
            $sql = "SELECT `posts_id`, `posts_name`, `posts_epoch`, `posts_content` ";
            $sql .= "FROM `blog`.`posts` WHERE `posts_id` = '" . $_GET['id'] . "';";
            $result = database_exec($sql);
            if($result == NULL) {
              echo 'Invalid Id';
              return;
            }
          ?>
          <input type="hidden" id="id" name="id" value="<?php echo $result[0]['posts_id'] ?>">
          <label for="title">Title:</label><br>
          <input class="input-full" type="text" id="title" name="title" value="<?php echo $result[0]['posts_name'] ?>"><br>
          <label for="date">Date:</label><br>
          <input class="input-full" type="text" id="date" name="date" value="<?php echo $result[0]['posts_epoch'] ?>"><br>
          <label for="content">Content:</label><br>
          <textarea class="input-full" id="content" name="content" rows="5" cols="33"><?php echo $result[0]['posts_content'] ?></textarea><br>
          <?php
          } else {
            $message = generic_message_content();
            if($message != NULL) {
              echo $message . '<br>';
            }
          }

          $parms_post = array(
            'title', 255,
            'date', 12,
            'content', 1000
          );

          $id_mask_post = array(
            'Title',
            'Date',
            'Content'
          );

          if(post_validate($parms_post, $id_mask_post)) {
            post_edit($_POST['id'], $_POST['title'], $_POST['date'], $_POST['content']);
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
