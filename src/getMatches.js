var cli = require('cli');
var fs = require('fs');
var _ = require('underscore');
var path = require('path');
var request = require('request');


function getNextMatchSets(x, lastMatchFetched, options) {
    request('https://api.steampowered.com/IDOTA2Match_570/GetMatchHistory/V001/?match_id=27110133&key='+ options.key +'&start_at_match_id='+lastMatchFetched+1
      , function (error, response, data) {
      if (error || response.statusCode != 200) {
      cli.fatal(error);
    }

      var matches = JSON.parse(data).result.matches;
      fs.writeFile(path.join( options.apiResults, 'GetMatchHistory/' + x + '.json'), data);
      lastMatchFetched = matches[matches.length - 1].match_id;
      cli.info('Fetched through: ' + lastMatchFetched);

      getNextMatchSets(x+1, lastMatchFetched, options);
  });
};

cli.parse({
  apiResults: ['a', 'FOLDER containing apiResults', 'directory', 'src/apiResults'],
  herodb: [false, 'hero database FILE', 'file', 'dist/heroes.json'],
  key: ['k', 'your steam api key', 'string', null],
  maxApiHits: ['m', 'maximum number of api hits to be used', 'int', 90000] 
});

//https://api.steampowered.com/IDOTA2Match_570/GetMatchDetails/V001/?match_id=27110133&key=<key>
//start_at_match_id=

cli.main(function(args, options) {
  cli.fatal('This app does not work right yet');
  request('https://api.steampowered.com/IDOTA2Match_570/GetMatchHistory/V001/?match_id=27110133&key='+options.key, function (error, response, data) {
    if (error || response.statusCode != 200) {
      cli.fatal(error);
    }

      var matches = JSON.parse(data).result.matches;

      fs.writeFile(path.join( options.apiResults, 'GetMatchHistory/' + 0 + '.json'), data);
      var lastMatchFetched = matches[matches.length - 1].match_id;
      cli.info('Fetched through: ' + lastMatchFetched);

      getNextMatchSets(1, lastMatchFetched, options);
  });
});