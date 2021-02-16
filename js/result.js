
$(document).ready(function(){
    console.log('Document is ready');
    const resultTxt = $('#resultTxt');
    const savedResult = window.localStorage.getItem('RESULT');

    if(savedResult) {
        resultTxt.text(`You are a ${savedResult} at heart!`);
    } else {
        resultTxt.text(`Sorry, something went wrong`);
    }

});