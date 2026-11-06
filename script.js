const canvas = document.getElementById("universe");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 500;

ctx.beginPath();
ctx.arc(400, 250, 20, 0, Math.PI * 2);
ctx.fillStyle = "#69D5FF";
ctx.fill();