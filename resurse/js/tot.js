// Marcare pagina activa (1p)

var sir = window.location.href.split("/");
var pag = sir[sir.length-1];
pag = pag.split("#")[0];
setTimeout(function(){
	if (pag == "") {
		var el = document.getElementById("menu1");
		el.classList.add("curent");
	}
	else if (pag == "branduri") {
		var el = document.getElementById("menu2");
		el.classList.add("curent");
	}
	else if (pag == "contact") {
		var el = document.getElementById("menu3");
		el.classList.add("curent");
	}
	else if (pag == "aplicatie") {
		var el = document.getElementById("menu4");
		el.classList.add("curent");
	}
	else if (pag == "my_acc") {
		var el = document.getElementById("menu5");
		el.classList.add("curent");
	}
	},1);

// Numar cuvinte (1p)

setTimeout(function() {
	
	var toate = document.body.innerText; // returneaza textul randat
	var cuv = toate.match(/\w+|\S/g); // metacaracter care cauta o litera si un spatiu
	// cauta in sir si returneaza ce a gasit ca un obiect array
	var nr = document.getElementById("numar_cuvinte");
	nr.innerHTML = "Numar de cuvinte pe aceasta pagina: "+cuv.length;
	
	// apelare timp_petreuct
	timp_petrecut()
},1);

// Timp petrecut pe pagina (1p)

function timp_petrecut(){
	if(localStorage.secunde != 0)
		localStorage.secunde=Number(localStorage.secunde)+1;
	else
		localStorage.secunde=1;
	if(localStorage.secunde == 60) {
		localStorage.secunde=0;
		if(localStorage.minute != 0)
			localStorage.minute=Number(localStorage.minute)+1;
		else
			localStorage.minute=1;
	}
	var p = document.getElementById("timp_petrecut");
	if(localStorage.minute && localStorage.minute>1)
		p.innerHTML="Ati petrecut "+localStorage.minute.toString()+" minute si "+localStorage.secunde.toString()+" secunde pe site";
	else if(localStorage.minute)
		p.innerHTML="Ati petrecut un minut si "+localStorage.secunde.toString()+" secunde pe site";
	else
		p.innerHTML="Ati petrecut "+localStorage.secunde.toString()+" secunde pe site";
	setTimeout(timp_petrecut,1000);
}