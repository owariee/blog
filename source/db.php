<?php
	require 'credentials.php';

	$conn = NULL;

	function database_connect() {
		global $conn, $servername, $username, $password;
		
		if($conn != NULL) {
			return;
		}

		$conn = new mysqli($servername, $username, $password);

		if($conn->connect_error) {
			die('Cannot connect to the database! ' . $conn->connect_error);
		}
	}

	function database_exec($query) {
		global $conn;

		database_connect();

		$result = $conn->query($query);

		if($result === false) {
			die('Error executing query! ' . $conn->error);
		}

		if(!isset($result->num_rows) || $result->num_rows <= 0) {
			return NULL;
		}

		$row_array = array();

		while($row = $result->fetch_assoc()) {
			array_push($row_array, $row);
	  	}

	  	return $row_array;
	}
?>
