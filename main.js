// Load publications from JSON
fetch('publications.json')
    .then(response => response.json())
    .then(publications => {
        const container = document.getElementById('publications-list');
        
        publications.forEach(pub => {
            const pubDiv = document.createElement('div');
            pubDiv.className = 'publication';
            
            const title = document.createElement('div');
            title.className = 'publication-title';
            if (pub.link) {
                title.innerHTML = `<a href="${pub.link}" target="_blank">${pub.title}</a>`;
            } else {
                title.textContent = pub.title;
            }
            
            const venue = document.createElement('div');
            venue.className = 'publication-venue';
            
            // Format venue text: "Conference, Year" or "Conference" depending on data
            // We wrap the conference name in a specific span for styling
            let venueText = pub.publication;
            if (pub.publication === 'arXiv') {
                 venue.innerHTML = `<span class="venue-badge submission">Under Submission</span> <span class="venue-year">${pub.year}</span>`;
            } else {
                 // Check for "Best Paper" or other special notes to style differently if needed
                 // For now, assume format is just Venue Name
                 venue.innerHTML = `<span class="venue-badge">${pub.publication}</span> <span class="venue-year">${pub.year}</span>`;
            }
            
            pubDiv.appendChild(title);
            pubDiv.appendChild(venue);
            container.appendChild(pubDiv);
        });
    })
    .catch(error => {
        console.error('Error loading publications:', error);
        document.getElementById('publications-list').innerHTML = '<p>Error loading publications.</p>';
    });