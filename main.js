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
            
            // Check if it's an arXiv paper
            if (pub.publication === 'arXiv') {
                venue.innerHTML = `<span class="in-submission">Under Submission</span>, ${pub.year}`;
            } else if (pub.publication.includes('Best Paper')) {
                venue.textContent = `${pub.publication}, ${pub.year}`;
            } else {
                venue.textContent = `${pub.publication}, ${pub.year}`;
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