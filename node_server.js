var fs = require('fs');
var request = require('request')
var cheerio = require('cheerio')

var listeRestos = [];

function scrapMichelin(){
	for (i = 0; i < 1; i++){
		url = 'https://restaurant.michelin.fr/restaurants/france/restaurants-1-etoile-michelin/restaurants-2-etoiles-michelin/restaurants-3-etoiles-michelin/page-' + i.toString()
		
		request(url, function(error, response, html){
			if (!error){
				var $ = cheerio.load(html)
				var title;
			}
			
			$('.poi_card-display-title').each(function(){
				var data = $(this);
				title = data.text();
				//console.log(title)
				listeRestos.push(title)
			})
		})
	}
	return listeRestos
}

function call(){
	console.log('coucou')
}

console.log(scrapMichelin())

/*Promise.all(
	listeRestos
).then((restos) => {
	restos.each(resto => console.log(resto))
})*/

/*url = 'https://www.lafourchette.com/search-refine/Mat';
request(url, function(error, response, html){
	if (!error){
		var $ = cheerio.load(html);
		var title;
		var noms = [];
		console.log(html)
	}
	
	$('.resultItem-information').each(function(){
		console.log('coucou')
		var data = $(this);
		title = data.text();
		console.log(title)
	})
})*/
