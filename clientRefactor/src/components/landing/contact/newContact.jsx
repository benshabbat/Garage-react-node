export default function newContact() {
  return (
    <div className="container">
      <form>
        <input type="text" id="firstName" placeholder="first name" required />
        <input type="text" id="lasstName" placeholder="last name" required />
        <input type="text" id="email" placeholder="email" required />
        <input type="text" id="phone" placeholder="phone" required />
      </form>
    </div>
  );
}
