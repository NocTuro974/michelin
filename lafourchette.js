var Promise = require("promise");
var request = require("request");
var fs = require('fs');

var listeRestos = [];
var listeMichelin = [];
var listePromesses = [];
var listePromesses2 = [];


function enregistrerResto(json, restoRecherche){
  let i = 0;
  let trouve = false;
  let resto;
  while (i < json.length && trouve == false)
  for (i = 0; i < json.length; i++){
    resto = json[i];
    restoRecherche.name = restoRecherche.name.toUpperCase();
    if (restoRecherche.name.indexOf(resto.name.toUpperCase())>=0 && resto.address.postal_code == restoRecherche.post){
      trouve = true;
      console.log(restoRecherche.name + " trouvé sur la fourchette");
      listeRestos.push({"id" : resto.id, "name" : resto.name, "post" : resto.address.postal_code});
    }
  }

  if (trouve == false){
    console.log(restoRecherche.name + ", " + restoRecherche.post + " pas trouvé sur lafourchette");
  }
}

function creerPromessesRecherche(listeMichelin){
  for (i = 0; i < listeMichelin.length; i++){
    restoRecherche=listeMichelin[i];
    let url = "https://m.lafourchette.com/api/restaurant-prediction?name=" + encodeURIComponent(restoRecherche.name);
    listePromesses.push(requestp(url, true, restoRecherche));
  }
}


function requestp(url, json, restoRecherche) {
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
            enregistrerResto(body, restoRecherche);
            resolve(body);
        });
    });
}

function creerPromessesSales(){
  return new Promise( function(resolve, reject){
    console.log();
    console.log("Recherche des promotions")
    console.log();
    for(i = 0; i < listeRestos.length; i++){
      url = "https://m.lafourchette.com/api/restaurant/" + parseInt(listeRestos[i].id) + "/sale-type";
      listePromesses2.push(requestSales(url, true, i));
    }
    console.log();
    resolve();
  });
}

function requestSales(url, json, index){
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
      if (body[0].hasOwnProperty("exclusions")){
        if (body[0].title != "Simple booking"){
          console.log("Le restaurant '" + listeRestos[index].name + "', dans le " + listeRestos[index].post + " dispose de promotions : ")
          for (i = 0; i < body.length; i++){
            if (body[i].hasOwnProperty("exclusions")){
              console.log("- " + body[i].title)
            }
          }
        console.log();
        }
      }
    });
  });
}

fs.readFile("restos.json", 'utf8', function(err, data) {
  if (err) throw err;
  listeMichelin = data;
  listeMichelin = JSON.parse(listeMichelin);
  creerPromessesRecherche(listeMichelin);
  Promise.all(listePromesses).then(creerPromessesSales)
});
