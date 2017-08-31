const path = require('path');
const fs = require('fs');
const express = require('express');
const app = express();
const cors = require('cors');
const TorrentSearchApi = require('torrent-search-api');
const moment = require('moment');
const torrentSearch = new TorrentSearchApi();

const Providers = torrentSearch.getProviders().filter((provider, idx) => {
  return provider.public;
})

app.use(cors()); //use cors middleware

app.get('/providers', (req, res) => {
  res.send({
    success: true,
    data: Providers
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
  let providers = [];
  let {
    query,
    category,
    provider
  } = req.query;

  if (!query) {
    return res.send({
      success: false,
      error: '[query] parameter is not defined.'
    });
  }

  //clean query string
  query = query.replace(/[^a-zA-Z ]/gi, '');

  let _provider = !!provider;
  if(_provider == false) {
    Providers.forEach((provider, idx) => {
      torrentSearch.enableProvider(provider.name);
    })
  } else {
    torrentSearch.enableProvider(provider);
  }

  console.log(torrentSearch.getActiveProviders());

  //search for torrents
  torrentSearch.search(query, 'Movies', '20')
    .then(torrents => {
      console.log(torrents);
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
