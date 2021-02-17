window.onload=function(){
	var tot = document.getElementById("afisTemplate");
	var rand_tot = tot.children;
	var rr;
	
	var ajaxRequest = new XMLHttpRequest();

	ajaxRequest.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
					var obJson = JSON.parse(this.responseText);
					afiseajaJsonTemplate(obJson);
			}
	};
	
	ajaxRequest.open("GET", "/json/perechi.json", true);
	ajaxRequest.send();
	
	function afiseajaJsonTemplate(obJson) { 
		let container=document.getElementById("afisTemplate");

		var textTemplate ="";
		for(let i=0;i<obJson.perechi.length;i++){
			textTemplate+=ejs.render("<div class='templ_pereche' onclick=selectare(this)  title=1 >\
			<p>Id: <%= pereche.id %></p>\
			<p>Denumire: <%= pereche.nume %></p>\
			<p>Culoare: <%= pereche.culoare %></p>\
			<p>Marci: <%= pereche.marci %></p>\
			<p>Pret: <%= pereche.pret %></p>\
			<p>Marimi: <%= pereche.marimi %></p>\
			<p>Gen: <%= pereche.sex %></p>\
			</div>", 
			{pereche: obJson.perechi[i]});
		} 
		container.innerHTML=textTemplate;
		
		rr = Array.prototype.slice.call(rand_tot);
		
	}	
	
	var gen_def = localStorage.getItem('gen');
	if (gen_def == 0)
		document.getElementById("gen0").selected=true;
	else if (gen_def == 1)
		document.getElementById("gen1").selected=true;
	else if (gen_def == 2)
		document.getElementById("gen2").selected=true;
	
	document.getElementById("sorteaza_nume").onclick=function() {
		var randuri = tot.children;
		var vranduri = Array.prototype.slice.call(randuri);
		vranduri.sort(function(a,b){
			return a.children[1].innerHTML.localeCompare(b.children[1].innerHTML);
		});
		for(let rand of vranduri){
			tot.appendChild(rand);
		}
	}
	
	document.getElementById("sorteaza_pret").onclick=function() {
		var randuri = tot.children;
		var vranduri = Array.prototype.slice.call(randuri);
		vranduri.sort(function(a,b){
			var a4 = parseInt(a.children[4].innerHTML.split(" ")[1]);
			var b4 = parseInt(b.children[4].innerHTML.split(" ")[1]);
			return a4-b4;
		});
		for(let rand of vranduri) {
			tot.appendChild(rand);
		}
	}
		
	function revenire () {
		var randuri = tot.children;
				for (let i=0;i<randuri.length;++i) {
					let r=randuri[i];
					r.parentNode.removeChild(r);
					i-=1;}
				for (let r of rr) {
					tot.appendChild(r);
				}
	}

	document.getElementById("revenire").onclick=function() {
		revenire();
	}
		
	function filtre() {
		var randuri = tot.children;
		var sel_gen = document.getElementById("gen");
		var gen = sel_gen.options[sel_gen.selectedIndex].value;
		var vranduri;
		localStorage.setItem('gen',gen);
		
		if (gen == 1 || gen == 2 ) {
			for (let i=0;i<randuri.length;++i) {
				var r = randuri[i];
				if(parseInt(r.children[6].innerHTML.split(" ")[1]) != gen) {
					r.parentNode.removeChild(r);
					i-=1;
				}
			}
		}
	}
		
		
		
	document.getElementById("filtre").onclick=function() {
		revenire();
		filtre();
	}
	
	setInterval(function(){ 
		var stoc = document.getElementById("stoc");
		var nr = parseInt(stoc.innerHTML.split(":")[1]);
		nr+=1;
		stoc.innerHTML = "Produse in stoc: "+nr;
	}, 30000);
	
	setTimeout(function(){
		alert("Site-ul inca nu este deschis publicului!");},100000);
		
	setTimeout(function(){
		filtre();
		var tot = document.getElementById("afisTemplate");
		var randuri = tot.children;
		var vranduri = Array.prototype.slice.call(randuri); 
		for (let rand of vranduri) {
			let pret = parseInt(rand.children[4].innerHTML.split(" ")[1]);
			pret = pret/4.8;
			pret = pret.toFixed(2);
			rand.title = pret + " EUR";
		}	
	},100);
		
		
		
		
		
}

window.onkeypress=function(e) {
	var tot = document.getElementById("afisTemplate");
	var randuri = tot.children;
	var lit=e.key.toUpperCase();
	if (lit == "N") {
		for (let i=0;i<randuri.length;++i) {
			let r=randuri[i];
			if (r.children[3].innerHTML.split(" ")[1] != "nike") {
				r.parentNode.removeChild(r);
				i-=1;
			}		
		}
	}
}

function selectare(el) {
	var tot = document.getElementById("afisTemplate");
	var randuri = tot.children;
	var vranduri = Array.prototype.slice.call(randuri); 
	nr = parseInt(el.children[0].innerHTML.split(" ")[1]);
	
	for (let i=0;i<vranduri.length;++i)
		if (parseInt(vranduri[i].children[0].innerHTML.split(" ")[1]) == nr) {
			if (vranduri[i].style.color == "black") {
				vranduri[i].style.color = "red";
				vranduri[i].style.fontStyle="italic";}
			else {
				vranduri[i].style.color = "black";
				vranduri[i].style.fontStyle="normal";}
		}
}

function euroi() {
	var tot = document.getElementById("afisTemplate");
	var randuri = tot.children;
	var vranduri = Array.prototype.slice.call(randuri); 
	console.log(vranduri[0].children);
	
}
	
