const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;
const web3formsAccessKey = process.env.VITE_WEB3FORM_API_KEY;

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

// ---- Main handler ----
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
    // -------- Rate limiting --------
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

    // -------- Build Web3Forms payload --------
    const { name, email, message } = req.body ?? {};

    const payload = {
      access_key: web3formsAccessKey,
      name,
      email,
      message,
      subject: "New message from portfolio contact form",
      from_name: name,
      botcheck: "",
    };

    console.log("Web3Forms payload:", payload);

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify(payload),
    });

    const rawText = await response.text();
    console.log("Web3Forms raw response:", rawText.slice(0, 500));

    let data;
    try {
      data = JSON.parse(rawText);
    } catch (e) {
      console.error("Web3Forms did not return JSON. Status:", response.status);
      return res.status(502).json({ success: false, message: "Form service unavailable" });
    }

    if (!data.success) {
      console.error("Web3Forms error:", data);
      return res.status(400).json({
        success: false,
        message:
          data.message || "Failed to submit",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Submitted Successfully",
    });
  } catch (err) {
    console.error("Server error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
}