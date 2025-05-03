// Mobile hero text adjustment (hero h1 only)
function adjustHeroText() {
    if (window.innerWidth <= 768) {
        const heroH1 = document.querySelector('.hero-content h1');
        if (heroH1) {
            // Reset font size before calculation
            heroH1.style.fontSize = '';
            
            // Scale down if overflowing
            while (heroH1.scrollWidth > heroH1.offsetWidth && 
                   parseFloat(getComputedStyle(heroH1).fontSize) > 16) {
                const currentSize = parseFloat(getComputedStyle(heroH1).fontSize);
                heroH1.style.fontSize = (currentSize - 1) + 'px';
            }
        }
    }
}

// Run on load and resize
window.addEventListener('load', adjustHeroText);
window.addEventListener('resize', adjustHeroText);

// Smooth Page Transitions (JS Only)
document.addEventListener('DOMContentLoaded', function() {
    // Animation configuration
    const config = {
        fadeDuration: 0,
        staggerDelay: 0,
        blockAnimation: true
    };

    // Initialize page with fade-in
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = `opacity ${config.fadeDuration}ms ease`;
        document.body.style.opacity = '1';
        animateBlocks();
    }, 100);

    // Handle internal navigation
    document.querySelectorAll('a').forEach(link => {
        if (shouldAnimateLink(link)) {
            link.addEventListener('click', handleLinkClick);
        }
    });

    // Handle back/forward navigation
    window.addEventListener('pageshow', () => {
        document.body.style.opacity = '0';
        setTimeout(() => {
            document.body.style.opacity = '1';
            animateBlocks();
        }, 50);
    });

    // Animation functions
    function shouldAnimateLink(link) {
        return !link.target && 
               !link.href.includes('#') && 
               (link.href.includes(window.location.origin) || 
                link.href.startsWith('/') || 
                link.href.startsWith('./'));
    }

    function handleLinkClick(e) {
        e.preventDefault();
        const href = this.getAttribute('href');
        
        // Fade out current page
        document.body.style.opacity = '0';
        
        // Navigate after fade out
        setTimeout(() => {
            window.location.href = href;
        }, config.fadeDuration);
    }

    function animateBlocks() {
        if (!config.blockAnimation) return;
        
        const blocks = document.querySelectorAll('.about-card, .service-card, .feature-card, .stats-item');
        
        blocks.forEach((block, index) => {
            block.style.opacity = '0';
            block.style.transform = 'translateY(20px)';
            block.style.transition = `all 0.4s ease ${index * config.staggerDelay}ms`;
            
            setTimeout(() => {
                block.style.opacity = '1';
                block.style.transform = 'translateY(0)';
            }, 100);
        });
    }

    // Re-run block animation when elements come into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.4s ease';
        observer.observe(el);
    });
});

// Mobile Menu Functionality
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuButton = document.querySelector('.mobile-menu');
    const navbar = document.querySelector('.navbar');
    
    mobileMenuButton.addEventListener('click', function() {
        this.classList.toggle('active');
        navbar.classList.toggle('active');
        
        // Toggle body scroll when menu is open
        if (navbar.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });
    
    // Close menu when clicking on a nav link
    const navLinks = document.querySelectorAll('.navbar a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navbar.classList.contains('active')) {
                mobileMenuButton.classList.remove('active');
                navbar.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });
});
