import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SYSTEM_PROMPT = `אתה הסוכן החכם של Garage770 – מוסך שמנוהל באמצעות מערכת דיגיטלית.
תפקידך לסייע לאנשי הצוות המנהלתי בשאלות לגבי:
- ניהול תורים ועדכון סטטוס תיקונים
- פרטי לקוחות ורכבים
- שירותים שהגרז' מציע
- נתונים סטטיסטיים ומגמות
- כל שאלה אחרת הקשורה לפעילות המוסך

ענה בצורה מקצועית, ידידותית ותמציתית בעברית.
אם אינך יודע פרט ספציפי על הנתונים הנוכחיים, הסבר שאין לך גישה ישירה למסד הנתונים בזמן אמת.`;

export const chat = async (req, res, next) => {
  try {
    const { message, history = [] } = req.body;

    if (!message?.trim()) {
      return res.status(400).json({ error: "Message is required" });
    }

    const conversationHistory = history
      .filter((m) => m.role === "user" || m.role === "assistant")
      .slice(-10)
      .map((m) => ({ role: m.role, content: m.content }));

    conversationHistory.push({ role: "user", content: message });

    const response = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: conversationHistory,
    });

    const reply = response.content[0]?.text ?? "לא הצלחתי לייצר תשובה.";
    res.json({ reply });
  } catch (err) {
    next(err);
  }
};
