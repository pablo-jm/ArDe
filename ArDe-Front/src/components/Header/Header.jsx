import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <Link to="/home">
          <img src="https://res.cloudinary.com/df9wuyrbg/image/upload/v1747152138/Logo_ARDE_pab1ao.svg" alt="ARDE logo" className="logo-img" />
        </Link>
      </div>
      <nav className="nav-links">
        <ul>
          <li><Link to="/shop">Tienda</Link></li>
          <li><a href="">Contacto</a></li>
          <li><a href="">Iniciar Sesión</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
