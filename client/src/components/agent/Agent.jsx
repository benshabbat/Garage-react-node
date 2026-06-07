import "./Agent.css";
import { useAgentChat } from "./hooks/useAgentChat";

const TypingIndicator = () => (
  <div className="agent-message agent-message--bot">
    <div className="agent-bubble agent-bubble--bot">
      <span className="agent-typing">
        <span />
        <span />
        <span />
      </span>
    </div>
  </div>
);

const Message = ({ msg }) => {
  const isBot = msg.role === "assistant";
  const time = msg.timestamp.toLocaleTimeString("he-IL", { hour: "2-digit", minute: "2-digit" });
  return (
    <div className={`agent-message agent-message--${isBot ? "bot" : "user"}`}>
      {isBot && (
        <div className="agent-avatar">
          <BotIcon />
        </div>
      )}
      <div className={`agent-bubble agent-bubble--${isBot ? "bot" : "user"}`}>
        <p dir="auto">{msg.content}</p>
        <span className="agent-time">{time}</span>
      </div>
    </div>
  );
};

const BotIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="11" width="18" height="10" rx="2" />
    <circle cx="12" cy="5" r="2" />
    <path d="M12 7v4" />
    <line x1="8" y1="16" x2="8" y2="16" strokeWidth="3" />
    <line x1="12" y1="16" x2="12" y2="16" strokeWidth="3" />
    <line x1="16" y1="16" x2="16" y2="16" strokeWidth="3" />
  </svg>
);

const SendIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);

const CloseIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

export default function Agent() {
  const {
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
  } = useAgentChat();

  return (
    <>
      {/* Chat Panel */}
      <div
        className={`agent-panel ${isOpen ? "agent-panel--open" : ""}`}
        role="dialog"
        aria-label="AI Agent"
      >
        <div className="agent-panel-header">
          <div className="agent-header-info">
            <div className="agent-header-avatar">
              <BotIcon />
              <span className="agent-status-dot" />
            </div>
            <div>
              <p className="agent-header-name">Garage770 Agent</p>
              <p className="agent-header-sub">מוכן לסייע</p>
            </div>
          </div>
          <button className="agent-close-btn" onClick={() => setIsOpen(false)} aria-label="סגור">
            <CloseIcon />
          </button>
        </div>

        <div className="agent-messages" aria-live="polite">
          {messages.map((msg) => (
            <Message key={msg.id} msg={msg} />
          ))}
          {isLoading && <TypingIndicator />}
          <div ref={bottomRef} />
        </div>

        <form
          className="agent-input-area"
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage();
          }}
        >
          <textarea
            ref={inputRef}
            className="agent-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
            placeholder="כתוב הודעה..."
            rows={1}
            disabled={isLoading}
          />
          <button
            type="submit"
            className="agent-send-btn"
            disabled={!input.trim() || isLoading}
            aria-label="שלח"
          >
            <SendIcon />
          </button>
        </form>
      </div>

      {/* Floating Button */}
      <button
        className={`agent-fab ${isOpen ? "agent-fab--active" : ""}`}
        onClick={() => setIsOpen((v) => !v)}
        aria-label={isOpen ? "סגור סוכן" : "פתח סוכן AI"}
      >
        {isOpen ? <CloseIcon /> : <BotIcon />}
        {hasUnread && !isOpen && (
          <span className="agent-fab-badge" aria-label="הודעה חדשה מהסוכן" role="status" />
        )}
      </button>
    </>
  );
}
