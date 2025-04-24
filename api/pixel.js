export default async function handler(req, res) {
  const { email, university, company, type, t } = req.query;

  const scriptUrl = "https://script.google.com/macros/s/AKfycbyNYsFiOTNachZgvExnaut6c4Mx_GuMw3TyoOY3QZ6K3sH7rMeAQ3tXH_lxwo_Ee43ikw/exec";

  try {
    await fetch(scriptUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: type || "open",
        email,
        university,
        company,
        time: t,
      }),
    });

    const pixel = Buffer.from("R0lGODlhAQABAIABAP///wAAACwAAAAAAQABAAACAkQBADs=", "base64");
    res.setHeader("Content-Type", "image/gif");
    res.setHeader("Content-Length", pixel.length);
    res.status(200).send(pixel);
  } catch (err) {
    console.error("🔥 pixel error:", err);
    res.status(500).json({ error: "Pixel error", detail: err.message });
  }
}
