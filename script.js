// script.js - DÜZELTİLMİŞ VERSİYON

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function () {
    console.log('Portfolio loaded successfully!');

    // Initialize all systems
    initThemeSystem();
    initMobileMenu();
    initSmoothScroll();
    initContactForm();
    initScrollAnimations();
    initLanguageSystem(); // Dil sistemini en son başlat
});

// Theme System
function initThemeSystem() {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle?.querySelector('.theme-icon');

    if (!themeToggle || !themeIcon) {
        console.warn('Theme toggle elements not found');
        return;
    }

    // Check for saved theme or prefer color scheme
    const savedTheme = localStorage.getItem('theme') ||
        (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

    // Apply saved theme
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    // Theme toggle event
    themeToggle.addEventListener('click', function () {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';

        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });

    function updateThemeIcon(theme) {
        themeIcon.textContent = theme === 'light' ? '🌙' : '☀️';
    }
}

class TextCycler {
    constructor(options) {
        this.element = document.querySelector(options.selector);
        this.texts = options.texts || ['guwanchmyrat'];
        this.speed = options.speed || 2000; // ms
        this.currentIndex = 0;
        this.isTyping = options.effect === 'typewriter';
        this.typeSpeed = options.typeSpeed || 100;
        
        if (this.element && this.texts.length > 1) {
            this.init();
        }
    }
    
    init() {
        if (this.isTyping) {
            this.startTypewriter();
        } else {
            this.startSimpleCycle();
        }
    }
    
    startSimpleCycle() {
        // İlk metni göster
        this.updateText();
        
        // Interval ile değiştir
        setInterval(() => {
            this.currentIndex = (this.currentIndex + 1) % this.texts.length;
            this.updateText();
        }, this.speed);
    }
    
    startTypewriter() {
        this.typeWriter();
    }
    
    updateText() {
        this.element.textContent = this.texts[this.currentIndex];
        
        // Küçük bir animasyon efekti
        this.element.style.opacity = '0';
        setTimeout(() => {
            this.element.style.opacity = '1';
        }, 50);
    }
    
    typeWriter() {
        let text = this.texts[this.currentIndex];
        let i = 0;
        let typing = true;
        
        const type = () => {
            if (typing) {
                if (i < text.length) {
                    this.element.textContent = text.substring(0, i + 1);
                    i++;
                    setTimeout(type, this.typeSpeed);
                } else {
                    typing = false;
                    setTimeout(() => {
                        type(); // Silme işlemine geç
                    }, 1000);
                }
            } else {
                if (i > 0) {
                    this.element.textContent = text.substring(0, i - 1);
                    i--;
                    setTimeout(type, this.typeSpeed / 2);
                } else {
                    typing = true;
                    this.currentIndex = (this.currentIndex + 1) % this.texts.length;
                    text = this.texts[this.currentIndex];
                    setTimeout(type, 500);
                }
            }
        };
        
        type();
    }
}

class NameCycler {
    constructor() {
        this.nameElement = document.querySelector('.text-primary');
        this.subtitleElement = document.querySelector('.hero-subtitle');
        
        this.roles = [
            "Guwanchmyrat Annayew",
            " Frontend Developer",
            " Web Designer",
            " JavaScript Developer",
            " UI/UX Enthusiast"
        ];
        
        
        this.currentIndex = 0;
        this.isDeleting = false;
        this.text = '';
        this.typeSpeed = 100;
        this.deleteSpeed = 50;
        this.pauseTime = 1500;
        
        if (this.nameElement) {
            this.init();
        }
    }
    
    init() {
        setTimeout(() => this.typeWriter(), 1000);

        if (this.subtitleElement) {
            this.cycleSubtitles();
        }
    }
    
    typeWriter() {
        const fullText = this.roles[this.currentIndex];
        
        if (this.isDeleting) {
            this.text = fullText.substring(0, this.text.length - 1);
        } else {
            this.text = fullText.substring(0, this.text.length + 1);
        }
        
        this.nameElement.textContent = this.text;
        
        let speed = this.isDeleting ? this.deleteSpeed : this.typeSpeed;
        
        if (!this.isDeleting && this.text === fullText) {
            speed = this.pauseTime;
            this.isDeleting = true;
        } else if (this.isDeleting && this.text === '') {
            this.isDeleting = false;
            this.currentIndex = (this.currentIndex + 1) % this.roles.length;
            speed = 500;
        }
        
        setTimeout(() => this.typeWriter(), speed);
    }
    
    cycleSubtitles() {
        let subIndex = 1; 
        
        setInterval(() => {
            this.subtitleElement.style.opacity = '0';
            
            setTimeout(() => {
                this.subtitleElement.textContent = this.subtitles[subIndex];
                this.subtitleElement.style.opacity = '1';
                subIndex = (subIndex + 1) % this.subtitles.length;
            }, 300);
            
        }, 4000);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const nameCycler = new NameCycler();
});


// Mobile Menu
function initMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navMenu = document.querySelector('.nav-menu');

    if (!mobileMenuToggle || !navMenu) {
        console.warn('Mobile menu elements not found');
        return;
    }

    mobileMenuToggle.addEventListener('click', function () {
        navMenu.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking on links
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
        });
    });
}

