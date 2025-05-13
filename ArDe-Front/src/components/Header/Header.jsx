import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import './Header.css';

const Header = () => {

  const handleLoginClick = () => {
    // Llamar a SweetAlert2 para mostrar el formulario de login
    Swal.fire({
      title: 'Iniciar Sesión',
      html: `
        <div style="text-align: center;">
          <img src="https://res.cloudinary.com/df9wuyrbg/image/upload/v1747153355/Logo_ARDE_black_mzmcpa.svg" alt="ARDE logo" style="max-width: 80px; margin-bottom: 10px;">
          <form id="login-form">
            <input type="email" id="email" class="swal2-input" placeholder="Email" style="width: 80%; padding: 6px; margin-bottom: 8px; border-radius: 8px; border: 1px solid #ccc; font-size: 12px;" required>
            <input type="password" id="password" class="swal2-input" placeholder="Contraseña" style="width: 80%; padding: 6px; margin-bottom: 12px; border-radius: 8px; border: 1px solid #ccc; font-size: 12px;" required>
          </form>
          <div style="margin-top: 15px;">
            <a href="javascript:void(0);" style="color: #1a73e8; text-decoration: none; font-size: 12px;" id="register-link">También puedes crear una cuenta aquí</a>
          </div>
        </div>
      `,
      confirmButtonText: 'Iniciar sesión',
      confirmButtonColor: '#1a73e8',
      focusConfirm: false,
      backdrop: 'rgba(0, 0, 0, 0.7)', // Oscurecer el fondo
      customClass: {
        container: 'my-swal-container',
        popup: 'my-swal-popup',
        title: 'my-swal-title',
        confirmButton: 'my-swal-button'
      },

      preConfirm: () => {

        const username = Swal.getPopup().querySelector('#email').value;
        const password = Swal.getPopup().querySelector('#password').value;
        
        if (!username || !password) {
          Swal.showValidationMessage('Por favor, ingresa usuario y contraseña');
          return false;
        }

        return { username, password };
      }
    });

    
    document.getElementById('register-link').addEventListener('click', () => {

    Swal.close();

      
      Swal.fire({
        title: 'Crear una Cuenta',
        html: `
          <div style="text-align: center;">
            <img src="https://res.cloudinary.com/df9wuyrbg/image/upload/v1747153355/Logo_ARDE_black_mzmcpa.svg" alt="ARDE logo" style="max-width: 80px; margin-bottom: 10px;">
            <form id="register-form">
              <input type="text" id="full-name" class="swal2-input" placeholder="Nombre Completo" style="width: 80%; padding: 6px; margin-bottom: 8px; border-radius: 8px; border: 1px solid #ccc; font-size: 12px;" required>
              <input type="text" id="email" class="swal2-input" placeholder="Email" style="width: 80%; padding: 6px; margin-bottom: 8px; border-radius: 8px; border: 1px solid #ccc; font-size: 12px;" required>
              <input type="password" id="new-password" class="swal2-input" placeholder="Contraseña" style="width: 80%; padding: 6px; margin-bottom: 12px; border-radius: 8px; border: 1px solid #ccc; font-size: 12px;" required>
              <input type="password" id="confirm-password" class="swal2-input" placeholder="Confirmar Contraseña" style="width: 80%; padding: 6px; margin-bottom: 12px; border-radius: 8px; border: 1px solid #ccc; font-size: 12px;" required>
            </form>
          </div>
        `,
        confirmButtonText: 'Crear cuenta',
        confirmButtonColor: '#1a73e8',
        focusConfirm: false,
        backdrop: 'rgba(0, 0, 0, 0.7)',
        customClass: {
          container: 'my-swal-container',
          popup: 'my-swal-popup',
          title: 'my-swal-title',
          confirmButton: 'my-swal-button'
        },

        preConfirm: () => {

          const newUsername = Swal.getPopup().querySelector('#new-username').value;
          const newPassword = Swal.getPopup().querySelector('#new-password').value;
          const confirmPassword = Swal.getPopup().querySelector('#confirm-password').value;
          
          if (!newUsername || !newPassword || !confirmPassword) {
            Swal.showValidationMessage('Por favor ingresa todos los campos');
            return false;
          }

          if (newPassword !== confirmPassword) {
            Swal.showValidationMessage('Las contraseñas no coinciden');
            return false;
          }

          return { newUsername, newPassword };
        }
      });
    });
  };

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
          <li><a href="javascript:void(0)" onClick={handleLoginClick}>Iniciar Sesión</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
