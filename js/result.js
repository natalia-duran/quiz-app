
$(document).ready(function(){
    console.log('Document is ready');
    const resultGif = $('#resultGif');
    const resultTxt = $('#resultTxt');
    const savedResult = window.localStorage.getItem('RESULT');

    if(savedResult) {
        getGif('ZdNlmHHr7czumQPvNE');
        resultTxt.text(`You are a ${savedResult} at heart!`);
    } else {
        resultTxt.text(`Sorry, something went wrong`);
    }

    function getGif(gifID) {
        $.ajax({
            type: 'GET',
            url: `https://api.giphy.com/v1/gifs/${gifID}?api_key=CYW3EuyjrCi3vADzppFkwvvgdyierAxf`,
            dataType: 'json',
            success: (res) => {
                const { data: {title}, data: {images: {original: {url}}} } = res;
                const img = $('<img>').attr({
                        'src' : url,
                        'alt' : title,
                        'class' : 'result__gif'
                    });
                resultGif.append(img);
            },
            error: (error) => {
                resultGif.remove();
            }
        });
    }  

});