var E = 0; // V/m
let dt = 0.01;
let es = [];
let width = 1200;
let height = 800;
var canvas;
var updateCanvas;
var change_E;
var actual_E;

class electron {
    constructor(posX, posY, R) {
        this.pos = {x: posX, y: posY};
        this.v = 0; // prędkość [m/s]
        this.alpha = 0; // kąt odchylenia od osi x
        this.r = R || 10;
        this.q = -1.602e-19;  // ładunek [C]
        this.m = 9.1e-31;  // [kg]
        this.execution = 0; // jak wyjdzie poza ekran to zrobić rach ciach ciach
    }

    draw() {
        fill(0, 150, 200);
        circle(this.pos.x, this.pos.y, this.r);
    }

    update(E=0, B=0) {
        let vX = this.v * cos(this.alpha);
        let vY = this.v * sin(this.alpha);
        this.pos.x += vX * dt;
        if(this.pos.x > width - 10 || this.pos.x < 0){
            this.execution = 1;
        }
        this.pos.y -= vY *dt;
        if(this.pos.y < 0 || this.pos.y > height){
            this.execution = 1;
        }
        let a = this.q * E / this.m;
        vX += a * dt;
        if (vX != 0) {
            this.alpha = atan(vY / vX);
        }
        else {
            this.alpha = 0;
        }
        this.v = (vX**2 + vY**2)**(1/2);
    }
}


function setup() {
    canvas = createCanvas(width, height);
    updateCanvas = document.getElementById('update_Canvas');
    updateCanvas.addEventListener('click', update_Canvas);
    change_E = document.getElementById('Eslider');
    change_E.addEventListener("change", update_E);
    actual_E = document.getElementById("E_value");
    actual_E.textContent = 0;
}

function update_E() {
    E = -change_E.value;
    actual_E.textContent = E;
}

function update_Canvas() {
    es.length = 0;
    width = document.getElementById("width-input").value;
    height = document.getElementById("height-input").value;
    canvas = createCanvas(width, height);
}


function update_all() {
    for (let e of es) {
        e.update(E=E);
        e.draw();
        if(e.execution == 1){
            let i = es.findIndex(q => q.pos === e.pos);
            es.splice(i, 1);
        }
    }
}


function mousePressed() {
    es.push(new electron(mouseX, mouseY));
}


function draw() {
    background(220);
    update_all();
    console.log(es.length);
}
