import { useToastStore } from "../stores/toastStore";
import "./toast.css";

export default function Toast() {
  const message = useToastStore((s) => s.message);
  const type = useToastStore((s) => s.type);
  const visible = useToastStore((s) => s.visible);
  const hide = useToastStore((s) => s.hide);
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
