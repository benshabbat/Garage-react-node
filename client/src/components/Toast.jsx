import { useToastStore } from "../stores/toastStore";
import "./toast.css";

export default function Toast() {
  const { message, type, visible, hide } = useToastStore();
  if (!visible) return null;

  return (
    <div className={`toast toast--${type}`} role="status" aria-live="polite">
      <span>{message}</span>
      <button type="button" className="toast__close" onClick={hide} aria-label="Close">
        ×
      </button>
    </div>
  );
}
