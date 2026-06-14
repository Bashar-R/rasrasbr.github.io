const EMAIL = "rasrasbr@mail.uc.edu";

function setCookie(name, value, days) {
  const expires = new Date(Date.now() + days * 86400000).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
}

function getCookie(name) {
  return document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${name}=`))
    ?.split("=")[1];
}

function updateVisitMessage() {
  const lastVisit = getCookie("lastVisit");
  const now = new Date();

  if (!lastVisit) {
    $("#visitMessage").text("Welcome to my homepage for the first time!");
  } else {
    $("#visitMessage").text(`Welcome back! Your last visit was ${decodeURIComponent(lastVisit)}`);
  }

  setCookie("lastVisit", now.toLocaleString(), 365);
}

function updateDigitalClock() {
  $("#digitalClock").text(new Date().toLocaleTimeString());
}

function drawAnalogClock() {
  const canvas = document.getElementById("analogClock");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  const radius = canvas.width / 2;
  const now = new Date();

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.save();
  ctx.translate(radius, radius);

  ctx.beginPath();
  ctx.arc(0, 0, radius - 8, 0, 2 * Math.PI);
  ctx.fillStyle = getComputedStyle(document.body).getPropertyValue("--panel").trim();
  ctx.fill();
  ctx.strokeStyle = "#1f6feb";
  ctx.lineWidth = 4;
  ctx.stroke();

  for (let num = 1; num <= 12; num += 1) {
    const angle = (num * Math.PI) / 6;
    ctx.rotate(angle);
    ctx.translate(0, -radius + 32);
    ctx.rotate(-angle);
    ctx.fillStyle = getComputedStyle(document.body).getPropertyValue("--ink").trim();
    ctx.font = "14px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(num.toString(), 0, 0);
    ctx.rotate(angle);
    ctx.translate(0, radius - 32);
    ctx.rotate(-angle);
  }

  const second = now.getSeconds();
  const minute = now.getMinutes();
  const hour = now.getHours() % 12;

  drawHand(ctx, ((hour + minute / 60) * Math.PI) / 6, radius * 0.48, 7, "#111827");
  drawHand(ctx, ((minute + second / 60) * Math.PI) / 30, radius * 0.68, 5, "#0f766e");
  drawHand(ctx, (second * Math.PI) / 30, radius * 0.76, 2, "#dc2626");

  ctx.beginPath();
  ctx.arc(0, 0, 5, 0, 2 * Math.PI);
  ctx.fillStyle = "#1f6feb";
  ctx.fill();
  ctx.restore();
}

function drawHand(ctx, position, length, width, color) {
  ctx.beginPath();
  ctx.lineWidth = width;
  ctx.lineCap = "round";
  ctx.strokeStyle = color;
  ctx.moveTo(0, 0);
  ctx.rotate(position);
  ctx.lineTo(0, -length);
  ctx.stroke();
  ctx.rotate(-position);
}

async function loadJoke() {
  try {
    const response = await fetch("https://v2.jokeapi.dev/joke/Any?safe-mode");
    const data = await response.json();
    const joke = data.type === "twopart" ? `${data.setup} ${data.delivery}` : data.joke;
    $("#jokeText").text(joke || "No joke was returned.");
  } catch (error) {
    $("#jokeText").text("The joke service is unavailable right now.");
  }
}

async function loadDogImage() {
  try {
    const response = await fetch("https://dog.ceo/api/breeds/image/random");
    const data = await response.json();
    $("#dogImage").attr("src", data.message);
  } catch (error) {
    $("#dogImage").attr("alt", "The image service is unavailable right now.");
  }
}

function buildSkillsChart() {
  const chartCanvas = document.getElementById("skillsChart");
  if (!chartCanvas || !window.Chart) return;

  new Chart(chartCanvas, {
    type: "bar",
    data: {
      labels: ["Programming", "Tools", "Languages"],
      datasets: [{
        label: "Resume Items",
        data: [7, 2, 2],
        backgroundColor: ["#1f6feb", "#0f766e", "#f59e0b"]
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false }
      },
      scales: {
        y: {
          beginAtZero: true,
          max: 100
        }
      }
    }
  });
}

$(function () {
  updateVisitMessage();
  updateDigitalClock();
  drawAnalogClock();
  buildSkillsChart();
  loadJoke();
  loadDogImage();

  setInterval(updateDigitalClock, 1000);
  setInterval(drawAnalogClock, 1000);
  setInterval(loadJoke, 60000);

  $("#emailToggle").on("click", function () {
    const isHidden = $("#emailText").text() === "Hidden";
    $("#emailText").text(isHidden ? EMAIL : "Hidden");
    $(this).text(isHidden ? "Hide email" : "Show email");
  });

  $("#themeToggle").on("click", function () {
    $("body").toggleClass("dark-mode");
  });

  $("#refreshJoke").on("click", loadJoke);
  $("#refreshDog").on("click", loadDogImage);
});
