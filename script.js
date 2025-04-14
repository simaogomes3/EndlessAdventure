// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add scroll event listener for header
const header = document.querySelector('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > lastScroll) {
        // Scrolling down
        header.style.transform = 'translateY(-100%)';
    } else {
        // Scrolling up
        header.style.transform = 'translateY(0)';
    }
    
    lastScroll = currentScroll;
});

// Add animation to elements when they come into view
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.shop-item, .activity-card, .partner-logo');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Set initial styles for animation
document.querySelectorAll('.shop-item, .activity-card, .partner-logo').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
});

// Run animation on scroll
window.addEventListener('scroll', animateOnScroll);
// Run once on page load
animateOnScroll();

// Form submission handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Here you would typically send the form data to a server
        alert('Mensagem enviada com sucesso! Entraremos em contacto em breve.');
        contactForm.reset();
    });
}

document.addEventListener('DOMContentLoaded', function() {
    // Carousel functionality
    const shopItems = document.querySelector('.shop-items');
    const prevButton = document.querySelector('.carousel-control.prev');
    const nextButton = document.querySelector('.carousel-control.next');
    const items = document.querySelectorAll('.shop-item');
    let currentIndex = 0;

    // Calculate items per page based on screen width
    function getItemsPerPage() {
        if (window.innerWidth <= 768) return 1;
        if (window.innerWidth <= 1200) return 2;
        return 3;
    }

    function updateCarousel() {
        const itemsPerPage = getItemsPerPage();
        const itemWidth = shopItems.offsetWidth / itemsPerPage;
        const maxIndex = Math.ceil(items.length / itemsPerPage) - 1;
        
        // Ensure currentIndex is within bounds
        currentIndex = Math.min(Math.max(currentIndex, 0), maxIndex);
        
        const offset = -currentIndex * (itemWidth * itemsPerPage + 30);
        shopItems.style.transform = `translateX(${offset}px)`;
        
        // Update dots
        document.querySelectorAll('.dot').forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });

        // Update button states
        prevButton.style.opacity = currentIndex === 0 ? '0.5' : '1';
        prevButton.style.pointerEvents = currentIndex === 0 ? 'none' : 'auto';
        nextButton.style.opacity = currentIndex >= maxIndex ? '0.5' : '1';
        nextButton.style.pointerEvents = currentIndex >= maxIndex ? 'none' : 'auto';
    }

    // Update dots container
    const updateDots = () => {
        const itemsPerPage = getItemsPerPage();
        const totalPages = Math.ceil(items.length / itemsPerPage);
        const dotsContainer = document.querySelector('.carousel-dots');
        
        dotsContainer.innerHTML = '';
        for (let i = 0; i < totalPages; i++) {
            const dot = document.createElement('span');
            dot.className = 'dot' + (i === currentIndex ? ' active' : '');
            dot.addEventListener('click', () => {
                currentIndex = i;
                updateCarousel();
            });
            dotsContainer.appendChild(dot);
        }
    }

    // Event listeners
    prevButton.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    });

    nextButton.addEventListener('click', () => {
        const itemsPerPage = getItemsPerPage();
        const maxIndex = Math.ceil(items.length / itemsPerPage) - 1;
        if (currentIndex < maxIndex) {
            currentIndex++;
            updateCarousel();
        }
    });

    // Touch swipe support
    let touchStartX = 0;
    let touchEndX = 0;

    shopItems.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    shopItems.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        const itemsPerPage = getItemsPerPage();
        const maxIndex = Math.ceil(items.length / itemsPerPage) - 1;

        if (touchEndX < touchStartX - swipeThreshold && currentIndex < maxIndex) {
            currentIndex++;
            updateCarousel();
        } else if (touchEndX > touchStartX + swipeThreshold && currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    }

    // Handle window resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            updateDots();
            updateCarousel();
        }, 250);
    });

    // Initialize carousel
    updateDots();
    updateCarousel();
}); 