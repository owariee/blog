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
        <div class="blog-content" style="overflow: auto;">
          <h1 style="margin-bottom: 10px;">Posts</h1>
          <figure style="float: right;">
            <img src="images/kazuma.gif" alt="This is a bunch of stars, duuuuh!">
          </figure>
          <p>Here resides some of my thinkings about a widely range of subjects, but mainly focused in some topics related to quality of life improvements, technology and how we depend on that today:</p>
        </div>
        <div id="blog-post-list">
          <?php
            $result = database_exec('SELECT * FROM `blog`.`posts` ORDER BY `posts_epoch`;');
            $actual_year = 0;
            $actual_month = "";
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
