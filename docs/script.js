// const k = 1.380649e-23;

// let temperature = 300;
// let comparisonTemp = 500;
// let showComparison = false;

// const gases = {
//     "Hydrogen": 2.016,
//     "Helium": 4.003,
//     "Nitrogen": 28.014,
//     "Oxygen": 31.998,
//     "Argon": 39.948,
//     "CO2": 44.01,
//     "Xenon": 131.29
// };

// let molarMass = gases["Nitrogen"];

// // DOM
// const tempSlider = document.getElementById("tempSlider");
// const tempVal = document.getElementById("tempVal");
// const compSlider = document.getElementById("compSlider");
// const compVal = document.getElementById("compVal");
// const compareToggle = document.getElementById("compareToggle");
// const compareBox = document.getElementById("compareBox");

// const vpSpan = document.getElementById("vp");
// const vavgSpan = document.getElementById("vavg");
// const vrmsSpan = document.getElementById("vrms");

// const gasSelect = document.getElementById("gasSelect");

// // Populate gases
// for (let g in gases) {
//     let opt = document.createElement("option");
//     opt.text = g;
//     gasSelect.add(opt);
// }

// // EVENTS
// gasSelect.onchange = () => {
//     molarMass = gases[gasSelect.value];
//     updateAll();
// };

// tempSlider.oninput = () => {
//     temperature = +tempSlider.value;
//     tempVal.innerText = temperature;
//     updateAll();
// };

// compSlider.oninput = () => {
//     comparisonTemp = +compSlider.value;
//     compVal.innerText = comparisonTemp;
//     if (showComparison) updateGraph();
// };

// compareToggle.onchange = () => {
//     showComparison = compareToggle.checked;
//     compareBox.style.display = showComparison ? "block" : "none";
//     updateGraph();
// };

// // GRAPH
// const graph = document.getElementById("graph");
// const gctx = graph.getContext("2d");

// graph.width = 900;
// graph.height = 350;

// function distribution(T) {
//     let m = molarMass / 1000 / 6.022e23;
//     let maxV = Math.sqrt(8 * k * T / (Math.PI * m)) * 3;

//     let speeds = [];
//     let probs = [];

//     for (let i = 0; i < 400; i++) {
//         let v = (i / 400) * maxV;
//         let f = 4 * Math.PI * Math.pow(m / (2 * Math.PI * k * T), 1.5);
//         let p = f * v * v * Math.exp(-m * v * v / (2 * k * T));

//         speeds.push(v);
//         probs.push(p);
//     }

//     return { speeds, probs, maxV };
// }

// function drawFilledCurve(speeds, probs, maxProb, maxSpeed, color, alpha=0.3) {
//     gctx.beginPath();

//     for (let i = 0; i < speeds.length; i++) {
//         let x = 70 + (speeds[i] / maxSpeed) * (graph.width - 120);
//         let y = (graph.height - 50) - (probs[i] / maxProb) * (graph.height - 100);

//         if (i === 0) gctx.moveTo(x, y);
//         else gctx.lineTo(x, y);
//     }

//     gctx.lineTo(graph.width - 50, graph.height - 50);
//     gctx.lineTo(70, graph.height - 50);
//     gctx.closePath();

//     gctx.globalAlpha = alpha;
//     gctx.fillStyle = color;
//     gctx.fill();
//     gctx.globalAlpha = 1;

//     // stroke line
//     gctx.beginPath();
//     for (let i = 0; i < speeds.length; i++) {
//         let x = 70 + (speeds[i] / maxSpeed) * (graph.width - 120);
//         let y = (graph.height - 50) - (probs[i] / maxProb) * (graph.height - 100);

//         if (i === 0) gctx.moveTo(x, y);
//         else gctx.lineTo(x, y);
//     }
//     gctx.strokeStyle = color;
//     gctx.lineWidth = 2;
//     gctx.stroke();
// }

// function updateGraph() {
//     gctx.clearRect(0, 0, graph.width, graph.height);

//     let main = distribution(temperature);
//     let comp = showComparison ? distribution(comparisonTemp) : null;

//     let maxProb = Math.max(...main.probs);
//     let maxSpeed = main.maxV;

//     if (comp) {
//         maxProb = Math.max(maxProb, ...comp.probs);
//         maxSpeed = Math.max(maxSpeed, comp.maxV);
//     }

