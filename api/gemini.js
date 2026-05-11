export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'GEMINI_API_KEY environment variable is missing. Please add it to Vercel.' });
  }

  try {
    const geminiResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: prompt }]
        }]
      })
    });

    if (!geminiResponse.ok) {
      let errorText = 'Unknown error';
      try {
        const errorData = await geminiResponse.json();
        errorText = errorData.error?.message || JSON.stringify(errorData);
      } catch (e) {
        errorText = await geminiResponse.text();
      }
      return res.status(geminiResponse.status).json({ error: `Gemini API Error: ${errorText}` });
    }

    const data = await geminiResponse.json();
    const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text || "No response generated.";
    
    return res.status(200).json({ response: responseText });

  } catch (error) {
    console.error("Backend fetch error:", error);
    return res.status(500).json({ error: "Failed to connect to Gemini API." });
  }
}
