document.addEventListener('DOMContentLoaded', () => {
    const languageSwitcher = document.getElementById('language-switcher');
    const currentLangDisplay = document.getElementById('current-lang');
    const langOptionsContainer = document.getElementById('lang-options');
    const langOptions = langOptionsContainer.querySelectorAll('span');

    // Function to set the active language
    const setActiveLanguage = (lang) => {
        // Remove 'active' class from all options
        langOptions.forEach(option => {
            option.classList.remove('active');
        });

        // Add 'active' class to the selected language
        const selectedOption = langOptionsContainer.querySelector(`[data-lang="${lang}"]`);
        if (selectedOption) {
            selectedOption.classList.add('active');
            currentLangDisplay.textContent = lang.toUpperCase(); // Update the displayed current language
            // Here you would typically load translations based on 'lang'
            // For now, it just updates the visual selection.
            console.log(`Language set to: ${lang.toUpperCase()}`);
            // You might want to save this preference in localStorage
            // localStorage.setItem('userLang', lang);
        }
    };

    // Event listener for clicking on language options
    langOptions.forEach(option => {
        option.addEventListener('click', () => {
            const selectedLang = option.getAttribute('data-lang');
            setActiveLanguage(selectedLang);
            // Optionally, close the dropdown after selection (if not using hover-only)
            // languageSwitcher.classList.remove('open');
        });
    });

    // Set initial active language (e.g., from localStorage or default to 'ru')
    // const savedLang = localStorage.getItem('userLang') || 'ru';
    // setActiveLanguage(savedLang);
    setActiveLanguage('ru'); // Default to RU for this example
});