//     // AXES
//     gctx.strokeStyle = "#64748b";
//     gctx.lineWidth = 1;

//     gctx.beginPath();
//     gctx.moveTo(70, graph.height - 50);
//     gctx.lineTo(graph.width - 50, graph.height - 50);
//     gctx.stroke();

//     gctx.beginPath();
//     gctx.moveTo(70, 20);
//     gctx.lineTo(70, graph.height - 50);
//     gctx.stroke();

//     // GRID (both directions)
//     gctx.setLineDash([4,4]);
//     gctx.strokeStyle = "#334155";

//     for (let i = 1; i <= 5; i++) {
//         let y = (graph.height - 50) - i * (graph.height - 100) / 5;
//         gctx.beginPath();
//         gctx.moveTo(70, y);
//         gctx.lineTo(graph.width - 50, y);
//         gctx.stroke();
//     }

//     for (let i = 1; i <= 5; i++) {
//         let x = 70 + i * (graph.width - 120) / 5;
//         gctx.beginPath();
//         gctx.moveTo(x, 20);
//         gctx.lineTo(x, graph.height - 50);
//         gctx.stroke();
//     }

//     gctx.setLineDash([]);

//     // AXIS VALUES
//     gctx.fillStyle = "#94a3b8";
//     gctx.font = "12px Arial";

//     for (let i = 0; i <= 5; i++) {
//         let y = (graph.height - 50) - i * (graph.height - 100) / 5;
//         gctx.fillText(i * 500, 20, y);
//     }

//     for (let i = 0; i <= 5; i++) {
//         let x = 70 + i * (graph.width - 120) / 5;
//         gctx.fillText(Math.round(i * maxSpeed / 5), x, graph.height - 20);
//     }

//     // CURVES
//     drawFilledCurve(main.speeds, main.probs, maxProb, maxSpeed, "#06b6d4");

//     if (comp) {
//         drawFilledCurve(comp.speeds, comp.probs, maxProb, maxSpeed, "#a855f7");
//     }

//     // SPEED MARKERS
//     let m = molarMass / 1000 / 6.022e23;

//     let vp = Math.sqrt(2 * k * temperature / m);
//     let vavg = Math.sqrt(8 * k * temperature / (Math.PI * m));
//     let vrms = Math.sqrt(3 * k * temperature / m);

//     function marker(v, color, label) {
//         let x = 70 + (v / maxSpeed) * (graph.width - 120);

//         gctx.strokeStyle = color;
//         gctx.beginPath();
//         gctx.moveTo(x, 20);
//         gctx.lineTo(x, graph.height - 50);
//         gctx.stroke();

//         gctx.fillStyle = color;
//         gctx.fillText(label, x + 5, 30);
//     }

//     marker(vp, "#f97316", "vp");
//     marker(vavg, "#22c55e", "v̄");
//     marker(vrms, "#ec4899", "vrms");

//     // LEGEND BOX
//     gctx.fillStyle = "#1e293b";
//     gctx.fillRect(graph.width - 170, 20, 140, showComparison ? 60 : 40);

//     gctx.strokeStyle = "#334155";
//     gctx.strokeRect(graph.width - 170, 20, 140, showComparison ? 60 : 40);

//     gctx.fillStyle = "#06b6d4";
//     gctx.fillText(`${temperature}K`, graph.width - 160, 40);

//     if (comp) {
//         gctx.fillStyle = "#a855f7";
//         gctx.fillText(`${comparisonTemp}K`, graph.width - 160, 60);
//     }
// }

// // SPEEDS
// function speedsCalc() {
//     let m = molarMass / 1000 / 6.022e23;

//     let vp = Math.sqrt(2 * k * temperature / m);
//     let vavg = Math.sqrt(8 * k * temperature / (Math.PI * m));
//     let vrms = Math.sqrt(3 * k * temperature / m);

//     vpSpan.innerText = vp.toFixed(1);
//     vavgSpan.innerText = vavg.toFixed(1);
//     vrmsSpan.innerText = vrms.toFixed(1);

//     return vrms;
// }

// // PARTICLES
// const canvas = document.getElementById("particles");
// const ctx = canvas.getContext("2d");

