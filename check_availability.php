<?php
	session_start();
	if(isset($_SESSION['user_id'])){
		header("Location: /test/");
	} else {
		require 'database.php';			
	}
?>

<?php
if (!empty($_POST['Email'])){
	$sql = "SELECT id FROM user WHERE email = :email";
	$stmt = $conn->prepare($sql);
	$stmt->bindValue(':email', $_POST['Email']); 
	$stmt->execute();
	echo $stmt->rowCount();	
}
 	
if (!empty($_POST['Nickname'])){
	$sql = "SELECT id FROM user WHERE nickname = :nickname";
	$stmt = $conn->prepare($sql);
	$stmt->bindValue(':nickname', $_POST['Nickname']); 
	$stmt->execute();
	echo $stmt->rowCount();	
}	
?>
