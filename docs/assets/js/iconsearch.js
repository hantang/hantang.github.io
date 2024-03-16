// const searchInput = document.querySelector('.mdx-iconsearch__input');
// const searchResult = document.querySelector('.mdx-iconsearch-result__meta');
// const searchResultMeta = document.querySelector('.mdx-iconsearch-result__list');

const searchInput = document.getElementById('searchInput');
const searchResult = document.getElementById('searchResult');
const searchResultMeta = document.getElementById('searchResultCount');

const datafile = '../assets/js/iconsearch_index.json';
const displayStep = 10;
let searchData = null;
let searchResults = [];
let displayedResults = displayStep;
const startWords = "Type to start searching";

searchResultMeta.textContent = startWords;

fetch(datafile)
  .then(response => response.json())
  .then(data => {
    searchData = data;
  })
  .catch(error => console.error('Error loading icon data:', error));

searchInput.addEventListener('input', function () {
  const query = this.value.trim().toLowerCase().replace(/\s+/g, '');
  searchResults = [];

  // match results
  for (const category in searchData) {
    const base = searchData[category].base;
    for (const key in searchData[category].data) {
      const lowerCaseKey = key;
      let matchIndex = 0;
      let isMatch = true;

      // 按单个字母顺序匹配
      for (const char of query) {
        const index = lowerCaseKey.indexOf(char, matchIndex);
        if (index === -1) {
          isMatch = false;
          break;
        }
        matchIndex = index + 1;
      }

      if (isMatch) {
        const value = searchData[category].data[key];
        const matchedText = key.substring(0, matchIndex);
        const highlightedKey = key.replace(new RegExp(matchedText, 'i'), `<b>${matchedText}</b>`);
        const resultText = `
          <li class="mdx-iconsearch-result__item">
          <span class="twemoji">
          <img src="${base}/${value}">
          </span>
          <button class="md-clipboard--inline" title="Copy to clipboard" data-clipboard-text=":${key}:">
          <code>
          ${highlightedKey}
          </code>
          </button>
          </li>
          `;
        searchResults.push(resultText);
      }
    }
  }

  // show results
  searchResults.sort((a, b) => {
    const textA = a.replace(/<\/?b>/g, '').toLowerCase();
    const textB = b.replace(/<\/?b>/g, '').toLowerCase();
    return textA.localeCompare(textB);
  });

  displaySearchResults();
});


searchInput.addEventListener('keyup', function (event) {
  if (event.key === 'Backspace' && this.value.trim() === '') {
    searchResults = [];
    displaySearchResults();
    searchResultMeta.textContent = startWords;
  }
});

function displaySearchResults() {
  console.log(displayedResults)
  const totalResults = searchResults.length;
  let html = '';
  let resultCount = '';

  if (totalResults > 0) {
    resultCount = totalResults > 1000 ? (totalResults / 1000).toFixed(1) + 'k' : totalResults;
    html += `${searchResults.slice(0, displayedResults).join('')}`;
  } else {
    resultCount = 0;
  }

  searchResultMeta.textContent = `${resultCount} matches`;
  searchResult.innerHTML = html;
}

searchResult.addEventListener('scroll', function () {
  const scrollTop = this.scrollTop;
  const scrollHeight = this.scrollHeight;
  const clientHeight = this.clientHeight;
  if (scrollTop + clientHeight >= scrollHeight) {
    displayedResults += displayStep;
    displaySearchResults();
  }
});
