
class AsciiCanvas{
    constructor(root,{ width, height, fontSize }){
        if(root){
            this.root = root;
        }else{
            this.root = document;
        }
        this.fontSize = fontSize;
        this.width = width;
        this.height = height;
        this.clientHeight = this.height * this.fontSize;
        this.clientWidth = this.width * (this.fontSize/2);
        this.brush = "@";
        this.background = ' '
        this.resultArray = [];
        this.init();
        this.initEvent();

    }

    init(){
        this.area = document.createElement("div");
        this.area.classList.add("asciiCanvas");
        this.area.style.width = this.width + "ch";
        this.area.style.height = `calc(${this.height * 2}ch + ${this.fontSize/2}px)`;
        this.area.style.overflowWrap = "anywhere";
        this.area.style.fontFamily = "monospace";
        this.area.style.fontSize = this.fontSize+ "px";
        this.area.style.userSelect = "none";
        this.area.style.backgroundColor = "#000";
        // this.area.style.color = "blue";
        this.area.style.padding = "0";
        this.area.style.cursor = "cell";
        this.area.style.lineHeight = "1em";
        this.area.style.border = "2px solid red";
        this.area.style.color = "white";
        this.area.style.letterSpacing = "";
        this.area.style.whiteSpace = "pre-wrap"
        this.area.style.textDecorationColor = "red";
        this.area.innerText = "";


        this.reset();


        this.arraySize = this.resultArray.length;
        // console.log(this.resultArray);

        this.root.appendChild(this.area);
    }

    reset (){
        this.resultArray = [];
        for(let i = 0; i < this.height+1 ; i++){
            for(let j = 0; j < this.width; j++){
                // console.log(i,j);
                this.resultArray.push(this.background);
                // this.resultArray.push(`<span style = "width:${this.fontSize/2}px;height: ${this.fontSize}px; display:inline-block; background:red;"></span>`);
            }
            this.resultArray.push("\n");
        }
        this.stroke();
    }

    stroke = () => {
        // this.area.innerHTML = this.resultArray.join("");
        this.area.innerText = this.resultArray.join("");
    }

    point(ix,iy){
        
        // if(this.resultArray.length + 1 > 200) return;

        let i = ix + (iy * this.width);
        i = i + iy;

        if(!this.resultArray[i] || this.resultArray[i] === "\n") {
            console.log("ture babe");
            return;
        }
        // console.log(i);
        // console.log(this.resultArray[i]);

        if(this.eraser){
            this.resultArray[i] = this.background;
        }else{
            this.resultArray[i] = this.brush;
        }
        // this.resultArray.push(this.brush);
    }

    changeBackground = (newBack)=>{

        for(let i in this.resultArray){
            if(this.resultArray[i] === this.background){
                this.resultArray[i] = newBack
            }
        }

        this.background = newBack;
    }


    initEvent = () => { 
        this.area.ontouchstart = this.touchStartEventHandle
        this.area.ontouchend = this.touchEndEventHandle
        this.area.ontouchmove = this.touchMoveEventHandle

        this.area.addEventListener('mousemove', this.mouseMoveEventHandle);

        this.area.addEventListener('mousedown',this.mouseDownEventHandle)

        this.area.addEventListener("mouseup", this.mouseUpEventHandle)

        
    }

    mouseUpEventHandle =  e =>{
        this.mousedown = false;
    }

    touchEndEventHandle = e => {
        this.mousedown = false;
    }

    touchMoveEventHandle = e => {
        if(e.touches.length > 1) return;
        e.preventDefault();
        this.mouseMoveEventHandle(e.touches[0]);
    }

    touchStartEventHandle = e => {
        if(e.touches.length > 1) return;
        e.preventDefault();
        this.mouseDownEventHandle(e.touches[0]);
    }

    mouseMoveEventHandle =  (event) => {
        let x = event.pageX;
        let y = event.pageY;
        x = x - this.area.offsetLeft + this.root.scrollLeft ;
        y = y - this.area.offsetTop + this.root.scrollTop;

        let ix = Math.floor( x / (this.fontSize/1.82) );
        let iy = Math.floor( y /this.fontSize);

        // console.log(this.root.scrollLeft,this.area.scrollTop);
        // console.log(event);

        if(this.mousedown){
            this.point(ix,iy);
            this.stroke();
        }
    }

    mouseDownEventHandle = event =>{
        let x = event.pageX;
        let y = event.pageY;
        x = x - this.area.offsetLeft + this.root.scrollLeft ;
        y = y - this.area.offsetTop + this.root.scrollTop;
        let ix = Math.floor( x / (this.fontSize/1.82) );
        let iy = Math.floor( y /this.fontSize);

        // console.log(ix,iy , x,y);

        this.point(ix,iy);
        this.stroke();
        this.mousedown = true;
    }


}

