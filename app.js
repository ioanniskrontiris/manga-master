// Store application data
let appData = {
    featuredManga: [],
    allManga: [],
    genres: [],
    awards: [],
    translations: {},
    currentLanguage: 'en',
    currentTheme: localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
};

// DOM elements
const DOM = {
    carouselTrack: document.getElementById('carouselTrack'),
    carouselPrev: document.getElementById('carouselPrev'),
    carouselNext: document.getElementById('carouselNext'),
    awardWinners: document.getElementById('awardWinners'),
    popularManga: document.getElementById('popularManga'),
    hiddenGems: document.getElementById('hiddenGems'),
    searchInput: document.getElementById('searchInput'),
    searchBtn: document.getElementById('searchBtn'),
    genreFilter: document.getElementById('genreFilter'),
    ratingFilter: document.getElementById('ratingFilter'),
    statusFilter: document.getElementById('statusFilter'),
    awardsFilter: document.getElementById('awardsFilter'),
    mangaModal: document.getElementById('mangaModal'),
    modalBody: document.getElementById('modalBody'),
    modalClose: document.getElementById('modalClose'),
    modalBackdrop: document.getElementById('modalBackdrop'),
    languageSelector: document.getElementById('languageSelector'),
    themeToggle: document.getElementById('themeToggle'),
    themeIcon: document.querySelector('.theme-icon'),
    translateElements: document.querySelectorAll('[data-translate]')
};

