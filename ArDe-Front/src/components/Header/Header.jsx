import { Link } from 'react-router-dom';
import { useState, useEffect} from 'react';
import Swal from 'sweetalert2';
import AuthButton from '../AuthButton/AuthButton.jsx'
import './Header.css';

const Header = () => {

  const [user, setUser] = useState(null);

    useEffect(() => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch {
          setUser(null);
        }
      }
    }, []);

    const handleLogout = () => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.reload();
    };

  const showProfileModal = () => {

    const storedUser = localStorage.getItem('user');
    if (!storedUser) return;

    const user = JSON.parse(storedUser);

    Swal.fire({
      title: 'Perfil',
      html: `
        <div style="text-align: center;">
          <form id="profile-form">
            <input type="text" id="full-name" class="sweet-input" placeholder="Nombre completo" value="${user.fullName || ''}" style="width: 80%; padding: 6px; margin-bottom: 8px;">
            <input type="email" id="profile-email" class="sweet-input" placeholder="Email" value="${user.email}" style="width: 80%; padding: 6px; margin-bottom: 8px;" disabled>
          </form>
          <button type="button" id="logout-button" class="logout-button">Cerrar sesión</button
        </div>
      `,
      confirmButtonText: 'Guardar cambios',
      focusConfirm: false,
      customClass: {
        container: 'sweet-container',
        popup: 'sweet-popup',
        title: 'sweet-perfil',
        confirmButton: 'sweet-confirm'
      },
      didOpen: () => {
        const logoutButton = Swal.getPopup().querySelector('#logout-button');
        logoutButton.addEventListener('click', handleLogout);
      },

      preConfirm: async () => {
        const fullName = Swal.getPopup().querySelector('#full-name').value;

        if (!fullName) {
          Swal.showValidationMessage('El nombre no puede estar vacío.');
          return false;
        }

        try {
          const token = localStorage.getItem('token');

          const response = await fetch(`http://localhost:3000/users/${user.email}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ fullName })
          });

          const data = await response.json();

          if (!response.ok) {
            Swal.showValidationMessage(data.message || 'Error al actualizar perfil');
            return false;
          }

          const updatedUser = { ...user, fullName };
          localStorage.setItem('user', JSON.stringify(updatedUser));

          Swal.fire('¡Perfil actualizado!', '', 'success').then(() => {
            window.location.reload();
          });

        } catch (error) {
          Swal.showValidationMessage(error.message || 'Error de red o del servidor.');
          return false;
        }
      }
    });
};

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">
          <img src="https://res.cloudinary.com/df9wuyrbg/image/upload/v1747152138/Logo_ARDE_pab1ao.svg" alt="ARDE logo" className="logo-img" />
        </Link>
      </div>
      <nav className="nav-links">
        <ul>
          <li><Link to="/shop">Tienda</Link></li>
          <li><a href="">Contacto</a></li>
          <li>
            {user ? (
              <div className="user-session">
                <span className="user-email" onClick={showProfileModal}><i className="bi bi-person"></i>{user.fullName}</span>
              </div>
            ) : (
              <AuthButton />
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
