export default async function handler(req, res) {
  const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
  const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!redisUrl || !redisToken) {
    return res.status(500).json({ success: false, message: "Missing Upstash credentials" });
  }

  try {
    await fetch(`${redisUrl}/ping`, {
      headers: { Authorization: `Bearer ${redisToken}` },
    });

    return res.status(200).json({ success: true, message: "PING" });
  } catch (err) {
    console.error("Ping failed:", err);
    return res.status(500).json({ success: false, message: "Failed to ping Upstash" });
  }
}