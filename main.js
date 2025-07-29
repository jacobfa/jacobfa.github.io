// Load publications when DOM is ready
document.addEventListener('DOMContentLoaded', async () => {
  try {
    // Add a slight delay for smooth loading experience
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Fetch publications data
    const response = await fetch('publications.json');
    const publications = await response.json();
    
    // Get the container for publications
    const pubList = document.querySelector('.pub-list');
    
    // Clear the loader
    pubList.innerHTML = '';
    
    // Create all cards at once and add them in a single operation
    const fragment = document.createDocumentFragment();
    publications.forEach((pub, index) => {
      const card = createPublicationCard(pub, index);
      fragment.appendChild(card);
    });
    
    // Add all cards to DOM at once
    pubList.appendChild(fragment);
    
    // Animate cards with stagger effect
    requestAnimationFrame(() => {
      const cards = document.querySelectorAll('.publication-card');
      cards.forEach((card, index) => {
        setTimeout(() => {
          card.classList.add('opacity-100', 'translate-y-0');
          card.classList.remove('opacity-0', 'translate-y-8');
        }, index * 100);
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
  card.className = 'publication-card opacity-0 translate-y-8 transition-all duration-500 ease-out';
  
  card.innerHTML = `
    <a href="${pub.link}" target="_blank" rel="noopener noreferrer" 
       class="pub-card relative block h-full glass-dark rounded-xl overflow-hidden group card-hover border border-white/5 hover:border-white/20 transition-all">
      <!-- Image Section -->
      <div class="relative h-56 overflow-hidden bg-dark-800">
        ${pub.image ? 
          `<img src="${pub.image}" alt="${pub.title}" 
                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                loading="lazy" decoding="async" />` :
          `<div class="w-full h-full flex items-center justify-center">
            <div class="text-dark-600">
              <svg class="w-24 h-24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" 
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z">
                </path>
              </svg>
            </div>
          </div>`
        }
        <!-- Subtle Overlay -->
        <div class="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-transparent opacity-60"></div>
        
        <!-- Year Badge -->
        <div class="absolute top-4 right-4 glass-dark px-3 py-1 rounded-full text-sm font-semibold text-white border border-white/10">
          ${pub.year}
        </div>
      </div>
      
      <!-- Content Section -->
      <div class="p-6">
        <h4 class="text-lg font-semibold text-white mb-3 line-clamp-2 group-hover:text-gray-100 transition-colors">
          ${pub.title}
        </h4>
        
        <div class="flex items-center justify-between">
          <p class="text-sm text-gray-400 font-medium">
            ${pub.publication}
          </p>
          <div class="flex items-center text-gray-400 transition-all duration-300 group-hover:text-white group-hover:translate-x-2">
            <span class="text-sm font-medium mr-1">Read</span>
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
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
    <div class="col-span-full text-center py-16">
      <div class="inline-flex items-center justify-center w-20 h-20 rounded-full glass-dark mb-6">
        <svg class="w-10 h-10 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      </div>
      <h4 class="text-xl font-semibold text-white mb-3">Unable to load publications</h4>
      <p class="text-gray-400">Please try refreshing the page or check back later.</p>
      <button onclick="location.reload()" class="mt-6 px-6 py-2 rounded-lg glass-dark border border-white/10 hover:border-white/30 transition-all text-white">
        Refresh Page
      </button>
    </div>
  `;
}

// Add smooth scrolling for internal links
document.addEventListener('click', (e) => {
  const link = e.target.closest('a[href^="#"]');
  if (link) {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      const navHeight = 80;
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  }
});

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
  // Press 'P' to go to publications
  if (e.key === 'p' || e.key === 'P') {
    document.querySelector('#publications')?.scrollIntoView({ behavior: 'smooth' });
  }
  // Press 'C' to go to contact
  if (e.key === 'c' || e.key === 'C') {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  }
  // Press 'H' to go home
  if (e.key === 'h' || e.key === 'H') {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
});

// Line clamp fallback for browsers that don't support it
document.addEventListener('DOMContentLoaded', () => {
  // Check if line-clamp is supported
  const testEl = document.createElement('div');
  testEl.style.webkitLineClamp = '2';
  
  if (testEl.style.webkitLineClamp !== '2') {
    // Fallback for line clamping
    const clampElements = document.querySelectorAll('.line-clamp-2');
    clampElements.forEach(el => {
      const maxHeight = parseFloat(getComputedStyle(el).lineHeight) * 2;
      if (el.scrollHeight > maxHeight) {
        el.style.maxHeight = maxHeight + 'px';
        el.style.overflow = 'hidden';
      }
    });
  }
}); 