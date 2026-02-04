document.addEventListener('DOMContentLoaded', () => {
    const publicationsContainer = document.getElementById('publications-list');

    fetch('publications.json')
        .then(response => response.json())
        .then(data => {
            // Sort by year descending (assuming data might not be sorted)
            // If year is just a string number, this works. 
            // Ideally we'd have robust sorting, but this is simple.
            
            data.forEach(pub => {
                const pubLink = document.createElement('a');
                pubLink.href = pub.link;
                pubLink.className = 'pub-item';
                pubLink.target = "_blank";
                pubLink.rel = "noopener noreferrer";

                const title = document.createElement('span');
                title.className = 'pub-title';
                title.textContent = pub.title;

                const meta = document.createElement('div');
                meta.className = 'pub-meta';

                const venue = document.createElement('span');
                venue.textContent = pub.publication;

                const year = document.createElement('span');
                year.className = 'pub-year';
                year.textContent = pub.year;

                meta.appendChild(year);
                meta.appendChild(venue);

                pubLink.appendChild(title);
                pubLink.appendChild(meta);

                publicationsContainer.appendChild(pubLink);
            });
        })
        .catch(error => {
            console.error('Error loading publications:', error);
            publicationsContainer.innerHTML = '<p class="error">Unable to load publications.</p>';
        });
});
