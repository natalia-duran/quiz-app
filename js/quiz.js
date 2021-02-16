
$(document).ready(function(){
    console.log('Document is ready');

    // ---------------------------------- variables

    const question = $('#question');
    const counterTxt = $('#counterTxt');
    const radiosInputs = document.querySelectorAll('input[name="answer"]');

    const btnNext = $('#btnNext');
    const btnArrowBack = $('#btnArrowBack');

    let currentQuestion = {};
    let questionsCounter = 0;
    let selectedAnswers;

    let backendAnswers = [];
    let frontendAnswers = [];
    let fullstackAnswers = [];

    let questions = [
        {
            id: 1,
            question: "Do you enjoy working with data?",
            options: [
                "Yes, love it!",
                "Not, so much",
                "I think it's important"
            ]
        },
        {
            id: 2,
            question: "Do you consider yourself a visual or a logical person?",
            options: [
                "100% logical",
                "I need images in my life!",
                "I think both"
            ]
        },
        {
            id: 3,
            question: "Do you always want to know how things works?",
            options: [
                "Yes, always!",
                "Not so much",
                "Sometimes"
            ]
        },
        {
            id: 4,
            question: "What do you enjoy using an app with a good design?",
            options: [
                "Don't mind the design as long as it works as it should be",
                "Yes,  of course",
                "Sometimes"
            ]
        },
        {
            id: 5,
            question: "Do you tend to put yourselft in the user's shoes?",
            options: [
                "Nah",
                "Yes, always!",
                "Sometimes"
            ]
        }
    ];

    // ---------------------------------- events

    btnArrowBack.on('click', gotoBackHome);
    btnNext.on('click', nextQuestion);

    // ---------------------------------- functions

    function printQuestion(position) {
        counterTxt.text(`Question ${position + 1}/${questions.length}`);
        question.text(`${questions[position].question}`);
        questions[position].options.forEach( (option, index) => {
            let p = $("<p></p>").text(`${option}`); 
            $(`#option${index} p`).length > 0 && $(`#option${index} p`).remove();
            $(`#option${index}`).append(p); 
        });
    }

    // ------------------------------------ FIRST LOAD 

    printQuestion(questionsCounter);

    // ------------------------------------ AFTER PAGE HAS LOADED 

    function nextQuestion() {
        questionsCounter++;
        if(questionsCounter > questions.length - 1) {
            evaluateAnswers();
            window.location.href = "result.html";
        } else {
            saveAnswer(radiosInputs);
            printQuestion(questionsCounter);
        }
    }

    function saveAnswer(answersArray) {
        answersArray.forEach(answer => {
            if(answer.checked) {
                let selected = +answer.value;
                switch(selected) {
                    case 0:
                        backendAnswers.push(selected);
                        break;
                    case 1:
                        frontendAnswers.push(selected);
                        break;
                    case 2:
                        fullstackAnswers.push(selected);
                        break;
                }
            }
            answer.checked = false;
        });
    }

    function evaluateAnswers() {
        if(backendAnswers > frontendAnswers &&  backendAnswers > fullstackAnswers) {
            window.localStorage.setItem('RESULT', 'Backend Developer');
        } else if(frontendAnswers > fullstackAnswers) {
            window.localStorage.setItem('RESULT', 'Frontend Developer');
        } else {
            window.localStorage.setItem('RESULT', 'Fullstack Developer');
        }
    }
    
    function gotoBackHome() {
        window.history.back();
    }

});
