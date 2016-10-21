$(document).ready(function(){
		
		var index = 1;		
		
		var un = $("#id_nickname");
		var ue = $("#id_email");
		var p1 = $("#id_password1");
		var p2 = $("#id_password2");
		var unval; 
		var ueval;
		var p1val;
		var p2val;
		var bdayset = false;
			
		$("#id_form").submit(function(){
			
			var invalidCounter = 0;
			
			if (un.val() == ""){
				$("#id_nickstatus").removeClass('.valid').addClass('not-valid');
				$("#id_nickstatus").html("<img src='/test/img/cancel.png'>&nbsp;&nbsp;&nbsp;Ez a mező nem maradhat üresen!");
				invalidCounter++;
			} 
			
			if (ue.val() == ""){
				$("#id_emailstatus").removeClass('.valid').addClass('not-valid');
				$("#id_emailstatus").html("<img src='/test/img/cancel.png'>&nbsp;&nbsp;&nbsp;Ez a mező nem maradhat üresen!");
				invalidCounter++;
			} 
			
			if (p1.val() == ""){
				$("#id_pass1status").removeClass('valid').addClass('not-valid');
				$("#id_pass1status").html("<img src='/test/img/cancel.png'>&nbsp;&nbsp;&nbsp;Ez a mező nem maradhat üresen!");
				invalidCounter++;
			} 
			
			if (p2.val() == ""){
				$("#id_pass2status").removeClass('valid').addClass('not-valid');
				$("#id_pass2status").html("<img src='/test/img/cancel.png'>&nbsp;&nbsp;&nbsp;Ez a mező nem maradhat üresen!");
				invalidCounter++;
			}
			if (bdayset == false){
				$("#bdaystatus").removeClass('valid').addClass('not-valid');
				$("#bdaystatus").html("<img src='/test/img/cancel.png'>&nbsp;&nbsp;&nbsp;A születési dátum megadása kötelező!");
				invalidCounter++;
			}
			
			if (invalidCounter != 0){
				return false;
			} else	{
				return true;				
			}
		
		});
		
					
		//beviteli mezobe kanntintaskor a status reszt torli	
		$("#id_email").on('focusin', function() {
			$("#id_emailstatus").html("");
			return false;
		});
		
		$("#id_nickname").on('focusin', function() {
			$("#id_nickstatus").html("");
			return false;
		});
		
		$("#id_password1").on('focusin', function() {
			$("#id_pass1status").html("");
			$("#id_pass2status").html("");
			return false;
		});
		
		$("#id_password2").on('focusin', function() {
			$("#id_pass2status").html("");
			return false;
		});
		
		$("#year").on('focusin', function() {
			$("#bdaystatus").html("");
			return false;
		});
		
		$("#id_month").on('focusin', function() {
			$("#bdaystatus").html("");
			return false;
		});
		
		$("#day").on('focusin', function() {
			$("#bdaystatus").html("");
			return false;
		});
		
		//beviteli mezobe iraskor kirakja a loading gifet	
		$("#id_email").on('keydown', function(){
			$("#id_emailstatus").html("<img src='/test/img/loading.gif'>");
		});
		
		$("#id_nickname").on('keydown', function(){
			$("#id_nickstatus").html("<img src='/test/img/loading.gif'>");
		});
		
		$("#id_password1").on('keydown', function(){
			$("#id_pass1status").html("<img src='/test/img/loading.gif'>");
		});
		
		$("#id_password2").on('keydown', function(){
			$("#id_pass2status").html("<img src='/test/img/loading.gif'>");
		});
		
		//email regexp check es ellenorzes, nem lehet azonos az nicknevvel, es vegul ellenorzes az adatbazisban, hogy letezik-e mar
		$("#id_email").on('blur', function() {
			$("#id_emailstatus").html("");
			ueval = ue.val();
			unval = un.val();
			if (ueval!=''){
				if (!validateEmail(ueval)){
					$("#id_emailstatus").removeClass('valid').addClass('not-valid');
					$("#id_emailstatus").html("<img src='/test/img/cancel.png'>&nbsp;&nbsp;&nbsp;Ez nem tűnik valós email címnek...");
					return false;
				} else {
					$("#id_emailstatus").html("<img src='/test/img/loading.gif'>");
					if (ueval == unval) {
						$("#id_emailstatus").removeClass('valid').addClass('not-valid');
						$("#id_emailstatus").html("<img src='/test/img/cancel.png'>&nbsp;&nbsp;&nbsp;Az email cím nem lehet azonos a becenévvel!");	
						return false;
					} else {	
					
						var data = {
							Email: ueval,
						};
						
						$.post('/test/check_availability.php', data, function(resp){
							if (resp == 0){
								$("#id_emailstatus").html("<img src='/test/img/checked.png'>");
								return true;
							} else {
								$("#id_emailstatus").removeClass('valid').addClass('not-valid');
								$("#id_emailstatus").html("<img src='/test/img/cancel.png'>&nbsp;&nbsp;&nbsp;Ez az email cím már foglalt...");
								return false;
							}	
							
						});
					}
				}
			}	
			return false;
		});
		
		//nickname regexp check es ellenorzes, nem lehet azonos az email cimmel, es vegul ellenorzes az adatbazisban, hogy letezik-e mar
		$("#id_nickname").on('blur', function() {
			$("#id_nickstatus").html("");
			ueval = ue.val();
			unval = un.val();
			if (unval!=''){
				if (!validateNickname(unval)){
					$("#id_nickstatus").removeClass('valid').addClass('not-valid');
					$("#id_nickstatus").html("<img src='/test/img/cancel.png'>&nbsp;&nbsp;&nbsp;A becenévnek minimum 3 és maximum 20 karakter hosszúnak kell lennie!");	
				
				}else{	
					$("#id_nickstatus").html("<img src='/test/img/loading.gif'>");
					if (ueval == unval){
						$("#id_nickstatus").removeClass('valid').addClass('not-valid');
						$("#id_nickstatus").html("<img src='/test/img/cancel.png'>&nbsp;&nbsp;&nbsp;A becenév nem lehet azonos az email címmel!");	
						return false;
					}else{
					
						var data = {
							Nickname: unval,
						};
							
						$.post('/test/check_availability.php', data, function(resp){
							if (resp == 0){
								$("#id_nickstatus").html("<img src='/test/img/checked.png'>");
								return true;
							} else {
								$("#id_nickstatus").removeClass('valid').addClass('not-valid');
								$("#id_nickstatus").html("<img src='/test/img/cancel.png'>&nbsp;&nbsp;&nbsp;Ez a név már foglalt...");
								return false;
							}	
							
						});
					}	
				}	
			}
			return false;
		});
		
		//password 1 regexes ellenorzese es password nem lehet azonos az email cimmel vagy a nicknammel 
		$("#id_password1").on('blur', function() {
			$("#id_pass1status").html("");
			
			p1val = p1.val();
			p2val = p2.val();
			ueval = ue.val();
			unval = un.val();
					
			if (p1val!=''){
				if (!validateNickname(p1val)){
					$("#id_pass1status").removeClass('valid').addClass('not-valid');
					$("#id_pass1status").html("<img src='/test/img/cancel.png'>&nbsp;&nbsp;&nbsp;A jelszónak minimum 3 és maximum 20 karakter hosszúnak kell lennie!");		
					return false;
				}else{
					$("#id_pass1status").html("<img src='/test/img/loading.gif'>");
										
					if (p1val == ueval && p1val != unval){
						$("#id_pass1status").removeClass('valid').addClass('not-valid');
						$("#id_pass1status").html("<img src='/test/img/cancel.png'>&nbsp;&nbsp;&nbsp;A jelszó nem lehet azonos az email címmel!");		
						return false;
					} else if (p1val != ueval && p1val == unval){
						$("#id_pass1status").removeClass('valid').addClass('not-valid');
						$("#id_pass1status").html("<img src='/test/img/cancel.png'>&nbsp;&nbsp;&nbsp;A jelszó nem lehet azonos a becenévvel!");		
						return false;
					} else if (p1val == unval && p1val == ueval){
						$("#id_pass1status").removeClass('valid').addClass('not-valid');
						$("#id_pass1status").html("<img src='/test/img/cancel.png'>&nbsp;&nbsp;&nbsp;A jelszó nem lehet azonos sem a becenévvel, sem az email címmel!");		
						return false;
					} else if (p1val != unval && p1val != ueval && p2val!=''){
						if (p1val != p2val){
							$("#id_pass2status").removeClass('valid').addClass('not-valid');
							$("#id_pass2status").html("<img src='/test/img/cancel.png'>&nbsp;&nbsp;&nbsp;A két jelszó nem azonos!");
							$("#id_pass1status").removeClass('valid').addClass('not-valid');
							$("#id_pass1status").html("<img src='/test/img/cancel.png'>&nbsp;&nbsp;&nbsp;A két jelszó nem azonos!");
							return false;
						} else if (p1val == p2val) {
							$("#id_pass1status").html("<img src='/test/img/checked.png'>");
							$("#id_pass2status").html("<img src='/test/img/checked.png'>");
							return true;
							
						} 
					} else if (p1val != unval && p1val != ueval){
						$("#id_pass1status").html("<img src='/test/img/checked.png'>");
						return true;
					}	
				}	
			}
			return false;
		});
		
		$("#id_password2").on('blur', function() {
			$("#id_pass2status").html("");
			
			p1val = p1.val();
			p2val = p2.val();
			
			if (p1val!='') {
				
				if (p1val != p2val) {
					$("#id_pass1status").removeClass('valid').addClass('not-valid');
					$("#id_pass1status").html("<img src='/test/img/cancel.png'>&nbsp;&nbsp;&nbsp;A két jelszó nem azonos!");
					$("#id_pass2status").removeClass('valid').addClass('not-valid');
					$("#id_pass2status").html("<img src='/test/img/cancel.png'>&nbsp;&nbsp;&nbsp;A két jelszó nem azonos!");
					return false;
					
				} else if (p1val == p2val) {
					$("#id_pass1status").html("<img src='/test/img/checked.png'>");
					$("#id_pass2status").html("<img src='/test/img/checked.png'>");
					return true;
				}
			} 
			return false;
		});
				
		$("#year").on('click', function() {
			if ($("#year").val()=='na'){
				$("#bdaystatus").html("");
				bdayset = false;
				return false;
				
			} else {
			
				if ($("#year").val()!='na' && $("#id_month").val()!='na' && $("#day").val()!='na' && checkBday()){
					bdayset = true;		
					$("#bdaystatus").html("<img src='/test/img/checked.png'>");
					return true;
					
				} else if ($("#year").val()!='na' && $("#id_month").val()!='na' && $("#day").val()!='na' && !checkBday()){
					bdayset = true;		
					$("#bdaystatus").removeClass('valid').addClass('not-valid');
					$("#bdaystatus").html("<img src='/test/img/cancel.png'>&nbsp;&nbsp;&nbsp;Csak 18 éven felülieknek!");
					return false;
				}
				return true;
			}
		});
		
		$("#id_month").on('click', function() {
			if ($("#id_month").val()=='na'){
				$("#bdaystatus").html("");
				bdayset = false;
				return false;
				
			} else {
				if ($("#year").val()!='na' && $("#id_month").val()!='na' && $("#day").val()!='na' && checkBday()){
					bdayset = true;		
					$("#bdaystatus").html("<img src='/test/img/checked.png'>");
					return true;
					
				} else if ($("#year").val()!='na' && $("#id_month").val()!='na' && $("#day").val()!='na' && !checkBday()){
					bdayset = true;		
					$("#bdaystatus").removeClass('valid').addClass('not-valid');
					$("#bdaystatus").html("<img src='/test/img/cancel.png'>&nbsp;&nbsp;&nbsp;Csak 18 éven felülieknek!");
					return false;
				}
				return true;
			}
		});
				
		$("#day").on('click', function() {
			if ($("#day").val()=='na'){
				$("#bdaystatus").html("");
				bdayset = false;
				return false;
				
			} else {
			
				if ($("#year").val()!='na' && $("#id_month").val()!='na' && $("#day").val()!='na' && checkBday()){
					bdayset = true;		
					$("#bdaystatus").html("<img src='/test/img/checked.png'>");
					return true;
					
				} else if ($("#year").val()!='na' && $("#id_month").val()!='na' && $("#day").val()!='na' && !checkBday()){
					bdayset = true;		
					$("#bdaystatus").removeClass('valid').addClass('not-valid');
					$("#bdaystatus").html("<img src='/test/img/cancel.png'>&nbsp;&nbsp;&nbsp;Csak 18 éven felülieknek!");
					return false;
				}
				
				return true;
			}	
		});
		
});

