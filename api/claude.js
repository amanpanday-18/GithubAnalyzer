export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'ANTHROPIC_API_KEY environment variable is missing. Please add it to Vercel.' });
  }

  try {
    const anthropicResponse = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify({
        model: "claude-3-5-sonnet-20241022",
        max_tokens: 1000,
        messages: [{ role: "user", content: prompt }]
      })
    });

    if (!anthropicResponse.ok) {
      let errorText = 'Unknown error';
      try {
        const errorData = await anthropicResponse.json();
        errorText = errorData.error?.message || JSON.stringify(errorData);
      } catch (e) {
        errorText = await anthropicResponse.text();
      }
      return res.status(anthropicResponse.status).json({ error: `Anthropic API Error: ${errorText}` });
    }

    const data = await anthropicResponse.json();
    return res.status(200).json({ response: data.content[0].text });

  } catch (error) {
    console.error("Backend fetch error:", error);
    return res.status(500).json({ error: "Failed to connect to Anthropic API." });
  }
}
