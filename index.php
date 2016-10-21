<html> 
<!-- <HEAD> tag-->
<?php require 'header.php'; ?>
<!-- </HEAD> tag-->

<?php
session_start();
	if(isset($_SESSION['user_id'])){
		header("Location: /test/");
	}
	require 'database.php';	
	$message = '';
?>

<?php 
if(isset($_SESSION['user_id'])){
	$query = $conn->prepare('select id,email,nickname from user where id = :sessionid');
	$query->bindParam(':sessionid', $_SESSION['user_id']);
	$query->execute();
	$results = $query->fetch(PDO::FETCH_ASSOC);
	
	$user=NULL;
	
	if (count($results) > 0){
		$user = $results;
	}
}
?>


<body>

	<div class="header">
	<a href="/test/"> Lyuksógor </a>
	</div>
	
	<?php if (!empty($user)): ?>
		<h1>Isten hozott kedves <?= $user['nickname']; ?></h1>
		<a href= "logout.php">Kilépés</a>
	<?php else: ?>
		<h1>Lépj be vagy regisztrálj!</h1>
		<a href="login.php">Belépés</a> vagy
		<a href="register.php">Regisztráció</a>
	<?php endif; ?>
</body>

</html>

<?php
echo ("");
?>