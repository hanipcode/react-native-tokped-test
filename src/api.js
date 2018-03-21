const MAIN_URL = 'https://newsapi.org/v2/everything';
const HEADLINE_URL = 'https://newsapi.org/v2/top-headlines';

function buildPaginatedNews(page) {
  const paramWithPage = `?domains=wsj.com,nytimes.com,bbc.com&language=en&pageSize=10&page=${page}&apiKey=4a01978912084f3ba78e0b0deb1839e4`;
  return MAIN_URL + paramWithPage;
}

function buildPaginatedHeadline(page) {
  const paramWithPage = `?apiKey=4a01978912084f3ba78e0b0deb1839e4&language=en&pageSize=5&page=${page}`;
  return HEADLINE_URL + paramWithPage;
}

export function fetchNews(page = 1) {
  const url = buildPaginatedNews(page);
  return fetch(url).then(response => response.json());
}

export function fetchHeadlines(page = 1) {
  const url = buildPaginatedHeadline(page);
  return fetch(url).then(response => response.json());
}
