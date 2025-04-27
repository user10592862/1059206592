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