// Application data (from JSON)
const applicationData = {
  "featuredManga": [
    {
      "id": 1,
      "title": "Attack on Titan",
      "titleDE": "Attack on Titan",
      "author": "Hajime Isayama",
      "genre": ["Action", "Drama", "Fantasy"],
      "rating": 9.0,
      "year": 2009,
      "status": "Completed",
      "awards": ["Kodansha Manga Award"],
      "description": "Humanity fights for survival against giant humanoid creatures called Titans.",
      "descriptionDE": "Die Menschheit kämpft ums Überleben gegen riesige humanoide Kreaturen namens Titanen.",
      "image": "https://images.unsplash.com/photo-1618336753974-aae8e04506aa?w=300&h=400&fit=crop",
      "popularity": 95,
      "affiliate": {
        "amazon": "https://amazon.com/attack-titan",
        "bookshop": "https://bookshop.org/attack-titan"
      }
    },
    {
      "id": 2,
      "title": "One Piece",
      "titleDE": "One Piece",
      "author": "Eiichiro Oda",
      "genre": ["Adventure", "Comedy", "Drama"],
      "rating": 9.2,
      "year": 1997,
      "status": "Ongoing",
      "awards": ["Shogakukan Manga Award"],
      "description": "A young pirate searches for the ultimate treasure known as One Piece.",
      "descriptionDE": "Ein junger Pirat sucht nach dem ultimativen Schatz namens One Piece.",
      "image": "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=400&fit=crop",
      "popularity": 98,
      "affiliate": {
        "amazon": "https://amazon.com/one-piece",
        "bookshop": "https://bookshop.org/one-piece"
      }
    },
    {
      "id": 3,
      "title": "Demon Slayer",
      "titleDE": "Demon Slayer",
      "author": "Koyoharu Gotouge",
      "genre": ["Action", "Supernatural", "Historical"],
      "rating": 8.7,
      "year": 2016,
      "status": "Completed",
      "awards": [],
      "description": "A young boy becomes a demon slayer to save his transformed sister.",
      "descriptionDE": "Ein junger Junge wird Dämonenjäger, um seine verwandelte Schwester zu retten.",
      "image": "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=400&fit=crop",
      "popularity": 92,
      "affiliate": {
        "amazon": "https://amazon.com/demon-slayer",
        "bookshop": "https://bookshop.org/demon-slayer"
      }
    }
  ],
  "allManga": [
    {
      "id": 4,
      "title": "Death Note",
      "titleDE": "Death Note",
      "author": "Tsugumi Ohba",
      "genre": ["Psychological", "Supernatural", "Thriller"],
      "rating": 9.0,
      "year": 2003,
      "status": "Completed",
      "awards": [],
      "description": "A high school student discovers a supernatural notebook that can kill anyone.",
      "descriptionDE": "Ein Oberschüler entdeckt ein übernatürliches Notizbuch, das jeden töten kann.",
      "image": "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop",
      "popularity": 89,
      "affiliate": {
        "amazon": "https://amazon.com/death-note",
        "bookshop": "https://bookshop.org/death-note"
      }
    },
    {
      "id": 5,
      "title": "My Hero Academia",
      "titleDE": "My Hero Academia",
      "author": "Kohei Horikoshi",
      "genre": ["Action", "School", "Superhero"],
      "rating": 8.5,
      "year": 2014,
      "status": "Ongoing",
      "awards": ["Shogakukan Manga Award"],
      "description": "A boy without superpowers dreams of becoming a hero in a world where they're common.",
      "descriptionDE": "Ein Junge ohne Superkräfte träumt davon, ein Held zu werden in einer Welt, wo sie üblich sind.",
      "image": "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=400&fit=crop",
      "popularity": 87,
      "affiliate": {
        "amazon": "https://amazon.com/my-hero-academia",
        "bookshop": "https://bookshop.org/my-hero-academia"
      }
    },
    {
      "id": 6,
      "title": "Spirited Away",
      "titleDE": "Chihiros Reise ins Zauberland",
      "author": "Hayao Miyazaki",
      "genre": ["Adventure", "Family", "Fantasy"],
      "rating": 9.3,
      "year": 2001,
      "status": "Completed",
      "awards": ["International Manga Award"],
      "description": "A young girl must work in a spirit world to save her parents.",
      "descriptionDE": "Ein junges Mädchen muss in einer Geisterwelt arbeiten, um ihre Eltern zu retten.",
      "image": "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=400&fit=crop",
      "popularity": 85,
      "affiliate": {
        "amazon": "https://amazon.com/spirited-away",
        "bookshop": "https://bookshop.org/spirited-away"
      }
    },
    {
      "id": 7,
      "title": "Monster",
      "titleDE": "Monster",
      "author": "Naoki Urasawa",
      "genre": ["Psychological", "Thriller", "Drama"],
      "rating": 9.1,
      "year": 1994,
      "status": "Completed",
      "awards": ["Kodansha Manga Award"],
      "description": "A doctor's life is turned upside down after saving a young patient.",
      "descriptionDE": "Das Leben eines Arztes wird auf den Kopf gestellt, nachdem er einen jungen Patienten gerettet hat.",
      "image": "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop",
      "popularity": 78,
      "affiliate": {
        "amazon": "https://amazon.com/monster",
        "bookshop": "https://bookshop.org/monster"
      }
    },
    {
      "id": 8,
      "title": "Uzumaki",
      "titleDE": "Uzumaki",
      "author": "Junji Ito",
      "genre": ["Horror", "Supernatural", "Psychological"],
      "rating": 8.8,
      "year": 1998,
      "status": "Completed",
      "awards": [],
      "description": "A town becomes obsessed with spirals in this horror masterpiece.",
      "descriptionDE": "Eine Stadt wird von Spiralen besessen in diesem Horror-Meisterwerk.",
      "image": "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop",
      "popularity": 72,
      "affiliate": {
        "amazon": "https://amazon.com/uzumaki",
        "bookshop": "https://bookshop.org/uzumaki"
      }
    }
  ],
  "genres": ["Action", "Adventure", "Comedy", "Drama", "Fantasy", "Horror", "Psychological", "Romance", "School", "Supernatural", "Thriller"],
  "awards": ["Kodansha Manga Award", "Shogakukan Manga Award", "International Manga Award"],
  "translations": {
    "en": {
      "siteName": "MangaMaster",
      "nav": {
        "home": "Home",
        "awards": "Awards",
        "browse": "Browse",
        "about": "About"
      },
      "hero": {
        "title": "Discover the World's Best Manga",
        "subtitle": "Award-winning and critically acclaimed series from around the globe"
      },
      "sections": {
        "featured": "Featured Award Winners",
        "popular": "Popular Recommendations",
        "hidden": "Hidden Gems",
        "search": "Search Manga",
        "filter": "Filter Results"
      },
      "filters": {
        "genre": "Genre",
        "rating": "Minimum Rating",
        "year": "Publication Year",
        "status": "Status",
        "awards": "Awards"
      },
      "buttons": {
        "buyAmazon": "Buy on Amazon",
        "buyBookshop": "Buy on Bookshop.org",
        "viewDetails": "View Details",
        "search": "Search"
      },
      "footer": {
        "affiliate": "This site contains affiliate links. We earn commission from qualifying purchases.",
        "mission": "Supporting quality manga and independent bookstores worldwide."
      }
    },
    "de": {
      "siteName": "MangaMaster",
      "nav": {
        "home": "Startseite",
        "awards": "Auszeichnungen",
        "browse": "Durchsuchen",
        "about": "Über uns"
      },
      "hero": {
        "title": "Entdecke die besten Manga der Welt",
        "subtitle": "Preisgekrönte und kritisch gefeierte Serien aus aller Welt"
      },
      "sections": {
        "featured": "Ausgezeichnete Gewinner",
        "popular": "Beliebte Empfehlungen",
        "hidden": "Geheimtipps",
        "search": "Manga suchen",
        "filter": "Ergebnisse filtern"
      },
      "filters": {
        "genre": "Genre",
        "rating": "Mindestbewertung",
        "year": "Erscheinungsjahr",
        "status": "Status",
        "awards": "Auszeichnungen"
      },
      "buttons": {
        "buyAmazon": "Bei Amazon kaufen",
        "buyBookshop": "Bei Bookshop.org kaufen",
        "viewDetails": "Details anzeigen",
        "search": "Suchen"
      },
      "footer": {
        "affiliate": "Diese Seite enthält Affiliate-Links. Wir erhalten Provisionen bei qualifizierten Käufen.",
        "mission": "Unterstützung von qualitativ hochwertigen Manga und unabhängigen Buchhandlungen weltweit."
      }
    }
  }
};

