import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-left">
        <p>© 2025 ArDe<br />Todos los derechos reservados</p>
      </div>

      <div className="footer-center">
        <img
          src="https://res.cloudinary.com/df9wuyrbg/image/upload/v1747152138/Logo_ARDE_pab1ao.svg"
          alt="ARDE logo"
          className="footer-logo-img"
        />
      </div>

      <div className="footer-right">
        <img
          src="https://res.cloudinary.com/df9wuyrbg/image/upload/v1748771309/instagram_t968uz.png"
          alt="Instagram"
          className="social-icon"
        />
        <img
          src="https://res.cloudinary.com/df9wuyrbg/image/upload/v1748771309/facebook_b6jwaf.png"
          alt="Facebook"
          className="social-icon"
        />
        <img
          src="https://res.cloudinary.com/df9wuyrbg/image/upload/v1748771309/x_c1g1af.png"
          alt="Twitter"
          className="social-icon"
        />
      </div>
    </footer>
  );
};

export default Footer;
