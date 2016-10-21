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
if (!empty($_POST['email']) && !empty($_POST['password'])):

	$records = $conn->prepare("SELECT id,email,password FROM user WHERE email = :email");
	$records->bindParam(':email', $_POST['email']); 
	$records->execute();
	$results = $records->fetch(PDO::FETCH_ASSOC);
	$message = '';
	
	if (count($results) > 0 && password_verify($_POST['password'], $results['password'])){
		$_SESSION['user_id'] = $results['id'];
		header("Location: /test/");
	}else{
		$message = 'Sikertelen Belépés. Hibás Email cím, vagy jelszó lett megadva.';
	}	
	
endif;	

	
?>

<body>
	
	<div class="header">
	<a href="/test/"> Lyuksógor </a>
	</div>
	
	<?php if(!empty($message)): ?>
	<p><font color= red><?php echo($message); ?></font></p>
	<?php endif; ?>
	
	<h1>Belépés</h1>
	
	<span> vagy <a href="register.php">regisztráció itt </a></span>
	
	<form action= "login.php" method="POST">
		<input type="text" placeholder="Email címed" name="email">
		<input type="password" placeholder="Jelszavad" name="password">
		<input type="submit" value="Elküld">
	</form>
	
</body>

</html>

<?php
echo ("");
?>