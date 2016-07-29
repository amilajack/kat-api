import fetch from 'isomorphic-fetch';
import cheerio from 'cheerio';


export function search(query, endpoint = 'https://kickass.skillproxy.org') {
  return fetch(`${endpoint}/usearch/${encodeURIComponent(query)}/?field=seeders&sorder=desc`, {
    mode: 'no-cors'
  })
  .then(res => res.text())
  .then(showsHtml => {
    const $ = cheerio.load(showsHtml);

    const torrents = $("table.data tr:not('.firstr')").map(function formatTorrents() {
      return {
        magnet: $(this).find('[title="Torrent magnet link"]').attr('href'),
        metadata: $(this).find('[title="Torrent magnet link"]').attr('href'),
        title: $(this).find('a.cellMainLink').text(),
        verified: !!$(this).find('[title="Verified Torrent"]').length,
        seeders: parseInt($(this).find('.green.center').text(), 10),
        leechers: parseInt($(this).find('.red.lasttd.center').text(), 10)
      };
    }).get();

    return torrents;
  });
}

export default function Torrent() {}
