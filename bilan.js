/**
 * SCRIPT.JS
 * Script interactif pour le bilan de compétences
 * Generated by AI - Mars 2025
 */

// Attendre le chargement du DOM
document.addEventListener('DOMContentLoaded', function() {
    // Variables globales
    const body = document.body;
    const sections = document.querySelectorAll('.section');
    const skillItems = document.querySelectorAll('.skill-item');
    const fadeElements = document.querySelectorAll('.fade-in');
    const accordionItems = document.querySelectorAll('.accordion-item');
    const themeSwitch = document.getElementById('theme-switch');
    const closeBanner = document.querySelector('.close-banner');
    const iaBanner = document.querySelector('.ia-banner');
    
    // === Initialisation ===
    initTheme();
    animateTypingText();
    initScrollEffects();
    initAccordion();
    initTimeline();
    
    // Écouteurs d'événements
    window.addEventListener('scroll', handleScroll);
    themeSwitch.addEventListener('click', toggleTheme);
    closeBanner.addEventListener('click', closeBannerHandler);
    
    // === Fonction d'initialisation du thème ===
    function initTheme() {
        // Vérifier si un thème est stocké dans localStorage
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            body.setAttribute('data-theme', savedTheme);
        } else {
            // Par défaut, utiliser le thème clair
            body.setAttribute('data-theme', 'light');
        }
    }
    
    // === Fonction pour basculer entre le thème clair et sombre ===
    function toggleTheme() {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Animation du bouton
        themeSwitch.classList.add('animate-switch');
        setTimeout(() => {
            themeSwitch.classList.remove('animate-switch');
        }, 500);
    }
    
    // === Fermeture de la bannière IA ===
    function closeBannerHandler() {
        iaBanner.classList.add('hidden');
        // Ajuster la position du toggle de thème
        document.querySelector('.theme-toggle').style.top = '20px';
        // Ajuster la marge supérieure du header
        document.querySelector('header').style.marginTop = '0';
    }
    
    // === Animation de texte en machine à écrire ===
    function animateTypingText() {
        const typingElement = document.getElementById('typing-text');
        if (!typingElement) return;
        
        const text = typingElement.textContent;
        typingElement.textContent = '';
        
        let i = 0;
        const typingSpeed = 30; // ms par caractère
        
        function typeWriter() {
            if (i < text.length) {
                typingElement.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, typingSpeed);
            }
        }
        
        setTimeout(() => {
            typeWriter();
        }, 500);
    }
    
    // === Initialisation des effets au scroll ===
    function initScrollEffects() {
        // Initialiser les barres de compétences à 0
        skillItems.forEach(item => {
            const progress = item.querySelector('.skill-progress');
            const level = item.getAttribute('data-level');
            progress.style.width = '0%';
        });
        
        // Initialiser les éléments fade-in
        fadeElements.forEach(element => {
            element.classList.remove('visible');
        });
        
        // Déclencher le premier check au chargement
        handleScroll();
    }
    
    // === Gestion du scroll ===
    function handleScroll() {
        // Animer les éléments au scroll
        animateElementsOnScroll();
        
        // Animer les barres de compétences lorsqu'elles sont visibles
        animateSkillBars();
    }
    
    // === Animation des éléments au scroll ===
    function animateElementsOnScroll() {
        const triggerBottom = window.innerHeight * 0.8;
        
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < triggerBottom) {
                element.classList.add('visible');
            }
        });
    }
    
    // === Animation des barres de compétences ===
    function animateSkillBars() {
        skillItems.forEach(item => {
            const elementTop = item.getBoundingClientRect().top;
            const triggerBottom = window.innerHeight * 0.8;
            
            if (elementTop < triggerBottom) {
                const progress = item.querySelector('.skill-progress');
                const level = item.getAttribute('data-level');
                
                // Animer la barre de progression
                setTimeout(() => {
                    progress.style.width = level + '%';
                }, 200);
            }
        });
    }
    
    // === Initialisation de l'accordéon ===
    function initAccordion() {
        accordionItems.forEach(item => {
            const header = item.querySelector('.accordion-header');
            
            header.addEventListener('click', () => {
                // Fermer tous les autres éléments
                accordionItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // Basculer l'état actif
                item.classList.toggle('active');
            });
        });
    }
    
    // === Initialisation de la timeline ===
    function initTimeline() {
        const timelineItems = document.querySelectorAll('.timeline-item');
        
        timelineItems.forEach((item, index) => {
            // Ajouter un délai croissant pour chaque élément
            setTimeout(() => {
                item.style.opacity = '1';
            }, 300 * index);
        });
    }
});

// === Animation au chargement de la page ===
window.addEventListener('load', function() {
    // Ajouter une classe au body pour déclencher les animations d'entrée
    document.body.classList.add('page-loaded');
    
    // Animation du header
    const header = document.querySelector('header');
    header.classList.add('animate-header');
    
    // Animer l'apparition des sections
    const sections = document.querySelectorAll('.section');
    sections.forEach((section, index) => {
        setTimeout(() => {
            section.classList.add('visible');
        }, 200 * index);
    });
});

// === Utilitaires d'animation ===
/**
 * Fonction pour créer une animation de défilement fluide
 * @param {string} targetId - L'ID de l'élément cible
 */
function smoothScroll(targetId) {
    const target = document.querySelector(targetId);
    if (!target) return;
    
    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;
    
    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const duration = 1000; // durée en ms
        
        const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        
        if (timeElapsed < duration) {
            requestAnimationFrame(animation);
        }
    }
    
    // Fonction d'easing
    function easeInOutQuad(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }
    
    requestAnimationFrame(animation);
}

// Ajouter des écouteurs d'événements pour les liens d'ancrage
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        smoothScroll(targetId);
    });
});