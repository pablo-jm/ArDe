import Header from "../../components/Header/Header"
import Footer from "../../components/Footer/Footer"
import EventsSection from "../../components/EventsSection/EventsSection"
import ContactSection from "../../components/ContactSection/ContactSection"
import "./Home.css"

const Home = () => {
  return (
    <div className="home-father-container">
      <Header />

      <main className="home-content-wrapper">
        <div className="home-logo-section">
          <div className="home-logo-content">
            <img
              src="https://res.cloudinary.com/df9wuyrbg/image/upload/v1747152138/Logo_ARDE_pab1ao.svg"
              alt="Descripción de la imagen"
              className="home-logo"
            />
            <div className="h4-wrapper">
              <h4>Arte y Decoración</h4>
            </div>
          </div>
        </div>
        <div className="home-description-section">
          <p>Una mirada artística que transforma lo cotidiano en lienzos llenos de vida, textura y color.</p>
        </div>
        <EventsSection />
        <div id="home-contact-section">
          <ContactSection />
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default Home
