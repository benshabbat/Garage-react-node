import CheckCircle from "../icons/CheckCircle";

function Submitted({
  name="message"
  setIsSubmitted,
  text = " We'll contact you soon.",
  review,
}) {
  return (
    <div className="container-contact">
      <div className="success-message">
        <CheckCircle className="success-icon" />
        <h2 className="success-title">Thank You!</h2>
        <p>Your {name} has been sent successfully.{text}</p>
        {!review && (
          <button
            onClick={() => setIsSubmitted(false)}
            className="new-message-button"
          >
            Send Another Message
          </button>
        )}
      </div>
    </div>
  );
}

export default Submitted;