// canvas.width = 900;
// canvas.height = 250;

// let particles = [];

// function sampleSpeed() {
//     let m = molarMass / 1000 / 6.022e23;
//     let sigma = Math.sqrt(k * temperature / m);

//     let u1 = Math.random(), u2 = Math.random();

//     let vx = sigma * Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
//     let vy = sigma * Math.sqrt(-2 * Math.log(u1)) * Math.sin(2 * Math.PI * u2);

//     return { vx, vy, speed: Math.sqrt(vx*vx + vy*vy) };
// }

// function initParticles() {
//     particles = [];

//     for (let i = 0; i < 50; i++) {
//         let s = sampleSpeed();

//         particles.push({
//             x: Math.random() * canvas.width,
//             y: Math.random() * canvas.height,
//             vx: s.vx * 0.01,
//             vy: s.vy * 0.01,
//             speed: s.speed
//         });
//     }
// }

// function color(speed, vrms) {
//     let n = speed / vrms;

//     if (n < 0.5) return "#3b82f6";
//     if (n < 0.8) return "#06b6d4";
//     if (n < 1.2) return "#f97316";
//     return "#ef4444";
// }

// function animate() {
//     ctx.clearRect(0, 0, canvas.width, canvas.height);

//     let vrms = speedsCalc();

//     particles.forEach(p => {
//         p.x += p.vx;
//         p.y += p.vy;

//         if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
//         if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

//         let size = 4 + (p.speed / vrms) * 8;

//         ctx.fillStyle = color(p.speed, vrms);
//         ctx.beginPath();
//         ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
//         ctx.fill();
//     });

//     requestAnimationFrame(animate);
// }

// // INIT
// function updateAll() {
//     updateGraph();
//     speedsCalc();
//     initParticles();
// }

// updateAll();
// animate();

const k = 1.380649e-23;

let temperature = 300;
let comparisonTemp = 500;
let showComparison = false;

const gases = {
    "Hydrogen": 2.016,
    "Helium": 4.003,
    "Nitrogen": 28.014,
    "Oxygen": 31.998,
    "Argon": 39.948,
    "CO2": 44.01,
    "Xenon": 131.29
};

let molarMass = gases["Nitrogen"];

// DOM
const tempSlider = document.getElementById("tempSlider");
const tempVal = document.getElementById("tempVal");
const compSlider = document.getElementById("compSlider");
const compVal = document.getElementById("compVal");
const compareToggle = document.getElementById("compareToggle");
const compareBox = document.getElementById("compareBox");

const vpSpan = document.getElementById("vp");
const vavgSpan = document.getElementById("vavg");
const vrmsSpan = document.getElementById("vrms");

const gasSelect = document.getElementById("gasSelect");

// Populate gases
for (let g in gases) {
    let opt = document.createElement("option");
    opt.text = g;
    gasSelect.add(opt);
}

// EVENTS
gasSelect.onchange = () => {
    molarMass = gases[gasSelect.value];
    updateAll();
};

tempSlider.oninput = () => {
    temperature = +tempSlider.value;
    tempVal.innerText = temperature;
    updateAll();
};

compSlider.oninput = () => {
    comparisonTemp = +compSlider.value;
    compVal.innerText = comparisonTemp;
    if (showComparison) updateGraph();
};

compareToggle.onchange = () => {
    showComparison = compareToggle.checked;
    compareBox.style.display = showComparison ? "block" : "none";
    updateGraph();
};

// GRAPH
const graph = document.getElementById("graph");
const gctx = graph.getContext("2d");

graph.width = 900;
graph.height = 350;

function distribution(T) {
    let m = molarMass / 1000 / 6.022e23;
    let maxV = Math.sqrt(8 * k * T / (Math.PI * m)) * 3;

    let speeds = [];
    let probs = [];

    for (let i = 0; i < 400; i++) {
        let v = (i / 400) * maxV;
        let f = 4 * Math.PI * Math.pow(m / (2 * Math.PI * k * T), 1.5);
        let p = f * v * v * Math.exp(-m * v * v / (2 * k * T));

        speeds.push(v);
        probs.push(p);
    }

    return { speeds, probs, maxV };
}

