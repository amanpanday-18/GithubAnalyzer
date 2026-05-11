export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'GROQ_API_KEY environment variable is missing. Please add it to Vercel.' });
  }

  try {
    const groqResponse = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        messages: [{ role: "user", content: prompt }],
        model: "llama3-8b-8192", 
        temperature: 0.7,
      })
    });

    if (!groqResponse.ok) {
      let errorText = 'Unknown error';
      try {
        const errorData = await groqResponse.json();
        errorText = errorData.error?.message || JSON.stringify(errorData);
      } catch (e) {
        errorText = await groqResponse.text();
      }
      return res.status(groqResponse.status).json({ error: `Groq API Error: ${errorText}` });
    }

    const data = await groqResponse.json();
    const responseText = data.choices?.[0]?.message?.content || "No response generated.";
    
    return res.status(200).json({ response: responseText });

  } catch (error) {
    console.error("Backend fetch error:", error);
    return res.status(500).json({ error: "Failed to connect to Groq API." });
  }
}
