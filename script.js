async function generateWebsite() {
  const vision = document.getElementById("visionInput").value.trim();
  if (!vision) {
    alert("Please enter your website vision.");
    return;
  }

  const prompt = `
You are a web developer AI.
Generate a complete, professional HTML5 website based on this vision:
"${vision}"

Requirements:
- Full <html>, <head>, and <body> structure
- Inline CSS in a <style> tag
- Responsive and modern layout
- Use <section>, <nav>, and <footer> where appropriate
- Avoid external assets or libraries
`;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      // 🔑 PUT YOUR API KEY HERE ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
      "Authorization": "Bearer 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",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-4", // Or use "gpt-3.5-turbo" if preferred
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7
    })
  });

  const data = await response.json();

  if (!data.choices || !data.choices[0]) {
    alert("AI generation failed. Please check your API key or try again.");
    return;
  }

  const html = data.choices[0].message.content;

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
