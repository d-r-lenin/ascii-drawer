console.log("hello");

const area = document.querySelector("#container");

const style = area.style;
let brush = "g";
let mousedown = false;
let fontSize = 16;

const canvas = new AsciiCanvas(area, {
    width: 20,
    height: 10,
    fontSize: fontSize
})


document.querySelector("#brush").addEventListener("input", changeBrush);

document.querySelector("#copy").addEventListener("click", copyText);


function changeBrush(e){
    const target = e.target;
    if(target.value.length > 1){
        target.value = target.value[target.value.length - 1];
    }
    if(target.value == "" ) {
        target.value = " ";
    };
    
    if(target.value !== canvas.brush){
        canvas.brush = target.value
    }
}

function copyText(){
    const text = document.createElement("textarea");
    text.value = canvas.area.innerText;
    document.body.appendChild(text);
    text.select();
    document.execCommand("copy");
    document.body.removeChild(text);
    alert("copied");
}