// Initialize the application
function initApp() {
    // Load data
    appData.featuredManga = applicationData.featuredManga;
    appData.allManga = applicationData.allManga;
    appData.genres = applicationData.genres;
    appData.awards = applicationData.awards;
    appData.translations = applicationData.translations;
    
    // Set theme
    document.documentElement.setAttribute('data-color-scheme', appData.currentTheme);
    updateThemeIcon();
    
    // Set language from URL parameter or localStorage
    const urlParams = new URLSearchParams(window.location.search);
    const langParam = urlParams.get('lang');
    if (langParam && ['en', 'de'].includes(langParam)) {
        appData.currentLanguage = langParam;
    } else {
        appData.currentLanguage = localStorage.getItem('language') || 'en';
    }
    
    DOM.languageSelector.value = appData.currentLanguage;
    translatePage();
    
    // Initialize UI components
    initCarousel();
    populateFilters();
    populateMangaGrids();
    
    // Set up event listeners
    setupEventListeners();
}

// Initialize carousel with featured manga
function initCarousel() {
    // Clear existing content
    DOM.carouselTrack.innerHTML = '';
    
    // Create carousel items
    appData.featuredManga.forEach(manga => {
        const carouselItem = document.createElement('div');
        carouselItem.className = 'carousel-item';
        
        const title = appData.currentLanguage === 'de' && manga.titleDE ? manga.titleDE : manga.title;
        const description = appData.currentLanguage === 'de' && manga.descriptionDE ? manga.descriptionDE : manga.description;
        
        carouselItem.innerHTML = `
            <img class="carousel-item__image" src="${manga.image}" alt="${title}">
            <div class="carousel-item__content">
                <h3 class="carousel-item__title">${title}</h3>
                <p class="carousel-item__author">${manga.author} (${manga.year})</p>
                <p class="carousel-item__description">${description}</p>
                <div class="carousel-item__meta">
                    <div class="rating">
                        <span class="stars">★★★★★</span>
                        <span>${manga.rating.toFixed(1)}</span>
                    </div>
                    ${manga.awards.length > 0 ? `
                        <div class="award-badge">
                            ${manga.awards[0]}
                        </div>
                    ` : ''}
                </div>
                <div class="carousel-item__actions">
                    <button class="btn btn--primary view-details" data-id="${manga.id}">
                        ${getTranslation('buttons.viewDetails')}
                    </button>
                </div>
            </div>
        `;
        
        DOM.carouselTrack.appendChild(carouselItem);
    });
    
    // Initialize carousel position
    currentSlide = 0;
    updateCarousel();
}

// Carousel variables
let currentSlide = 0;
const totalSlides = 3; // Number of featured manga

// Update carousel position
function updateCarousel() {
    DOM.carouselTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
}

// Populate filter dropdowns
function populateFilters() {
    // Populate genre filter
    appData.genres.forEach(genre => {
        const option = document.createElement('option');
        option.value = genre;
        option.textContent = genre;
        DOM.genreFilter.appendChild(option);
    });
    
    // Populate awards filter
    appData.awards.forEach(award => {
        const option = document.createElement('option');
        option.value = award;
        option.textContent = award;
        DOM.awardsFilter.appendChild(option);
    });
}

