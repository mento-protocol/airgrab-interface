export async function fetchJson<JSON = unknown>(
  input: RequestInfo,
  init?: RequestInit
): Promise<JSON | Response> {
  const response = await fetch(input, {
    headers: {
      accept: "application/json",
      "content-type": "application/json",
    },
    ...init,
  });

  try {
    // Attempt to parse the response as JSON
    const data = await response.json();
    return data;
  } catch (error) {
    // If JSON parsing fails, return the original response
    return response;
  }
}
