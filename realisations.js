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
            title: "Gest EPI",
            type: "school",
            tag: "Projet Scolaire",
            description: "Application de gestion des Équipements de Protection Individuelle (EPI) pour une entreprise. Le système permet de suivre l'attribution, les retours et les dates de péremption des équipements.",
            tech: "C#, SQL Server, WPF",
            duration: "3 mois",
            folderPath: "projets/gest-epi/",
            competences: [
                "Développement d'applications Windows",
                "Programmation orientée objet en C#",
                "Conception et implémentation d'une base de données relationnelle",
                "Création d'interfaces utilisateur avec WPF"
            ],
            documents: [
                { name: "Contexte", filename: "contexte.pdf" },
                { name: "Cahier des charges", filename: "cahier_des_charges.pdf" },
                { name: "Modèle de base de données", filename: "modele_bdd.pdf" },
                { name: "Captures d'écran du code", filename: "captures_code.pdf" },
                { name: "Aperçu du projet", filename: "apercu_projet.pdf" }
            ],
            gallery: [
                { filename: "accueil.jpg", alt: "Page d'accueil" },
                { filename: "gestion.jpg", alt: "Gestion des EPI" },
                { filename: "attribution.jpg", alt: "Attribution des EPI" }
            ]
        },
        2: {
            title: "Jojo Legion",
            type: "school",
            tag: "Projet Scolaire",
            description: "Développement d'un jeu vidéo 2D inspiré de l'univers de JoJo's Bizarre Adventure. Le joueur incarne un personnage qui doit affronter des ennemis en utilisant des pouvoirs spéciaux.",
            tech: "Unity, C#, SQLite",
            duration: "4 mois",
            folderPath: "projets/jojo-legion/",
            competences: [
                "Développement de jeux vidéo avec Unity",
                "Programmation C# pour les mécaniques de jeu",
                "Conception de niveaux et d'interfaces utilisateur",
                "Gestion de projet avec méthodologie agile"
            ],
            documents: [
                { name: "README", filename: "readme.pdf" },
                { name: "Charte graphique", filename: "charte_graphique.pdf" },
                { name: "Cahier des charges", filename: "cahier_des_charges.pdf" },
                { name: "Diagrammes", filename: "diagrammes.pdf" },
                { name: "Planning", filename: "planning.pdf" },
                { name: "Extrait de code", filename: "extrait_code.pdf" },
                { name: "Aperçu du projet", filename: "apercu_projet.pdf" }
            ],
            gallery: [
                { filename: "menu.jpg", alt: "Menu principal" },
                { filename: "combat.jpg", alt: "Scène de combat" },
                { filename: "personnage.jpg", alt: "Sélection de personnage" }
            ]
        },
        3: {
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
                { name: "Extrait de code", filename: "extrait_code_sdv.pdf" },
                { name: "Extrait de base de données", filename: "extrait_de_BDD.pdf" },
                { name: "Aperçu du projet", filename: "apercu_projet.pdf" }
            ],
            gallery: [
                { filename: "accueil.jpg", alt: "Page d'accueil" },
                { filename: "panier.jpg", alt: "Panier" },
                { filename: "admin.jpg", alt: "Interface d'administration" }
            ]
        },
        4: {
            title: "Text Adventure",
            type: "school",
            tag: "Projet Scolaire",
            description: "Jeu d'aventure textuel développé en Python où le joueur progresse à travers une histoire interactive en faisant des choix qui influencent le déroulement de l'aventure et les fins possibles.",
            tech: "Python, SQLite",
            duration: "2 mois",
            folderPath: "projets/text-adventure/",
            competences: [
                "Programmation Python",
                "Développement de systèmes de narration interactive",
                "Gestion d'états et de progression de jeu",
                "Test et débogage d'applications"
            ],
            documents: [
                { name: "Contexte", filename: "contexte.pdf" },
                { name: "Cahier des charges", filename: "cahier_des_charges.pdf" },
                { name: "Captures d'écran du code", filename: "captures_code.pdf" },
                { name: "Aperçu du projet", filename: "apercu_projet.pdf" }
            ],
            gallery: [
                { filename: "intro.jpg", alt: "Introduction du jeu" },
                { filename: "choix.jpg", alt: "Exemple de choix" },
                { filename: "fin.jpg", alt: "Une des fins possibles" }
            ]
        },
        5: {
            title: "Optimisation du logiciel interne de l'entreprise ",
            type: "pro",
            tag: "Projet Professionnel",
            description: "Optimisation des performances et de l’ergonomie d’un logiciel interne pour améliorer l’efficacité des utilisateurs.",
            tech: "Django",
            duration: "1 mois",
            folderPath: "projets/interface-gestion/",
            competences: [
                "Gérer le patrimoine informatique",
                "Travailler en mode projet",
                "Organiser son développement professionnel",
                "Optimisation des performances pour le chargement des documents"
            ],
            documents: [
                
            ],
            gallery: [
                { filename: "1", alt: "1" },
                { filename: "2", alt: "2" },
                { filename: "3", alt: "3" }
            ]
        },
        6: {
            title: "Mission de sondage",
            type: "pro",
            tag: "Projet Professionnel",
            description: ">Développement d'une interface de sondage dans le cadre du développement des outils de l'entreprise.",
            tech: "HTML, CSS, JavaScript",
            duration: "3 mois",
            folderPath: "projets/plateforme-sondage/",
            competences: [
                "Travailler en mode projet",
                "Mettre à disposition des utilisateurs un service informatique",
            ],
            documents: [
                { name: "Cahier des charges", filename: "document/cdc_sondages.pdf" },
                { name: "Planning", filename: "document/planning_sondage.png" }
            ],
            gallery: [
                { filename: "1", alt: "documents/cdc_sondages" },
                { filename: "2", alt: "aperçu" },
                { filename: "3", alt: "message de lancement" },
            ]
        },
        7: {
            title: "Refonte graphique de l'application mobile",
            type: "pro",
            tag: "Projet Professionnel",
            description: "Refonte graphique de l'application mobile",
            tech: "Python, Django",
            duration: "3 mois",
            folderPath: "projets/monitoring-reseau/",
            competences: [
                "Gérer le patrimoine informatique",
                "Répondre aux incidents et aux demandes d’assistance et d’évolution",
                "Travailler en mode projet",
            ],
            documents: [
                { name: "Cahier des charges", filename: "document/cdc_ref.pdf" },
                { name: "Charte graphique de l'entreprise", filename: "document/charte_graphique_flex.pdf" },
                { name: "Planning", filename: "document/planning_ref.png" }
            ],
            gallery: [
                { filename: "1", alt: "1" },
                { filename: "2", alt: "2" },
                { filename: "3", alt: "3" }
            ]
        },
        8: {
            title: "Section utilisateur Application mobile",
            type: "pro",
            tag: "Projet Professionnel",
            description: "Maquette d'une section de l'application mobile permettant aux employés de consulter leurs fiches de paie et autres documents liés à l'entreprise (attestation France Travail)",
            tech: "HTML, CSS, JavaScript",
            duration: "2 semaines",
            folderPath: "projets/app-rh/",
            competences: [
                "Gérer le patrimoine informatique",
                "Répondre aux incidents et aux demandes d’assistance et d’évolution",
                "Travailler en mode projet",

            ],
            documents: [
                { name: "Cahier des charges", filename: "document/cdc_section_utilisateur.pdf" },
                { name: "Planning", filename: "document/planning_section_u.png" }
            ],
            gallery: [
                { filename: "screen 1", alt: "Écran de connexion" },
                { filename: "2", alt: "Gestion des congés" },
            
            ]
        },
        9: {
            title: "Mise en conformité RGPD",
            type: "pro",
            tag: "Projet Professionnel",
            description: "Mise à jour du registre de traitement de données de l'entreprise",
            tech: "Pas de technologies utilisées",
            duration: "2 mois",
            folderPath: "projets/portail-b2b/",
            competences: [
                "Gérer le patrimoine informatique",
                "Organiser son développement professionnel",
            
            ],
            documents: [
                
            ],
            gallery: [
                { filename: "extrait de registre", alt: "extrait de registre" },
               
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
                    a.target = "_blank";
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




a.href = getDocumentPath(projectData, doc.filename);
a.textContent = doc.name;
a.download = ''; // Permet de télécharger le fichier
a.target = "_blank"; // Ouvre dans un nouvel onglet
