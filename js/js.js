// Quiz validation and result display logic for SCDS with table and chart
document.addEventListener('DOMContentLoaded', function() {
    const quizForm = document.getElementById('quizForm');
    if (quizForm) {
        quizForm.addEventListener('submit', function(event) {
            event.preventDefault();
            let valid = true;
            let errorMsg = '';
            let answers = [];
            for (let i = 1; i <= 10; i++) {
                let sum = 0;
                let row = { Question: i };
                for (const opt of ['a','b','c','d']) {
                    const input = document.querySelector('input[name="q'+i+opt+'"]');
                    const val = parseFloat(input.value) || 0;
                    sum += val;
                    row[opt.toUpperCase()] = val;
                }
                answers.push(row);
                if (Math.abs(sum - 10) > 0.01) {
                    valid = false;
                    errorMsg += `Question ${i}: The total must be exactly 10 (currently ${sum.toFixed(2)}).\n`;
                }
            }
            if (!valid) {
                alert(errorMsg);
                return;
            }
            // Build table
            let table = '<h4>Your Answers:</h4><div class="table-responsive"><table class="table table-bordered"><thead><tr><th>Question</th><th>Process Culture</th><th>Compliance Culture</th><th>Automation Culture</th><th>Trust Culture</th></tr></thead><tbody>';
            let sums = {A:0, B:0, C:0, D:0};
            for (const row of answers) {
                table += `<tr><td>${row.Question}</td><td>${row.A}</td><td>${row.B}</td><td>${row.C}</td><td>${row.D}</td></tr>`;
                sums.A += row.A;
                sums.B += row.B;
                sums.C += row.C;
                sums.D += row.D;
            }
            // Add total row
            table += `<tr class="fw-bold"><td>Total</td><td>${sums.A}</td><td>${sums.B}</td><td>${sums.C}</td><td>${sums.D}</td></tr>`;
            table += '</tbody></table></div>';
            // Chart container
            table += '<canvas id="quizChart" width="400" height="200"></canvas>';
            document.getElementById('quizResult').innerHTML = table;
            // Draw chart
            if (window.quizChartInstance) {
                window.quizChartInstance.destroy();
            }
            const ctx = document.getElementById('quizChart').getContext('2d');
            window.quizChartInstance = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['Process Culture', 'Compliance Culture', 'Automation Culture', 'Trust Culture'],
                    datasets: [{
                        label: 'Total Points by Option',
                        data: [sums.A, sums.B, sums.C, sums.D],
                        backgroundColor: [
                            'rgba(54, 162, 235, 0.7)',
                            'rgba(255, 206, 86, 0.7)',
                            'rgba(75, 192, 192, 0.7)',
                            'rgba(255, 99, 132, 0.7)'
                        ],
                        borderColor: [
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(255, 99, 132, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: { display: false,
                            labels: {
                                color: '#222',
                                font: { weight: 'bold', size: 16 }
                            }
                        },
                        title: {
                            display: true,
                            text: 'Total Points by Option (All Questions)',
                            color: '#ffffffff',
                            font: { weight: 'bold', size: 20 }
                        }
                    },
                    scales: {
                        x: {
                            ticks: {
                                color: '#ffffffff',
                                font: { weight: 'bold', size: 16 }
                            }
                        },
                        y: {
                            beginAtZero: true,
                            ticks: {
                                color: '#ffffffff',
                                font: { weight: 'bold', size: 16 }
                            }
                        }
                    }
                },
                plugins: [
                    {
                        id: 'custom_canvas_background_color',
                        beforeDraw: (chart) => {
                            const ctx = chart.canvas.getContext('2d');
                            ctx.save();
                            ctx.globalCompositeOperation = 'destination-over';
                            ctx.fillStyle = '#383838ff'; // light grey
                            // Draw rounded rectangle for background
                            const radius = 24;
                            const w = chart.width;
                            const h = chart.height;
                            ctx.beginPath();
                            ctx.moveTo(radius, 0);
                            ctx.lineTo(w - radius, 0);
                            ctx.quadraticCurveTo(w, 0, w, radius);
                            ctx.lineTo(w, h - radius);
                            ctx.quadraticCurveTo(w, h, w - radius, h);
                            ctx.lineTo(radius, h);
                            ctx.quadraticCurveTo(0, h, 0, h - radius);
                            ctx.lineTo(0, radius);
                            ctx.quadraticCurveTo(0, 0, radius, 0);
                            ctx.closePath();
                            ctx.fill();
                            ctx.restore();
                        }
                    }
                ]
            });
        });
    }
});

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