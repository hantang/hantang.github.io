// const searchInput = document.querySelector('.mdx-iconsearch__input');
// const searchResultList = document.querySelector('.mdx-iconsearch-result__meta');
// const searchResultMeta = document.querySelector('.mdx-iconsearch-result__list');

const searchInput = document.getElementById('searchInput');
const searchResultList = document.getElementById('searchResultList');
const searchResultMeta = document.getElementById('searchResultMeta');

const datafile = '../assets/js/iconsearch_index.json';
const metaWords = "Type to start searching";
const displayStep = 20;
let searchData = null;
let searchResults = [];
let displayedResultCount = 0;


searchResultMeta.textContent = metaWords;
searchResultList.style.overflowY = 'scroll';
searchResultList.style.maxHeight = '300px';

fetch(datafile)
  .then(response => response.json())
  .then(data => {
    searchData = data;
  })
  .catch(error => console.error('Error loading icon data:', error));

searchInput.addEventListener('input', function () {
  const query = this.value.trim().toLowerCase().replace(/\s+/g, '');
  searchResults = [];

  // match results by letters
  for (const category in searchData) {
    const base = searchData[category].base;
    for (const key in searchData[category].data) {
      const lowerCaseKey = key;
      let matchIndex = 0;
      let isMatch = true;

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
          <span class="twemoji"><img src="${base}/${value}"></span>
          <button class="md-clipboard--inline" title="Copy to clipboard" data-clipboard-text=":${key}:">
            <code>${highlightedKey}</code>
          </button>
          </li>
          `;
        searchResults.push(resultText);
      }
    }
  }

  console.log("sort data", searchResults.length);
  // show results
  searchResults.sort((a, b) => {
    const textA = a.replace(/<\/?b>/g, '').toLowerCase();
    const textB = b.replace(/<\/?b>/g, '').toLowerCase();
    return textA.localeCompare(textB);
  });

  // clear then display
  displayedResultCount = 0;
  searchResultList.innerHTML = '';
  displaySearchResults();
});


searchInput.addEventListener('keyup', function (event) {
  if (event.key === 'Backspace' && this.value.trim() === '') {
    searchResults = [];
    displayedResultCount = 0;
    displaySearchResults();
    searchResultMeta.textContent = metaWords;
  }
});

function displaySearchResults() {
  console.log(displayedResultCount)
  const totalResults = searchResults.length;
  let html = '';
  let resultCount = '';

  if (totalResults > 0) {
    resultCount = totalResults > 1000 ? (totalResults / 1000).toFixed(1) + 'k' : totalResults;
    const results = searchResults.slice(displayedResultCount, displayedResultCount + displayStep);
    html = searchResultList.innerHTML + `${results.join('')}`;
    displayedResultCount += displayStep;
  } else {
    resultCount = 0;
  }

  searchResultMeta.textContent = `${resultCount} matches`;
  searchResultList.innerHTML = html;
}

searchResultList.addEventListener('scroll', function () {
  // const scrollTop = this.scrollTop;
  // const scrollHeight = this.scrollHeight;
  // const clientHeight = this.clientHeight;
  // if (scrollTop + clientHeight >= scrollHeight) {
  if( displayedResultCount <= searchResults.length) {
    displaySearchResults();
  }
});
