export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  try {
    const { browser, visitor_id, resume_download } = req.body || {};
    const SHEETDB_URL = process.env.SHEETDB_URL;

    // ----- New visitor logging -----
    if (!visitor_id) {
      const forwarded = req.headers["x-forwarded-for"];
      const ip =
        (forwarded ? forwarded.split(",")[0] : req.socket.remoteAddress) || "";

      const geoRes = await fetch(`https://ipwho.is/${ip}`);
      const geoData = await geoRes.json();

      const isp = geoData.connection?.isp || "";
      const country = geoData.country || "";
      const region = geoData.region || "";
      const city = geoData.city || "";
      const vpn_suspicious = geoData.security?.vpn === true;

      const ua = req.headers["user-agent"] || "";
      let os = "Unknown",
        device = "Desktop";

      if (/Android/.test(ua)) os = "Android";
      else if (/iPhone|iPad|iPod/.test(ua)) os = "iOS";
      else if (/Win/.test(ua)) os = "Windows";
      else if (/Mac/.test(ua)) os = "MacOS";
      else if (/Linux/.test(ua)) os = "Linux";

      if (/Mobile|iPhone|Android/.test(ua)) device = "Mobile";
      else if (/Tablet|iPad/.test(ua)) device = "Tablet";

      const newVisitorId = Math.floor(Math.random() * 90000) + 10000;

      const now = new Date();
      const date = now.toLocaleDateString("en-IN", {
        timeZone: "Asia/Kolkata",
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
      const time =
        "'" +
        now
          .toLocaleTimeString("en-IN", {
            timeZone: "Asia/Kolkata",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: true,
          })
          .toUpperCase();

      const payload = {
        visitor_id: newVisitorId,
        ip,
        isp,
        country,
        region,
        city,
        device,
        os,
        browser,
        resume_download: "false",
        date,
        time,
        vpn_suspicious: vpn_suspicious ? "true" : "false",
      };

      await fetch(`${SHEETDB_URL}?insert=top`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify([payload]),
      });

      return res.status(200).json({ message: "Visitor logged", data: payload });
    }

    if (visitor_id && resume_download) {
      await fetch(`${SHEETDB_URL}/visitor_id/${visitor_id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify([{ resume_download: "true" }]),
      });
      return res.status(200).json({ message: "Resume download logged" });
    }

    return res.status(400).json({ message: "Invalid request" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to log visitor" });
  }
}