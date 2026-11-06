const canvas = document.getElementById("universe");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 500;

let planet = {
    x: 200,
    y: 250,
    velocityX: 0,
    velocityY: -1,
    mass: 100
};

let star = {
    x: 400,
    y: 250,
    mass: 5000
};

let accelerationX = 0;
let accelerationY = 0;

let gravitationalConstant = 0.1;

let trail = [];

function drawPlanet() {
    ctx.beginPath();
    ctx.arc(planet.x, planet.y, 20, 0, Math.PI * 2);
    ctx.fillStyle = "#69D5FF";
    ctx.fill();
}

function drawStar() {
    ctx.beginPath();
    ctx.arc(star.x, star.y, 35, 0, Math.PI * 2);
    ctx.fillStyle = "#F5C76A";
    ctx.fill();
}

function drawTrail() {
    ctx.beginPath();

    for (let i = 0; i < trail.length; i++) {
        ctx.lineTo(trail[i].x, trail[i].y);
    }

    ctx.strokeStyle = "#69D5FF";
    ctx.lineWidth = 2;
    ctx.stroke();
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let dx = star.x - planet.x;
    let dy = star.y - planet.y;

    let distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < 36) {
        return;
    }

    accelerationX = gravitationalConstant * star.mass * dx / (distance * distance * distance);
    accelerationY = gravitationalConstant * star.mass * dy / (distance * distance * distance);

    planet.velocityX += accelerationX;
    planet.x += planet.velocityX;

    planet.velocityY += accelerationY;
    planet.y += planet.velocityY;

    trail.push({ x: planet.x, y: planet.y });

    if (trail.length > 500) {
        trail.shift();
    }

    drawTrail();
    drawPlanet();
    drawStar();

    requestAnimationFrame(animate);
}

animate();