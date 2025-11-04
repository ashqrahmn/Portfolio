export default async function handler(req, res) {
  const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
  const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!redisUrl || !redisToken) {
    return res.status(500).json({ success: false, message: "Missing Upstash credentials" });
  }

  try {
    const key = "keepalive";
    const value = new Date().toISOString();

    const setResp = await fetch(`${redisUrl}/set/${key}/${encodeURIComponent(value)}`, {
      method: "POST",
      headers: { Authorization: `Bearer ${redisToken}` },
    });

    if (!setResp.ok) {
      const text = await setResp.text().catch(() => "");
      console.error("SET failed:", setResp.status, text);
      return res.status(500).json({ success: false, message: "Upstash SET failed", status: setResp.status, body: text });
    }

    const getResp = await fetch(`${redisUrl}/get/${key}`, {
      headers: { Authorization: `Bearer ${redisToken}` },
    });

    if (!getResp.ok) {
      const text = await getResp.text().catch(() => "");
      console.error("GET failed:", getResp.status, text);
      return res.status(500).json({ success: false, message: "Upstash GET failed", status: getResp.status, body: text });
    }

    const data = await getResp.json().catch(() => null);

    console.log("Upstash keepalive executed:", value, "GET result:", data);

    return res.status(200).json({ success: true, message: "Upstash keepalive success", timestamp: value, data });
  } catch (error) {
    console.error("Keepalive failed:", error);
    return res.status(500).json({ success: false, message: "Upstash keepalive error", error: String(error) });
  }
}