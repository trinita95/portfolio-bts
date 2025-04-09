document.addEventListener('DOMContentLoaded', () => {
    
    // Filtrage des articles
    const filterButtons = document.querySelectorAll('.filter-button');
    const articleCards = document.querySelectorAll('.article-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Désactiver tous les boutons du même groupe
            const filterGroup = button.parentElement;
            filterGroup.querySelectorAll('.filter-button').forEach(btn => btn.classList.remove('active'));
            
            // Activer le bouton cliqué
            button.classList.add('active');

            // Trier les articles
            const filterType = button.dataset.filter;
            const orderDirection = button.dataset.order;
            
            sortArticles(filterType, orderDirection);
        });
    });

    // Fonction pour trier les articles
    function sortArticles(filterType, orderDirection) {
        const articlesGrid = document.getElementById('articlesGrid');
        const articles = Array.from(articlesGrid.children);
        
        articles.sort((a, b) => {
            let valueA, valueB;
            
            if (filterType === 'rating') {
                valueA = parseFloat(a.dataset.rating);
                valueB = parseFloat(b.dataset.rating);
            } else if (filterType === 'date') {
                valueA = new Date(a.dataset.date);
                valueB = new Date(b.dataset.date);
            }
            
            if (orderDirection === 'asc') {
                return valueA - valueB;
            } else {
                return valueB - valueA;
            }
        });
        
        // Réorganiser les articles dans le DOM
        articles.forEach(article => {
            articlesGrid.appendChild(article);
        });
    }

    // Gestion du modal
    const modal = document.getElementById('articleModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalDate = document.getElementById('modalDate');
    const modalRating = document.getElementById('modalRating');
    const modalContent = document.getElementById('modalContent');
    const modalTags = document.getElementById('modalTags');
    const modalSources = document.getElementById('modalSources');
    const closeModal = document.querySelector('.close-modal');

    // Base de données des articles
    const articlesData = {
        "Les systèmes ADAS dernière génération": {
            title: "Les systèmes ADAS dernière génération",
            date: "15 mars 2024",
            rating: 4.5,
            content: `
                <!-- Contenu à remplir -->
            `,
            tags: ["ADAS", "Sécurité", "IA"],
            sources: [
                { name: "Automotive News", url: "https://www.autonews.com/" },
                { name: "EE Times", url: "https://www.eetimes.com/" },
                { name: "Conférence AutoTech 2024", url: "#" }
            ]
        },
        "Les véhicules électriques et l'autonomie": {
            title: "Les véhicules électriques et l'autonomie",
            date: "28 février 2024",
            rating: 5,
            content: `
                <!-- Contenu à remplir -->
            `,
            tags: ["Électrique", "Batteries", "Autonomie"],
            sources: [
                { name: "Electrek", url: "https://electrek.co/" },
                { name: "InsideEVs", url: "https://insideevs.com/" },
                { name: "Rapport Tesla Q4 2023", url: "#" }
            ]
        },
        "CES 2024 : les innovations automobiles": {
            title: "CES 2024 : les innovations automobiles",
            date: "20 janvier 2024",
            rating: 3.5,
            content: `
                <!-- Contenu à remplir -->
            `,
            tags: ["CES", "Innovation", "Futur"],
            sources: [
                { name: "CNET", url: "https://www.cnet.com/" },
                { name: "TechCrunch", url: "https://techcrunch.com/" },
                { name: "The Verge", url: "https://www.theverge.com/" }
            ]
        },
        "L'intelligence artificielle dans les tableaux de bord": {
            title: "L'intelligence artificielle dans les tableaux de bord",
            date: "10 décembre 2023",
            rating: 4,
            content: `
                <!-- Contenu à remplir -->
            `,
            tags: ["IA", "Interface", "UX"],
            sources: [
                { name: "Wired", url: "https://www.wired.com/" },
                { name: "Automotive UI Conference", url: "#" },
                { name: "UX Design Institute", url: "https://www.uxdesigninstitute.com/" }
            ]
        },
        "Cybersécurité automobile : les défis": {
            title: "Cybersécurité automobile : les défis",
            date: "5 novembre 2023",
            rating: 4.5,
            content: `
                <!-- Contenu à remplir -->
            `,
            tags: ["Cybersécurité", "Sécurité", "Connectivité"],
            sources: [
                { name: "Automotive Cybersecurity Journal", url: "#" },
                { name: "Dark Reading", url: "https://www.darkreading.com/" },
                { name: "Conférence BlackHat 2023", url: "#" }
            ]
        },
        "5G et automobile : quel impact sur la mobilité?": {
            title: "5G et automobile : quel impact sur la mobilité?",
            date: "18 octobre 2023",
            rating: 3,
            content: `
                <!-- Contenu à remplir -->
            `,
            tags: ["5G", "V2X", "Connectivité"],
            sources: [
                { name: "IEEE Spectrum", url: "https://spectrum.ieee.org/" },
                { name: "5G Americas", url: "https://www.5gamericas.org/" },
                { name: "Étude Ericsson Mobility Report", url: "#" }
            ]
        }
    };

    // Fonction pour afficher les étoiles de notation
    function getStarsHTML(rating) {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;
        
        let starsHTML = '';
        
        // Ajouter les étoiles pleines
        for (let i = 0; i < fullStars; i++) {
            starsHTML += '★';
        }
        
        // Ajouter une demi-étoile si nécessaire
        if (hasHalfStar) {
            starsHTML += '<span class="half-star">★</span>';
        }
        
        // Ajouter les étoiles vides
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
        for (let i = 0; i < emptyStars; i++) {
            starsHTML += '☆';
        }
        
        return `<span class="stars">${starsHTML}</span> <span class="rating-value">${rating}/5</span>`;
    }

    // Ouvrir le modal lors du clic sur le bouton "Lire l'article"
    const detailsButtons = document.querySelectorAll('.btn-details');
    detailsButtons.forEach(button => {
        button.addEventListener('click', () => {
            const articleTitle = button.closest('.article-card').querySelector('h3').textContent;
            const articleData = articlesData[articleTitle];
            
            if (articleData) {
                // Remplir le modal avec les données de l'article
                modalTitle.textContent = articleData.title;
                modalDate.textContent = articleData.date;
                modalRating.innerHTML = getStarsHTML(articleData.rating);
                modalContent.innerHTML = articleData.content;
                
                // Remplir les tags
                modalTags.innerHTML = '';
                articleData.tags.forEach(tag => {
                    const span = document.createElement('span');
                    span.className = 'article-tag';
                    span.textContent = tag;
                    modalTags.appendChild(span);
                });
                
                // Remplir les sources
                modalSources.innerHTML = '';
                articleData.sources.forEach(source => {
                    const li = document.createElement('li');
                    const a = document.createElement('a');
                    a.href = source.url;
                    a.textContent = source.name;
                    a.target = "_blank"; // Ouvre dans un nouvel onglet
                    li.appendChild(a);
                    modalSources.appendChild(li);
                });
                
                // Afficher le modal
                modal.style.display = 'block';
                setTimeout(() => {
                    modal.classList.add('show');
                }, 10);
                document.body.style.overflow = 'hidden'; // Empêcher le défilement du body
            }
        });
    });
    
    // Fermer le modal
    closeModal.addEventListener('click', () => {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Réactiver le défilement
        }, 300);
    });
    
    // Fermer le modal en cliquant en dehors
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.classList.remove('show');
            setTimeout(() => {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }, 300);
        }
    });

    // Tri initial des articles par date (plus récents en premier)
    sortArticles('date', 'desc');
});