export default function CheckCircle() {
  return (
    <svg
      className="success-icon"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        className="check-circle"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M8 12.5L10.5 15L16 9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="check-mark"
      />
    </svg>
  );
}
