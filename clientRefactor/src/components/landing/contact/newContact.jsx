import "./newContact.css";


//TODO:Logic
export default function NewContact() {
  return (
    <div className="container-contact">
      <form>
        <h1>Contact Us</h1>
        <div className="input-group">
          <input type="text" id="firstName" placeholder="First Name" required />
          <input type="text" id="lastName" placeholder="Last Name" required />
        </div>
        <div className="input-group">
          <input type="email" id="email" placeholder="Email" required />
          <input type="tel" id="phone" placeholder="Phone" required />
        </div>
        <h4>Type your message here...</h4>
        <textarea required></textarea>
        <div className="button-container">
          <button type="submit">Send</button>
        </div>
      </form>
    </div>
  );
}