function drawFilledCurve(speeds, probs, maxProb, maxSpeed, color, alpha=0.3) {
    gctx.beginPath();

    for (let i = 0; i < speeds.length; i++) {
        let x = 70 + (speeds[i] / maxSpeed) * (graph.width - 120);
        let y = (graph.height - 50) - (probs[i] / maxProb) * (graph.height - 100);

        if (i === 0) gctx.moveTo(x, y);
        else gctx.lineTo(x, y);
    }

    gctx.lineTo(graph.width - 50, graph.height - 50);
    gctx.lineTo(70, graph.height - 50);
    gctx.closePath();

    gctx.globalAlpha = alpha;
    gctx.fillStyle = color;
    gctx.fill();
    gctx.globalAlpha = 1;

    gctx.beginPath();
    for (let i = 0; i < speeds.length; i++) {
        let x = 70 + (speeds[i] / maxSpeed) * (graph.width - 120);
        let y = (graph.height - 50) - (probs[i] / maxProb) * (graph.height - 100);

        if (i === 0) gctx.moveTo(x, y);
        else gctx.lineTo(x, y);
    }
    gctx.strokeStyle = color;
    gctx.lineWidth = 2;
    gctx.stroke();
}

function updateGraph() {
    gctx.clearRect(0, 0, graph.width, graph.height);

    let main = distribution(temperature);
    let comp = showComparison ? distribution(comparisonTemp) : null;

    let maxProb = Math.max(...main.probs);
    let maxSpeed = main.maxV;

    if (comp) {
        maxProb = Math.max(maxProb, ...comp.probs);
        maxSpeed = Math.max(maxSpeed, comp.maxV);
    }

    // MARGINS
    const left = 80;
    const right = graph.width - 60;
    const top = 30;
    const bottom = graph.height - 60;

    // AXES
    gctx.strokeStyle = "#64748b";
    gctx.lineWidth = 1;

    gctx.beginPath();
    gctx.moveTo(left, bottom);
    gctx.lineTo(right, bottom);
    gctx.stroke();

    gctx.beginPath();
    gctx.moveTo(left, top);
    gctx.lineTo(left, bottom);
    gctx.stroke();

    // GRID
    gctx.setLineDash([4, 4]);
    gctx.strokeStyle = "#334155";

    for (let i = 1; i <= 5; i++) {
        let y = bottom - i * (bottom - top) / 5;
        gctx.beginPath();
        gctx.moveTo(left, y);
        gctx.lineTo(right, y);
        gctx.stroke();
    }

    for (let i = 1; i <= 5; i++) {
        let x = left + i * (right - left) / 5;
        gctx.beginPath();
        gctx.moveTo(x, top);
        gctx.lineTo(x, bottom);
        gctx.stroke();
    }

    gctx.setLineDash([]);

    // ===== Y AXIS VALUES (FIXED CLEAN ALIGNMENT) =====
    gctx.fillStyle = "#94a3b8";
    gctx.font = "12px Arial";
    gctx.textAlign = "right";

    for (let i = 0; i <= 5; i++) {
        let y = bottom - i * (bottom - top) / 5;
        gctx.fillText(i * 500, left - 8, y + 4);
    }

    // ===== X AXIS VALUES =====
    gctx.textAlign = "center";

    for (let i = 0; i <= 5; i++) {
        let x = left + i * (right - left) / 5;
        gctx.fillText(Math.round(i * maxSpeed / 5), x, bottom + 20);
    }

    // ===== DRAW CURVES =====
    function drawCurve(data, color, alpha) {
        gctx.beginPath();

        data.speeds.forEach((v, i) => {
            let x = left + (v / maxSpeed) * (right - left);
            let y = bottom - (data.probs[i] / maxProb) * (bottom - top);

            if (i === 0) gctx.moveTo(x, y);
            else gctx.lineTo(x, y);
        });

        // Fill
        gctx.lineTo(right, bottom);
        gctx.lineTo(left, bottom);
        gctx.closePath();

        gctx.globalAlpha = alpha;
        gctx.fillStyle = color;
        gctx.fill();
        gctx.globalAlpha = 1;

        // Stroke
        gctx.beginPath();
        data.speeds.forEach((v, i) => {
            let x = left + (v / maxSpeed) * (right - left);
            let y = bottom - (data.probs[i] / maxProb) * (bottom - top);

            if (i === 0) gctx.moveTo(x, y);
            else gctx.lineTo(x, y);
        });

        gctx.strokeStyle = color;
        gctx.lineWidth = 2;
        gctx.stroke();
    }

    drawCurve(main, "#06b6d4", 0.3);
    if (comp) drawCurve(comp, "#a855f7", 0.3);

    // ===== SPEED MARKERS =====
    let m = molarMass / 1000 / 6.022e23;

    let vp = Math.sqrt(2 * k * temperature / m);
    let vavg = Math.sqrt(8 * k * temperature / (Math.PI * m));
    let vrms = Math.sqrt(3 * k * temperature / m);

    function marker(v, color, label) {
        let x = left + (v / maxSpeed) * (right - left);

        gctx.strokeStyle = color;
        gctx.beginPath();
        gctx.moveTo(x, top);
        gctx.lineTo(x, bottom);
        gctx.stroke();

        gctx.fillStyle = color;
        gctx.textAlign = "left";
        gctx.fillText(label, x + 5, top + 15);
    }

    marker(vp, "#f97316", "vp");
    marker(vavg, "#22c55e", "v̄");
    marker(vrms, "#ec4899", "vrms");

    // ===== LEGEND =====
    gctx.fillStyle = "#1e293b";
    gctx.fillRect(right - 120, top, 110, showComparison ? 60 : 40);

    gctx.strokeStyle = "#334155";
    gctx.strokeRect(right - 120, top, 110, showComparison ? 60 : 40);

    gctx.fillStyle = "#06b6d4";
    gctx.fillText(`${temperature}K`, right - 110, top + 20);

    if (comp) {
        gctx.fillStyle = "#a855f7";
        gctx.fillText(`${comparisonTemp}K`, right - 110, top + 40);
    }

    // ===== AXIS LABELS (NO OVERLAP FINAL FIX) =====
    gctx.fillStyle = "#94a3b8";
    gctx.font = "bold 14px Arial";

    // X label
    gctx.textAlign = "center";
    gctx.fillText("Speed (m/s)", (left + right) / 2, graph.height - 10);

    // Y label (separate lane)
    gctx.save();
    gctx.translate(25, (top + bottom) / 2);
    gctx.rotate(-Math.PI / 2);
    gctx.textAlign = "center";
    gctx.fillText("Probability Density", 0, 0);
    gctx.restore();
}
// SPEEDS
function speedsCalc() {
    let m = molarMass / 1000 / 6.022e23;

    let vp = Math.sqrt(2 * k * temperature / m);
    let vavg = Math.sqrt(8 * k * temperature / (Math.PI * m));
    let vrms = Math.sqrt(3 * k * temperature / m);

    vpSpan.innerText = vp.toFixed(1);
    vavgSpan.innerText = vavg.toFixed(1);
    vrmsSpan.innerText = vrms.toFixed(1);

    return vrms;
}

