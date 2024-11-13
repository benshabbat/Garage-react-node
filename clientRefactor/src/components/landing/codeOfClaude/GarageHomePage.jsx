import ContactPage from "./ContactPage";
import "./GarageHomepage.css";
import ServicesPage from "./ServicePage";
const GarageHomepage = () => {
  const services = [
    {
      icon: "🚗",
      title: "טיפול רכב",
      description: "טיפולים שוטפים לכל סוגי הרכבים",
    },
    {
      icon: "🔧",
      title: "תיקונים",
      description: "תיקון תקלות מכניות וחשמליות",
    },
    {
      icon: "👍",
      title: "בדיקות",
      description: "בדיקות רכב מקיפות ומקצועיות",
    },
  ];

  const handleContactClick = () => {
    // ניתן להחליף את זה בניהול ניווט שלך
    console.log("Contact button clicked");
  };

  return (
    <div className="page-container">
      <header className="hero">
        <div className="hero-content">
          <h1>המוסך המקצועי שלך</h1>
          <p>שירות אמין ומקצועי כבר למעלה מ-20 שנה</p>
          <button onClick={handleContactClick} className="cta-button">
            קבע תור עכשיו
          </button>
        </div>
      </header>

      <ServicesPage />
      <ContactPage />
    </div>
  );
};

export default GarageHomepage;
