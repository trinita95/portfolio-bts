// veille.js - version complète avec 10 articles (2024–2025)

document.addEventListener('DOMContentLoaded', () => {
    const articlesData = [
        {
            title: "Ce que l'on peut attendre des voitures autonomes en 2024",
            date: "2024-01-13",
            rating: 4,
            content: "Un tour d’horizon des avancées attendues en matière de véhicules autonomes en 2024, incluant XPeng, ZEEKR, Mercedes...",
            tags: ["Véhicules autonomes", "Robotaxi", "Niveau 3"],
            source: { name: "Voiture-Autonome.net", url: "https://www.voiture-autonome.net/constructeurs/promesses-voiture-autonome-2024.html" }
        },
        {
            title: "L'intelligence artificielle, moteur de la transformation de l'automobile",
            date: "2024-06-19",
            rating: 5,
            content: "Un panorama sur le rôle central de l'IA dans la révolution du secteur automobile...",
            tags: ["IA", "Sécurité", "Assistants virtuels"],
            source: { name: "BNP Paribas", url: "https://group.bnpparibas/actualite/lintelligence-artificielle-moteur-de-la-transformation-de-lautomobile" }
        },
        {
            title: "Voiture électrique : des batteries avec 1000 km d'autonomie dès 2024 ?",
            date: "2024-07-18",
            rating: 4.5,
            content: "Envision AESC promet des batteries de 1000 km d'autonomie, mais des défis techniques demeurent...",
            tags: ["Électrique", "Batteries", "Autonomie"],
            source: { name: "IZI by EDF", url: "https://izi-by-edf.fr/blog/voiture-electrique-autonomie-2024/" }
        },
        {
            title: "Le C-V2X franchit une nouvelle étape aux États-Unis",
            date: "2024-11-25",
            rating: 4,
            content: "La FCC valide l’usage du C-V2X sur les routes américaines pour des communications véhicules-infrastructures...",
            tags: ["Connectivité", "5G", "V2X"],
            source: { name: "LightReading", url: "https://www.lightreading.com/iot/c-v2x-with-5g-specs-takes-another-step-forward-in-the-us-/d/d-id/784190" }
        },
        {
            title: "Cyberattaques : 4 dangers à la borne de recharge",
            date: "2025-03-08",
            rating: 5,
            content: "Focus sur les risques de cybersécurité rencontrés par les véhicules électriques lors de la recharge publique...",
            tags: ["Cybersécurité", "Recharge", "Voiture connectée"],
            source: { name: "Le Figaro", url: "https://www.lefigaro.fr/automobile/cyberattaques-4-dangers-auxquels-s-expose-un-vehicule-electrique-en-train-de-charger-a-la-borne-20250308" }
        },
        {
            title: "Les systèmes d’aide à la conduite de plus en plus répandus (rapport 2024)",
            date: "2024-10-02",
            rating: 4.5,
            content: "Un rapport montre que les systèmes ADAS comme l'AEB ou le maintien de voie se généralisent sur les nouveaux véhicules...",
            tags: ["ADAS", "Sécurité", "Statistiques"],
            source: { name: "MITRE", url: "https://www.mitre.org/news-insights/news-release/advanced-driver-assistance-systems-continue-expand-new-report-shows" }
        },
        {
            title: "CES 2024 : les nouveautés automobiles à retenir",
            date: "2024-01-10",
            rating: 4,
            content: "Tour d'horizon des innovations présentées par Volkswagen, Mercedes, BMW et autres au CES 2024...",
            tags: ["CES2024", "IA", "Interface"],
            source: { name: "Euromaster Blog", url: "https://blog.euromaster.fr/actualite/les-dernieres-tendances-automobiles-au-ces-las-vegas-2024" }
        },
        {
            title: "Mercedes expérimente une batterie semi-solide offrant 1000 km d’autonomie",
            date: "2025-03-12",
            rating: 5,
            content: "Mercedes teste une batterie lithium-métal semi-solide en conditions réelles sur son modèle EQS...",
            tags: ["Batterie", "Solide", "Innovation"],
            source: { name: "IEEE Spectrum", url: "https://spectrum.ieee.org/mercedes-benz" }
        },
        {
            title: "GM abandonne le déploiement de ses taxis autonomes Cruise",
            date: "2024-12-11",
            rating: 4,
            content: "General Motors met fin à son projet de robotaxis Cruise après 10 milliards d'investissements...",
            tags: ["Véhicules autonomes", "Robotaxi", "Cruise"],
            source: { name: "Reuters", url: "https://www.reuters.com/business/autos-transportation/general-motors-drop-development-cruise-robotaxi-2024-12-10/" }
        },
        {
            title: "Votre voiture électrique à l’arrêt vous fera gagner de l’argent !",
            date: "2025-03-10",
            rating: 4.5,
            content: "Le V2G permet aux voitures électriques de renvoyer de l'électricité vers le réseau et générer un revenu passif...",
            tags: ["V2G", "Électrique", "Énergie"],
            source: { name: "Vroom.be", url: "https://www.vroom.be/fr/information/dormir-riche-avec-v2g" }
        }
    ];

    const articlesGrid = document.getElementById('articlesGrid');

    articlesData.forEach(article => {
        const card = document.createElement('div');
        card.className = 'article-card';
        card.dataset.rating = article.rating;
        card.dataset.date = article.date;

        card.innerHTML = `
            <div class="article-header">
                <h3>${article.title}</h3>
                <div class="article-meta">
                    <div class="article-date">${formatDate(article.date)}</div>
                    <div class="article-rating">${getStarsHTML(article.rating)}</div>
                </div>
            </div>
            <div class="article-content">
                <p>${article.content}</p>
                <div class="article-tags">
                    ${article.tags.map(tag => `<span class="article-tag">${tag}</span>`).join('')}
                </div>
            </div>
            <div class="article-footer">
                <a href="${article.source.url}" target="_blank" class="btn-details">Lire l'article</a>
            </div>
        `;

        articlesGrid.appendChild(card);
    });

    // Filtres de tri
    const filterButtons = document.querySelectorAll('.filter-button');
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const group = button.parentElement;
            group.querySelectorAll('.filter-button').forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterType = button.dataset.filter;
            const order = button.dataset.order;
            sortArticles(filterType, order);
        });
    });

    function sortArticles(type, order) {
        const articles = Array.from(document.querySelectorAll('.article-card'));
        articles.sort((a, b) => {
            let valA = a.dataset[type];
            let valB = b.dataset[type];

            if (type === 'date') {
                valA = new Date(valA);
                valB = new Date(valB);
            } else {
                valA = parseFloat(valA);
                valB = parseFloat(valB);
            }

            return order === 'asc' ? valA - valB : valB - valA;
        });

        articles.forEach(article => {
            articlesGrid.appendChild(article);
        });
    }

    function formatDate(dateStr) {
        const d = new Date(dateStr);
        return d.toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' });
    }

    function getStarsHTML(rating) {
        const fullStars = Math.floor(rating);
        const halfStar = rating % 1 !== 0;
        const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

        return `<span class="stars">${'★'.repeat(fullStars)}${halfStar ? '<span class="half-star">★</span>' : ''}${'☆'.repeat(emptyStars)}</span><span class="rating-value">${rating}/5</span>`;
    }
});
