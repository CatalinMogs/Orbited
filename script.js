const canvas = document.getElementById("universe");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 500;

let planetX = 200;
let planetY = 250;

let velocityX = 0;
let velocityY = 0;

let accelerationX = 0;
let accelerationY = 0;

let starX = 400;
let starY = 250;

let planetMass = 100;

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

    velocityX += accelerationX;
    planetX += velocityX;

    velocityY += accelerationY;
    planetY += velocityY;

    if (planetX > canvas.width + 20) {
        planetX = -20;
    }

    if (planetY > canvas.height + 20) {
        planetY = -20;
    }

    drawPlanet();
    drawStar();

    requestAnimationFrame(animate);
}

animate();