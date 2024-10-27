const hexElement = document.getElementById('hex');
const targetText = "Power in Prowess";
const originalText = hexElement.textContent;
const interval = 100; // milliseconds
let currentText = originalText.split('');

function randomizeText() {
    for (let i = 0; i < currentText.length; i++) {
        if (Math.random() > 0.5) {
            currentText[i] = targetText[i] || ' ';
        } else {
            currentText[i] = originalText[i];
        }
    }
    hexElement.textContent = currentText.join('');
}

function animateText() {
    let iterations = 0;
    const maxIterations = 20;
    const animationInterval = setInterval(() => {
        randomizeText();
        iterations++;
        if (iterations >= maxIterations) {
            clearInterval(animationInterval);
            hexElement.textContent = targetText;
            hexElement.removeEventListener('mouseover', animateText);
        }
    }, interval);
}

hexElement.addEventListener('mouseover', animateText);

function toggleSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section.style.display === "block") {
        section.style.display = "none";
    } else {
        section.style.display = "block";
    }
}