
$(document).ready(function(){

    // ------------------------------------ variables 
    
    let currentUser;
    let visibleMoreoptions = false;
    const greetUser = $('#greetUser');
    const headerLeft = $('#headerLeft');
    //const headerUser = $('#headerUser');
    const headerRight = $('#headerRight');
    const userMoreOptions = $('#userMoreOptions');
    const btnMoreOptions = $('#btnMoreOptions');
    const btnDeleteData = $('#btnDeleteData');
    const btnDelete = $('#btnDelete');
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
    btnSaveUserName.on('click', goToQuizWithName);
    btnNoUserName.on('click', goToQuizWithoutName);

    // ------------------------------------ functions  

    function greeting(user, data) {
        if(user && user === 'recognized') {
            currentUser = new User(data.name, data.role, data.description);
            createRecognizedGreeting(greetUser, currentUser.name, currentUser.role);
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
        // headerUser.hide();
        headerRight.hide();
    }

    function createRecognizedGreeting(domContainer, name, role) {
        const title = $('<h1></h1>').text(`${name}, welcome back!`); 
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
        // btnDelete.click(() => currentUser.deleteMyData());
        btnDeleteData.click(() => currentUser.deleteMyData());

        headerLeft.hide();
        // headerUser.show();
        headerRight.show();

        userName.text(`${name}`); 
        userRole.text(`${role}`); 
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
        visibleMoreoptions = !visibleMoreoptions;
        visibleMoreoptions ? userMoreOptions.fadeIn('fast') : userMoreOptions.fadeOut('fast');
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

