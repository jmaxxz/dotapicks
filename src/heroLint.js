var cli = require('cli');
var fs = require('fs');
var _ = require('underscore');

cli.parse({
    herodb: [false, 'hero database PATH', 'path', './dist/heros.json']
});


cli.main(function(args, options) {
    var herodb = options.herodb;

    fs.readFile(herodb, function (err, data) {
      if(err) {
        cli.error(err);
        return;
      }

      var heros = JSON.parse(data);
      for(var heroName in heros){
        h = heros[heroName];
        h.winningMatchups = h.winningMatchups || [];
        for (var enemy in h.winningMatchups){
          if(!heros[enemy]){
            cli.error(heroName + " is matched against a nonexistent hero " + enemy);
          }
        }
      }
    });
});