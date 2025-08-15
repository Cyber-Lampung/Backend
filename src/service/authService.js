export async function RegisterPost(email, username, password) {
  const res = await fetch("/api/v1/Register", {
    method: "POST",
    headers: { "Content-Type": "applicatio/json" },
    body: JSON.stringify({ email, username, password }),
  });
  return res.json();
}
