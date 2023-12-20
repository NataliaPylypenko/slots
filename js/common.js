const messages = {
    'en': {
        "playNow": "Play now",
    },
    'pt': {
        "playNow": "Jogue agora",
    },
    'de': {
        "playNow": "Jetzt spielen",
    },
    'pl': {
        "playNow": "Zagraj teraz",
    },
    'ca-EN': {
        "playNow": "Play now",
    },
    'ca-FR': {
        "playNow": "Jouer nouveau",
    },
    'au': {
        "playNow": "Play now",
    },
    'nz': {
        "playNow": "Play now",
    },
    'in': {
        "playNow": "Play now",
    },
};

const refs = {
    userLanguage: navigator.language || navigator.userLanguage,
    url: new URL(window.location.href),
    playNow: document.querySelector('#playNow'),
    selectLanguage: document.querySelector('.languagepicker-dropduwn')
};

// languagepicker
function detectLanguage() {
    const paramName = 'lang';
    if (!refs.url.searchParams.has(paramName)) {
        refs.url.searchParams.set(paramName, refs.userLanguage);
        window.history.replaceState({}, '', refs.url);
        window.location.reload();
    }
}

function getLanguage() {
    return refs.url.searchParams.get('lang');
}
let currentLanguage = getLanguage();
currentLanguage = messages.hasOwnProperty(currentLanguage) ? currentLanguage : 'en';

function setLanguage(language) {
    const paramName = 'lang';
    refs.url.searchParams.set(paramName, language);
    window.history.replaceState({}, '', refs.url);
    window.location.reload();
}

function changeLanguageHandler() {
    refs.selectLanguage.addEventListener('click', (e) => {
        e.preventDefault();
        if (e.target.tagName === 'A') {
            const language = e.target.dataset.lang;
            setLanguage(language);
        }
    });

    const img = document.querySelector('.languagepicker a img');
    img.src = `images/lang/${currentLanguage}.png`;
}

detectLanguage();
changeLanguageHandler();

// rendering of texts
refs.playNow.innerHTML = messages[currentLanguage].playNow;