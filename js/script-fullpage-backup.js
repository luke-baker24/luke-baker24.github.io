// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar Background on Scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 255, 136, 0.2)';
    } else {
        navbar.style.boxShadow = '0 2px 20px rgba(0, 255, 136, 0.1)';
    }
});

// Intersection Observer for Fade-in Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards
document.addEventListener('DOMContentLoaded', () => {
    const fadeElements = document.querySelectorAll('.skill-card, .project-card, .experience-card, .education-card');

    fadeElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
});

// Active Navigation Link Based on Scroll Position
const sections = document.querySelectorAll('section[id]');

function updateActiveNavLink() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-menu a[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLink?.classList.add('active-link');
        } else {
            navLink?.classList.remove('active-link');
        }
    });
}

// Add active link styling
const style = document.createElement('style');
style.textContent = `
    .nav-menu a.active-link {
        color: var(--primary-color);
        position: relative;
    }
    .nav-menu a.active-link::after {
        content: '';
        position: absolute;
        bottom: -5px;
        left: 0;
        width: 100%;
        height: 2px;
        background: var(--primary-color);
    }
`;
document.head.appendChild(style);

window.addEventListener('scroll', updateActiveNavLink);

// Horizontal ASCII Aurora Streams - Optimized Grid-Based Version
// Shared grid data across all instances
const SharedAuroraGrid = {
    chars: ['.', ':', '-', '=', '*', '#', '@', '$'],
    waveOffset: 0,
    lastTime: 0,

    updateWaveOffset(currentTime) {
        const deltaTime = currentTime - this.lastTime;
        this.lastTime = currentTime;
        // Target 60fps: move 0.02 per frame at 60fps = 1.2 per second
        this.waveOffset += (deltaTime / 1000) * 1.2;
    }
};

class AuroraStreams {
    constructor(canvas, color) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d', { alpha: true, desynchronized: true });
        this.color = color;
        this.fontSize = 16;
        this.gridSize = this.fontSize;
        this.rows = 0;
        this.cols = 0;

        // Pre-parse color once
        const colorMatch = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
        this.colorR = parseInt(colorMatch[1]);
        this.colorG = parseInt(colorMatch[2]);
        this.colorB = parseInt(colorMatch[3]);

        this.init();
    }

    init() {
        this.resize();
        window.addEventListener('resize', () => this.resize());
        requestAnimationFrame((time) => this.animate(time));
    }

    resize() {
        const rect = this.canvas.parentElement.getBoundingClientRect();
        this.canvas.width = rect.width;
        this.canvas.height = rect.height;
        this.rows = Math.floor(this.canvas.height / this.gridSize);
        this.cols = Math.floor(this.canvas.width / this.gridSize);
    }

    animate(currentTime) {
        // Clear canvas completely with transparency
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Pre-calculate center gradient values
        const centerY = this.canvas.height / 2;
        const maxDistance = this.canvas.height / 2;

        // Set font once outside loop
        this.ctx.font = `bold ${this.fontSize}px monospace`;

        const waveOffset = SharedAuroraGrid.waveOffset;
        const chars = SharedAuroraGrid.chars;
        const charsLength = chars.length - 1;

        // Draw each character in the grid
        for (let row = 0; row < this.rows; row++) {
            // Pre-calculate values for this row
            const y = row * this.gridSize + this.gridSize;
            const distanceFromCenter = Math.abs(y - centerY);
            const centerGradient = 1 - (distanceFromCenter / maxDistance) * 0.7;

            for (let col = 0; col < this.cols; col++) {
                const x = col * this.gridSize;
                const colRatio = col / this.cols;

                // Multiple overlapping waves with different frequencies and amplitudes
                const wave1Phase = colRatio * 12.566370614359172 + waveOffset; // PI * 4 pre-calculated
                const wave1Row = ((Math.sin(wave1Phase) * 0.35) + 0.5) * this.rows;
                const intensity1 = Math.max(0, 1 - Math.abs(row - wave1Row) * 0.02); // 1/50 pre-calculated

                const wave2Phase = colRatio * 9.42477796076938 + waveOffset * 0.7; // PI * 3
                const wave2Row = ((Math.sin(wave2Phase) * 0.3) + 0.5) * this.rows;
                const intensity2 = Math.max(0, 1 - Math.abs(row - wave2Row) * 0.02);

                const wave3Phase = colRatio * 15.707963267948966 + waveOffset * 1.3; // PI * 5
                const wave3Row = ((Math.sin(wave3Phase) * 0.25) + 0.5) * this.rows;
                const intensity3 = Math.max(0, 1 - Math.abs(row - wave3Row) * 0.02);

                // Combine all three waves
                const waveIntensity = Math.max(intensity1, intensity2, intensity3);

                // Combine wave and center gradient
                let intensity = waveIntensity * centerGradient * (0.85 + ((row * 7 + col * 13) % 100) * 0.0015015015);

                // Only draw if intensity is above threshold
                if (intensity > 0.05) {
                    // Choose character based on intensity with smoothing
                    const charIndex = Math.floor(Math.pow(intensity, 0.7) * charsLength);
                    const char = chars[charIndex];

                    // Optimize rendering based on intensity with color gradients
                    if (intensity > 0.8) {
                        // Very bright: strong shift to white
                        const blendToWhite = (intensity - 0.8) * 5; // / 0.2 pre-calculated
                        const blendedR = Math.round(this.colorR + (255 - this.colorR) * blendToWhite * 0.9);
                        const blendedG = Math.round(this.colorG + (255 - this.colorG) * blendToWhite * 0.9);
                        const blendedB = Math.round(this.colorB + (255 - this.colorB) * blendToWhite * 0.9);

                        this.ctx.fillStyle = `rgba(${blendedR}, ${blendedG}, ${blendedB}, ${intensity * 0.2})`;
                        this.ctx.fillText(char, x, y);
                    } else if (intensity > 0.65) {
                        // Bright-medium: lighter version of base color
                        const lightenAmount = (intensity - 0.65) / 0.15; // 0 to 1 range
                        const lightR = Math.round(this.colorR + (255 - this.colorR) * lightenAmount * 0.4);
                        const lightG = Math.round(this.colorG + (255 - this.colorG) * lightenAmount * 0.4);
                        const lightB = Math.round(this.colorB + (255 - this.colorB) * lightenAmount * 0.4);

                        this.ctx.fillStyle = `rgba(${lightR}, ${lightG}, ${lightB}, ${intensity * 0.2})`;
                        this.ctx.fillText(char, x, y);
                    } else if (intensity > 0.5) {
                        // Bright: base color
                        this.ctx.fillStyle = `rgba(${this.colorR}, ${this.colorG}, ${this.colorB}, ${intensity * 0.2})`;
                        this.ctx.fillText(char, x, y);
                    } else if (intensity > 0.25) {
                        // Medium: base color
                        this.ctx.fillStyle = `rgba(${this.colorR}, ${this.colorG}, ${this.colorB}, ${intensity * 0.16})`;
                        this.ctx.fillText(char, x, y);
                    } else {
                        // Dim: base color
                        this.ctx.fillStyle = `rgba(${this.colorR}, ${this.colorG}, ${this.colorB}, ${intensity * 0.1})`;
                        this.ctx.fillText(char, x, y);
                    }
                }
            }
        }

        requestAnimationFrame((time) => this.animate(time));
    }
}

