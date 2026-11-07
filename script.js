const canvas = document.getElementById("universe");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 500;

const massInput = document.getElementById("mass")

let planet = {
    x: 200,
    y: 250,
    velocityX: 0,
    velocityY: -1,
    mass: 100,
    trail: [],
    color: "#69D5FF"
};

let secondPlanet = {
    x: 600,
    y: 250,
    velocityX: 0,
    velocityY: 1,
    mass: 1000,
    trail: [],
    color: "#800080"
};

let planets = [planet, secondPlanet];

let selectedPlanet = null;

let star = {
    x: 400,
    y: 250,
    mass: 5000
};

let accelerationX = 0;
let accelerationY = 0;

let gravitationalConstant = 0.1;

let timeStep = 0.1;

let trail = [];

function drawPlanet(body) {
    ctx.beginPath();
    ctx.arc(body.x, body.y, 20, 0, Math.PI * 2);
    ctx.fillStyle = body.color;
    ctx.fill();

    if (body === selectedPlanet) {
        ctx.beginPath();
        ctx.arc(body.x, body.y, 25, 0, Math.PI * 2);
        ctx.strokeStyle = "#FFFFFF";
        ctx.lineWidth = 2;
        ctx.stroke();
    }

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

        let accelerationX = 0;
        let accelerationY = 0;

        for (let j = 0; j < planets.length; j++) {
            if (i === j) {
                continue;
            }

            let otherBody = planets[j];

            let dx = otherBody.x - body.x;
            let dy = otherBody.y - body.y;

            let distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 40) {
                continue;
            }

            accelerationX += gravitationalConstant * otherBody.mass * dx / (distance * distance * distance);
            accelerationY += gravitationalConstant * otherBody.mass * dy / (distance * distance * distance);
        }

        let dx = star.x - body.x;
        let dy = star.y - body.y;

        let distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 36) {
            continue;
        }

       accelerationX += gravitationalConstant * star.mass * dx / (distance * distance * distance);
       accelerationY += gravitationalConstant * star.mass * dy / (distance * distance * distance);

       body.accelerationX = accelerationX;
       body.accelerationY = accelerationY;
    }

    for (let i = 0; i < planets.length; i++) {
        let body = planets[i];

        body.velocityX += body.accelerationX * timeStep;
        body.x += body.velocityX * timeStep;

        body.velocityY += body.accelerationY * timeStep;
        body.y += body.velocityY * timeStep;

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

canvas.addEventListener("click", function(e) {
    selectedPlanet = null;

    for (let i = 0; i < planets.length; i++) {
        let body = planets[i];

        let dx = e.offsetX - body.x;
        let dy = e.offsetY - body.y;

        let distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 20) {
            selectedPlanet = body;
            console.log("Planet selected!")
            break;
        }
    }

    if (selectedPlanet !== null) {
        return;
    }
    
    let newPlanet = {
        x: e.offsetX,
        y: e.offsetY,
        velocityX: 0,
        velocityY: 0,
        mass: 100,
        trail: [],
        color: "#69D5FF"
    };

    planets.push(newPlanet);
});

massInput.addEventListener("input", function() {
    if (selectedPlanet !== null) {
        selectedPlanet.mass = Number(massInput.value);
        console.log(selectedPlanet.mass)
    }
});