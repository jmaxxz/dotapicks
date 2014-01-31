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
      for (var h in heroes) {
        var hero = heroes[h];

        hero.name=h;
      }

      var updatedDatabase = JSON.stringify(heroes, null, 2);
      fs.writeFile(herodb, updatedDatabase, function (err) {
        if(err){
          cli.fatal(err);
        }
        cli.ok('done');
      });
    });
});