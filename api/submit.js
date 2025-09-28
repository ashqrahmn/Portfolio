const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;

// Helper function to send requests to the Upstash Redis REST API.
async function redisRequest(path, method = "GET") {
  const res = await fetch(`${redisUrl}${path}`, {
    method,
    headers: { Authorization: `Bearer ${redisToken}` },
  });
  return res.json();
}

export default async function handler(req, res) {
  // Ensure that the request method is POST.
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  // Get the user's IP address and create a unique daily key for rate limiting.
  const ip = req.headers["x-forwarded-for"]?.split(",")[0] || req.socket.remoteAddress;
  const dateKey = new Date().toISOString().slice(0, 10);
  const key = `ip:${ip}:${dateKey}`;
  const LIMIT = 2; // Allow 2 submissions per IP per day

  try {
    // Increment the submission count for the user's IP address in Redis.
    const data = await redisRequest(`/incr/${key}`, "POST");

    // If this is the first submission of the day for this IP, set the key to expire in 24 hours.
    if (data.result === 1) {
      await redisRequest(`/expire/${key}/86400`, "POST");
    }

    // If the user has exceeded the daily submission limit, return an error.
    if (data.result > LIMIT) {
      return res.status(429).json({
        success: false,
        message: "Too many submissions",
      });
    }

    // If rate limit is not exceeded, forward the form data to the Web3Forms API.
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });

    const result = await response.json();

    // If Web3Forms indicates a failure, return an error response.
    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: "Failed to submit", 
      });
    }

    // If the submission is successful, return a success response.
    return res.status(200).json({ 
      success: true, 
      message: "Submitted Successfully" 
    });

  } catch (err) {
    // Catch any unexpected server errors and return a generic error message.
    console.error(err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
}