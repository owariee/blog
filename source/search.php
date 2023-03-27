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
      ?>
      <div id="blog-container">
        <div id="blog-post-list">
        <?php
          $parms = array('term', -1);
          $id_mask = array('Search');
          $valid = false;

          if(post_validate($parms, $id_mask)) {
            $valid = true;
          } else {
            $message = generic_message_content();
            if($message != NULL) {
              echo '<h2>' . $message . '</h2><br>';
            }
          }
          if($valid){
            $result = database_exec('SELECT * FROM `blog`.`posts` WHERE `posts_name` LIKE \'%' . $_POST['term'] . '%\' ORDER BY `posts_epoch`;');
            if($result != NULL) {
              echo '<h1>Found ' . count($result) . ' results!</h1>';
              foreach($result as $entry) {
                $epoch = intval($entry['posts_epoch']);
                $dt = new DateTime("@$epoch");
                $post_year = intval($dt->format('Y'));
                $post_month = $dt->format('F');
                $post_date = $dt->format('Y M d');
                if($post_year != $actual_year) {
                  $year_title = '<h1>' . $post_year . '</h1>';
                  echo $year_title;
                  $actual_year = $post_year;
                }
                if($post_month != $actual_month) {
                  $month_title = '<h2 style="margin-bottom: 10px; text-align: center">' . $post_month . '</h2>';
                  echo $month_title;
                  $actual_month = $post_month;
                }
          ?>
          <ul>
            <li>
              <span>
                <?php
                  echo $post_date;
                ?>
              </span>
              <a href="post.php?id=<?php echo $entry['posts_id'] ?>"><?php echo $entry['posts_name'] ?></a>
              <?php
                if(is_logged()){
                  $user_perm = intval(user_field_get('permission'));
                  if($user_perm >= $page_perm) {
                    echo '<a style="float: right" href="posts_delete.php?id=' . $entry['posts_id'] . '">Delete</a>';
                    echo '<a style="float: right; margin-right: 10px" href="posts_edit.php?id=' . $entry['posts_id'] . '">Edit</a>';
                  }
                }
              ?>
            </li>
          </ul>
          <?php
                }
            } else {
              echo '<h1>Found 0 results!</h1>';
            }
            }
          ?>
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