// Initialize Aurora Streams when page loads
document.addEventListener('DOMContentLoaded', () => {
    console.log('=== AURORA INITIALIZATION START ===');

    // Section color mappings
    const sectionColors = {
        'home': 'rgba(0, 255, 136, 1)',
        'about': 'rgba(0, 255, 136, 1)',
        'education': 'rgba(0, 255, 136, 1)',
        'experience': 'rgba(139, 92, 246, 1)',
        'projects': 'rgba(255, 0, 110, 1)',
        'skills': 'rgba(6, 182, 212, 1)',
        'contact': 'rgba(0, 255, 136, 1)'
    };

    // Create canvas for each section
    const sections = ['home', 'about', 'education', 'experience', 'projects', 'skills', 'contact'];
    const instances = [];

    sections.forEach(sectionId => {
        const element = document.getElementById(sectionId);
        console.log(`Looking for section: ${sectionId}`, element);
        if (element) {
            // Create canvas
            const canvas = document.createElement('canvas');
            canvas.className = 'aurora-canvas';
            canvas.style.position = 'absolute';
            canvas.style.top = '0';
            canvas.style.left = '0';
            canvas.style.width = '100%';
            canvas.style.height = '100%';
            canvas.style.zIndex = '0';
            canvas.style.pointerEvents = 'none';

            console.log(`Created canvas for ${sectionId}:`, canvas);

            // Ensure section has relative positioning
            element.style.position = 'relative';

            // Insert canvas at beginning of section
            element.insertBefore(canvas, element.firstChild);
            console.log(`Inserted canvas into ${sectionId}`);

            // Create aurora instance
            const instance = new AuroraStreams(canvas, sectionColors[sectionId]);
            instances.push(instance);
            console.log(`Created AuroraStreams instance for ${sectionId}`);
        } else {
            console.error(`Section ${sectionId} not found!`);
        }
    });

    console.log(`Total canvases created: ${instances.length}`);
    console.log('All canvases in DOM:', document.querySelectorAll('.aurora-canvas'));

    // Single shared animation loop updater
    function updateSharedState(currentTime) {
        SharedAuroraGrid.updateWaveOffset(currentTime);
        requestAnimationFrame(updateSharedState);
    }
    requestAnimationFrame(updateSharedState);
    console.log('=== AURORA INITIALIZATION COMPLETE ===');
});
