const path = require('path');
const fs = require('fs');
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const TorrentSearchApi = require('torrent-search-api');
const moment = require('moment');
const torrentSearch = new TorrentSearchApi();

const Providers = torrentSearch.getProviders().filter((provider, idx) => {
  return provider.public;
})

//middlewares
app.use(express.static('torrents'));
app.use(bodyParser.json());
app.use(cors());

app.get('/providers', (req, res) => {
  res.send({
    success: true,
    data: Providers
  })
});

app.post('/download', (req, res) => {
  let {
    torrent
  } = req.body.data || {}, success = false, data;

  if(!torrent) {
    return res.send({
      success: false,
      message: '[torrent] parameter is not defined.'
    });
  }

  torrentSearch.downloadTorrent(torrent)
    .then(buffer => {
      const title = torrent.title;

      let fileName = `${title}.torrent`;
      let filePath = path.join(__dirname, `torrents`);

      fs.writeFile(path.resolve(filePath, fileName), buffer, 'binary', (err, fp) => {
        res.send({
          success: true,
          fileName: fileName
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
    perPage,
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

  //category - default to 'Movies'
  category = category || 'Movies';

  //page limit
  perPage = perPage || 20;

  if(provider == 0) {
    Providers.forEach((provider, idx) => {
      torrentSearch.enableProvider(provider.name);
    });
  } else {
    torrentSearch.enableProvider(provider);
  }

  //search for torrents
  torrentSearch.search(query, category, perPage)
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
