<?php 
	require 'user.php';
?>
<div id="blog-header">
  <h1>João Gabriel Sabatini</h1>
  <form class="form-inline" action="/search.php" method="post">
    <input type="search" placeholder="Search" aria-label="Search" id="term" name="term">
    <button type="submit">Search</button>
  </form>
</div>
<div id="navbar">
  <ul>
  <li><a href="index.php">Home</a></li>
  <li><a href="posts.php">Posts</a></li>
  <li><a href="https://git.sabatini.xyz/owari">Git</a></li>
  <li><a href="contact.php">Contact</a></li>
  <?php
    if(is_logged()) {
  ?>
  <li><a style="float: right">Welcome <?php echo user_field_get('email') ?>!</a></li>
  <li><a style="float: right; margin-right: 10px" href="logout.php">Logout</a></li>
  <?php
      $user_perm = intval(user_field_get('permission'));
      if($user_perm > 1) {
  ?>
  <li><a style="float: right; margin-right: 10px" href="posts_add.php">New Post</a></li>
  <?php
      }
  ?>
  <?php
    } else {
  ?>
  <li><a style="float: right" href="register.php">Register</a></li>
  <li><a style="float: right; margin-right: 10px" href="login.php">Login</a></li>
  <?php
    }
  ?>
  </ul>
</div>
