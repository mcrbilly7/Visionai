function acceptTerms() {
  document.getElementById("popup").style.display = "none";
  document.querySelector(".container").style.display = "block";
}

function generateWebsite() {
  const vision = document.getElementById("visionInput").value.toLowerCase();
  let html = "";

  // 🧠 Offline AI ruleset (expandable!)
  if (vision.includes("portfolio")) {
    html = `
<!DOCTYPE html>
<html>
<head>
  <title>My Portfolio</title>
  <style>
    body { font-family: Arial; background: #f9f9f9; text-align: center; padding: 40px; }
    img { width: 200px; margin: 10px; border-radius: 8px; }
  </style>
</head>
<body>
  <h1>Welcome to My Portfolio</h1>
  <p>Check out my work below!</p>
  <img src="https://placekitten.com/200/200" />
  <img src="https://placekitten.com/201/200" />
  <img src="https://placekitten.com/202/200" />
</body>
</html>`;
  } else if (vision.includes("contact form")) {
    html = `
<!DOCTYPE html>
<html>
<head>
  <title>Contact Us</title>
  <style>
    body { font-family: sans-serif; background: #eaf2ff; padding: 40px; text-align: center; }
    input, textarea { width: 80%; padding: 10px; margin: 10px; border-radius: 6px; border: 1px solid #ccc; }
  </style>
</head>
<body>
  <h1>Contact Us</h1>
  <form>
    <input type="text" placeholder="Your Name" /><br>
    <input type="email" placeholder="Your Email" /><br>
    <textarea placeholder="Your Message"></textarea><br>
    <button type="submit">Send</button>
  </form>
</body>
</html>`;
  } else {
    html = `
<!DOCTYPE html>
<html>
<head>
  <title>My Site</title>
  <style>
    body { font-family: sans-serif; background: #fffbe6; padding: 40px; }
  </style>
</head>
<body>
  <h1>Hello!</h1>
  <p>This is your generated website from the vision: "${vision}"</p>
</body>
</html>`;
  }

  // Preview + code output
  const blob = new Blob([html], { type: 'text/html' });
  document.getElementById("sitePreview").src = URL.createObjectURL(blob);
  document.getElementById("codeOutput").textContent = html;
  window.generatedHTML = html;
}

function downloadHTML() {
  const blob = new Blob([window.generatedHTML || ""], { type: "text/html" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "vision_site.html";
  link.click();
}
