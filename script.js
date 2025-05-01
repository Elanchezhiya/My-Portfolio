
        // JavaScript for smooth scrolling, mobile menu toggle, mode toggle, and animations

        document.addEventListener('DOMContentLoaded', () => {
            const menuButton = document.getElementById('menu-button');
            const navbarLinks = document.getElementById('navbar-links');
            const sections = document.querySelectorAll('.section');
            const skillItems = document.querySelectorAll('.skill-item');
            const projectCards = document.querySelectorAll('.project-card');
            const modeToggle = document.getElementById('mode-toggle');
            const sunIcon = modeToggle.querySelector('.fa-sun');
            const moonIcon = modeToggle.querySelector('.fa-moon');

            // --- Dark/Light Mode Toggle ---
            const currentMode = localStorage.getItem('theme') || 'dark'; // Default to dark

            if (currentMode === 'dark') {
                document.body.classList.add('dark-mode');
                sunIcon.classList.remove('hidden');
                moonIcon.classList.add('hidden');
            } else {
                document.body.classList.remove('dark-mode');
                sunIcon.classList.add('hidden');
                moonIcon.classList.remove('hidden');
            }

            modeToggle.addEventListener('click', () => {
                document.body.classList.toggle('dark-mode');
                const isDarkMode = document.body.classList.contains('dark-mode');
                localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');

                if (isDarkMode) {
                    sunIcon.classList.remove('hidden');
                    moonIcon.classList.add('hidden');
                } else {
                    sunIcon.classList.add('hidden');
                    moonIcon.classList.remove('hidden');
                }
            });


            // --- Mobile Menu Toggle ---
            menuButton.addEventListener('click', () => {
                navbarLinks.classList.toggle('active');
            });

            // --- Smooth Scrolling for Navigation Links ---
            document.querySelectorAll('.navbar-links a').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();

                    const targetId = this.getAttribute('href').substring(1);
                    const targetElement = document.getElementById(targetId);

                    if (targetElement) {
                        // Close the mobile menu after clicking a link
                        if (navbarLinks.classList.contains('active')) {
                             navbarLinks.classList.remove('active');
                        }

                        // Scroll to the target section
                        window.scrollTo({
                            top: targetElement.offsetTop - 80, // Adjust offset if needed (e.g., for fixed header)
                            behavior: 'smooth'
                        });
                    }
                });
            });

            // --- Animation on Scroll using IntersectionObserver (JS controlled) ---
            const animateOnScrollObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const target = entry.target;
                        const delay = parseFloat(target.getAttribute('data-delay')) * 1000 || 0; // Get delay in milliseconds

                        // Use setTimeout to apply final styles after the delay
                        setTimeout(() => {
                            // Sections: Fade in and slight upward translate
                            if (target.classList.contains('section')) {
                                target.style.opacity = '1';
                                target.style.transform = 'translateY(0)';
                                target.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out, background-color 0.5s ease, border-color 0.5s ease'; // Re-apply transitions
                            }

                            // Skill Items: Slide in from left
                            if (target.classList.contains('skill-item')) {
                                target.style.opacity = '1';
                                target.style.transform = 'translateX(0)';
                                target.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out'; // Re-apply transitions
                                // Trigger skill bar animation
                                const skillBar = target.querySelector('.skill-bar');
                                if (skillBar) {
                                    const percent = skillBar.getAttribute('data-percent');
                                    skillBar.style.width = percent + '%';
                                }
                            }

                            // Project Cards: Bounce in
                            if (target.classList.contains('project-card')) {
                                target.style.opacity = '1';
                                // Simulate bounce effect by applying final transform directly
                                target.style.transform = 'scale(1) translateY(0)';
                                target.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out, background-color 0.5s ease, border-color 0.5s ease'; // Re-apply transitions
                            }

                        }, delay);

                         // Unobserve elements that should only animate once
                        if (target.classList.contains('section') || target.classList.contains('project-card')) {
                             observer.unobserve(entry.target);
                        }
                         // Skill items can be re-observed if you want the bar animation to potentially replay
                    } else {
                        //Optional: Reset styles when not intersecting (if you want replay)
                        const target = entry.target;
                        if (target.classList.contains('section')) {
                            target.style.opacity = '0';
                            target.style.transform = 'translateY(30px)';
                             target.style.transition = 'none'; // Remove transition for instant reset
                        }
                        if (target.classList.contains('skill-item')) {
                            target.style.opacity = '0';
                            target.style.transform = 'translateX(-30px)';
                             target.style.transition = 'none';
                            const skillBar = target.querySelector('.skill-bar');
                             if (skillBar) {
                                 skillBar.style.width = '0%';
                             }
                        }
                        if (target.classList.contains('project-card')) {
                            target.style.opacity = '0';
                            target.style.transform = 'translateY(20px)'; // Or scale(0.8)
                             target.style.transition = 'none';
                        }
                    }
                });
            }, {
                threshold: 0.1 // Trigger when 10% of the element is visible
            });

            // Observe all elements that should animate and set initial styles in JS
            sections.forEach(section => {
                section.style.opacity = '0';
                section.style.transform = 'translateY(30px)';
                animateOnScrollObserver.observe(section);
            });
            skillItems.forEach(item => {
                 item.style.opacity = '0';
                 item.style.transform = 'translateX(-30px)';
                 item.style.transition = 'none'; // Remove initial transition
                 animateOnScrollObserver.observe(item);
            });
             projectCards.forEach(card => {
                 card.style.opacity = '0';
                 card.style.transform = 'translateY(20px)'; // Initial state for bounce
                 card.style.transition = 'none'; // Remove initial transition
                 animateOnScrollObserver.observe(card);
            });


        });
    