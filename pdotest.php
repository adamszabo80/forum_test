<?php

$server = 'bierher.ch.mysql';
$database = 'bierher_ch';
$username = 'bierher_ch';
$password = 'FUDtgEsB';

$userID = 0;

$conn = new PDO("mysql:host=$server;dbname=$database;", $username, $password);
	
	if($conn):
		$stmt = $conn->prepare("select * from users where ID>:ID");	
		$stmt->bindParam(":ID", $userID);
		
		if($stmt->execute()){
			echo "<pre>";
			$rows = $stmt->fetchAll();
			print_r($rows);					
		}
	
		
	
	endif

?>