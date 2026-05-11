export const fetchAiFeedback = async (prompt) => {
  const response = await fetch("/api/groq", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt })
  });

  if (!response.ok) {
    let errorText = 'Unknown error';
    try {
      const errorData = await response.json();
      errorText = errorData.error || errorData.message || JSON.stringify(errorData);
    } catch (e) {
      errorText = await response.text();
    }
    throw new Error(`${errorText}`);
  }

  const data = await response.json();
  return data.response;
};
