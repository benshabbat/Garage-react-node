import { useState, useRef, useEffect } from "react";

const BOT_INTRO = {
  id: "intro",
  role: "assistant",
  content:
    "שלום! אני הסוכן החכם של Garage770 🔧\nאני יכול לעזור לך עם מידע על תורים, לקוחות, רכבים ועוד.\nכיצד אוכל לסייע לך היום?",
  timestamp: new Date(),
};

export function useAgentChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([BOT_INTRO]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  useEffect(() => {
    if (isOpen) {
      setHasUnread(false);
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || isLoading) return;

    const userMsg = { id: Date.now(), role: "user", content: text, timestamp: new Date() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/agent/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ message: text, history: messages }),
      });
      const data = await res.json();
      const botMsg = {
        id: Date.now() + 1,
        role: "assistant",
        content: data.reply || "מצטער, לא הצלחתי לקבל תשובה.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMsg]);
      if (!isOpen) setHasUnread(true);
    } catch {
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, role: "assistant", content: "אירעה שגיאה. נסה שוב.", timestamp: new Date() },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return {
    isOpen,
    setIsOpen,
    messages,
    input,
    setInput,
    isLoading,
    hasUnread,
    bottomRef,
    inputRef,
    sendMessage,
    handleKey,
  };
}
