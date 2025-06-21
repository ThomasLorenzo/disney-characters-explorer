document.addEventListener('DOMContentLoaded', function() {
    let currentPage = 1;
    
    const charactersGrid = document.getElementById('characters-grid');
    const searchInput    = document.getElementById('search-input');
    const prevPageBtn    = document.getElementById('prev-page-btn');
    const nextPageBtn    = document.getElementById('next-page-btn');
    const pageNumber     = document.getElementById('page-number');

    // Initialize pagination buttons state
    prevPageBtn.disabled = true;

    /**
     * Fetches character data from "api.disneyapi.dev"
     * @returns {Promise<Object|null>} Characters data or null if error
     */
    async function fetchCharactersData() {
        // Clear existing cards and show skeleton loading
        charactersGrid.innerHTML = '';
        showSkeletonCards();

        try {
            const response = await fetch(`https://api.disneyapi.dev/character?pageSize=96&page=${currentPage}`);
            
            if (!response.ok) {
                throw new Error('Failed to fetch characters data from API');
            }        
            
            const charactersData = await response.json();
            return charactersData;
        } catch (error) {
            console.error('Error loading characters:', error);
            return null;
        }
    }

    /**
     * Creates and displays skeleton loading cards
     */
    function showSkeletonCards() {
        for (let i = 0; i < 96; i++) {
            const skeletonCard = document.createElement('div');
            skeletonCard.classList.add('skeleton-card');
            
            const skeletonName = document.createElement('span');
            skeletonName.classList.add('skeleton-name');

            skeletonCard.appendChild(skeletonName);
            charactersGrid.appendChild(skeletonCard);
        }
    }

    /**
     * Creates and renders character cards
     */
    async function createCharacterCards() {
        const charactersData = await fetchCharactersData();
        
        if (!charactersData) {
            console.error('Unable to load characters data');
            return;
        }

        // Clear existing cards
        charactersGrid.innerHTML = '';

        charactersData.data.forEach(character => {
            const characterCard = createSingleCharacterCard(character);
            charactersGrid.appendChild(characterCard);
        });

        // Trigger search filter after creating cards to ensure filtering 
        // applies to new cards when navigating pages with an active search
        searchInput.dispatchEvent(new Event('input'));
    }

    /**
     * Creates a single character card element
     * @param {Object} character - Character data object
     * @returns {HTMLElement} Character card element
     */
    function createSingleCharacterCard(character) {
        // Create main card element
        const card = document.createElement('div');
        card.classList.add('character-card');
        card.setAttribute('title', character.name);
        card.setAttribute('id', character._id);
        
        // Add click event to open character wiki
        card.addEventListener('click', function() {
            window.open(character.sourceUrl, '_blank');
        });
        
        // Create character image element
        const imageElement = document.createElement('img');
        imageElement.classList.add('character-image');
        imageElement.alt = character.name;
        imageElement.src = character.imageUrl || 'images/image-not-found.png';
        
        // Create character name element
        const nameElement = document.createElement('span');
        nameElement.classList.add('character-name');
        nameElement.textContent = character.name;

        // Append elements to card
        card.appendChild(imageElement);
        card.appendChild(nameElement);

        return card;
    }

    /**
     * Handles previous page navigation
     */
    function handlePreviousPage() {
        if (currentPage > 1) {
            currentPage--;
            createCharacterCards();
            updatePaginationState();
            removeNoResultsMessage();
            updatePageNumber();
        }
    }

    /**
     * Handles next page navigation
     */
    function handleNextPage() {
        currentPage++;
        createCharacterCards();
        updatePaginationState();
        removeNoResultsMessage();
        updatePageNumber();
    }

    /**
     * Updates pagination buttons state
     */
    function updatePaginationState() {
        prevPageBtn.disabled = currentPage === 1;
    }

    /**
     * Updates page number display
     */
    function updatePageNumber() {
        pageNumber.textContent = `Page ${currentPage}`;
    }

    /**
     * Handles search input filtering
     */
    function handleSearchInput() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        const characterCards = document.querySelectorAll('.character-card');
        
        removeNoResultsMessage();

        // Show all cards initially
        characterCards.forEach(card => {
            card.style.display = 'block';
        });

        // If search is empty, show all cards
        if (searchTerm === '') {
            return;
        }

        let visibleCardsCount = 0;

        // Filter cards based on search term
        characterCards.forEach(card => {
            const characterName = card.getAttribute('title').toLowerCase();
            if (!characterName.includes(searchTerm)) {
                card.style.display = 'none';
            } else {
                visibleCardsCount++;
            }
        });

        // Show no results message if no cards are visible
        if (visibleCardsCount === 0) {
            showNoResultsMessage();
        }
    }

    /**
     * Shows no results found message
     */
    function showNoResultsMessage() {
        if (!document.getElementById('no-results-found')) {
            const noResultsElement = document.createElement('div');
            noResultsElement.id = 'no-results-found';
            noResultsElement.textContent = 'No results found.';

            charactersGrid.before(noResultsElement);
        }
    }

    /**
     * Removes no results found message
     */
    function removeNoResultsMessage() {
        const noResultsElement = document.getElementById('no-results-found');
        if (noResultsElement) {
            noResultsElement.remove();
        }
    }

    // Event listeners
    prevPageBtn.addEventListener('click', handlePreviousPage);
    nextPageBtn.addEventListener('click', handleNextPage);
    searchInput.addEventListener('input', handleSearchInput);

    // Initialize application
    createCharacterCards();
});