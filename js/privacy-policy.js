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
    circle.style.pointerEvents = "none";
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

// ── Hamburger Menu 
document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.getElementById("hamburger") || document.querySelector(".hamburger");
  const navLinks = document.getElementById("navLinks") || document.querySelector(".nav-links");

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", function () {
      hamburger.classList.toggle("active");
      navLinks.classList.toggle("active");
    });

    document.addEventListener("click", function (e) {
      if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        hamburger.classList.remove("active");
        navLinks.classList.remove("active");
      }
    });
  }
});

// ── Scroll To Top 
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

window.addEventListener("scroll", function () {
  const btn = document.getElementById("scrollToTop");
  if (btn) btn.style.display = window.scrollY > 300 ? "flex" : "none";
});

// ── Reading Progress & TOC 
document.addEventListener("DOMContentLoaded", function () {
  const progressBar = document.getElementById("progressBar");
  const progressText = document.getElementById("progressText");
  const progressCircle = document.getElementById("progressCircle");
  const tocLinks = document.querySelectorAll("#tocList a");
  const sections = document.querySelectorAll("h2[id]");

  function updateProgress() {
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

    if (progressBar) progressBar.style.width = pct + "%";
    if (progressText) progressText.textContent = Math.round(pct) + "%";
    if (progressCircle) {
      const circ = 2 * Math.PI * 18;
      progressCircle.style.strokeDashoffset = circ - (pct / 100) * circ;
    }
  }

  function updateActiveSection() {
    let current = "";
    sections.forEach(section => {
      if (window.pageYOffset >= section.offsetTop - 200) {
        current = section.getAttribute("id");
      }
    });
    tocLinks.forEach(link => {
      link.classList.toggle("active", link.getAttribute("data-section") === current);
    });
  }

  tocLinks.forEach(link => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.getElementById(this.getAttribute("href").substring(1));
      if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  window.addEventListener("scroll", function () {
    updateProgress();
    updateActiveSection();
  });

  updateProgress();
  updateActiveSection();
});

// ── Scroll Animations 
document.addEventListener("DOMContentLoaded", function () {
  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

  document.querySelectorAll("h2, .privacy-content > p, .privacy-content > ul").forEach(el => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
  });
});