// ── Theme 
let themeInitDone = false;

function initTheme() {
    if (themeInitDone) return;
    const btn = document.getElementById("themeToggle");
    if (!btn) { setTimeout(initTheme, 50); return; }
    themeInitDone = true;

    function applyTheme(theme) {
        document.body.setAttribute("data-theme", theme);
        document.documentElement.setAttribute("data-theme", theme);
        document.body.classList.remove("theme-dark", "light-mode");
        localStorage.setItem("theme", theme);
        btn.textContent = theme === "dark" ? "🌙" : "☀️";
    }

    btn.addEventListener("click", function () {
        const current = document.body.getAttribute("data-theme") || "dark";
        applyTheme(current === "dark" ? "light" : "dark");
    });

    applyTheme(localStorage.getItem("theme") || "dark");
}

document.addEventListener("DOMContentLoaded", initTheme);
document.addEventListener("navbarLoaded", initTheme);

// ── Cursor Trail 
document.addEventListener("DOMContentLoaded", function () {
    const coords = { x: 0, y: 0 };
    const circles = document.querySelectorAll(".circle");

    circles.forEach(function (circle) {
        circle.x = 0;
        circle.y = 0;
    });

    window.addEventListener("mousemove", function (e) {
        coords.x = e.pageX;
        coords.y = e.pageY - window.scrollY;
    });

    function animateCircles() {
        let x = coords.x;
        let y = coords.y;
        circles.forEach(function (circle, index) {
            circle.style.left = `${x - 12}px`;
            circle.style.top = `${y - 12}px`;
            circle.style.transform = `scale(${(circles.length - index) / circles.length})`;
            const nextCircle = circles[index + 1] || circles[0];
            circle.x = x;
            circle.y = y;
            x += (nextCircle.x - x) * 0.3;
            y += (nextCircle.y - y) * 0.3;
        });
        requestAnimationFrame(animateCircles);
    }

    animateCircles();
});

// ── Character Counters 
function setupCharCounter(textareaId, counterId, countId, maxLength) {
    const textarea = document.getElementById(textareaId);
    const counter = document.getElementById(counterId);
    const count = document.getElementById(countId);
    if (!textarea || !counter || !count) return;

    textarea.addEventListener("input", () => {
        const len = textarea.value.length;
        count.textContent = len;
        counter.style.color = len > maxLength * 0.9 ? "var(--error)" : "var(--text-muted)";
    });
}

document.addEventListener("DOMContentLoaded", function () {
    setupCharCounter("bugDescription", "descCharCounter", "descCharCount", 1000);
    setupCharCounter("stepsToReproduce", "stepsCharCounter", "stepsCharCount", 500);
});

// ── File Upload 
document.addEventListener("DOMContentLoaded", function () {
    const fileInput = document.getElementById("screenshots");
    const fileList = document.getElementById("fileList");
    if (!fileInput || !fileList) return;

    fileInput.addEventListener("change", (e) => {
        const files = Array.from(e.target.files);
        fileList.innerHTML = files.length
            ? "<strong>Selected files:</strong><br>" + files.map(f => `<div>• ${f.name} (${(f.size / 1024).toFixed(1)} KB)</div>`).join("")
            : "";
    });
});

// ── Form Submission 
async function submitBugReport(event) {
    event.preventDefault();

    const submitBtn = document.getElementById("submitBtn");
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';

    try {
        await new Promise(resolve => setTimeout(resolve, 2000));

        const successMessage = document.getElementById("successMessage");
        successMessage.classList.add("show");
        document.getElementById("bugReportForm").reset();
        document.getElementById("fileList").innerHTML = "";

        setTimeout(() => successMessage.classList.remove("show"), 5000);
    } catch (error) {
        const errorMessage = document.getElementById("errorMessage");
        errorMessage.classList.add("show");
        setTimeout(() => errorMessage.classList.remove("show"), 5000);
    } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
    }
}

// ── Auto-detect Browser & OS 
document.addEventListener("DOMContentLoaded", function () {
    const ua = navigator.userAgent;

    let browser = "";
    if (ua.includes("Edg")) browser = "edge";
    else if (ua.includes("Chrome")) browser = "chrome";
    else if (ua.includes("Firefox")) browser = "firefox";
    else if (ua.includes("Safari")) browser = "safari";
    else if (ua.includes("Opera")) browser = "opera";

    let os = "";
    if (ua.includes("Android")) os = "android";
    else if (ua.includes("iPhone") || ua.includes("iPad")) os = "ios";
    else if (ua.includes("Windows")) os = "windows";
    else if (ua.includes("Mac")) os = "macos";
    else if (ua.includes("Linux")) os = "linux";

    const browserEl = document.getElementById("browser");
    const osEl = document.getElementById("os");
    if (browser && browserEl) browserEl.value = browser;
    if (os && osEl) osEl.value = os;
});