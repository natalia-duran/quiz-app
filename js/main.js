
$(document).ready(function(){

    // ------------------------------------ variables and object
    
    let currentUser;
    let moreOptionsVisible = false;

    const modal = $('#modal');
    const btnCloseModal = $('#btnCloseModal');
    const modalName = $('#modalName');
    const modalRole = $('#modalRole');
    const modalDescription = $('#modalDescription');
    const greetUser = $('#greetUser');
    const headerLeft = $('#headerLeft');
    const headerRight = $('#headerRight');
    const avatarInitials = $('#avatarInitials');
    const userMoreOptions = $('#userMoreOptions');
    const btnMoreOptions = $('#btnMoreOptions');
    const btnCheckData = $('#btnCheckData');
    const btnDeleteData = $('#btnDeleteData');
    const userName = $('#userName');
    const userRole = $('#userRole');
    const askNameBox = $('#askNameBox');
    const inputName = $('#inputName');
    const inpuFeedback = $('#inpuFeedback');
    const btnSaveUserName = $('#btnSaveUserName');
    const btnNoUserName = $('#btnNoUserName');
    const btnArrowBack = $('#btnArrowBack');

    const userType = window.localStorage.getItem('USER_TYPE');
    const userData = JSON.parse(window.localStorage.getItem('USER_DATA'));


    /**
    * User class.
    *
    * @constructor
    * @param {String} name          - The name.
    * @param {String} role          - The developer role.
    * @param {String} description   - The description.
    *
    /**
    * The deleteMyData method.
    *
    * @return {Void}
    */
    function User(name, role = 'No role yet', description = 'No description yet') {
        this.name = name;
        this.role = role;
        this.description = description; 
        this.deleteMyData = function() { 
            window.localStorage.clear(); 
            window.location.reload();
        };
    }

    // ------------------------------------ events

    btnArrowBack.on('click', goBackHome);
    btnMoreOptions.on('click', showMoreOptions);
    btnCloseModal.on('click', closeCheckData);
    btnSaveUserName.on('click', goToQuizWithName);
    btnNoUserName.on('click', goToQuizWithoutName);

    // ------------------------------------ functions  

    function greeting(user, data) {
        if(user && user === 'recognized') {
            currentUser = new User(data.name, data.role, data.description);
            createRecognizedGreeting(greetUser, currentUser.name, currentUser.role, currentUser.description);
        } else {
            createAnonymousGreeting(greetUser);
        }
    }

    function createAnonymousGreeting(domContainer) {
        const title = $('<h1></h1>').text('What type of developer are you?'); 
        const subtitle = $('<p></p>').text('Complete this quiz to find out!'); 
        const btn = $('<button></button>').text(`Let's give it a shot!`); 
        btn.attr({
            'id' : 'btnAnonymous',
            'class' : 'btn btn--large' 
        });
    
        domContainer.append(title);
        domContainer.append(subtitle);
        domContainer.append(btn);

        btn.click(goToAskUserName);
        headerLeft.hide();
        headerRight.hide();
    }

    function createRecognizedGreeting(domContainer, name, role, description) {

        const capitalizedName = capitalizeFirstLetter(name);

        const title = $('<h1></h1>').html(`<span>${capitalizedName},</span> welcome back!`); 
        const subtitle = $('<p></p>').text('Wanna take the quiz again?'); 
        const btn = $('<button></button>').text(`Let's do this!`); 
        btn.attr({
            'id' : 'btnNotAnonymous',
            'class' : 'btn'
        });

        domContainer.append(title);
        domContainer.append(subtitle);
        domContainer.append(btn);

        btn.click(() => window.location.href = "views/quiz.html");
        btnCheckData.click(() => openCheckData());
        btnDeleteData.click(() => currentUser.deleteMyData());

        headerLeft.hide();
        headerRight.show();

        const initials = getUserInitials(name);
        avatarInitials.text(`${initials}`); 
        userName.text(`${capitalizedName}`); 
        userRole.text(`${role}`); 
        
        modalName.text(`${capitalizedName}`); 
        modalRole.text(`${role}`); 
        modalDescription.text(`${description}`); 
    }

    // ------------------------------------ FIRST LOAD 

    greeting(userType, userData);


    // ------------------------------------ AFTER PAGE HAS LOADED 

    function goToAskUserName() {
        greetUser.fadeOut('fast');
        askNameBox.fadeIn();
        headerLeft.show();
    }

    function goBackHome() {
        askNameBox.fadeOut('fast');
        greetUser.fadeIn();
        headerLeft.hide();
    }

    function showMoreOptions() {
        moreOptionsVisible = !moreOptionsVisible;
        moreOptionsVisible ? userMoreOptions.fadeIn('fast') : userMoreOptions.fadeOut('fast');
    }

    function getUserInitials(name) {
        let userName = name.trim(); 
        let initials = userName.split('', 2); 
        initials[0] = initials[0].toUpperCase();
        return initials.join('');
    }

    function capitalizeFirstLetter(str) {
        let userName = str.trim(); 
        let words = userName.split(" ");
        let capitalizedWords = words.map((word) => word[0].toUpperCase() + word.substring(1)).join(' ');
        return capitalizedWords;
    }

    function openCheckData() {
        modal.fadeIn('fast');
    }

    function closeCheckData() {
        modal.fadeOut('fast');
    }
    
    function goToQuizWithName() {
        if(inputName.val()) {
            currentUser = new User(inputName.val());
            window.localStorage.setItem('USER_DATA', JSON.stringify(currentUser));
            window.location.href = "views/quiz.html";
        } else {
            inpuFeedback.show();
            inputName.on('keyup', () => inputName.val() ? inpuFeedback.hide() : inpuFeedback.show());
        }
    }
    
    function goToQuizWithoutName() {
        inputName.val('');
        window.location.href = "views/quiz.html";
    }   
  
});