// Populate manga grids
function populateMangaGrids() {
    // Award winners
    const awardWinners = [...appData.featuredManga, ...appData.allManga].filter(manga => manga.awards.length > 0);
    renderMangaGrid(DOM.awardWinners, awardWinners);
    
    // Popular manga (sort by popularity)
    const popularManga = [...appData.featuredManga, ...appData.allManga].sort((a, b) => b.popularity - a.popularity).slice(0, 6);
    renderMangaGrid(DOM.popularManga, popularManga);
    
    // Hidden gems (lower popularity but high rating)
    const hiddenGems = [...appData.featuredManga, ...appData.allManga]
        .filter(manga => manga.popularity < 85 && manga.rating >= 8.5)
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 3);
    renderMangaGrid(DOM.hiddenGems, hiddenGems);
}

// Render manga grid
function renderMangaGrid(container, mangaList) {
    container.innerHTML = '';
    
    mangaList.forEach(manga => {
        const card = document.createElement('div');
        card.className = 'manga-card';
        card.setAttribute('data-id', manga.id);
        
        const title = appData.currentLanguage === 'de' && manga.titleDE ? manga.titleDE : manga.title;
        
        card.innerHTML = `
            <img class="manga-card__image" src="${manga.image}" alt="${title}">
            <div class="manga-card__content">
                <h4 class="manga-card__title">${title}</h4>
                <p class="manga-card__author">${manga.author}</p>
                
                <div class="manga-card__genres">
                    ${manga.genre.slice(0, 3).map(genre => `<span class="genre-tag">${genre}</span>`).join('')}
                </div>
                
                <div class="manga-card__meta">
                    <div class="rating">
                        <span class="stars">★★★★★</span>
                        <span>${manga.rating.toFixed(1)}</span>
                    </div>
                    ${manga.awards.length > 0 ? `
                        <div class="award-badge">
                            ${manga.awards[0]}
                        </div>
                    ` : ''}
                </div>
                
                <div class="manga-card__actions">
                    <a href="${manga.affiliate.amazon}" class="btn affiliate-btn affiliate-btn--amazon" target="_blank">
                        ${getTranslation('buttons.buyAmazon')}
                    </a>
                    <a href="${manga.affiliate.bookshop}" class="btn affiliate-btn affiliate-btn--bookshop" target="_blank">
                        ${getTranslation('buttons.buyBookshop')}
                    </a>
                </div>
            </div>
        `;
        
        container.appendChild(card);
    });
}

// Search and filter manga
function searchManga() {
    const query = DOM.searchInput.value.toLowerCase();
    const genreFilter = DOM.genreFilter.value;
    const ratingFilter = parseFloat(DOM.ratingFilter.value) || 0;
    const statusFilter = DOM.statusFilter.value;
    const awardsFilter = DOM.awardsFilter.value;
    
    const filteredManga = [...appData.featuredManga, ...appData.allManga].filter(manga => {
        // Search query
        const titleMatch = manga.title.toLowerCase().includes(query) || 
                         (manga.titleDE && manga.titleDE.toLowerCase().includes(query));
        const authorMatch = manga.author.toLowerCase().includes(query);
        const genreMatch = manga.genre.some(g => g.toLowerCase().includes(query));
        const matchesQuery = !query || titleMatch || authorMatch || genreMatch;
        
        // Filters
        const matchesGenre = !genreFilter || manga.genre.includes(genreFilter);
        const matchesRating = manga.rating >= ratingFilter;
        const matchesStatus = !statusFilter || manga.status === statusFilter;
        const matchesAwards = !awardsFilter || manga.awards.includes(awardsFilter);
        
        return matchesQuery && matchesGenre && matchesRating && matchesStatus && matchesAwards;
    });
    
    // Display search results
    renderMangaGrid(DOM.popularManga, filteredManga);
    
    // Scroll to results
    DOM.popularManga.scrollIntoView({ behavior: 'smooth' });
}

