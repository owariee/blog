<?php
	require 'util.php';
	require 'db.php';

	$user_id = NULL;

	function user_id_get() {
		is_logged();
		global $user_id;
		return $user_id;
	}

	function session_id_validate($session_id) {
		global $user_id;
		$sql = 'SELECT `hash`, `user_id` FROM `blog`.`sessions` WHERE `hash` = \'' . $session_id . '\';';
		$result = database_exec($sql);
		if($result == NULL) {
			return false;
		} else {
			$user_id = $result[0]['user_id'];
			return true;
		}
	}

	function is_logged() {
		global $user_id;
		
		if($user_id != NULL) {
			return true;
		}

		$parms = array('session_id', 32);

		if(session_validate($parms) && session_id_validate($_SESSION['session_id'])) {
			return true;
		}

		if(cookie_validate($parms) && session_id_validate($_COOKIE['session_id'])) {
			return true;
		}

		return false;
	}

	function logout() {
		session_delete();
		cookie_delete('session_id');
		redirect('index.php', 302);
	}

	function user_field_get($name) {
		$sql = 'SELECT `' . $name . '` FROM `blog`.`users` WHERE `id` = \'' . user_id_get() . '\';';
		$result = database_exec($sql);
		if($result == NULL) {
			return NULL;
		} else {
			return $result[0][$name];
		}
	}

	function user_permission_guard($page_perm) {
		if(is_logged()){
			$user_perm = intval(user_field_get('permission'));
			if($user_perm >= $page_perm)
			{
				return;
			}
		}

		redirect('index.php', 302);
	}

	function known_user_not_allowed() {
		if(is_logged()) {
			redirect('index.php', 302);
		}
	}

	function try_login($email, $password, $use_cookie) {
		$sql = 'SELECT * FROM `blog`.`users` WHERE `email` = \'' . $email . '\';';
		$result = database_exec($sql);
		if($result == NULL) {
			return 'E-mail not exists in database!<br>';
		}

		$salt_recieved_password = salt_value($password, $result[0]['salt']);
		if($salt_recieved_password != $result[0]['pass'])
		{
			return 'Wrong password!<br>';
		}

		$session_id = generate_random_string();

		$sql = 'INSERT INTO `blog`.`sessions`(`id`, `user_id`, `hash`) VALUES (NULL,\'';
		$sql .=  $result[0]['id'] . '\',\'' . $session_id . '\');';
		$result = database_exec($sql);

		if($use_cookie) {
			cookie_set('session_id', $session_id);
		} else {
			session_set('session_id', $session_id);
		}
		
		redirect('index.php', 302);
	}

	function user_register($email, $pass) {
		$sql = 'SELECT `id` FROM `blog`.`users` WHERE `email` = \'' . $email . '\';';
		$result = database_exec($sql);

		if($result != NULL) {
      echo 'cringe';
			return 'E-mail already registered!';
		}

		$salt = salt_generate();
		$pass = salt_value($pass, $salt);
					
		$sql = 'INSERT INTO `blog`.`users`(`id`, `email`, `pass`, `salt`, `permission`)';
		$sql .= 'VALUES (NULL,\'' . $email . '\',\'' . $pass . '\',\'' . $salt . '\',\'1\');';
		database_exec($sql);
		
		redirect('login.php', 302);
	}

	session_start();
?>
