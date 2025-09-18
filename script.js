        // JavaScript for smooth scrolling, mobile menu toggle, mode toggle, and animations

        document.addEventListener('DOMContentLoaded', () => {
            const menuButton = document.getElementById('menu-button');
            const navbarLinks = document.getElementById('navbar-links');
            const sections = document.querySelectorAll('.section');
            const skillItems = document.querySelectorAll('.skill-item');
            const skillDetails = document.getElementById('skill-details');
            const projectCards = document.querySelectorAll('.project-card');
            const modeToggle = document.getElementById('mode-toggle');
            const sunIcon = modeToggle.querySelector('.fa-sun');
            const moonIcon = modeToggle.querySelector('.fa-moon');
            const hero = document.getElementById('hero');
            const constellation = document.getElementById('constellation');
            const body = document.getElementById('body');
            const cursorTrail = document.getElementById('cursor-trail');
            const main = document.getElementById('main');
            const layout = document.getElementById('layout');
            const cp = document.getElementById('command-palette');
            const cpInput = document.getElementById('cp-input');
            const cpList = document.getElementById('cp-list');
            const storyboard = document.getElementById('storyboard');
            const sbClose = document.getElementById('sb-close');
            const sbTitle = document.getElementById('sb-title');
            const sbProblem = document.getElementById('sb-problem');
            const sbApproach = document.getElementById('sb-approach');
            const sbResult = document.getElementById('sb-result');

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

            // --- Parallax hero tilt ---
            if (hero) {
                hero.addEventListener('mousemove', (e) => {
                    const rect = hero.getBoundingClientRect();
                    const offsetX = (e.clientX - rect.left) / rect.width - 0.5;
                    const offsetY = (e.clientY - rect.top) / rect.height - 0.5;
                    const tiltX = offsetY * -6;
                    const tiltY = offsetX * 6;
                    hero.querySelector('.container').style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
                });
                hero.addEventListener('mouseleave', () => {
                    hero.querySelector('.container').style.transform = 'rotateX(0) rotateY(0)';
                });
            }

            // --- Constellation background ---
            if (constellation) {
                const ctx = constellation.getContext('2d');
                const stars = [];
                const STAR_COUNT = 100;
                const MAX_DIST = 120;
                function resize() {
                    constellation.width = hero.clientWidth;
                    constellation.height = hero.clientHeight;
                }
                window.addEventListener('resize', resize);
                resize();
                for (let i = 0; i < STAR_COUNT; i++) {
                    stars.push({
                        x: Math.random() * constellation.width,
                        y: Math.random() * constellation.height,
                        vx: (Math.random() - 0.5) * 0.3,
                        vy: (Math.random() - 0.5) * 0.3,
                        r: Math.random() * 1.8 + 0.4
                    });
                }
                function step() {
                    ctx.clearRect(0, 0, constellation.width, constellation.height);
                    // move and draw stars
                    for (const s of stars) {
                        s.x += s.vx; s.y += s.vy;
                        if (s.x < 0 || s.x > constellation.width) s.vx *= -1;
                        if (s.y < 0 || s.y > constellation.height) s.vy *= -1;
                        ctx.beginPath();
                        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
                        ctx.fillStyle = 'rgba(34,211,238,0.8)';
                        ctx.fill();
                    }
                    // connect near stars
                    for (let i = 0; i < stars.length; i++) {
                        for (let j = i + 1; j < stars.length; j++) {
                            const dx = stars[i].x - stars[j].x;
                            const dy = stars[i].y - stars[j].y;
                            const d = Math.hypot(dx, dy);
                            if (d < MAX_DIST) {
                                ctx.strokeStyle = `rgba(167,139,250,${1 - d / MAX_DIST})`;
                                ctx.lineWidth = 1;
                                ctx.beginPath();
                                ctx.moveTo(stars[i].x, stars[i].y);
                                ctx.lineTo(stars[j].x, stars[j].y);
                                ctx.stroke();
                            }
                        }
                    }
                    requestAnimationFrame(step);
                }
                step();
            }

            // --- Command Palette ---
            const paletteItems = [
                { label: 'Go to Profile', action: () => document.getElementById('profile').scrollIntoView({ behavior: 'smooth' }) },
                { label: 'Go to Skills', action: () => document.getElementById('skills').scrollIntoView({ behavior: 'smooth' }) },
                { label: 'Go to Experience', action: () => document.getElementById('experience').scrollIntoView({ behavior: 'smooth' }) },
                { label: 'Go to Projects', action: () => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' }) },
                { label: 'Go to Certifications', action: () => document.getElementById('certifications').scrollIntoView({ behavior: 'smooth' }) },
                { label: 'Go to Education', action: () => document.getElementById('education').scrollIntoView({ behavior: 'smooth' }) },
                { label: 'Go to Contact', action: () => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' }) },
                { label: 'Toggle Theme', action: () => modeToggle.click() }
            ];

            function openPalette() {
                cp.classList.add('active');
                cpInput.value = '';
                renderPalette('');
                setTimeout(() => cpInput.focus(), 0);
            }
            function closePalette() { cp.classList.remove('active'); }
            function renderPalette(query) {
                const q = query.toLowerCase();
                cpList.innerHTML = '';
                paletteItems.filter(i => i.label.toLowerCase().includes(q)).forEach(i => {
                    const li = document.createElement('li');
                    li.className = 'px-4 py-3 hover:bg-[var(--project-card-bg)] cursor-pointer flex items-center';
                    li.textContent = i.label;
                    li.addEventListener('click', () => { i.action(); closePalette(); });
                    cpList.appendChild(li);
                });
            }
            document.addEventListener('keydown', (e) => {
                if ((e.key === 'k' && (e.ctrlKey || e.metaKey)) || e.key === '/') {
                    e.preventDefault();
                    openPalette();
                } else if (e.key === 'Escape') {
                    closePalette();
                }
            });
            if (cpInput) {
                cpInput.addEventListener('input', (e) => renderPalette(e.target.value));
            }

            // --- Storyboard slide-over ---
            function openStoryboard(data) {
                sbTitle.textContent = data.title;
                sbProblem.textContent = data.problem;
                sbApproach.innerHTML = data.approach;
                sbResult.innerHTML = data.result;
                storyboard.classList.add('active');
            }
            function closeStoryboard() { storyboard.classList.remove('active'); }
            if (sbClose) sbClose.addEventListener('click', closeStoryboard);
            // Attach open handlers to project cards (first two as example)
            projectCards.forEach((card, idx) => {
                card.style.cursor = 'pointer';
                card.addEventListener('click', () => {
                    const title = card.querySelector('h3')?.textContent || `Project ${idx + 1}`;
                    openStoryboard({
                        title,
                        problem: 'What was the challenge? Briefly describe the user or business need and constraints.',
                        approach: '<ul><li>Outlined architecture and chose the stack.</li><li>Implemented core modules with tests.</li><li>Optimized performance and DX.</li></ul>',
                        result: '<ul><li>Delivered features on time.</li><li>Improved performance and reliability.</li><li>Positive user feedback and metrics.</li></ul>'
                    });
                });
            });

            // --- Immersive mode toggles and helpers ---
            function enableImmersive() { body.classList.add('immersive'); }
            function disableImmersive() { body.classList.remove('immersive'); }
            // View mode: Panel vs Immersive
            function enablePanelView() { body.classList.remove('immersive'); }
            function preferPanel() { return true; }
            // Default to panel view per request
            enablePanelView();
            window.addEventListener('resize', () => { enablePanelView(); });
            // Keyboard next/prev section
            const order = ['profile','skills','experience','projects','certifications','education','contact'];
            function gotoByStep(step) {
                const current = order.findIndex(id => document.getElementById(id).getBoundingClientRect().top <= 120 && document.getElementById(id).getBoundingClientRect().bottom >= 120);
                const next = Math.min(order.length-1, Math.max(0, current + step));
                document.getElementById(order[next]).scrollIntoView({ behavior: 'smooth' });
            }
            document.addEventListener('keydown', (e) => {
                if (body.classList.contains('immersive')) {
                    if (e.key === 'PageDown' || (e.key === 'ArrowDown' && e.shiftKey)) { e.preventDefault(); gotoByStep(1); }
                    if (e.key === 'PageUp' || (e.key === 'ArrowUp' && e.shiftKey)) { e.preventDefault(); gotoByStep(-1); }
                }
            });

            // Side panel active state sync
            // No side panel, keep existing scrollspy for dots

            // --- Neon cursor trail ---
            if (cursorTrail) {
                const ctx = cursorTrail.getContext('2d');
                function sizeTrail() { cursorTrail.width = window.innerWidth; cursorTrail.height = window.innerHeight; }
                sizeTrail(); window.addEventListener('resize', sizeTrail);
                const points = [];
                document.addEventListener('mousemove', (e) => {
                    points.push({ x: e.clientX, y: e.clientY, life: 1 });
                });
                function draw() {
                    ctx.clearRect(0,0,cursorTrail.width,cursorTrail.height);
                    for (let i = points.length - 1; i >= 0; i--) {
                        const p = points[i];
                        const r = 6 * p.life;
                        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r);
                        grad.addColorStop(0, 'rgba(34,211,238,0.8)');
                        grad.addColorStop(1, 'rgba(167,139,250,0)');
                        ctx.fillStyle = grad;
                        ctx.beginPath(); ctx.arc(p.x, p.y, r, 0, Math.PI*2); ctx.fill();
                        p.life -= 0.02; if (p.life <= 0) points.splice(i,1);
                    }
                    requestAnimationFrame(draw);
                }
                draw();
            }

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

            // --- Scrollspy, dot nav, and progress bar ---
            const dotNav = document.getElementById('dot-nav');
            const topProgress = document.getElementById('top-progress');
            const dotLinks = dotNav ? Array.from(dotNav.querySelectorAll('a')) : [];

            function updateProgress() {
                const scrollTop = window.scrollY;
                const docHeight = document.body.scrollHeight - window.innerHeight;
                const pct = Math.max(0, Math.min(1, scrollTop / docHeight));
                if (topProgress) topProgress.style.width = `${pct * 100}%`;
            }
            function updateActiveDot() {
                let activeId = 'profile';
                sections.forEach(sec => {
                    const rect = sec.getBoundingClientRect();
                    if (rect.top <= 120 && rect.bottom >= 120) {
                        activeId = sec.id;
                    }
                });
                dotLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${activeId}`));
            }
            window.addEventListener('scroll', () => { updateProgress(); updateActiveDot(); });
            updateProgress(); updateActiveDot();

            if (dotNav) {
                dotLinks.forEach(a => a.addEventListener('click', (e) => {
                    e.preventDefault();
                    const targetId = a.getAttribute('href').substring(1);
                    const el = document.getElementById(targetId);
                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }));
            }

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

                            // Skill Items: Slide in from left and animate bar
                            if (target.classList.contains('skill-item')) {
                                target.style.opacity = '1';
                                target.style.transform = 'translateX(0)';
                                target.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out'; // Re-apply transitions

                                // Trigger skill bar animation
                                const skillBar = target.querySelector('.skill-bar');
                                if (skillBar) {
                                    const percent = skillBar.getAttribute('data-percent');
                                    skillBar.style.width = percent + '%';
                                    skillBar.style.transition = 'width 1.5s ease-out'; // Re-apply transition
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
                        if (target.classList.contains('section') || target.classList.contains('project-card') || target.classList.contains('skill-item')) {
                             observer.unobserve(entry.target);
                        }
                         // Skill bars are animated when their parent skill-item is in view,
                         // so we observe the skill-item and trigger the bar animation from there.
                    } else {
                        //Optional: Reset styles when not intersecting (if you want replay)
                        // const target = entry.target;
                        // if (target.classList.contains('section')) {
                        //     target.style.opacity = '0';
                        //     target.style.transform = 'translateY(30px)';
                        //      target.style.transition = 'none'; // Remove transition for instant reset
                        // }
                        //  if (target.classList.contains('skill-item')) {
                        //      target.style.opacity = '0';
                        //      target.style.transform = 'translateX(-30px)';
                        //       target.style.transition = 'none';
                        //     const skillBar = target.querySelector('.skill-bar');
                        //      if (skillBar) {
                        //          skillBar.style.width = '0%';
                        //          skillBar.style.transition = 'none';
                        //      }
                        //  }
                        //  if (target.classList.contains('project-card')) {
                        //      target.style.opacity = '0';
                        //      target.style.transform = 'translateY(20px)'; // Or scale(0.8)
                        //       target.style.transition = 'none';
                        //  }
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
                 // Interactive skill hover and click
                 const nameEl = item.querySelector('.skill-name');
                 const bar = item.querySelector('.skill-bar');
                 const skillName = nameEl ? nameEl.textContent.replace(/\s*\d+%/, '').trim() : 'Skill';
                 const percent = bar ? bar.getAttribute('data-percent') : '0';
                 const detailText = `${skillName} • Proficiency ${percent}%`;
                 let pinned = false;
                 item.addEventListener('mouseenter', () => {
                     if (!pinned && skillDetails) skillDetails.textContent = detailText;
                 });
                 item.addEventListener('mouseleave', () => {
                     if (!pinned && skillDetails) skillDetails.textContent = 'Hover a skill to see details. Click to pin.';
                 });
                 item.addEventListener('click', () => {
                     pinned = !pinned;
                     if (skillDetails) skillDetails.textContent = pinned ? `${detailText} (pinned)` : 'Hover a skill to see details. Click to pin.';
                 });
             });

             projectCards.forEach(card => {
                 card.style.opacity = '0';
                 card.style.transform = 'translateY(20px)'; // Initial state for bounce
                 card.style.transition = 'none'; // Remove initial transition
                 animateOnScrollObserver.observe(card);
            });


        });