// PARTICLES
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

canvas.width = 900;
canvas.height = 250;

let particles = [];

function sampleSpeed() {
    let m = molarMass / 1000 / 6.022e23;
    let sigma = Math.sqrt(k * temperature / m);

    let u1 = Math.random(), u2 = Math.random();

    let vx = sigma * Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
    let vy = sigma * Math.sqrt(-2 * Math.log(u1)) * Math.sin(2 * Math.PI * u2);

    return { vx, vy, speed: Math.sqrt(vx*vx + vy*vy) };
}

function initParticles() {
    particles = [];

    for (let i = 0; i < 50; i++) {
        let s = sampleSpeed();

        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: s.vx * 0.01,
            vy: s.vy * 0.01,
            speed: s.speed
        });
    }
}

function color(speed, vrms) {
    let n = speed / vrms;

    if (n < 0.5) return "#3b82f6";
    if (n < 0.8) return "#06b6d4";
    if (n < 1.2) return "#f97316";
    return "#ef4444";
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let vrms = speedsCalc();

    particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        let size = 4 + (p.speed / vrms) * 8;

        ctx.fillStyle = color(p.speed, vrms);
        ctx.beginPath();
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        ctx.fill();
    });

    requestAnimationFrame(animate);
}

// INIT
function updateAll() {
    updateGraph();
    speedsCalc();
    initParticles();
}

updateAll();
animate();
