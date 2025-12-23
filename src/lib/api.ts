export async function api(url: string, options: RequestInit = {}) {
  const res = await fetch(url, {
    credentials: "include",
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  let data;
  try {
    data = await res.json();
  } catch {
    data = null;
  }

  if (!res.ok) {
    console.error("API ERROR:", res.status, data);
    throw data || { error: "API request failed" };
  }

  return data;
}
