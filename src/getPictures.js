var cli = require('cli');
var fs = require('fs');
var path = require('path');
var request = require('request');

cli.parse({
  apiResults: ['a', 'FOLDER containing apiResults', 'directory', './src/apiResults']
});

function saveImage(aHero,  options){
  request('http://media.steampowered.com/apps/dota2/images/heroes/' + aHero.name.substring(14).toLowerCase() + '_sb.png').pipe(fs.createWriteStream(path.join(options.apiResults, '/Pictures/' + aHero.name.substring(14).toLowerCase() + '.png')));
}

cli.main(function(args, options) {
  fs.readFile(path.join(options.apiResults, 'GetHeroes.json'), function (err, apiData) {
    if(err) {
      cli.fatal(err);
    }
    var apiHeroes = JSON.parse(apiData).result.heroes;
    for (var i = apiHeroes.length - 1; i >= 0; i--) {
      saveImage(apiHeroes[i], options);

    }
  });
});