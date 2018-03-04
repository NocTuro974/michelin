var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var Promise = require('promise');
var listeRestos = [];
var listePromesses = [];


function creerPromesses(){
	for (i = 1; i < 2; i++){
		
		listePromesses.push(new Promise(function(resolve, reject){
			let url = 'https://restaurant.michelin.fr/restaurants/france/restaurants-1-etoile-michelin/restaurants-2-etoiles-michelin/restaurants-3-etoiles-michelin/page-' + i.toString();
			
			request(url, function(error, response, html){
				if (!error){
					var $ = cheerio.load(html)
					var title;
				}
				
				$('.poi_card-display-title').each(function(){
					var data = $(this);
					title = data.text();
					listeRestos.push(title);
				})
				console.log(listeRestos);
				setTimeout(resolve, 0);
			});
		}));
	}
}

function coucou(){
	console.log("coucou");
}

creerPromesses();
Promise.all(listePromesses).then(coucou());
