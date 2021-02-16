
$(document).ready(function(){
    console.log('Document is ready');

    // ------------------------------------ variables 
    let currentUser;
    const greetUser = $('#greetUser');
    const headerBox = $('#headerBox');
    const headerUser = $('#headerUser');
    const btnDelete = $('#btnDelete');
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

    btnSaveUserName.on('click', gotoQuizWithName);
    btnNoUserName.on('click', gotoQuizWithoutName);
    btnArrowBack.on('click', gotoBackHome);

    // ------------------------------------ functions  

    function greeting(user, data) {
        if(user && user === 'recognized') {
            currentUser = new User(data.name, data.role, data.description);
            createRecognizedGreeting(greetUser, currentUser.name);
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
            'class' : 'btn'
        });
    
        domContainer.append(title);
        domContainer.append(subtitle);
        domContainer.append(btn);

        btn.click(goToaskUserName);
        headerBox.hide();
        headerUser.hide();
    }

    function createRecognizedGreeting(domContainer, name) {
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
        btnDelete.click(() => currentUser.deleteMyData());
        headerBox.hide();
        headerUser.show();
    }

    // ------------------------------------ FIRST LOAD 

    greeting(userType, userData);


    // ------------------------------------ AFTER PAGE HAS LOADED 

    function goToaskUserName() {
        greetUser.hide();
        askNameBox.show();
        headerBox.show();
    }

    function gotoBackHome() {
        greetUser.show();
        askNameBox.hide();
        headerBox.hide();
    }
    
    function gotoQuizWithName() {
        if(inputName.val()) {
            currentUser = new User(inputName.val());
            window.localStorage.setItem('USER_DATA', JSON.stringify(currentUser));
            window.location.href = "views/quiz.html";
        } else {
            inpuFeedback.show();
            inputName.on('keyup', () => inputName.val() ? inpuFeedback.hide() : inpuFeedback.show());
        }
    }
    
    function gotoQuizWithoutName() {
        inputName.val('');
        window.location.href = "views/quiz.html";
    }    
  
});

