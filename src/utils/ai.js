export const fetchAiFeedback = async (prompt) => {
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
      // Not JSON, use raw text
    }
    throw new Error(`${errorMessage}`);
  }

  const data = await response.json();
  return data.response;
};