// Smooth Scroll
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);

            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Contact Form
function initContactForm() {
    const contactForm = document.querySelector('.contact-form');

    if (!contactForm) {
        console.warn('Contact form not found');
        return;
    }

    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Form validation
        const name = this.querySelector('input[name="name"]').value.trim();
        const email = this.querySelector('input[name="email"]').value.trim();
        const message = this.querySelector('textarea[name="message"]').value.trim();

        if (!name || !email || !message) {
            showNotification('Please fill in all fields.', 'error');
            return;
        }

        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address.', 'error');
            return;
        }

        // Simulate form submission
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;

        submitBtn.textContent = 'Gönderiliyor...';
        submitBtn.disabled = true;

        setTimeout(() => {
            showNotification('Your message has been sent successfully! I will get back to you as soon as possible.', 'success');
            this.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all sections for scroll animation
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    // Active Navigation Link Highlight
    function highlightActiveNavLink() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-menu a');

        let currentSection = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', highlightActiveNavLink);
}

// Notification System
function showNotification(message, type) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;

    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 12px 20px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;

    if (type === 'success') {
        notification.style.background = '#10b981';
    } else {
        notification.style.background = '#ef4444';
    }

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

// Language System 
let currentLanguage = 'tr';
const translations = {
    "tr": {
        "nav": {
            "home": "Baş sahypa",
            "about": "Özüm hakda",
            "skills": "Başarnyklar",
            "projects": "Taslamalar",
            "contact": "Habarlaşmak"
        },
        "hero": {
            "title": "Salam men",
            "subtitle": "Frontend Developer",
            "description": "Men ulanyjynyň tejribesini hemişe ileri tutup, häzirki zaman web tehnologiýalary bilen arassa kod arkaly täsirli dizaýnlary döredýärin.",
            "projectsBtn": "Taslamalarymy görüň",
            "contactBtn": "Habarlaşyň"
        },
        "about": {
            "title": "Özüm hakda",
            "description": "Döwrebap tehnologiýalar bilen gyzyklanýan we yzygiderli öwrenmäge höwesli developer. Esasy maksadym arassa kod ýazmak we ulanyjylar üçin iň amatly interfeýsi (UI) döretmek",
            "projectsCompleted": "Tamamlanan Proýektler",
            "yearsExperience": "Tejribäm (ýyl)",
            "technologies": "Ulanýan tehnologiýalarym",
            "downloadCV": "📄 CV-mi ýükle"
        },
        "skills": {
            "title": "Ukyplarym",
            "frontend": "Frontend",
            "tools": "'Tools'-larym",
            "other": "Beýlekiler"
        },
        "projects": {
            "title": "Taslamalarym",
            "project1": {
                "title": "E-söwda saýdy",
                "description": "Häzirki zaman HTML, CSS we JavaScript dilleri ulanylan elektron söwda sahypasy. Aýratynlyklary: sahypadaky zakaz edilýän önümleriň hasaba alyş sebediniň işleýiş ykjamlylygy, harytlaryň filtrlenmegi, interfeýs panelleriniň ulanyja bolan amatlylygy"
            },
            "project2": {
                "title": "Howa Maglumaty",
                "description": "Howa maglumatyny janly görkezýän ulanyjy üçin amatly howa programmasy. API integrasiýasy we geolokasiýa mümkinçilikleri ornaşdyrylan."
            },
            "project3": {
                "title": "Iňlis dili bilim merkezi",
                "description": "Çagalara interaktiw gönükmeler arkaly iňlis dilini öwrenmek, grammatikasyny we söz gurluşyny kämilleşdirmege kömek etmek üçin döredilen örän täsirli web sahypasy. Frontend tehnologiýalary ulanylan, arka tarapda agza bolan ulanyjylary bellige almak we degişli maglumatlary ýatda saklamak üçin google sheet we google app script işleýär."
            },
            "liveDemo": "🌐 Janly Demo",
            "github": "💻 GitHub"
        },
        "contact": {
            "title": "Habarlaşyň",
            "subtitle": "Bir taslama hakynda gürleşmek isleýäňizmi!",
            "description": "Täze taslamalaryňyz ýa-da startup pikirleriňiz barmy? Onda aşakdaky çeşmelere salgylanyň, birlikde işleşeliň.",
            "namePlaceholder": "Adyňyz",
            "emailPlaceholder": "E-poçta salgyňyz",
            "messagePlaceholder": "Soragyňyzy ýa-da teklipleriňizi üçin şu ýerik ýazyp bilersiňiz",
            "submitBtn": "Ugrat"
        },
        "footer": {
            "copyright": "Ähli hukuklar goralan."
        }
    },
    "en": {
        "nav": {
            "home": "Home",
            "about": "About",
            "skills": "Skills",
            "projects": "Projects",
            "contact": "Contact"
        },
        "hero": {
            "title": "Hello, I'm",
            "subtitle": "Frontend Developer",
            "description": "I create clean code and responsive designs with modern web technologies, focusing on user experience.",
            "projectsBtn": "View My Projects",
            "contactBtn": "Get In Touch"
        },
        "about": {
            "title": "About Me",
            "description": "I'm a software developer passionate about frontend development, constantly improving myself in modern technologies. I love creating clean code, user experience and performance-oriented solutions.",
            "projectsCompleted": "Projects Completed",
            "yearsExperience": "Years Experience",
            "technologies": "Technologies",
            "downloadCV": "📄 Download CV"
        },
        "skills": {
            "title": "Skills",
            "frontend": "Frontend",
            "tools": "Tools",
            "other": "Other"
        },
        "projects": {
            "title": "My Projects",
            "project1": {
                "title": "E-commerce Website",
                "description": "Responsive e-commerce application developed with modern React. Includes cart functionality, product filtering and user authentication."
            },
            "project2": {
                "title": "Weather Application",
                "description": "User-friendly weather app showing real-time weather data. Includes API integration and geolocation features."
            },
            "project3": {
                "title": "English Learning Hub",
                "description": "A responsive web application designed to help childrens improve their English vocabulary through interactive exercises. Built with frontend technologies and powered by Google sheets & Google apps script for secure user authentication and real-time data storage."
            },
            "liveDemo": "🌐 Live Demo",
            "github": "💻 GitHub"
        },
        "contact": {
            "title": "Contact",
            "subtitle": "Let's talk about a project!",
            "description": "I'm always open to new opportunities. Reach out to me and let's work together.",
            "namePlaceholder": "Name",
            "emailPlaceholder": "Email",
            "messagePlaceholder": "Your Message",
            "submitBtn": "Send"
        },
        "footer": {
            "copyright": "All rights reserved."
        }
    }
};

function applyLanguage(lang) {
    currentLanguage = lang;
    const t = translations[lang];

    if (!t) {
        console.error('Translations not found for language:', lang);
        return;
    }

    try {
        // Navigation
        const navLinks = document.querySelectorAll('.nav-menu a');
        if (navLinks.length >= 5) {
            navLinks[0].textContent = t.nav.home;
            navLinks[1].textContent = t.nav.about;
            navLinks[2].textContent = t.nav.skills;
            navLinks[3].textContent = t.nav.projects;
            navLinks[4].textContent = t.nav.contact;
        }

        // Hero Section
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle) {
            heroTitle.innerHTML = `${t.hero.title} <span class="text-primary">Guwanchmyrat Annayew</span>`;
        }

        const heroSubtitle = document.querySelector('.hero-subtitle');
        if (heroSubtitle) heroSubtitle.textContent = t.hero.subtitle;

        const heroDescription = document.querySelector('.hero-description');
        if (heroDescription) heroDescription.textContent = t.hero.description;

        const heroButtons = document.querySelectorAll('.hero-buttons a');
        if (heroButtons.length >= 2) {
            heroButtons[0].textContent = t.hero.projectsBtn;
            heroButtons[1].textContent = t.hero.contactBtn;
        }

        // About Section
        const aboutTitle = document.querySelector('#about .section-title');
        if (aboutTitle) aboutTitle.textContent = t.about.title;

        const aboutDescription = document.querySelector('.about-text p');
        if (aboutDescription) aboutDescription.textContent = t.about.description;

        const statLabels = document.querySelectorAll('.stat-label');
        if (statLabels.length >= 3) {
            statLabels[0].textContent = t.about.projectsCompleted;
            statLabels[1].textContent = t.about.yearsExperience;
            statLabels[2].textContent = t.about.technologies;
        }

        const downloadBtn = document.querySelector('.about-text .btn');
        if (downloadBtn) downloadBtn.textContent = t.about.downloadCV;

        // Skills Section
        const skillsTitle = document.querySelector('#skills .section-title');
        if (skillsTitle) skillsTitle.textContent = t.skills.title;

        const skillCategories = document.querySelectorAll('.skill-category h3');
        if (skillCategories.length >= 3) {
            skillCategories[0].textContent = t.skills.frontend;
            skillCategories[1].textContent = t.skills.tools;
            skillCategories[2].textContent = t.skills.other;
        }

        // Projects Section
        const projectsTitle = document.querySelector('#projects .section-title');
        if (projectsTitle) projectsTitle.textContent = t.projects.title;

        const projectTitles = document.querySelectorAll('.project-title');
        if (projectTitles.length >= 3) {
            projectTitles[0].textContent = t.projects.project1.title;
            projectTitles[1].textContent = t.projects.project2.title;
            projectTitles[2].textContent = t.projects.project3.title;
        }

        const projectDescriptions = document.querySelectorAll('.project-description');
        if (projectDescriptions.length >= 3) {
            projectDescriptions[0].textContent = t.projects.project1.description;
            projectDescriptions[1].textContent = t.projects.project2.description;
            projectDescriptions[2].textContent = t.projects.project3.description;
        }

        const projectLinks = document.querySelectorAll('.project-link');
        if (projectLinks.length >= 6) {
            projectLinks[0].textContent = t.projects.liveDemo;
            projectLinks[2].textContent = t.projects.liveDemo;
            projectLinks[4].textContent = t.projects.liveDemo;
            projectLinks[1].textContent = t.projects.github;
            projectLinks[3].textContent = t.projects.github;
            projectLinks[5].textContent = t.projects.github;
        }

        // Contact Section
        const contactTitle = document.querySelector('#contact .section-title');
        if (contactTitle) contactTitle.textContent = t.contact.title;

        const contactSubtitle = document.querySelector('.contact-info h3');
        if (contactSubtitle) contactSubtitle.textContent = t.contact.subtitle;

        const contactDescription = document.querySelector('.contact-info > p');
        if (contactDescription) contactDescription.textContent = t.contact.description;

        const formInputs = document.querySelectorAll('.contact-form input, .contact-form textarea');
        if (formInputs.length >= 3) {
            formInputs[0].placeholder = t.contact.namePlaceholder;
            formInputs[1].placeholder = t.contact.emailPlaceholder;
            formInputs[2].placeholder = t.contact.messagePlaceholder;
        }

        const submitBtn = document.querySelector('.contact-form button');
        if (submitBtn) submitBtn.textContent = t.contact.submitBtn;

        // Footer
        const footerText = document.querySelector('.footer p');
        if (footerText) {
            const currentYear = new Date().getFullYear();
            footerText.innerHTML = `&copy; ${currentYear} Guwançmyrat Annaýew. ${t.footer.copyright}`;
        }

        // Update language selector
        const languageSelect = document.getElementById('languageSelect');
        if (languageSelect) languageSelect.value = lang;

        // Save to localStorage
        localStorage.setItem('preferredLanguage', lang);

        // Update HTML lang attribute
        document.documentElement.lang = lang;

    } catch (error) {
        console.error('Error applying language:', error);
    }
}

function initLanguageSystem() {
    // Load saved language or default to Turkmen
    const savedLanguage = localStorage.getItem('preferredLanguage') || 'tr';
    currentLanguage = savedLanguage;

    // Apply language immediately (translations are already defined)
    applyLanguage(currentLanguage);

    // Language selector event
    const languageSelect = document.getElementById('languageSelect');
    if (languageSelect) {
        languageSelect.value = currentLanguage;
        languageSelect.addEventListener('change', function () {
            const newLang = this.value;
            applyLanguage(newLang);
            showNotification(`Language changed to ${newLang === 'tr' ? 'Turkmen' : 'English'}`, 'success');
        });
    }
}

// Global functions
window.portfolioApp = {
    changeTheme: function () {
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) themeToggle.click();
    },
    scrollToSection: function (sectionId) {
        const target = document.getElementById(sectionId);
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }
};