const canvas = document.getElementById('courtCanvas');
const ctx = canvas.getContext('2d');

// Funkcja rysująca boisko
function drawCourt() {
    // Tło boiska
    ctx.fillStyle = '#cfe2f3';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Linia środkowa
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Koła
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, 40, 0, 2 * Math.PI);
    ctx.stroke();

    // Rzuty za 3 punkty (przykładowe)
    ctx.beginPath();
    ctx.arc(canvas.width / 4, canvas.height / 2, 75, 0, Math.PI, false);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc((canvas.width * 3) / 4, canvas.height / 2, 75, 0, Math.PI, false);
    ctx.stroke();
}

// Funkcja rysująca piłkę w wybranym miejscu
function drawBall(x, y) {
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, 2 * Math.PI);
    ctx.fillStyle = 'orange';
    ctx.fill();
}

// Funkcja obsługująca kliknięcia na canvas
canvas.addEventListener('click', (event) => {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Rysujemy piłkę w miejscu kliknięcia
    drawBall(x, y);
});

// Funkcja czyszcząca boisko
function clearCourt() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawCourt();
}

// Rysowanie boiska przy starcie
drawCourt();