const canvas = document.getElementById("universe");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 500;

let planetX = 200;
let planetY = 250;

let velocityX = 0;
let velocityY = -1;

let accelerationX = 0;
let accelerationY = 0;

let starX = 400;
let starY = 250;

let planetMass = 100;
let starMass = 5000;

let gravitationalConstant = 0.1;

function drawPlanet() {
    ctx.beginPath();
    ctx.arc(planetX, planetY, 20, 0, Math.PI * 2);
    ctx.fillStyle = "#69D5FF";
    ctx.fill();
}

function drawStar() {
    ctx.beginPath();
    ctx.arc(starX, starY, 35, 0, Math.PI * 2);
    ctx.fillStyle = "#F5C76A";
    ctx.fill();
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let dx = starX - planetX;
    let dy = starY - planetY;

    let distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < 36) {
        return;
    }

    if (distance < 1) {
        distance = 1;
    }

    accelerationX = gravitationalConstant * starMass * dx / (distance * distance * distance);
    accelerationY = gravitationalConstant * starMass * dy / (distance * distance * distance);

    velocityX += accelerationX;
    planetX += velocityX;

    velocityY += accelerationY;
    planetY += velocityY;

    drawPlanet();
    drawStar();

    requestAnimationFrame(animate);
}

animate();