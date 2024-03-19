document.addEventListener('DOMContentLoaded', function () {
  const searchInput = document.getElementById('search-nav-list');
  const listItems = document.querySelectorAll('.md-content li');
  const matchCountDisplay = document.getElementById('search-nav-count');
  const words = 'Type to start searching';
  matchCountDisplay.textContent = words;

  const searchFunction = function () {
    const searchTerms = this.value.toLowerCase().split(' ').filter(term => term.trim() !== '');
    let matchCount = 0;
    listItems.forEach(li => {
      const aTags = li.querySelectorAll('a');
      let isMatch = false;
      aTags.forEach(a => {
        const textMatch = searchTerms.some(term => a.textContent.toLowerCase().includes(term));
        const hrefMatch = searchTerms.some(term => a.href.toLowerCase().includes(term));
        if (textMatch || hrefMatch) {
          isMatch = true;
        }
      });
      li.style.display = (isMatch || searchTerms.length === 0) ? '' : 'none';
      if (isMatch) {
        matchCount++;
      }
    });
    matchCountDisplay.textContent = searchTerms.length === 0 ? words : `${matchCount} matches`;
  };

  searchInput.addEventListener('input', searchFunction);
});
