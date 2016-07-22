import fetch from 'isomorphic-fetch';
import cheerio from 'cheerio';


export function search(query) {
  return fetch(`http://kat.am/usearch/${encodeURIComponent(query)}/?field=seeders&sorder=desc`, {
    mode: 'no-cors'
  })
  .then(res => res.text())
  .then(showsHtml => {
    const $ = cheerio.load(showsHtml);

    const torrents = $("table tr:not('.firstr')").map(function formatTorrents() {
      return {
        magnet: $(this).find('[title="Torrent magnet link"]').attr('href'),
        metadata: $(this).find('[title="Torrent magnet link"]').attr('href'),
        seeders: parseInt($(this).find('.green.center').text(), 10),
        leechers: parseInt($(this).find('.red.lasttd.center').text(), 10)
      };
    }).get();

    return torrents;
  });
}

export default function Torrent() {}
