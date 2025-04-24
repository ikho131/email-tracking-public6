export default async function handler(req, res) {
  const { email, university, company, type, sentAt } = req.query;

  const scriptUrl = "https://script.google.com/macros/s/AKfycbx2EVqvYwqPFu2pqVAxTRC3BMjv-RQeQW159mpusGN4pUJIy_PKmNhDNiIq1i151dFxdA/exec";

  console.log("📩 [PIXEL] 요청 수신됨");
  console.log("받은 쿼리값:", { email, university, company, type, sentAt });

  try {
    const payload = {
      type: type || "open",
      email,
      university,
      company,
      sentAt,                    // 발송 시각
      time: new Date().toISOString(),  // ✅ 열람 시각: 현재 시각
    };

    console.log("📡 Google Apps Script로 POST 요청 전송 ▶️", payload);

    await fetch(scriptUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    console.log("✅ Google Apps Script POST 완료");

    const pixel = Buffer.from(
      "R0lGODlhAQABAIABAP///wAAACwAAAAAAQABAAACAkQBADs=",
      "base64"
    );
    res.setHeader("Content-Type", "image/gif");
    res.setHeader("Content-Length", pixel.length);
    res.status(200).send(pixel);
  } catch (err) {
    console.error("🔥 pixel error:", err);
    res.status(500).json({ error: "Pixel error", detail: err.message });
  }
}
