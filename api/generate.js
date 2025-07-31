export default async function handler(req, res) {
  const { vision } = await req.body || await req.json();

  const prompt = `
You are a web developer AI.
Create a complete HTML5 website based on the following vision:
"${vision}"

Include:
- Full HTML structure with <html>, <head>, <body>
- Responsive inline CSS in <style>
- Use modern layout elements (section, header, nav, footer)
- Avoid any external JS or CSS links
`;

  const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.sk-proj-G9kw8NUzxtIz_1x5IFvtRG1BqWSk5l8XsJGB4J_XE0EhUzzdhM1K-}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7
    })
  });

  const data = await openaiRes.json();
  const html = data.choices?.[0]?.message?.content || "<p>Failed to generate.</p>";
  res.status(200).json({ html });
}
