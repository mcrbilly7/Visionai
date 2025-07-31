async function generateWebsite() {
  const vision = document.getElementById("visionInput").value.trim();
  if (!vision) return alert("Please enter a website vision.");

  const response = await fetch("/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ vision })
  });

  const data = await response.json();
  const html = data.html;

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
