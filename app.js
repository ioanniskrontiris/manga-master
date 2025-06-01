
// Final app.js with Awards-first approach and integrated Jikan cross-check

// Fetch the most awarded manga from Wikidata
async function fetchMostAwardedManga() {
  const endpointUrl = 'https://query.wikidata.org/sparql';
  const sparqlQuery = `
    SELECT ?mangaLabel (COUNT(?award) AS ?awardCount) WHERE {
      ?manga wdt:P31 wd:Q8274;
             wdt:P166 ?award.
      ?manga rdfs:label ?mangaLabel.
      FILTER(LANG(?mangaLabel) = "en")
    }
    GROUP BY ?mangaLabel
    ORDER BY DESC(?awardCount)
    LIMIT 50
  `;

  const fullUrl = endpointUrl + '?query=' + encodeURIComponent(sparqlQuery);
  const headers = { 'Accept': 'application/sparql-results+json' };

  try {
    const response = await fetch(fullUrl, { headers });
    const data = await response.json();

    const mostAwardedManga = data.results.bindings.map(item => ({
      title: item.mangaLabel.value,
      awardCount: parseInt(item.awardCount.value)
    }));

    console.log('Most Awarded Manga:', mostAwardedManga);
    return mostAwardedManga;

  } catch (error) {
    console.error('Error fetching most awarded manga:', error);
    return [];
  }
}

// Cross-check the award-winning manga with Jikan API
async function crossCheckWithJikan(mangaList) {
  const matchedManga = [];

  for (const manga of mangaList) {
    const query = encodeURIComponent(manga.title);
    const response = await fetch(`https://api.jikan.moe/v4/manga?q=${query}&limit=1`);
    const data = await response.json();

    if (data.data && data.data.length > 0) {
      const mangaData = data.data[0];
      matchedManga.push({
        title: manga.title,
        awardCount: manga.awardCount,
        jikanId: mangaData.mal_id,
        image: mangaData.images.jpg.image_url,
        synopsis: mangaData.synopsis,
        rating: mangaData.score || 0,
        popularity: mangaData.popularity || 0,
        affiliate: {
          amazon: `https://www.amazon.com/s?k=${encodeURIComponent(manga.title + ' manga')}`,
          bookshop: `https://bookshop.org/search?keywords=${encodeURIComponent(manga.title + ' manga')}`
        }
      });
    }
  }

  console.log('Matched Award-Winning Manga with Jikan:', matchedManga);
  return matchedManga;
}

// Fetch award-winning manga and update the Featured Award Winners section
async function fetchAwardWinningManga() {
  const awardedMangaList = await fetchMostAwardedManga();
  const finalMangaList = await crossCheckWithJikan(awardedMangaList);

  if (finalMangaList.length > 0) {
    DOM.awardWinners.innerHTML = '';
    finalMangaList.forEach(manga => {
      const card = document.createElement('div');
      card.classList.add('manga-card');
      card.innerHTML = `
        <img src="${manga.image}" alt="${manga.title} cover">
        <h4>${manga.title}</h4>
        <p><strong>Awards:</strong> ${manga.awardCount}</p>
        <p><strong>Rating:</strong> ${manga.rating}</p>
        <p><strong>Popularity:</strong> ${manga.popularity}</p>
        <a href="${manga.affiliate.amazon}" target="_blank" class="btn btn--primary">Buy on Amazon</a>
        <a href="${manga.affiliate.bookshop}" target="_blank" class="btn btn--secondary">Buy on Bookshop.org</a>
      `;
      DOM.awardWinners.appendChild(card);
    });
  } else {
    DOM.awardWinners.innerHTML = '<p>No award-winning manga found at this time.</p>';
  }
}

// Initialization of the app
async function initApp() {
  console.log('Initializing MangaMaster with Awards-first approach...');
  document.documentElement.setAttribute('data-color-scheme', appData.currentTheme);
  updateThemeIcon();

  DOM.awardWinners.innerHTML = '<p>Loading award-winning manga...</p>';
  await fetchAwardWinningManga();

  setupEventListeners();
  console.log('Initialization complete!');
}

initApp();