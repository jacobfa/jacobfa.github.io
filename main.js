// Load publications when DOM is ready
document.addEventListener('DOMContentLoaded', async () => {
  try {
    // Fetch publications data
    const response = await fetch('publications.json');
    const publications = await response.json();
    
    // Get the container for publications
    const pubList = document.querySelector('.pub-list');
    
    // Create all cards at once and add them in a single operation
    const fragment = document.createDocumentFragment();
    publications.forEach((pub, index) => {
      const card = createPublicationCard(pub, index);
      fragment.appendChild(card);
    });
    
    // Add all cards to DOM at once
    pubList.appendChild(fragment);
    
    // Simple fade-in animation
    requestAnimationFrame(() => {
      const cards = document.querySelectorAll('.publication-card');
      cards.forEach((card, index) => {
        setTimeout(() => {
          card.classList.add('opacity-100', 'translate-y-0');
        }, index * 50); // Reduced delay for faster loading
      });
    });
    
  } catch (error) {
    console.error('Error loading publications:', error);
    displayErrorMessage();
  }
});

// Create a publication card element
function createPublicationCard(pub, index) {
  const card = document.createElement('div');
  card.className = 'publication-card opacity-0 transform translate-y-4 transition-all duration-300';
  
  card.innerHTML = `
    <a href="${pub.link}" target="_blank" rel="noopener noreferrer" 
       class="block h-full bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200 overflow-hidden group hover-lift">
      <div class="relative h-48 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
        ${pub.image ? 
          `<img src="${pub.image}" alt="${pub.title}" 
                class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
                loading="lazy" decoding="async" />` :
          `<div class="w-full h-full flex items-center justify-center">
            <svg class="w-20 h-20 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z">
              </path>
            </svg>
          </div>`
        }
        <div class="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-gray-700">
          ${pub.year}
        </div>
      </div>
      
      <div class="p-6">
        <h4 class="text-lg font-bold text-gray-900 mb-3 line-clamp-2">
          ${pub.title}
        </h4>
        
        <div class="flex items-center justify-between mt-4">
          <p class="text-sm text-gray-600 font-medium">
            ${pub.publication}
          </p>
          <div class="flex items-center text-purple-600 transition-transform duration-200 group-hover:translate-x-1">
            <span class="text-sm font-medium mr-1">Read</span>
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
            </svg>
          </div>
        </div>
      </div>
    </a>
  `;
  
  return card;
}

// Display error message if publications fail to load
function displayErrorMessage() {
  const pubList = document.querySelector('.pub-list');
  pubList.innerHTML = `
    <div class="col-span-full text-center py-12">
      <div class="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
        <svg class="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      </div>
      <h4 class="text-lg font-semibold text-gray-900 mb-2">Unable to load publications</h4>
      <p class="text-gray-600">Please try refreshing the page or check back later.</p>
    </div>
  `;
}

// Add smooth scrolling for any internal links
document.addEventListener('click', (e) => {
  if (e.target.matches('a[href^="#"]')) {
    e.preventDefault();
    const target = document.querySelector(e.target.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }
}); 