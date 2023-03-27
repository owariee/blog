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
        require 'Parsedown.php';
      ?>
      <div id="blog-container">
        <?php
            $parms = array('id', -1);
            $id_mask = array('Id');
            $valid = false;
            if(get_validate($parms, $id_mask)) {
              $valid = true;
            } else {
              $message = generic_message_content();
              if($message != NULL) {
                echo '<h2>' . $message . '</h2><br>';
              }
            }

            if($valid) {
              $query = 'SELECT * FROM `blog`.`posts` WHERE `posts_id` = ' . $_GET['id'] . ';';
              $result = database_exec($query);
              if (count($result) > 1) {
                echo 'Broken database, multiple posts have same id.';
              } else {
        ?>
        <div class="blog-content" style="overflow: auto">
          <h1 style="margin-bottom: 10px"><?php echo $result[0]['posts_name'] ?></h1>
          <h3 style="margin-bottom: 10px; text-align: right">
            <?php
              $epoch = intval($result[0]['posts_epoch']);
              $dt = new DateTime("@$epoch");
              echo $dt->format('Y, F d');
            ?>
          </h3>
          <p>
            <?php
              $Parsedown = new Parsedown();
              echo $Parsedown->text($result[0]['posts_content']);
            ?>
          </p>
        </div>
        <?php
              }
            }
        ?>
			</div>
		</div>
		<div id="blog-img-place">
			<img src="images/kennen.gif"
				alt="Dont put your mouse here!"
				onclick="window.scrollTo(0, 0)">
		</div>
	</body>
</html>
