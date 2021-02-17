var happyH=[["18:00:00","19:00:00"],["20:00:00","21:00:00"]];

window.onload=function(){
	
	//happyHour - 12 (0.5p)
	var currentdate = new Date(); 
	var h = currentdate.getHours();
	var m = currentdate.getMinutes();
	var s = currentdate.getSeconds();

	var ora = h+":"+m+":"+s;
	
	for (let i=0;i<happyH.length;++i) 
		if (ora>=happyH[i][0] && ora<=happyH[i][1]) {
			alert("Happy hour! Avem reduceri!");
			break;
		}
		
	//Salut,utilizator!  - 16 (0.5p) + aparitie treptata titlu (1p)
	
	var nume=prompt("Cum te numesti?");
	document.title="Salut,"+nume+"!";
	
	setInterval(function(){document.title="Zebra Shop";titlu_treptat();},2000);
	
	var t = 0;

	function titlu_treptat() {
		if (t==0) {
			document.title = "Z        p";
			++t;
			setTimeout(titlu_treptat,500);
		}
		else if (t==1) {
			document.title = "Ze      op";
			++t;
			setTimeout(titlu_treptat,500);
		}
		else if (t==2) {
			document.title = "Zeb    hop";
			++t;
			setTimeout(titlu_treptat,500);
		}
		else if (t==3) {
			document.title = "Zebr  Shop";
			++t;
			setTimeout(titlu_treptat,500);
		}
		else if (t==4) {
			document.title = "Zebra Shop";
			++t;
			setTimeout(titlu_treptat,500);
		}
	}
	
		
	//Aparitie trepatata cuvant - 2 (1p)
	
	function treptat () {
		if (i< txt.length) {
			document.getElementById("id1h1").innerHTML += txt[i];
			++i;
			setTimeout(treptat,500);
		}
	}
	function treptat2() {
		if (j< txt2.length) {
			document.getElementById("p_despre_noi").innerHTML += txt2[j];
			++j;
			setTimeout(treptat2,500);
		}
	}
			
	
	var i = 0;
	var txt = ["Magazinul"," tau"," preferat"," de", " incaltaminte"];
	treptat();
	var j=0;
	var txt2 = ["O ","noua ","platforma ","de ","unde ","iti ","poti ","achizitiona ","perechile ","preferate ","de ","incaltaminte."]
	treptat2();

	
}