export default function newContact() {
  return (
    <div className="container">
      <form>
        <h1>Contact Us</h1>
        <input type="text" id="firstName" placeholder="first name" required />
        <input type="text" id="lasstName" placeholder="last name" required />
        <input type="text" id="email" placeholder="email" required />
        <input type="text" id="phone" placeholder="phone" required />
        <h4>Type your message here...</h4>
        <textarea required></textarea>
        <button></button>
      </form>
    </div>
  );
}
