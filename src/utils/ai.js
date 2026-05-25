export const fetchAiFeedback = async (prompt) => {
  const localApiKey = import.meta.env.VITE_AI_API_KEY;
  
  // If we have a local key, call the API directly via Vite proxy (bypasses CORS)
  if (localApiKey) {
    const response = await fetch("/api-remote/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${localApiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        messages: [{ role: "user", content: prompt }],
        model: "gpt-4o-mini",
        temperature: 0.7,
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      let errorMessage = errorText;
      try {
        const errorData = JSON.parse(errorText);
        errorMessage = errorData.error?.message || errorData.error || errorData.message || errorText;
      } catch (e) {
        // Not JSON
      }
      throw new Error(`${errorMessage}`);
    }

    const data = await response.json();
    return data.choices?.[0]?.message?.content || "No response generated.";
  }

  // Fallback to Vercel API route for production
  const response = await fetch("/api/ai", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt })
  });

  if (!response.ok) {
    const errorText = await response.text();
    let errorMessage = errorText;
    try {
      const errorData = JSON.parse(errorText);
      errorMessage = errorData.error || errorData.message || errorText;
    } catch (e) {
      // Not JSON
    }
    throw new Error(`${errorMessage}`);
  }

  const data = await response.json();
  return data.response;
};
