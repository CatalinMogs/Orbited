const canvas = document.getElementById("universe");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 500;

let planet = {
    x: 200,
    y: 250,
    velocityX: 0,
    velocityY: -1,
    mass: 100,
    trail: []
};

let secondPlanet = {
    x: 600,
    y: 250,
    velocityX: 0,
    velocityY: 1,
    mass: 100,
    trail: []
};

let planets = [planet, secondPlanet];

let star = {
    x: 400,
    y: 250,
    mass: 5000
};

let accelerationX = 0;
let accelerationY = 0;

let gravitationalConstant = 0.1;

let trail = [];

function drawPlanet(body) {
    ctx.beginPath();
    ctx.arc(body.x, body.y, 20, 0, Math.PI * 2);
    ctx.fillStyle = "#69D5FF";
    ctx.fill();
}

function drawStar() {
    ctx.beginPath();
    ctx.arc(star.x, star.y, 35, 0, Math.PI * 2);
    ctx.fillStyle = "#F5C76A";
    ctx.fill();
}

function drawTrail(body) {
    ctx.beginPath();

    for (let i = 0; i < body.trail.length; i++) {
        ctx.lineTo(body.trail[i].x, body.trail[i].y);
    }

    ctx.strokeStyle = "#69D5FF";
    ctx.lineWidth = 2;
    ctx.stroke();
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < planets.length; i++){
        let body = planets[i];

        let dx = star.x - body.x;
        let dy = star.y - body.y;

        let distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 36) {
            continue;
        }

       let accelerationX = gravitationalConstant * star.mass * dx / (distance * distance * distance);
       let accelerationY = gravitationalConstant * star.mass * dy / (distance * distance * distance);

       body.velocityX += accelerationX;
       body.x += body.velocityX;

       body.velocityY += accelerationY;
       body.y += body.velocityY;

       body.trail.push({ x: body.x, y: body.y });

       if (body.trail.length > 500) {
            body.trail.shift();
       }
    }
    
    for (let i = 0; i < planets.length; i++) {
        drawTrail(planets[i]);
        drawPlanet(planets[i]);
    }

    drawStar();

    requestAnimationFrame(animate);
}

animate();