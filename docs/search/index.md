---
hide:
  - toc
search:
  exclude: true
icon: material/navigation-variant
---

# Search

## Icons / Emojis Search

<div class="mdx-iconsearch" data-mdx-component="iconsearch">
  <input
    class="md-input md-input--stretch mdx-iconsearch__input"
    placeholder="Search the icon and emoji database"
    data-mdx-component="iconsearch-query"
    id="searchInput"
  />
  <div class="mdx-iconsearch-result" data-mdx-component="iconsearch-result" style="overflow-y: auto;">
    <div class="mdx-iconsearch-result__meta" id="searchResultCount"></div>
    <ol class="mdx-iconsearch-result__list"  id="searchResult"></ol>
  </div>
</div>

<small>
  :octicons-light-bulb-16:
  **Tip:** Enter some keywords to find icons and emojis and click on the
  shortcode to copy it to your clipboard.
</small>

<script src="../assets/js/iconsearch.js"></script>
