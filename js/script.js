const area = document.querySelector("#container");

const brushSelectionInput = document.querySelector(".select-brush");

const style = area.style;
let brush = "#";
let background = ")";
let mousedown = false;
let fontSize = 16;

const canvas = new AsciiCanvas(area, {
    width: 20,
    height: 10,
    fontSize: fontSize,
    background: background,
});

document.querySelector("#brush").addEventListener("input", setBackground);

document.querySelector("#copy").addEventListener("click", copyText);

brushSelectionInput.addEventListener('change', e =>{
    changeBrush(e);
})

addBrushes(background);

async function addBrushes(backgrond){
    let brushes = await getAllValidChars(background);
    console.log(brushes, backgrond);
    brushSelectionInput.innerHTML = "";
    for(let i in brushes){
        let option = document.createElement("option");
        option.value = brushes[i];
        option.innerText = brushes[i];
        brushSelectionInput.appendChild(option);
    }
}

function setBackground(e) {
    const target = e.target;
    if (target.value.length > 1) {
        target.value = target.value[target.value.length - 1];
    }
    if (target.value == "") {
        target.value = " ";
    }

    console.log(target.value);
    background = target.value;

    if (target.value !== canvas.background) {
        canvas.changeBackground(target.value);
        canvas.stroke();
    }
    addBrushes(target.value);
}


function changeBrush(e) {
    const target = e.target;
    if (target.value.length > 1) {
        target.value = target.value[target.value.length - 1];
    }
    if (target.value == "") {
        target.value = " ";
    }

    if (target.value !== canvas.brush) {
        canvas.brush = target.value;
    }
}

function copyText() {
    const text = document.createElement("textarea");
    text.value = canvas.area.innerText;
    document.body.appendChild(text);
    text.select();
    document.execCommand("copy");
    document.body.removeChild(text);
    alert("copied");
}