// Open manga detail modal
function openMangaModal(id) {
    const manga = [...appData.featuredManga, ...appData.allManga].find(m => m.id === parseInt(id));
    
    if (!manga) return;
    
    const title = appData.currentLanguage === 'de' && manga.titleDE ? manga.titleDE : manga.title;
    const description = appData.currentLanguage === 'de' && manga.descriptionDE ? manga.descriptionDE : manga.description;
    
    DOM.modalBody.innerHTML = `
        <div class="modal-manga">
            <img class="modal-manga__image" src="${manga.image}" alt="${title}">
            <div class="modal-manga__info">
                <h3>${title}</h3>
                <p>${manga.author} (${manga.year})</p>
                <div class="rating">
                    <span class="stars">★★★★★</span>
                    <span>${manga.rating.toFixed(1)}</span>
                </div>
                ${manga.awards.length > 0 ? `
                    <div class="award-badge">
                        ${manga.awards[0]}
                    </div>
                ` : ''}
            </div>
        </div>
        
        <div class="modal-manga__description">
            <p>${description}</p>
        </div>
        
        <div class="modal-manga__details">
            <div class="detail-item">
                <span class="detail-label">Status</span>
                <span class="detail-value">${manga.status}</span>
            </div>
            <div class="detail-item">
                <span class="detail-label">Popularity</span>
                <span class="detail-value">${manga.popularity}%</span>
            </div>
            <div class="detail-item">
                <span class="detail-label">Genres</span>
                <span class="detail-value">${manga.genre.join(', ')}</span>
            </div>
        </div>
        
        <div class="modal-actions">
            <a href="${manga.affiliate.amazon}" class="btn affiliate-btn affiliate-btn--amazon" target="_blank">
                ${getTranslation('buttons.buyAmazon')}
            </a>
            <a href="${manga.affiliate.bookshop}" class="btn affiliate-btn affiliate-btn--bookshop" target="_blank">
                ${getTranslation('buttons.buyBookshop')}
            </a>
        </div>
    `;
    
    DOM.mangaModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close manga detail modal
function closeMangaModal() {
    DOM.mangaModal.classList.remove('active');
    document.body.style.overflow = '';
}

// Set up event listeners
function setupEventListeners() {
    // Carousel navigation
    DOM.carouselPrev.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateCarousel();
    });
    
    DOM.carouselNext.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateCarousel();
    });
    
    // Search and filters
    DOM.searchBtn.addEventListener('click', searchManga);
    DOM.searchInput.addEventListener('keyup', e => {
        if (e.key === 'Enter') searchManga();
    });
    
    // Filter change events
    DOM.genreFilter.addEventListener('change', searchManga);
    DOM.ratingFilter.addEventListener('change', searchManga);
    DOM.statusFilter.addEventListener('change', searchManga);
    DOM.awardsFilter.addEventListener('change', searchManga);
    
    // Manga cards click (event delegation)
    document.addEventListener('click', e => {
        // View details button in carousel
        if (e.target.classList.contains('view-details')) {
            openMangaModal(e.target.dataset.id);
        }
        
        // Manga card
        if (e.target.closest('.manga-card')) {
            const card = e.target.closest('.manga-card');
            openMangaModal(card.dataset.id);
        }
    });
    
    // Modal close
    DOM.modalClose.addEventListener('click', closeMangaModal);
    DOM.modalBackdrop.addEventListener('click', closeMangaModal);
    
    // Theme toggle
    DOM.themeToggle.addEventListener('click', () => {
        appData.currentTheme = appData.currentTheme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-color-scheme', appData.currentTheme);
        localStorage.setItem('theme', appData.currentTheme);
        updateThemeIcon();
    });
    
    // Language selector
    DOM.languageSelector.addEventListener('change', () => {
        appData.currentLanguage = DOM.languageSelector.value;
        localStorage.setItem('language', appData.currentLanguage);
        translatePage();
        initCarousel();
        populateMangaGrids();
    });
}

// Update theme icon based on current theme
function updateThemeIcon() {
    DOM.themeIcon.textContent = appData.currentTheme === 'light' ? '🌙' : '☀️';
}

// Get translation for a key
function getTranslation(key) {
    const lang = appData.currentLanguage;
    const keys = key.split('.');
    let value = appData.translations[lang];
    
    for (const k of keys) {
        if (value && value[k]) {
            value = value[k];
        } else {
            return key; // Fallback to key if translation not found
        }
    }
    
    return value;
}

// Translate page content based on current language
function translatePage() {
    DOM.translateElements.forEach(element => {
        const key = element.getAttribute('data-translate');
        const translation = getTranslation(key);
        
        if (translation) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = translation;
            } else {
                element.textContent = translation;
            }
        }
    });
}

// Initialize application when DOM is loaded
document.addEventListener('DOMContentLoaded', initApp);