// Tab switching functionality with aurora color changes
const tabBtns = document.querySelectorAll('.tab-btn');
const contentSections = document.querySelectorAll('.content-section');

// Color mappings for each section (RGB)
const sectionColors = {
    'about': [0, 255, 136],        // Green
    'education': [6, 182, 212],    // Teal
    'experience': [139, 92, 246],  // Purple
    'projects': [255, 0, 110],     // Red/Pink
    'research': [255, 105, 180]    // Pink
};

const mainCard = document.querySelector('.main-card');
const container = document.querySelector('.container');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const targetTab = btn.dataset.tab;

        // Remove active class from all buttons and sections
        tabBtns.forEach(b => b.classList.remove('active'));
        contentSections.forEach(s => s.classList.remove('active'));

        // Remove all color classes from card and container
        mainCard.classList.remove('color-contact', 'color-about', 'color-education', 'color-experience', 'color-research', 'color-projects');
        container.classList.remove('color-contact', 'color-about', 'color-education', 'color-experience', 'color-research', 'color-projects');

        // Add active class to clicked button and corresponding section
        btn.classList.add('active');
        document.getElementById(targetTab).classList.add('active');

        // Add color class to card and container
        mainCard.classList.add(`color-${targetTab}`);
        container.classList.add(`color-${targetTab}`);

        // Change aurora color to match the section
        const color = sectionColors[targetTab];
        if (color && window.setAuroraColor) {
            window.setAuroraColor(color[0], color[1], color[2]);
        }
    });
});

// Open project detail overlay
function openProject(index) {
    const overlay = document.getElementById(`project-overlay-${index}`);
    const mainCard = document.querySelector('.main-card');
    const detailCard = overlay.querySelector('.project-detail-card');

    if (overlay && mainCard && detailCard) {
        // Get the main card's dimensions and position
        const rect = mainCard.getBoundingClientRect();

        // Position the detail card to exactly match the main card
        detailCard.style.position = 'fixed';
        detailCard.style.top = `${rect.top}px`;
        detailCard.style.left = `${rect.left}px`;
        detailCard.style.width = `${rect.width}px`;
        detailCard.style.height = `${rect.height}px`;
        detailCard.style.maxWidth = 'none';
        detailCard.style.maxHeight = 'none';

        overlay.classList.add('active');
    }
}

// Close project detail overlay
function closeProject(index) {
    const overlay = document.getElementById(`project-overlay-${index}`);
    if (overlay) {
        overlay.classList.remove('active');
    }
}

// Open research detail overlay
function openResearch(index) {
    const overlay = document.getElementById(`research-overlay-${index}`);
    const mainCard = document.querySelector('.main-card');
    const detailCard = overlay.querySelector('.project-detail-card');

    if (overlay && mainCard && detailCard) {
        // Get the main card's dimensions and position
        const rect = mainCard.getBoundingClientRect();

        // Position the detail card to exactly match the main card
        detailCard.style.position = 'fixed';
        detailCard.style.top = `${rect.top}px`;
        detailCard.style.left = `${rect.left}px`;
        detailCard.style.width = `${rect.width}px`;
        detailCard.style.height = `${rect.height}px`;
        detailCard.style.maxWidth = 'none';
        detailCard.style.maxHeight = 'none';

        overlay.classList.add('active');
    }
}

// Close research detail overlay
function closeResearch(index) {
    const overlay = document.getElementById(`research-overlay-${index}`);
    if (overlay) {
        overlay.classList.remove('active');
    }
}

// Open experience detail overlay
function openExperience(index) {
    const overlay = document.getElementById(`experience-overlay-${index}`);
    const mainCard = document.querySelector('.main-card');
    const detailCard = overlay.querySelector('.project-detail-card');

    if (overlay && mainCard && detailCard) {
        // Get the main card's dimensions and position
        const rect = mainCard.getBoundingClientRect();

        // Position the detail card to exactly match the main card
        detailCard.style.position = 'fixed';
        detailCard.style.top = `${rect.top}px`;
        detailCard.style.left = `${rect.left}px`;
        detailCard.style.width = `${rect.width}px`;
        detailCard.style.height = `${rect.height}px`;
        detailCard.style.maxWidth = 'none';
        detailCard.style.maxHeight = 'none';

        overlay.classList.add('active');
    }
}

// Close experience detail overlay
function closeExperience(index) {
    const overlay = document.getElementById(`experience-overlay-${index}`);
    if (overlay) {
        overlay.classList.remove('active');
    }
}

// Close overlay when clicking outside the card
document.querySelectorAll('.project-detail-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            overlay.classList.remove('active');
        }
    });
});

// Reposition overlays on window resize
window.addEventListener('resize', () => {
    const activeOverlay = document.querySelector('.project-detail-overlay.active');
    if (activeOverlay) {
        const mainCard = document.querySelector('.main-card');
        const detailCard = activeOverlay.querySelector('.project-detail-card');
        if (mainCard && detailCard) {
            const rect = mainCard.getBoundingClientRect();
            detailCard.style.top = `${rect.top}px`;
            detailCard.style.left = `${rect.left}px`;
            detailCard.style.width = `${rect.width}px`;
            detailCard.style.height = `${rect.height}px`;
        }
    }
});

// Function to programmatically switch to a tab (used by inline links)
function switchToTab(tabName) {
    const targetBtn = document.querySelector(`.tab-btn[data-tab="${tabName}"]`);
    if (targetBtn) {
        targetBtn.click();
    }
}
