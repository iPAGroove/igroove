document.addEventListener('DOMContentLoaded', () => {
    const languageSwitcher = document.getElementById('language-switcher');
    const langOptionsContainer = document.getElementById('lang-options');
    const langOptions = langOptionsContainer.querySelectorAll('span');
    const langSelectorIndicator = document.getElementById('lang-selector-indicator');

    const languages = Array.from(langOptions).map(span => span.getAttribute('data-lang'));
    let currentLangIndex; // Будет хранить индекс активного языка

    // Function to update the active language and indicator position
    const setActiveLanguage = (lang) => {
        // Remove 'active' class from all options
        langOptions.forEach((option, index) => {
            option.classList.remove('active');
            if (option.getAttribute('data-lang') === lang) {
                currentLangIndex = index; // Store the index of the active language
            }
        });

        // Add 'active' class to the selected language
        const selectedOption = langOptionsContainer.querySelector(`[data-lang="${lang}"]`);
        if (selectedOption) {
            selectedOption.classList.add('active');
            // Update indicator position
            updateIndicatorPosition(selectedOption);
            console.log(`Language set to: ${lang.toUpperCase()}`);
            // Save to localStorage (optional)
            localStorage.setItem('userLang', lang);
        }
    };

    // Function to update the indicator's position and width
    const updateIndicatorPosition = (activeElement) => {
        if (!activeElement) return;

        const containerRect = languageSwitcher.getBoundingClientRect();
        const activeRect = activeElement.getBoundingClientRect();

        // Calculate position relative to the languageSwitcher container's padding box
        const leftOffset = activeRect.left - containerRect.left - parseFloat(window.getComputedStyle(languageSwitcher).paddingLeft);
        const topOffset = activeRect.top - containerRect.top - parseFloat(window.getComputedStyle(languageSwitcher).paddingTop);

        langSelectorIndicator.style.left = `${leftOffset}px`;
        langSelectorIndicator.style.width = `${activeRect.width}px`;
        // Ensure indicator is vertically centered within the available space
        // This makes `top: 50%; transform: translateY(-50%);` in CSS work correctly.
    };

    // --- Swipe/Drag Logic ---
    let isDragging = false;
    let startX;
    let startLeft;

    languageSwitcher.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.clientX;
        startLeft = languageSwitcher.offsetLeft; // Get current left position of the switcher
        languageSwitcher.style.cursor = 'grabbing';
    });

    languageSwitcher.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        e.preventDefault(); // Prevent text selection
        const dx = e.clientX - startX;
        // Simple drag, not direct language switching yet
        // languageSwitcher.style.left = `${startLeft + dx}px`; 
    });

    languageSwitcher.addEventListener('mouseup', (e) => {
        if (!isDragging) return;
        isDragging = false;
        languageSwitcher.style.cursor = 'grab';

        const endX = e.clientX;
        const dragDistance = endX - startX;
        const threshold = 30; // Min pixels to register a swipe

        if (Math.abs(dragDistance) > threshold) {
            let nextLangIndex = currentLangIndex;
            if (dragDistance < 0) { // Swiped left
                nextLangIndex = Math.min(languages.length - 1, currentLangIndex + 1);
            } else { // Swiped right
                nextLangIndex = Math.max(0, currentLangIndex - 1);
            }

            if (nextLangIndex !== currentLangIndex) {
                setActiveLanguage(languages[nextLangIndex]);
            }
        }
    });

    // Handle touch events for mobile
    languageSwitcher.addEventListener('touchstart', (e) => {
        isDragging = true;
        startX = e.touches[0].clientX;
        // startLeft = languageSwitcher.offsetLeft; // Not needed for swipe-to-change-language
    }, { passive: true }); // Use passive to improve scrolling performance

    languageSwitcher.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        // No e.preventDefault() here if we want to allow scrolling too
        // We are just tracking touch position for swipe detection on touchEnd
    }, { passive: true });

    languageSwitcher.addEventListener('touchend', (e) => {
        if (!isDragging) return;
        isDragging = false;

        const endX = e.changedTouches[0].clientX;
        const dragDistance = endX - startX;
        const threshold = 30; // Min pixels to register a swipe

        if (Math.abs(dragDistance) > threshold) {
            let nextLangIndex = currentLangIndex;
            if (dragDistance < 0) { // Swiped left
                nextLangIndex = Math.min(languages.length - 1, currentLangIndex + 1);
            } else { // Swiped right
                nextLangIndex = Math.max(0, currentLangIndex - 1);
            }

            if (nextLangIndex !== currentLangIndex) {
                setActiveLanguage(languages[nextLangIndex]);
            }
        }
    });

    // Handle clicks directly on language spans (fallback/alternative to swipe)
    langOptions.forEach(option => {
        option.addEventListener('click', () => {
            setActiveLanguage(option.getAttribute('data-lang'));
        });
    });

    // Initial setup: set default language and position indicator
    const defaultLang = localStorage.getItem('userLang') || 'en'; // Default to 'en'
    setActiveLanguage(defaultLang);
    // Recalculate indicator position on window resize
    window.addEventListener('resize', () => {
        const activeOption = langOptionsContainer.querySelector('.lang-options span.active');
        if (activeOption) {
            updateIndicatorPosition(activeOption);
        }
    });
});
