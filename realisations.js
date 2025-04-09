document.addEventListener('DOMContentLoaded', () => {
    
    // Filtrage des projets
    const filterButtons = document.querySelectorAll('.filter-button');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Désactiver tous les boutons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Activer le bouton cliqué
            button.classList.add('active');

            // Filtrer les projets
            const filter = button.dataset.filter;

            projectCards.forEach(card => {
                if (filter === 'all' || card.dataset.type === filter) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Gestion du modal
    const modal = document.getElementById('projectModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalTag = document.getElementById('modalTag');
    const modalDescription = document.getElementById('modalDescription');
    const modalTech = document.getElementById('modalTech');
    const modalDuration = document.getElementById('modalDuration');
    const modalCompetences = document.getElementById('modalCompetences');
    const modalDocuments = document.getElementById('modalDocuments');
    const modalGallery = document.getElementById('modalGallery');
    const closeModal = document.querySelector('.close-modal');

    // Base de données des projets avec chemins vers les dossiers dédiés
    const projectsData = {
        1: {
            title: "Site de vente",
            type: "school",
            tag: "Projet Scolaire",
            description: "Site web de vente en ligne complet avec système de panier, gestion des utilisateurs et interface d'administration. Ce projet a été réalisé dans le cadre de ma formation BTS SIO pour mettre en pratique les connaissances en développement web backend.",
            tech: "PHP, MySQL, HTML, CSS, JavaScript",
            duration: "3 mois",
            folderPath: "projets/site-vente/",
            competences: [
                "Développement d'une architecture MVC",
                "Gestion des sessions utilisateurs",
                "Conception et implémentation d'une base de données",
                "Sécurisation des données (prévention des injections SQL)"
            ],
            documents: [
                { name: "Cahier des charges", filename: "cahier_charges.pdf" },
                { name: "Documentation technique", filename: "doc_technique.pdf" },
                { name: "Rapport de projet", filename: "rapport.pdf" },
                { name: "Code source (ZIP)", filename: "code_source.zip" }
            ],
            gallery: [
                { filename: "accueil.jpg", alt: "Page d'accueil" },
                { filename: "panier.jpg", alt: "Panier" },
                { filename: "admin.jpg", alt: "Interface d'administration" }
            ]
        },
        2: {
            title: "Interface de gestion documentaire",
            type: "pro",
            tag: "Projet Professionnel",
            description: "Application web permettant aux employés d'accéder à leurs documents administratifs (fiches de paie, congés, etc.) de manière sécurisée. L'interface offre également un système de notification pour les nouveaux documents disponibles.",
            tech: "HTML, CSS, JavaScript, PHP, MySQL",
            duration: "4 mois",
            folderPath: "projets/interface-gestion/",
            competences: [
                "Développement d'une interface utilisateur intuitive",
                "Mise en place d'un système d'authentification sécurisé",
                "Gestion des droits d'accès par type d'utilisateur",
                "Optimisation des performances pour le chargement des documents"
            ],
            documents: [
                { name: "Spécifications fonctionnelles", filename: "specifications.pdf" },
                { name: "Manuel utilisateur", filename: "manuel_utilisateur.pdf" },
                { name: "Présentation client", filename: "presentation.pdf" }
            ],
            gallery: [
                { filename: "dashboard.jpg", alt: "Tableau de bord" },
                { filename: "documents.jpg", alt: "Liste des documents" },
                { filename: "profil.jpg", alt: "Page de profil" }
            ]
        },
        3: {
            title: "Plateforme de sondage",
            type: "pro",
            tag: "Projet Professionnel",
            description: "Développement d'une application web permettant de créer et diffuser des sondages en interne. L'outil intègre un système d'analyse des résultats avec génération de graphiques et export des données.",
            tech: "HTML, CSS, JavaScript, Node.js, MongoDB",
            duration: "2 mois",
            folderPath: "projets/plateforme-sondage/",
            competences: [
                "Conception d'API RESTful",
                "Développement frontend avec JavaScript moderne",
                "Intégration de bibliothèques de visualisation de données",
                "Déploiement sur une architecture cloud"
            ],
            documents: [
                { name: "Présentation du projet", filename: "presentation.pdf" },
                { name: "Documentation API", filename: "api_documentation.pdf" },
                { name: "Guide d'utilisation", filename: "guide_utilisation.pdf" },
                { name: "Rapport technique", filename: "rapport_technique.pdf" }
            ],
            gallery: [
                { filename: "creation.jpg", alt: "Création de sondage" },
                { filename: "resultats.jpg", alt: "Résultats" },
                { filename: "statistiques.jpg", alt: "Statistiques" },
                { filename: "export.jpg", alt: "Export de données" }
            ]
        },
        4: {
            title: "Application de gestion des stocks",
            type: "school",
            tag: "Projet Scolaire",
            description: "Application Java permettant de gérer les stocks d'une entreprise fictive, avec système de facturation automatique et génération de rapports. Le projet inclut une interface graphique intuitive et une base de données relationnelle.",
            tech: "Java, MySQL, JavaFX",
            duration: "2 mois",
            folderPath: "projets/gestion-stocks/",
            competences: [
                "Programmation orientée objet",
                "Développement d'interfaces graphiques en JavaFX",
                "Gestion de base de données relationnelle",
                "Mise en place de tests unitaires"
            ],
            documents: [
                { name: "Cahier des charges", filename: "cahier_charges.pdf" },
                { name: "Diagramme de classes", filename: "diagramme_classes.pdf" },
                { name: "Manuel d'utilisation", filename: "manuel.pdf" },
                { name: "Rapport de projet", filename: "rapport.pdf" },
                { name: "Code source (ZIP)", filename: "source_code.zip" }
            ],
            gallery: [
                { filename: "main.jpg", alt: "Interface principale" },
                { filename: "produits.jpg", alt: "Gestion des produits" },
                { filename: "factures.jpg", alt: "Système de facturation" }
            ]
        }
    };

    // Fonction pour construire les chemins complets des fichiers
    function getDocumentPath(projectData, filename) {
        return projectData.folderPath + "documents/" + filename;
    }

    function getImagePath(projectData, filename) {
        return projectData.folderPath + "images/" + filename;
    }

    // Ouvrir le modal lors du clic sur le bouton "Voir les détails"
    const detailsButtons = document.querySelectorAll('.btn-details');
    detailsButtons.forEach(button => {
        button.addEventListener('click', () => {
            const projectId = button.closest('.project-card').dataset.id;
            const projectData = projectsData[projectId];
            
            if (projectData) {
                // Remplir le modal avec les données du projet
                modalTitle.textContent = projectData.title;
                modalTag.textContent = projectData.tag;
                modalTag.className = `project-tag tag-${projectData.type}`;
                modalDescription.textContent = projectData.description;
                modalTech.textContent = projectData.tech;
                modalDuration.textContent = projectData.duration;
                
                // Remplir les compétences
                modalCompetences.innerHTML = '';
                projectData.competences.forEach(competence => {
                    const li = document.createElement('li');
                    li.textContent = competence;
                    modalCompetences.appendChild(li);
                });
                
                // Remplir les documents avec les chemins corrects
                modalDocuments.innerHTML = '';
                projectData.documents.forEach(doc => {
                    const li = document.createElement('li');
                    const a = document.createElement('a');
                    a.href = getDocumentPath(projectData, doc.filename);
                    a.textContent = doc.name;
                    a.download = ''; // Permet de télécharger le fichier
                    a.target = "_blank"; // Ouvre dans un nouvel onglet
                    li.appendChild(a);
                    modalDocuments.appendChild(li);
                });
                
                // Remplir la galerie avec les chemins corrects
                modalGallery.innerHTML = '';
                projectData.gallery.forEach(image => {
                    const div = document.createElement('div');
                    div.className = 'gallery-item';
                    const img = document.createElement('img');
                    img.src = getImagePath(projectData, image.filename);
                    img.alt = image.alt;
                    
                    // Ajouter la fonctionnalité de zoom sur l'image au clic
                    div.addEventListener('click', () => {
                        const fullImg = document.createElement('div');
                        fullImg.className = 'fullscreen-image';
                        const imgElement = document.createElement('img');
                        imgElement.src = img.src;
                        fullImg.appendChild(imgElement);
                        
                        // Ajouter un bouton de fermeture
                        const closeBtn = document.createElement('span');
                        closeBtn.className = 'close-fullscreen';
                        closeBtn.innerHTML = '&times;';
                        closeBtn.addEventListener('click', (e) => {
                            e.stopPropagation();
                            document.body.removeChild(fullImg);
                        });
                        fullImg.appendChild(closeBtn);
                        
                        // Fermer l'image plein écran en cliquant dessus
                        fullImg.addEventListener('click', () => {
                            document.body.removeChild(fullImg);
                        });
                        
                        document.body.appendChild(fullImg);
                    });
                    
                    div.appendChild(img);
                    modalGallery.appendChild(div);
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
});