//ellenörzi, hogy a user elmult-e mar 18 eves (568080000000 milisecnél idösebb-e :D )
function checkBday(){
		
	if ($("#year").val()!='na' && $("#id_month").val()!='na' && $("#day").val()!='na'){
				
		var bday, today;
		today = new Date();
		bday  = new Date();
				
		bday.setFullYear($("#year").val(), $("#id_month").val()-1, $("#day").val());
			
		if (today - bday < 568080000000) {
			return false;
		} else if (today - bday >= 568080000000){
			return true;
		} 
	} else {
		return false;
		
	}
	
}
		
//lehet a-z es 0-9, alahuzas('_'), min 3 es max 20 karakter 
function validateNickname(nickname){
	var rx = /^[a-zA-ZáéiíoóöőuúüűÁÉIÍOÓÖŐUÚÜŰä0-9.\-_ $@]{3,20}$/;
	return rx.test(nickname);
}        

function validateEmail(email){
	var rx = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
	return rx.test(email);
}


//a changeDate updatelei a szulinap szelektort a register.php oldalon
function changeDate(i){
		var e = document.getElementById('day');
		while(e.length>0)
			e.remove(e.length-1);
			var j=-1;
			if(i=="na")
				k=0;
			else if(i==2)
				k=28;
			else if(i==4||i==6||i==9||i==11)
				k=30;
			else
				k=31;
		while(j++<k){
			var s=document.createElement('option');
			var e=document.getElementById('day');
			if(j==0){
				s.text="Nap";
				s.value="na";
				try{
					e.add(s,null);
				}catch(ex){
					e.add(s);
				}
				}else{
					s.text=j;
					s.value=j;
					try{
						e.add(s,null);
					}catch(ex){
						e.add(s);
					}
				}
		}
}
