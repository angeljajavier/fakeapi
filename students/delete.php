<?php
	// include config file
	require_once 'config.php';

	$request = $_REQUEST;

	$id = $request['id'];


	$sql = "DELETE FROM studentlist WHERE id='".$id."'";

	// Process the query so that we will save the date of birth
	if ($db->query($sql)) {
	  echo "Student data has been deleted.";
	} else {
	  echo "Error: " . $sql . "<br>" . $db->error;
	}

	// Close the connection after using it
	$db->close();
?>