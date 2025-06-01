import Header from '../../components/Header/Header';
import Footer from "../../components/Footer/Footer"
import ContactSection from "../../components/ContactSection/ContactSection"

const Shop = () => {
  return (
    <div className='shop-father-container'>
      <Header />
        <main className="shop-content-wrapper">

          <div className="catalogo-grid">
            
          </div>

          <div id="shop-contact-section">
            <ContactSection />
          </div>
        </main>
      <Footer />
    </div>
  );
};

export default Shop;