<?php
  require 'preferences.php';

  $generic_message = NULL;
  $last_uploaded_image_path = NULL;

  function generate_random_string($length = 32) {
      $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
      $charactersLength = strlen($characters);
      $randomString = '';
      for ($i = 0; $i < $length; $i++) {
          $randomString .= $characters[rand(0, $charactersLength - 1)];
      }
      return $randomString;
  }

  function salt_generate() {
    return generate_random_string(1);
  }

  function salt_value($value, $salt) {
    $salted = $value . $salt;
    return hash('sha256', $salted);
  }

  function redirect($url, $code) {
    header('Location: ' . $url, true, $code);
      exit();
  }

  function generic_message_clear() {
    global $generic_message;
    $generic_message = NULL;
  }

  function generic_message_content() {
    global $generic_message;
    
    if($generic_message == NULL) {
      return NULL;
    }

    $message_html = '';
    foreach($generic_message as $message) {
      $message_html .= $message . '<br>';
    }

    generic_message_clear();
    return $message_html;
  }

  function generic_message_push($message) {
    global $generic_message;
    if($generic_message == NULL) {
      $generic_message = array();
    }
    array_push($generic_message, $message);
  }

  function generic_validate($array, $type, $id_mask = NULL) {
    global $generic_message;

    for($i = 0; $i < (count($array) / 2); $i++) {
      $field = $array[$i*2];
      $field_msg = $id_mask == NULL ? $field : $id_mask[$i];
      $max_lenght = $array[$i*2+1];
      if(!isset($type[$field])) {
        return false;
      } else {
        $value = $type[$field];
        if(empty($value)) {
          generic_message_push('\'' . $field_msg . '\' field is required!');
        }
        if($max_lenght != -1 && strlen($value) > $max_lenght) {
          generic_message_push('\'' . $field_msg . '\' field exceeds maximum character size allowed!');
        }
      }
    }

    //implement character mask????, implement min char size????
    if($generic_message != NULL) {
      return false;
    }
    return true;
  }

  function cookie_delete($name) {
    setcookie($name, "", time() - 3600);
  }

  function cookie_set($name, $value) {
    global $cookie_time;
    setcookie($name, $value, $cookie_time, '/');
  }

  function cookie_validate($cookie_array) {
    generic_message_clear();
    $result = generic_validate($cookie_array, $_COOKIE);
    generic_message_clear();
    return $result;
  }

  function session_delete() {
    session_unset();
    session_destroy();
  }

  function session_set($name, $value) {
    $_SESSION[$name] = $value;
  }

  function session_validate($session_array) {
    if(!isset($_SESSION)) {
      return false;
    }
    generic_message_clear();
    $result = generic_validate($session_array, $_SESSION);
    generic_message_clear();
    return $result;
  }

  function post_validate($parameter_array, $id_mask) {
    if($_SERVER["REQUEST_METHOD"] != "POST") {
      return false;
    }

    generic_message_clear();
    $result = generic_validate($parameter_array, $_POST, $id_mask);

    return $result;
  }

  function get_validate($parameter_array, $id_mask) {
    if($_SERVER["REQUEST_METHOD"] != "GET") {
      return false;
    }

    generic_message_clear();
    $result = generic_validate($parameter_array, $_GET, $id_mask);

    return $result;
  }

  function image_upload($target_dir) {
    global $last_uploaded_image_path;

    $image = $_FILES["image_file"];

    if(empty($image["tmp_name"])) {
      return "'Image' field is required!";
    }

    if(getimagesize($image["tmp_name"]) === false) {
        return "File is not an image.";
    }

    $file_format = strtolower(pathinfo(basename($image["name"]), PATHINFO_EXTENSION));
    if($file_format != "jpg" && $file_format != "png" && $file_format != "jpeg") {
        return "Sorry, only JPG, JPEG and PNG files are allowed.";
    }

    if ($image["size"] > 500000) {
        return "Sorry, your file is too large.";
    }

    $target_file = $target_dir . generate_random_string() . '.' . $file_format;
    if(file_exists($target_file)) {
        return image_upload($target_dir);
    }

    if (!move_uploaded_file($image["tmp_name"], $target_file)) {
        return "Sorry, there was an error uploading your file.";
    }

    $last_uploaded_image_path = $target_file;

    return NULL;
  }

  function image_upload_get_path() {
    global $last_uploaded_image_path;
    return $last_uploaded_image_path;
  }

  function post_register($title, $date, $content) {
		$sql = 'INSERT INTO `blog`.`posts`(`posts_id`, `posts_name`, `posts_epoch`, `posts_content`) ';
		$sql .= "VALUES (NULL, '" . $title . "', '" . $date . "', '" . $content . "');";
		database_exec($sql);
		
		redirect('posts.php', 302);
	}

  function post_edit($id, $title, $date, $content) {
    $sql = "UPDATE `blog`.`posts` SET `posts_id`='" . $id . "',`posts_name`='" . $title . "',";
    $sql .= "`posts_epoch`='" . $date . "',`posts_content`='" . $content . "' WHERE ";
    $sql .= "`posts_id` = '" . $id . "';";
    echo $sql;
		database_exec($sql);
		
		redirect('post.php?id=' . $id, 302);
	}
?>
