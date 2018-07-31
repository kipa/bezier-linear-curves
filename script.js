var app = new PIXI.Application(document.body.offsetWidth, document.body.offsetHeight, { backgroundColor: 0xa22929, antialias: true });
document.body.appendChild(app.view);

var graphics = new PIXI.Graphics();
var mousePosition = app.renderer.plugins.interaction.mouse.global;
var curveCount = 0;
var coordinates = [
    { x: null, y: null },
    { x: null, y: null }
];

createElements();
createBezierCurve(coordinates);

function createTitle() {
    var title = document.createElement('div');
    title.className = "title";
    title.innerHTML = "Bezier curves";
    document.body.appendChild(title);
}

function createInfo() {
    var info = document.createElement('div');
    info.className = "info";
    info.innerHTML = "two dots, please!";
    document.body.appendChild(info);
}

function createCurveCounter() {
    var counter = document.createElement('div');
    counter.className = "counter";
    counter.id = 'counter';
    counter.innerHTML = curveCount;
    document.body.appendChild(counter);
}

function createElements() {
    createTitle();
    createInfo();
    createCurveCounter();
}

let dots = 0;
function createBezierCurve(coordinates) {
    document.body.onclick = function() {
        if (dots < 2) {
            graphics.lineStyle(0);
            graphics.beginFill(0xFFFFFF, 1);
            graphics.drawCircle(mousePosition.x, mousePosition.y, 7);
            graphics.endFill();
        
            coordinates[dots].x = mousePosition.x;
            coordinates[dots].y = mousePosition.y;

            dots++;
        }
        if (dots == 2) {
            createLinearCurve(coordinates);
        }
    }
}

function createLinearCurve(coordinates) {
    let Px, Py;
    for (let t = 0; t <= 1; t += 0.001) {
        setTimeout(function() {
            Px = (1 - t) * coordinates[0].x + t * coordinates[1].x;
            Py = (1 - t) * coordinates[0].y + t * coordinates[1].y;
            graphics.lineStyle(0);
            graphics.beginFill(0xFFFFFF, 1);
            graphics.drawCircle(Px , Py, 2);
            graphics.endFill();
        }, t * 500 );
    }
    dots = 0;
    curveCounter();
}

function curveCounter() {
    curveCount++;
    document.getElementById('counter').innerHTML = curveCount;
}

// function clear() {
//     graphics.clear();
// }

app.stage.addChild(graphics);