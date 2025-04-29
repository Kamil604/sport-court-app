const canvas = document.getElementById('fieldCanvas');
const ctx = canvas.getContext('2d');

let elements = []; // Przechowywanie elementów boiska
let selectedElement = null; // Przechowuje zaznaczony element
let offsetX, offsetY;

// Funkcja rysująca boisko
function drawField() {
  const fieldType = document.getElementById('fieldType').value;
  const lineColor = document.getElementById('lineColor').value;
  const fieldColor = document.getElementById('fieldColor').value;

  // Czyść boisko
  ctx.fillStyle = fieldColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = lineColor;
  ctx.lineWidth = 3;

  // Rysowanie boiska w zależności od wybranego typu
  switch (fieldType) {
    case 'basketball':
      drawBasketballCourt();
      break;
    case 'volleyball':
      drawVolleyballCourt();
      break;
    case 'handball':
      drawHandballCourt();
      break;
  }
}

// Funkcje rysujące różne boiska
function drawBasketballCourt() {
  // Prostokąt główny
  elements.push({type: 'rect', x: 100, y: 50, width: 600, height: 400});
  drawElement(elements[elements.length - 1]);

  // Linia środkowa
  elements.push({type: 'line', x1: 400, y1: 50, x2: 400, y2: 450});
  drawElement(elements[elements.length - 1]);

  // Koła
  elements.push({type: 'circle', x: 400, y: 250, radius: 60});
  drawElement(elements[elements.length - 1]);

  // Pola 3-sekundowe
  elements.push({type: 'rect', x: 100, y: 150, width: 100, height: 200});
  drawElement(elements[elements.length - 1]);
  elements.push({type: 'rect', x: 600, y: 150, width: 100, height: 200});
  drawElement(elements[elements.length - 1]);
}

function drawVolleyballCourt() {
  elements.push({type: 'rect', x: 150, y: 100, width: 500, height: 300});
  drawElement(elements[elements.length - 1]);

  // Linia środkowa
  elements.push({type: 'line', x1: 400, y1: 100, x2: 400, y2: 400});
  drawElement(elements[elements.length - 1]);

  // Linie ataku (3m od siatki)
  elements.push({type: 'line', x1: 250, y1: 100, x2: 250, y2: 400});
  drawElement(elements[elements.length - 1]);

  elements.push({type: 'line', x1: 550, y1: 100, x2: 550, y2: 400});
  drawElement(elements[elements.length - 1]);
}

function drawHandballCourt() {
  elements.push({type: 'rect', x: 100, y: 100, width: 600, height: 300});
  drawElement(elements[elements.length - 1]);

  // Linie bramkowe (6m, 9m)
  elements.push({type: 'arc', x: 150, y: 250, radius: 60, startAngle: -0.5 * Math.PI, endAngle: 0.5 * Math.PI});
  drawElement(elements[elements.length - 1]);

  elements.push({type: 'arc', x: 150, y: 250, radius: 90, startAngle: -0.5 * Math.PI, endAngle: 0.5 * Math.PI});
  drawElement(elements[elements.length - 1]);

  elements.push({type: 'arc', x: 650, y: 250, radius: 60, startAngle: 0.5 * Math.PI, endAngle: 1.5 * Math.PI});
  drawElement(elements[elements.length - 1]);

  elements.push({type: 'arc', x: 650, y: 250, radius: 90, startAngle: 0.5 * Math.PI, endAngle: 1.5 * Math.PI});
  drawElement(elements[elements.length - 1]);
}

// Funkcja rysująca pojedynczy element boiska
function drawElement(element) {
  ctx.strokeStyle = document.getElementById('lineColor').value;

  switch (element.type) {
    case 'rect':
      ctx.strokeRect(element.x, element.y, element.width, element.height);
      break;
    case 'line':
      ctx.beginPath();
      ctx.moveTo(element.x1, element.y1);
      ctx.lineTo(element.x2, element.y2);
      ctx.stroke();
      break;
    case 'circle':
      ctx.beginPath();
      ctx.arc(element.x, element.y, element.radius, 0, 2 * Math.PI);
      ctx.stroke();
      break;
    case 'arc':
      ctx.beginPath();
      ctx.arc(element.x, element.y, element.radius, element.startAngle, element.endAngle);
      ctx.stroke();
      break;
  }
}

// Funkcja zapisu jako PNG
function saveAsPNG() {
  const link = document.createElement('a');
  link.download = 'boisko.png';
  link.href = canvas.toDataURL('image/png');
  link.click();
}

// Obsługa przesuwania elementów
let isDragging = false;
canvas.addEventListener('mousedown', (e) => {
  const mouseX = e.offsetX;
  const mouseY = e.offsetY;

  selectedElement = elements.find(element => isMouseOnElement(mouseX, mouseY, element));

  if (selectedElement) {
    isDragging = true;
    offsetX = mouseX - selectedElement.x;
    offsetY = mouseY - selectedElement.y;
  }
});

canvas.addEventListener('mousemove', (e) => {
  if (isDragging && selectedElement) {
    const mouseX = e.offsetX;
    const mouseY = e.offsetY;

    selectedElement.x = mouseX - offsetX;
    selectedElement.y = mouseY - offsetY;
    redrawCanvas();
  }
});

canvas.addEventListener('mouseup', () => {
  isDragging = false;
});

function isMouseOnElement(mouseX, mouseY, element) {
  switch (element.type) {
    case 'rect':
      return mouseX >= element.x && mouseX <= element.x + element.width &&
             mouseY >= element.y && mouseY <= element.y + element.height;
    case 'line':
      // Użyj prostego detekcji w obrębie linii
      return Math.abs(mouseX - element.x1) < 5 && Math.abs(mouseY - element.y1) < 5;
    case 'circle':
      const distance = Math.sqrt(Math.pow(mouseX - element.x, 2) + Math.pow(mouseY - element.y, 2));
      return distance <= element.radius;
    default:
      return false;
  }
}

function redrawCanvas() {
  drawField();
  elements.forEach(drawElement);
}

// Automatycznie narysuj domyślne boisko
drawField();
