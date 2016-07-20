import fetch from 'isomorphic-fetch';
import uri from 'urijs';
import Lang from './Lang';

// https://thekat.tv (unofficial: http://kickassunblock.net)
const mirror = uri('https://kickassto.co/');
const url = uri('https://kat.cr');

export function format(response, page, responseTime) {
  const formatted = {};
  formatted.results = response.list;

  // Format
  formatted.response_time = parseInt(responseTime, 10);
  formatted.page = parseInt(page, 10);
  formatted.total_results = parseInt(response.total_results, 10);
  formatted.total_pages = Math.ceil(formatted.total_results / 25);

  // Add magnet
  for (let i = 0; i < formatted.results.length; i++) {
    formatted.results[i].magnet =
      'magnet:?xt=urn:btih:' +
      formatted.results[i].hash +
      '&dn=' +
      formatted.results[i].title.replace(/[^a-z|^0-9]/gi, '+').replace(/\++/g, '+').toLowerCase() +
      '&tr=udp%3A%2F%2Ftracker.publicbt.com%2Fannounce&tr=udp%3A%2F%2Fopen.demonii.com%3A1337';
  }
  return formatted;
}

export function queryTorrents(query, retry) {
  const queryParams = {};
  const endpoint = 'json.php';

  if (
    !query ||
    (
      query &&
      typeof query !== 'string' &&
      !query.query &&
      !query.category &&
      !query.min_seeds &&
      !query.uploader &&
      !query.age &&
      !query.safety_filter &&
      !query.verified &&
      !query.language
    )
  ) {
    throw new Error('Missing a mandatory parameter');
  }

  if (typeof query === 'string') {
    queryParams = { q: query };
  } else {
    queryParams.q = query.query || '';
    if (query.category) queryParams.q += ' category:' + query.category;
    if (query.min_seeds) queryParams.q += ' seeds:' + query.min_seeds;
    if (query.uploader) queryParams.q += ' user:' + query.uploader;
    if (query.age) queryParams.q += ' age:' + query.age;
    if (query.safety_filter) queryParams.q += ' is_safe:' + query.safety_filter;
    if (query.verified) queryParams.q += ' verified:' + query.verified;
    if (query.language) queryParams.q += ' lang_id:' + Lang(query.language);
    if (query.imdb) queryParams.q += ' imdb:' + query.imdb.replace(/\D/g,'');
    if (query.tvrage) queryParams.q += ' tv:' + query.tvrage;
    if (query.sort_by) queryParams.field = query.sort_by;
    if (query.order) queryParams.order = query.order;
    if (query.page) queryParams.page = query.page;
  }

  let requestUri;
  if (!retry) {
    requestUri = url.clone()
    .segment(endpoint)
    .addQuery(queryParams);
  } else {
    requestUri= mirror.clone()
    .segment(endpoint)
    .addQuery(queryParams);
  }

  const time = Date.now();
  return fetch(requestUri.toString())
    .then(res => res.json())
    .then(() => format(body, query.page || 1, Date.now() - t));
}

export default function search(query) {
  return queryTorrents(query)
    .then(response => response)
    .catch(function (error, retry) {
      if (!retry) {
        return queryTorrents(query, true);
      } else {
        return error;
      }
    });
}
