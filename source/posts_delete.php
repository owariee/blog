<?php
require 'user.php'; 

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
  $sql = "DELETE FROM `blog`.`posts` WHERE `posts_id` = '" . $_GET['id'] . "';";
  $result = database_exec($sql);
  redirect('posts.php', 302);
} else {
  $message = generic_message_content();
  if($message != NULL) {
    echo $message . '<br>';
  }
}
