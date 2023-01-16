// function to take screenshot of given element

function takeshot() {
    let div =
        document.querySelector('.asciiCanvas');

    // Use the html2canvas
    // function to take a screenshot
    // and append it
    // to the output div
    html2canvas(div).then(
        function (canvas) {
            // download image
        var link = document.createElement('a');
        link.download = 'image.png';
        link.href = canvas.toDataURL();
        link.click();
        link.delete;
        })

        
}