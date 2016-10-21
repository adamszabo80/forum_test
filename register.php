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
	if (!empty($_POST['email']) && !empty($_POST['password']) && $_POST['year']!='na' && $_POST['month']!='na' && $_POST['day']!='na'):

	$bday_raw = $_POST['year']."-".$_POST['month']."-".$_POST['day'];
	$bday_conv = DateTime::createFromFormat('Y-m-d', $bday_raw);
    $bday = $bday_conv->format('Y-m-d h:i:s');
	
	if (date('Y-n-d') - $bday_raw < 18){
		$message = 'Sikertelen Regisztráció! Az oldal látogatása kizárólag 18 éven felülieknek megengedett.';
		
	}else{
		
		$sql = "INSERT INTO user (email, password, nickname, bday, regdate, active) VALUES (:email, :password, :nickname, :bday, :regdate, 0)";
		$stmt = $conn->prepare($sql);
	
		$stmt->bindParam(':email', $_POST['email']); 
		$stmt->bindValue(':password', password_hash($_POST['password'], PASSWORD_BCRYPT));
		$stmt->bindParam(':nickname', $_POST['nickname']);
		$stmt->bindParam(':bday', $bday);
		$stmt->bindValue(':regdate', date('Y-m-d h:i:s'));
		if ($stmt->execute()):
			$message = 'Sikeres Regisztráció :)';
		else:	
			$message = 'Sikertelen Regisztráció :(';
		endif;			
	}
endif;	
?>


<body>
	
	<div class="header">
	<a href="/test/"> Lyuksógor </a>
	</div>

	<?php if(!empty($message)): ?>
		<p><?= $message ?> </p>
	<?php endif; ?>
	
	<h1>Regisztráció</h1>
	<span class="statustext"> vagy <a href="login.php">belépés itt </a></span>

	<form action= "register.php" method="POST" id="id_form">
	
		<div class="wrapper">
			<div class="main_block">
				<input type="text" placeholder="Email címed" name="email" id="id_email">
			</div>
			<div class="secondary_block">	
			<span type="text" id="id_emailstatus"></span>
			</div>
		</div>
	
		<div class="wrapper">
			<div class="main_block">
				<input type="text" placeholder="Választott beceneved" name="nickname" id="id_nickname">
			</div>
			<div class="secondary_block">	
				<span class="statustext" type="text" id="id_nickstatus"></span>
			</div>
		</div>
		
		<div class="wrapper">
			<div class="main_block">
				<input type="password" placeholder="Jelszavad" name="password" id="id_password1">
			</div>	
			<div class="secondary_block">	
				<span class="statustext" type="text" id="id_pass1status"></span>
			</div>	
		</div>	
		
		<div class="wrapper">
			<div class="main_block">	
				<input type="password" placeholder="Jelszavad mégegyszer" name="confirm_password" id="id_password2">
			</div>	
			<div class="secondary_block">	
				<span class="statustext" type="text" id="id_pass2status"></span>
			</div>	
		</div>	
		
		<div class="wrapper">			
			<div class="main_block">	
				Mikor születtél?
			</div>
		</div>
		
		<div class="wrapper">			
		<div class="main_block">	
		<select name="year" id="year" id="id_year">
			<option value="na">Év</option>
		</select>

			<script language="JavaScript" type="text/javascript">
			var d = new Date();
			var y = d.getFullYear()+1;

			while (y-->1900){
				var s = document.createElement('option');
				var e = document.getElementById('year');
				s.text=y;
				s.value=y;
				try{
					e.add(s,null);
				}
				catch(ex){
					e.add(s);
				}
			}
		</script>
		
		
		<select name="month" onChange="changeDate(this.options[selectedIndex].value);" id="id_month">
			<option value="na">Hónap</option>
			<option value="1">Január</option>
			<option value="2">Február</option>
			<option value="3">Március</option>
			<option value="4">Április</option>
			<option value="5">Május</option>
			<option value="6">Június</option>
			<option value="7">Július</option>
			<option value="8">Augusztus</option>
			<option value="9">Szeptember</option>
			<option value="10">Október</option>
			<option value="11">November</option>
			<option value="12">December</option>
		</select>
		
		<select name="day" id="day" id="id_day">
			<option value="na">Nap</option>
		</select>
		
		 </div>	
			<div class="secondary_block">	
				<span class="statustext" type="text" id="bdaystatus"></span>
		
			</div>	
		</div>	

		<br /><input type="submit" value="Elküld" class="id_submit">
			
		
	</form>
	
</body>

</html>

<?php
echo ("-fin-");
?>