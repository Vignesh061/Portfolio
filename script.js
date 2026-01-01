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
for (let i = 0; i < 70; i++) {
    balls.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 3+1,
        color: colors[Math.floor(Math.random() * colors.length)],
        dx: (Math.random() - 0.5) *1.5,
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
    if (dynamicText) {
        new TypingAnimation(dynamicText);
    }
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
        }
    });
}, observerOptions);

// Observe sections for animations
document.querySelectorAll('.about-section, .projects-section, .contact-section').forEach(section => {
    observer.observe(section);
});

// Smooth scrolling for navigation
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth'
        });
    }
}

// Add click handlers to navigation links
document.querySelectorAll('.nav-item a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const href = link.getAttribute('href');

        // Handle skills navigation specially
        if (href === '#skills-nav-link') {
            // First scroll to projects section
            scrollToSection('projects');
            // Then show skills tab after a small delay
            setTimeout(() => {
                const skillsNavLink = document.getElementById('skills-nav-link');
                if (skillsNavLink) {
                    showSection('skills', skillsNavLink);
                }
            }, 500);
        } 
        else if (href.startsWith('#')) {
            const targetId = href.substring(1);
            scrollToSection(targetId);
        }
        // Handle projects navigation specially
         if (href === '#projects-nav-link') {
            scrollToSection('skills');
            setTimeout(() => {
                const projectsNavLink = document.getElementById('projects-nav-link');
                if (projectsNavLink) {
                    showSection('projects', projectsNavLink);
                }
            }, 500);
        }
        // Handle all other anchor links
        else if (href.startsWith('#')) {
            const targetId = href.substring(1);
            scrollToSection(targetId);
        }
    });
});

// Form submission
document.querySelector('.contact-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const form = e.target;
    const submitBtn = form.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    
    // Disable button and show loading state
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';
    
    try {
        const response = await fetch(form.action, {
            method: 'POST',
            body: new FormData(form),
            headers: {
                'Accept': 'application/json'
            }
        });
        
        if (response.ok) {
            // Success
            submitBtn.textContent = 'Message Sent!';
            submitBtn.style.background = 'linear-gradient(92.7deg, #4CAF50 0%, #45a049 100%)';
            form.reset();
            
            // Reset after 3 seconds
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.style.background = 'linear-gradient(92.7deg, rgb(51, 218, 252) 0%, rgb(140, 32, 150) 80%, rgb(230, 18, 249) 100%)';
                submitBtn.disabled = false;
            }, 3000);
        } else {
            throw new Error('Form submission failed');
        }
    } catch (error) {
        // Error
        submitBtn.textContent = 'Error! Try again';
        submitBtn.style.background = '#f44336';
        submitBtn.disabled = false;
        
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.style.background = 'linear-gradient(92.7deg, rgb(51, 218, 252) 0%, rgb(140, 32, 150) 80%, rgb(230, 18, 249) 100%)';
        }, 3000);
    }
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

// Function to show different sections in projects area
function showSection(sectionName, clickedElement) {
    // Hide all content sections
    const allSections = document.querySelectorAll('.content-section');
    allSections.forEach(section => {
        section.classList.remove('active');
    });

    // Remove active class from all nav links
    const allNavLinks = document.querySelectorAll('.nav-list a');
    allNavLinks.forEach(link => {
        link.classList.remove('active');
    });

    // Show the selected section
    const targetSection = document.getElementById(sectionName + '-content');
    if (targetSection) {
        targetSection.classList.add('active');
    }

    // Add active class to clicked nav link
    if (clickedElement) {
        clickedElement.classList.add('active');
    }

    // Trigger animations for project cards when projects section is shown
    if (sectionName === 'projects') {
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach((card, index) => {
            card.style.animation = 'none';
            card.offsetHeight; // Trigger reflow
            card.style.animation = `fadeInUp 0.8s ease-out forwards`;
            card.style.animationDelay = `${index * 0.1}s`;
        });
    }

    // Animate skill items when skills section is shown
    if (sectionName === 'skills') {
        const skillItems = document.querySelectorAll('.skill-item');
        skillItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            setTimeout(() => {
                item.style.transition = 'all 0.3s ease';
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, index * 50);
        });
    }

    // Animate certificate images when certificates section is shown
    if (sectionName === 'certificates') {
        const certImages = document.querySelectorAll('.img-card img');
        certImages.forEach((img, index) => {
            img.style.opacity = '0';
            img.style.transform = 'scale(0.8)';
            setTimeout(() => {
                img.style.transition = 'all 0.3s ease';
                img.style.opacity = '1';
                img.style.transform = 'scale(1)';
            }, index * 100);
        });
    }
}

// Initialize the page
document.addEventListener('DOMContentLoaded', function () {
    // Show projects section by default
    const defaultProjectsLink = document.querySelector('.nav-list a');
    if (defaultProjectsLink) {
        showSection('projects', defaultProjectsLink);
    }

    // Add scroll animation to the main section
    const projectsSection = document.querySelector('.projects-section');
    if (projectsSection) {
        projectsSection.classList.add('animate');
    }
});

// Add click effect to project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', function (e) {
        if (!e.target.closest('.project-btn')) {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        }
    });
});

// Add multiple typing words for more dynamic effect
document.addEventListener('DOMContentLoaded', () => {
    const dynamicText = document.querySelector('.dynamic-text');
    if (dynamicText) {
        // Create multiple dynamic words
        const words = [
            'UI/UX Enthusiast',
            'Frontend Developer',
            'Aspiring Full Stack Developer',
            'Continuous learner'
        ];

        // Clear existing content and add new words
        dynamicText.innerHTML = '';
        words.forEach((word, index) => {
            const wordSpan = document.createElement('span');
            wordSpan.className = 'dynamic-word';
            wordSpan.setAttribute('data-text', word);
            wordSpan.textContent = '';
            if (index !== 0) {
                wordSpan.style.display = 'none';
            }
            dynamicText.appendChild(wordSpan);
        });

        // Add cursor
        const cursor = document.createElement('span');
        cursor.className = 'typing-cursor';
        dynamicText.appendChild(cursor);

        // Initialize typing animation
        new TypingAnimation(dynamicText);
    }
});


        // Get the marquee content
        const marqueeContent = document.querySelector('.marquee-content');
        const marqueeWrapper = document.querySelector('.marquee-wrapper');
        
        // Clone the content and append it to the wrapper (not parent)
        const clone = marqueeContent.cloneNode(true);
        marqueeWrapper.appendChild(clone);
   