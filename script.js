const canvas = document.getElementById("universe");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 500;

let planetX = 400;
let planetY = 250;
let velocityX = 1;
let accelerationX = 0.05;

function drawPlanet() {
    ctx.beginPath();
    ctx.arc(planetX, planetY, 20, 0, Math.PI * 2);
    ctx.fillStyle = "#69D5FF";
    ctx.fill();
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    velocityX += accelerationX;
    planetX += velocityX;

    drawPlanet();

    requestAnimationFrame(animate);
}

animate();