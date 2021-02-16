
(function checkStorage() {
    const dataStored = window.localStorage.getItem('USER_DATA');
    if(dataStored) {
        window.localStorage.setItem('USER_TYPE', 'recognized');
    } else {
        window.localStorage.setItem('USER_TYPE', 'anonymous');
    }
})();

