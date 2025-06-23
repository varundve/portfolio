      // Typing Animation
        const roles = [ "Web Developer", "Problem Solver", "Tech Enthusiast"];
        let currentRole = 0;
        let currentChar = 0;
        let isDeleting = false;
        const typingElement = document.getElementById('typingText');

        function typeWriter() {
            const currentText = roles[currentRole];
            
            if (isDeleting) {
                typingElement.textContent = currentText.substring(0, currentChar - 1);
                currentChar--;
            } else {
                typingElement.textContent = currentText.substring(0, currentChar + 1);
                currentChar++;
            }

            let typeSpeed = isDeleting ? 50 : 100;

            if (!isDeleting && currentChar === currentText.length) {
                typeSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && currentChar === 0) {
                isDeleting = false;
                currentRole = (currentRole + 1) % roles.length;
                typeSpeed = 500;
            }

            setTimeout(typeWriter, typeSpeed);
        }

        // Start typing animation
        typeWriter();

        // Smooth scrolling for navigation
        function scrollToSection(sectionId) {
            document.getElementById(sectionId).scrollIntoView({
                behavior: 'smooth'
            });
        }

        // Navigation active state
        const navLinks = document.querySelectorAll('.nav-link');
        const sections = document.querySelectorAll('section[id]');

        function updateActiveNav() {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (scrollY >= (sectionTop - 200)) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        }

        // Scroll animations
        function animateOnScroll() {
            const skillCards = document.querySelectorAll('.skill-card');
            const projectCards = document.querySelectorAll('.project-card');
            
            skillCards.forEach((card, index) => {
                const cardTop = card.getBoundingClientRect().top;
                const cardVisible = 150;
                
                if (cardTop < window.innerHeight - cardVisible) {
                    setTimeout(() => {
                        card.classList.add('animate');
                        const skillLevel = card.getAttribute('data-skill');
                        const progressBar = card.querySelector('.skill-progress');
                        progressBar.style.width = skillLevel + '%';
                    }, index * 100);
                }
            });

            projectCards.forEach((card, index) => {
                const cardTop = card.getBoundingClientRect().top;
                const cardVisible = 150;
                
                if (cardTop < window.innerHeight - cardVisible) {
                    setTimeout(() => {
                        card.classList.add('animate');
                    }, index * 200);
                }
            });
        }

        // Event listeners
        window.addEventListener('scroll', () => {
            updateActiveNav();
            animateOnScroll();
        });

        // Navigation click handlers
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                scrollToSection(targetId);
            });
        });

        // Contact form handler
        document.getElementById('contactForm').addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for your message! I\'ll get back to you soon.');
        });

        // Mobile menu toggle (basic implementation)
        const mobileMenu = document.querySelector('.mobile-menu');
        const navLinksContainer = document.querySelector('.nav-links');

        mobileMenu.addEventListener('click', () => {
            navLinksContainer.style.display = navLinksContainer.style.display === 'flex' ? 'none' : 'flex';
        });

        // Initialize animations on page load
        window.addEventListener('load', () => {
            animateOnScroll();
        });

        // Navbar background on scroll
        window.addEventListener('scroll', () => {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(0, 0, 0, 0.9)';
            } else {
                navbar.style.background = 'rgba(0, 0, 0, 0.2)';
            }
        });