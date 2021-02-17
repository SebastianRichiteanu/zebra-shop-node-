var express = require('express');
var path = require('path');
var app = express();
var formidable = require('formidable');
var session = require('express-session');

var fs = require('fs');
var crypto = require('crypto');

app.set('view engine', 'ejs');

app.use(session(
	{
	secret:"cheie_sesiune",
	resave: true,
	saveUninitialized:false
	}
));

app.use(express.static(path.join(__dirname,"resurse")));

app.post('/inreg',function(req,res) {
  var dateForm=new formidable.IncomingForm()
	dateForm.parse(req, function(err, fields, files){
		var textJson=fs.readFileSync("resurse/json/useri.json","utf8"); 
		var obJson=JSON.parse(textJson);
		var parolaCriptata;
		var algoritmCriptare=crypto.createCipher("aes-128-cbc", "cheie_criptare")
		parolaCriptata=algoritmCriptare.update(fields.parola, "utf-8","hex");
		parolaCriptata+=algoritmCriptare.final("hex");
    
		var userNou={
      id: obJson.lastId,
      username: fields.username,
      nume: fields.nume,
      email: fields.email,
      parola: parolaCriptata,
      dataInreg: new Date(),
      rol: "user",
      marci: fields.marci,
	  varsta: fields.varsta
    }
		obJson.useri.push(userNou);
		obJson.lastId+=1;
		var jsonNou=JSON.stringify(obJson);
		fs.writeFileSync("resurse/json/useri.json",jsonNou);
		res.redirect("/");
	})
})
 
app.post('/login',function(req,res) {
	var dateForm=new formidable.IncomingForm()
	dateForm.parse(req, function(err, fields, files){
		var textJson=fs.readFileSync("resurse/json/useri.json","utf8");
		var obJson=JSON.parse(textJson);
		var parolaCriptata;
		var algoritmCriptare=crypto.createCipher("aes-128-cbc", "cheie_criptare")
		parolaCriptata=algoritmCriptare.update(fields.parola, "utf-8","hex");
		parolaCriptata+=algoritmCriptare.final("hex");
    var user= obJson.useri.find(function(elem){
			return elem.username == fields.username &&  elem.parola==parolaCriptata
		})
		if(user){
			console.log("Exista utilizatorul")
			req.session.utilizator=user;
			res.render("html/index", {username: user.username})
		}
    
	})
})

app.get('/', function(req, res) {
	var usrn=req.session ? (req.session.utilizator? req.session.utilizator.username : null) : null;
    res.render('html/index', {username: usrn});
});

app.get('/logout', function(req, res) {
	req.session.destroy();
	res.redirect("/")
});

app.get('/*', function(req, res) {
		var usrn=req.session ? (req.session.utilizator? req.session.utilizator.username : null) : null;
	res.render('html/'+req.url, {username: usrn}, function(err, rezultatRender){
		if (err) {
			if (err.message.includes("Failed to lookup view"))
        res.status(404).render("html/404", {username: usrn});		
      else {
        throw err;
      }
      
		}
		else res.send(rezultatRender)

	});
});


app.listen(8080);
console.log('Open on port 8080.');

