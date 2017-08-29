const path = require('path');
const fs = require('fs');
const express = require('express');
const app = express();
const cors = require('cors');
const TorrentSearchApi = require('torrent-search-api');
const moment = require('moment');

app.use(cors());

app.get('/download', function(req, res) {
  const torrentSearch = new TorrentSearchApi();
  let {
    torrent
  } = req.query || {}, success = false, data;

  torrent = JSON.parse(torrent);

  torrentSearch.downloadTorrent(torrent)
    .then(buffer => {
      const title = torrent.title;

      let fileName = `${title}.torrent`;
      let filePath = path.join(__dirname, `torrents`);

      fs.writeFile(path.resolve(filePath, fileName), buffer, 'utf-8', function(err, fp) {
        var options = {
          root: __dirname + '/torrents/',
          dotfiles: 'deny',
          headers: {
            'x-timestamp': Date.now(),
            'x-sent': true,
            'Content-Disposition': 'attachment; filename=' + fileName,
            'Content-type': 'application/x-bittorrent'
          }
        };

        res.sendFile(fileName, options, function(err) {
          if (err) {
            console.log(err);
          } else {
            console.log('Sent:', fileName);
          }
        });
      });
    })
    .catch(err => {
      console.log(err);
    });
})

app.get('/search', function(req, res) {
  const torrentSearch = new TorrentSearchApi();

  let {
    query,
    category
  } = req.query;

  if (!query) {
    return res.send({
      success: false,
      error: 'query parameter is not defined.'
    });
  }


  torrentSearch.enableProvider('Torrent9');
  torrentSearch.enableProvider('1337x');
  // torrentSearch.enableProvider('ThePirateBay');
  // torrentSearch.enableProvider('Torrentz2');

  //remove quotes
  let _query = query.replace(/["']{1}/gi, '');
  console.log(decodeURI(_query));
  torrentSearch.search(decodeURI(_query), 'Movies', '100')
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

app.listen(3001, function() {
  console.log('Server listening on port 3001')
})
