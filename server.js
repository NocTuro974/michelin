var Promise = require("promise");
var request = require("request");
var cheerio = require('cheerio');
var fs = require('fs');

var listeRestos = [];
var listePromesses = [];
var listePromesses2 = [];

function creerPromesses(){
	for (i = 1; i < 36; i++){
		let url = 'https://restaurant.michelin.fr/restaurants/france/restaurants-1-etoile-michelin/restaurants-2-etoiles-michelin/restaurants-3-etoiles-michelin/page-' + i.toString();
		listePromesses.push(promiseMichelin(url));
	}
}

function creerPromessesIndiv(){
	console.log("Création des requêtes individuelles");
	return new Promise(function (resolve, reject){
		for (i = 0; i < listeRestos.length ; i++){
			let url = listeRestos[i].url;
			listePromesses2.push(promiseRecupInfos(url, i));
		}
		resolve();
	})
}

function promiseMichelin(url){
	return new Promise(function (resolve, reject){
		request(url, function (err, res, html){
			if (err){
				console.log(err);
				return reject(err);
			}
			else if (res.statusCode !== 200) {
                err = new Error("Unexpected status code: " + res.statusCode);
                err.res = res;
                return reject(err);
            }
			var $ = cheerio.load(html);
			$('.poi-card-link').each(function(){
				let data = $(this);
				let link = data.attr('href');
				let url = 'https://restaurant.michelin.fr' + link;
				listeRestos.push({"name" : "", "post" : "", "url" : url});
			})

			resolve(listeRestos);
		});
	});
}


function enregistrerRes(){
	return new Promise(function (resolve, reject){
		console.log("Début de l'enregistrement des données");
		console.log(listeRestos);
		try{
			var dicString = JSON.stringify(listeRestos);
			console.log(dicString);
			fs.writeFile("restos.json", dicString);
		}
		catch(error){
			console.log(error);
		}
		console.log("Enregistrement terminé");
		resolve();
	});
}

function displayResult(content){
	return new Promise(function (resolve, reject){
		var dicString = JSON.stringify(content);
		console.log(dicString);
		resolve();
	})
}

function promiseRecupInfos(url, index){
	return new Promise(function (resolve, reject){
		request(url, function (err, res, html){
			if (err){
				console.log(err);
				return reject(err);
			}
			else if (res.statusCode !== 200) {
                err = new Error("Unexpected status code: " + res.statusCode);
                err.res = res;
                return reject(err);
      }

			var $ = cheerio.load(html);
			$('.poi_intro-display-title').first().each(function(){
				let data = $(this);
				let nom = data.text();
				nom = nom.replace(/\n/g, "");
				listeRestos[index].name = nom;
			})

			$('.postal-code').first().each(function(){
				let data = $(this);
				let codep = data.text();
				listeRestos[index].post = codep;
			})
			resolve(listeRestos);
		});
	});
}

creerPromesses();
Promise.all(listePromesses)
.then(creerPromessesIndiv)
.then(() => {return Promise.all(listePromesses2);})
.then(enregistrerRes);
