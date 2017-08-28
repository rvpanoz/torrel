const express = require('express');
const app = express();
const cors = require('cors');
const TorrentSearchApi = require('torrent-search-api');
const moment = require('moment');

app.use(cors());
app.get('/query', function(req, res) {
  const torrentSearch = new TorrentSearchApi();

  let {
    query,
    category
  } = req.query;

  if(!query) {
    return res.send({
      success: false,
      error: 'query parameter is not defined.'
    });
  }

  torrentSearch.enableProvider('Torrent9');
  torrentSearch.enableProvider('1337x');
  torrentSearch.enableProvider('ThePirateBay');
  torrentSearch.enableProvider('Torrentz2');

  //remove quotes
  let _query = query.replace(/["']{1}/gi,'');
  
  torrentSearch.search(_query, 'Movies')
    .then(torrents => {
      res.send({
        success: true,
        data: torrents
      });
    })
    .catch(err => {
      console.log(err);
    });
})

function check(req, res, next) {
  console.log(req.query);
  next();
}

app.get('/download', check, function(req, resp) {
  let torrent = req.query;
  resp.send('ok');
});

app.listen(3001, function() {
  console.log('Server listening on port 3001')
})
