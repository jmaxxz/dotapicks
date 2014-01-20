var cli = require('cli');
var fs = require('fs');
var _ = require('underscore');
var path = require('path');

cli.parse({
  apiResults: ['a', 'FOLDER containing apiResults', 'directory', './src/apiResults'],
  herodb: [false, 'hero database FILE', 'file', './dist/heroes.json']
});


cli.main(function(args, options) {
    var herodb = options.herodb;

    fs.readFile(herodb, function (err, data) {
      if(err) {
        cli.fatal(err);
      }

      var heroes = JSON.parse(data);
      fs.readFile(path.join(options.apiResults, 'GetHeroes.json'), function (err, apiData) {
        if(err) {
          cli.fatal(err);
        }
        var apiHeroes = JSON.parse(apiData).result.heroes;
        for (var i = apiHeroes.length - 1; i >= 0; i--) {
          var aHero = apiHeroes[i];
          if(!heroes[aHero.localized_name]) {
            cli.info("New hero added to database " + heroes.localized_name);
            heroes[aHero.localized_name] = {};
          }

          if(heroes[aHero.localized_name].id != aHero.id) {
            cli.info('Adding id of ' + aHero.id + ' to '+ aHero.localized_name);
            heroes[aHero.localized_name].id = aHero.id;
          }
        };

        var updatedDatabase = JSON.stringify(heroes, null, 2);
        fs.writeFile(herodb, updatedDatabase, function (err) {
          if(err){
            cli.fatal(err);
          }
          cli.ok('done');
        });
      });
    });
});