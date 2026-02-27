const htmlElement = document.documentElement;
const themeButtons = document.querySelectorAll('[data-theme]');
const savedTheme = localStorage.getItem('theme') || 'light';


// Theme beim Laden wiederherstellen
htmlElement.setAttribute('data-bs-theme', savedTheme);


function setTheme(theme) {
    if (theme === 'auto') {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        htmlElement.setAttribute('data-bs-theme', prefersDark ? 'dark' : 'light');
    } else {
        htmlElement.setAttribute('data-bs-theme', theme);
        localStorage.setItem('theme', theme);

    }
}

themeButtons.forEach(button => {
    button.addEventListener('click', () => {
        setTheme(button.getAttribute('data-theme'));
    });
});