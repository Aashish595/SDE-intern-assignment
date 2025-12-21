export async function api(url: string, options?: RequestInit) {
  const res = await fetch(url, {
    credentials: "include", 
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Something went wrong");
  }

  return res.json();
}
