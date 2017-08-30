export default function(n) {
  let torrents = [];

  function genTitle() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 100; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }

  for (let i = 0; i < n; i++) {
    torrents.push({
      desc: "http://www.1337x.to/torrent/2239931/The-LEGO-Batman-Movie-2017-720p-YTS-YIFY/",
      peers: 1610,
      provider: "1337x",
      seeds: 4594,
      size: "764.5 MB",
      time: "Jun. 1st '17",
      title: genTitle()
    });
  }
  return torrents;
}
