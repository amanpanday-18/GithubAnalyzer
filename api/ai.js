export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  const apiKey = process.env.AI_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'AI_API_KEY environment variable is missing. Please add it to your .env file or deployment settings.' });
  }

  try {
    const aiResponse = await fetch("https://api.freemodel.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        messages: [{ role: "user", content: prompt }],
        model: "gpt-4o-mini", 
        temperature: 0.7,
      })
    });

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      let errorMessage = errorText;
      try {
        const errorData = JSON.parse(errorText);
        errorMessage = errorData.error?.message || errorData.error || errorData.message || errorText;
      } catch (e) {
        // Not JSON, use raw text
      }
      return res.status(aiResponse.status).json({ error: `AI API Error: ${errorMessage}` });
    }

    const data = await aiResponse.json();
    const responseText = data.choices?.[0]?.message?.content || "No response generated.";
    
    return res.status(200).json({ response: responseText });

  } catch (error) {
    console.error("Backend fetch error:", error);
    return res.status(500).json({ error: "Failed to connect to AI API." });
  }
}
