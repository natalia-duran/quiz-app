
$(document).ready(function(){

    // ---------------------------------- variables

    const dataStored = JSON.parse(window.localStorage.getItem('USER_DATA'));

    const quiz = $('#quiz');
    const question = $('#question');
    const counterTxt = $('#counterTxt');
    const inpuFeedback = $('#inpuFeedback');

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
        quiz.fadeIn('fast');
    }

    // ------------------------------------ FIRST LOAD 

    printQuestion(questionsCounter);

    // ------------------------------------ AFTER PAGE HAS LOADED 

    function nextQuestion() {
        if(!$("input[name='answer']:checked").val()) {
            inpuFeedback.show();
        } else {
            inpuFeedback.hide();
            questionsCounter++;
            if(questionsCounter > questions.length - 1) {
                processResult(dataStored);
                window.location.href = "result.html";
            } else {
                saveAnswer();
                printQuestion(questionsCounter);
            }
        }
    }

    function saveAnswer() {
        let selectedAnswer = $('input[name="answer"]:checked');
        if(selectedAnswer) {
            let selected = +selectedAnswer.val();
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
        selectedAnswer.prop('checked', false);
    }

    function processResult(data) {
        const result = getResult();
        window.localStorage.setItem('RESULT', result);
        data && checkDataStored(data, 'role', result);  
    }

    function getResult() {
        if(backendAnswers > frontendAnswers &&  backendAnswers > fullstackAnswers) {
            return 'Backend Developer';
        } else if(frontendAnswers > fullstackAnswers) {
            return 'Frontend Developer';
        } else {
            return 'Fullstack Developer';
        }
    }

     function checkDataStored(dataObj, keyName, updatedValue) {
        const dataStored = JSON.parse(window.localStorage.getItem('USER_DATA'));
        if(dataObj[keyName]) {
            const dataAux = {...dataObj};
            dataAux[keyName] = updatedValue;
            window.localStorage.removeItem('USER_DATA');
            window.localStorage.setItem('USER_DATA', JSON.stringify(dataAux));
        } 
    }

    function gotoBackHome() {
        window.history.back();
    }


});
