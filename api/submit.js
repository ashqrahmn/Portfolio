const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;

async function redisRequest(...parts) {
  const url = `${redisUrl}/${parts.join("/")}`;

  const res = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${redisToken}`,
    },
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("Redis error:", res.status, text.slice(0, 200));
    throw new Error("Redis request failed");
  }

  return res.json();
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ success: false, message: "Method not allowed" });
  }

  const ip =
    req.headers["x-forwarded-for"]?.split(",")[0] || req.socket.remoteAddress;
  const dateKey = new Date().toISOString().slice(0, 10);
  const key = `ip:${ip}:${dateKey}`;
  const LIMIT = 2;

  try {
    const incrData = await redisRequest("INCR", key);

    if (incrData.result === 1) {
      await redisRequest("EXPIRE", key, 86400);
    }

    if (incrData.result > LIMIT) {
      return res.status(429).json({
        success: false,
        message: "Too many attempts. Try again in 24h",
      });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("Server error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
}