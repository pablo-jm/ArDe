import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer'
import ContactSection from '../../components/ContactSection/ContactSection'
import './Shop.css'

const Shop = () => {
  return (
    <div className="shop-father-container">
      <Header />
        <main className="shop-content-wrapper">
          <div className="shop-title">
            <h3>Tienda</h3>
          </div>
          <div className="catalogo-grid">

          </div>
        </main>
        <div id="shop-contact-section">
            <ContactSection />
          </div>
      <Footer />
    </div>
  );
};

export default Shop;