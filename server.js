const path = require('path');
const fs = require('fs');
const express = require('express');
const app = express();
const cors = require('cors');
const TorrentSearchApi = require('torrent-search-api');
const moment = require('moment');
const torrentSearch = new TorrentSearchApi();

app.use(cors()); //use cors middleware
torrentSearch.enableProvider('1337x'); //default provider

app.get('/providers', (req, res) => {
  let providers = torrentSearch.getProviders();
  res.send({
    success: true,
    data: providers
  })
});

app.get('/download', (req, res) => {
  let {
    torrent
  } = req.query || {}, success = false, data;

  if(!torrent) {
    res.send({
      success: false,
      message: '[torrent] parameter is not defined.'
    });
  }

  torrent = JSON.parse(torrent);
  torrentSearch.downloadTorrent(torrent)
    .then(buffer => {
      const title = torrent.title;

      let fileName = `${title}.torrent`;
      let filePath = path.join(__dirname, `torrents`);

      fs.writeFile(path.resolve(filePath, fileName), buffer, 'utf-8', (err, fp) => {
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

        res.sendFile(fileName, options, (err) => {
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

app.get('/search', (req, res) => {
  let {
    query,
    category
  } = req.query;

  if (!query) {
    return res.send({
      success: false,
      error: '[query] parameter is not defined.'
    });
  }

  query = query.replace(/["']{1}/gi, '');

  torrentSearch.enableProvider('Torrent9');
  // torrentSearch.enableProvider('ThePirateBay');
  // torrentSearch.enableProvider('Torrentz2');

  torrentSearch.search(query, 'Movies', '20')
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

app.listen(3001, () => {
  console.log('Server listening on port 3001')
})
