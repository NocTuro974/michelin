var Promise = require("promise");
var request = require("request");
var fs = require('fs');

var listeRestos = [];
var listeMichelin = [];


function enregistrerResto(json){
  let i = 0;
  let trouve = false;
  let resto;
  while (i < json.length && trouve == false)
  for (i = 0; i < json.length; i++){
    resto = json[i];
    if (resto.name == restoRecherche.name && resto.address.postal_code == restoRecherche.post){
      trouve = true;
      listeRestos.push(resto.id);
    }
  }
  console.log(restoRecherche.name + " non trouve sur lafourchette");
}

function creerPromesses(){
  for (i = 0; i < listeMichelin.length; i++){
    let url
  }
}


function requestp(url, json) {
    json = json || false;
    return new Promise(function (resolve, reject) {
        request({url:url, json:json}, function (err, res, body) {
            if (err) {
                console.log(err)
                return reject(err);
            } else if (res.statusCode !== 200) {
                console.log(res)
                err = new Error("Unexpected status code: " + res.statusCode);
                err.res = res;
                return reject(err);
            }
            console.log("requete terminée");
            enregistrerResto(body);
            resolve(body);
        });
    });
}


fs.readFile("restos.json", 'utf8', function(err, data) {
  if (err) throw err;
  listeMichelin = data;
  listeMichelin = JSON.parse(listeMichelin);
  for(i = 0; i < 3; i++){
    restoRecherche=listeMichelin[i];
    let url = "https://m.lafourchette.com/api/restaurant-prediction?name=" + encodeURIComponent(restoRecherche.name);
    console.log(restoRecherche.name)
    requestp(url, true).then(enregistrerResto);
  }
});
