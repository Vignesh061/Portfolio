
        // Background Animation
        const canvas = document.getElementById("bgCanvas");
        const ctx = canvas.getContext("2d");

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        let balls = [];

        // Color palette for the balls
        const colors = [
            '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7',
            '#dda0dd', '#98d8c8', '#f7dc6f', '#bb8fce', '#85c1e9',
            '#f8c471', '#82e0aa', '#f1948a', '#85929e', '#a9cce3'
        ];

        // Create Ball Objects with different colors
        for (let i = 0; i < 100; i++) {
            balls.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 2 + 1,
                color: colors[Math.floor(Math.random() * colors.length)],
                dx: (Math.random() - 0.5) * 1.5,
                dy: (Math.random() - 0.5) * 1.5,
                opacity: Math.random() * 0.7 + 0.3
            });
        }

        // Draw Balls
        function drawBalls() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            balls.forEach(ball => {
                ctx.globalAlpha = ball.opacity;
                ctx.beginPath();
                ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
                
                // Create gradient for each ball
                const gradient = ctx.createRadialGradient(ball.x, ball.y, 0, ball.x, ball.y, ball.radius);
                gradient.addColorStop(0, ball.color);
                gradient.addColorStop(1, ball.color + '40');
                
                ctx.fillStyle = gradient;
                ctx.fill();
                
                // Add subtle glow effect
                ctx.shadowColor = ball.color;
                ctx.shadowBlur = 10;
                ctx.fill();
                ctx.shadowBlur = 0;

                ball.x += ball.dx;
                ball.y += ball.dy;

                // Bounce from edges
                if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
                    ball.dx *= -1;
                }
                if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
                    ball.dy *= -1;
                }
            });

            ctx.globalAlpha = 1;
            requestAnimationFrame(drawBalls);
        }

        drawBalls();

        // Adjust canvas on resize
        window.addEventListener("resize", () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });

        // Enhanced mobile menu toggle
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');

        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-item a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });

        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Typing Animation for dynamic words
        class TypingAnimation {
            constructor(container) {
                this.container = container;
                this.words = Array.from(container.querySelectorAll('.dynamic-word'));
                this.cursor = container.querySelector('.typing-cursor');
                this.currentWordIndex = 0;
                this.currentCharIndex = 0;
                this.isTyping = true;
                this.typingSpeed = 120;
                this.deletingSpeed = 60;
                this.pauseBetweenWords = 1000;
                this.pauseBeforeDelete = 2000;
                
                this.init();
            }

            init() {
                this.words.forEach((word, index) => {
                    word.textContent = '';
                    if (index !== 0) {
                        word.style.display = 'none';
                    }
                });
                
                this.animate();
            }

            animate() {
                const currentWord = this.words[this.currentWordIndex];
                const targetText = currentWord.getAttribute('data-text');
                
                this.words.forEach((word, index) => {
                    if (index === this.currentWordIndex) {
                        word.style.display = 'flex';
                    } else {
                        word.style.display = 'none';
                    }
                });

                if (this.isTyping) {
                    if (this.currentCharIndex < targetText.length) {
                        currentWord.textContent = targetText.substring(0, this.currentCharIndex + 1);
                        this.currentCharIndex++;
                        setTimeout(() => this.animate(), this.typingSpeed);
                    } else {
                        setTimeout(() => {
                            this.isTyping = false;
                            this.animate();
                        }, this.pauseBeforeDelete);
                    }
                } else {
                    if (this.currentCharIndex > 0) {
                        currentWord.textContent = targetText.substring(0, this.currentCharIndex - 1);
                        this.currentCharIndex--;
                        setTimeout(() => this.animate(), this.deletingSpeed);
                    } else {
                        this.isTyping = true;
                        this.currentWordIndex = (this.currentWordIndex + 1) % this.words.length;
                        setTimeout(() => this.animate(), this.pauseBetweenWords);
                    }
                }
            }
        }

        // Initialize the typing animation when the page loads
        document.addEventListener('DOMContentLoaded', () => {
            const dynamicText = document.querySelector('.dynamic-text');
            new TypingAnimation(dynamicText);
        });

        // Scroll-triggered animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    
                    // Animate skill bars
                    if (entry.target.classList.contains('skills-section')) {
                        animateSkillBars();
                    }
                }
            });
        }, observerOptions);

        // Observe sections for animations
        document.querySelectorAll('.about-section, .projects-section, .skills-section, .contact-section').forEach(section => {
            observer.observe(section);
        });

        // Animate skill bars
        function animateSkillBars() {
            const skillBars = document.querySelectorAll('.skill-progress');
            skillBars.forEach(bar => {
                const skill = bar.getAttribute('data-skill');
                setTimeout(() => {
                    bar.style.width = skill + '%';
                }, 300);
            });
        }

        // Smooth scrolling for navigation
        function scrollToSection(sectionId) {
            document.getElementById(sectionId).scrollIntoView({
                behavior: 'smooth'
            });
        }

        // Add click handlers to navigation links
        document.querySelectorAll('.nav-item a').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                scrollToSection(targetId);
            });
        });

        // Form submission
        document.querySelector('.contact-form').addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Show success message
            const submitBtn = document.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Message Sent!';
            submitBtn.style.background = 'linear-gradient(92.7deg, #4CAF50 0%, #45a049 100%)';
            
            // Reset form
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.style.background = 'linear-gradient(92.7deg, rgb(51, 218, 252) 0%, rgb(140, 32, 150) 80%, rgb(230, 18, 249) 100%)';
                document.querySelector('.contact-form').reset();
            }, 3000);
        });

        // Add some interactive effects to project cards
        document.querySelectorAll('.project-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-10px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
            });
        });

        // Parallax effect for hero section
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const hero = document.querySelector('.hero');
            if (hero) {
                hero.style.transform = `translateY(${scrolled * 0.5}px)`;
            }
        });