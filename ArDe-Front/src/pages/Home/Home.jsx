import Header from '../../components/Header/Header';
import './Home.css'

const Home = () => {
  
  return (
    <div className="home-father-container">
      <Header />

      <main className="home-content-wrapper">
        <div className="home-logo-section">
          <div className="home-logo-content">
            <img src="https://res.cloudinary.com/df9wuyrbg/image/upload/v1747152138/Logo_ARDE_pab1ao.svg" alt="Descripción de la imagen" className="home-logo"/>
            <h3></h3>
          </div>
        </div>



      </main>

    </div>
  );
};

export default Home;
