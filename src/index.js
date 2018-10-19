import './indexApp';
// import './indexAuto';
// import './util/translateHelper';

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    e.prompt();
});