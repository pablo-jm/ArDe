import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <img src="" alt="ARDE logo" className="logo-img" />
      </div>
      <nav className="nav-links">
        <ul>
          <li><a href="/home">Tienda</a></li>
          <li><a href="">Contacto</a></li>
          <li><a href="">Iniciar Sesión</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
