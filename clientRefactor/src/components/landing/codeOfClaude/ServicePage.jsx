import "./ServicePage.css"


const ServicesPage = () => {
    const services = [
      {
        id: 1,
        icon: "🔧",
        title: "טיפול שוטף",
        description: "טיפול תקופתי לרכב הכולל החלפת שמנים, מסננים ובדיקות מקיפות",
        details: [
          "החלפת שמן מנוע",
          "החלפת מסנן שמן",
          "החלפת מסנן אוויר",
          "בדיקת בלמים",
          "בדיקת מערכת היגוי",
          "בדיקת מתלים",
          "איפוס מחשב טיפולים"
        ],
        price: "החל מ-299 ₪"
      },
      {
        id: 2,
        icon: "⚡",
        title: "מערכות חשמל",
        description: "טיפול בכל מערכות החשמל ברכב",
        details: [
          "איתור תקלות חשמל",
          "טיפול במערכת ההתנעה",
          "תיקון מערכות תאורה",
          "בדיקת מצבר",
          "תיקון חלונות חשמליים",
          "טיפול במערכת מיזוג"
        ],
        price: "אבחון - 150 ₪"
      },
      {
        id: 3,
        icon: "🚗",
        title: "מיזוג אוויר",
        description: "טיפול מקיף במערכת המיזוג של הרכב",
        details: [
          "בדיקת תקינות המערכת",
          "מילוי גז למזגן",
          "ניקוי מערכת המיזוג",
          "החלפת פילטר מזגן",
          "תיקון נזילות",
          "שיפור ביצועי קירור"
        ],
        price: "החל מ-199 ₪"
      }
    ];
  
    return (
      <div className="services-page">
        <header className="services-header">
          <h1>השירותים שלנו</h1>
          <p>אנו מציעים מגוון רחב של שירותים לרכב שלך</p>
        </header>
  
        <div className="services-list">
          {services.map(service => (
            <div key={service.id} className="service-item">
              <div className="service-header">
                <span className="service-icon">{service.icon}</span>
                <h2>{service.title}</h2>
              </div>
              <p className="service-description">{service.description}</p>
              <ul className="service-details">
                {service.details.map((detail, index) => (
                  <li key={index}>{detail}</li>
                ))}
              </ul>
              <div className="service-price">{service.price}</div>
            </div>
          ))}
        </div>
  
        <div className="service-note">
          <h3>💡 חשוב לדעת</h3>
          <ul>
            <li>כל העבודות מתבצעות על ידי מכונאים מוסמכים</li>
            <li>אחריות מלאה על כל העבודות</li>
            <li>שימוש בחלפים מקוריים</li>
            <li>המחירים אינם כוללים חלפים אלא אם צוין אחרת</li>
          </ul>
        </div>
      </div>
    );
  };
  
  export default ServicesPage;