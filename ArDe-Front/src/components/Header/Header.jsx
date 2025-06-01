import { Link } from 'react-router-dom';
import { useState, useEffect} from 'react';
import Swal from 'sweetalert2';
import AuthButton from '../AuthButton/AuthButton.jsx'
import { useLocation } from 'react-router-dom';
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
    

    const handleLogout = async () => {
      const confirm = await Swal.fire({
        title: '¿Cerrar sesión?',
        icon: 'warning',
        confirmButtonText: 'Cerrar sesión',
        backdrop: 'rgba(0, 0, 0, 0.7)',
        customClass: {
          container: 'sweet-container',
          popup: 'sweet-popup',
          title: 'sweet-title',
          confirmButton: 'sweet-button'
        },
      });

      if (confirm.isConfirmed) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/';
      };
  }

    const handleDeleteAccount = async () => {
      const confirm = await Swal.fire({
        title: '¿Eliminar cuenta?',
        text: 'Esta acción eliminará permanentemente tu cuenta.',
        icon: 'warning',
        backdrop: 'rgba(0, 0, 0, 0.7)',
        confirmButtonText: 'Eliminar',
        customClass: {
          container: 'sweet-container',
          popup: 'sweet-popup',
          title: 'sweet-title',
          confirmButton: 'sweet-button'
        },
      });

      if (confirm.isConfirmed) {
        try {
          const token = localStorage.getItem('token');
          const user = JSON.parse(localStorage.getItem('user'));

          const response = await fetch(`http://localhost:3000/users/${user.email}`, {
            method: 'DELETE',
            headers: {
              Authorization: `Bearer ${token}`
            }
          });

          const data = await response.json();

          if (response.ok) {
            Swal.fire('Cuenta eliminada', '', 'success').then(() => {
              localStorage.clear();
              window.location.href = '/';
            });
          } else {
            Swal.fire('Error', data.message || 'No se pudo eliminar la cuenta.', 'error');
          }
        } catch (err) {
          Swal.fire('Error del servidor', err.message, 'error');
        }
      }
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
            <input type="password" id="new-password" class="sweet-input" placeholder="Nueva contraseña" style="width: 80%; padding: 6px; margin-bottom: 8px;">
          </form>
            <button type="button" id="logout-button" class="logout-button">Cerrar sesión</button>
          <div style="margin-top: 15px;">
            <a href="#" id="delete-link" style="color: #1a73e8; text-decoration: none; font-size: 12px;">Puedes eliminar tu cuenta aquí</a>
          </div>
        </div>
      `,
      confirmButtonText: 'Guardar cambios',
      focusConfirm: false,
      backdrop: 'rgba(0, 0, 0, 0.7)',
      customClass: {
        container: 'sweet-container',
        popup: 'sweet-popup',
        title: 'sweet-perfil',
        confirmButton: 'sweet-confirm'
      },
      didOpen: () => {
        const logoutButton = Swal.getPopup().querySelector('#logout-button');
        logoutButton.addEventListener('click', handleLogout);

        const deleteButton = Swal.getPopup().querySelector('#delete-link');
        deleteButton.addEventListener('click', handleDeleteAccount);
      },

      preConfirm: async () => {
        const fullName = Swal.getPopup().querySelector('#full-name').value;
        const newPassword = Swal.getPopup().querySelector('#new-password').value;

        if (!fullName) {
          Swal.showValidationMessage('El nombre no puede estar vacío.');
          return false;
        }

        if (!newPassword || newPassword.length < 8 || newPassword.length > 100) {
          Swal.showValidationMessage('La contraseña debe tener al menos 8 caracteres.');
        }

        const hasUpperCase = /[A-Z]/.test(newPassword);

        if (!hasUpperCase) {
          Swal.showValidationMessage('La contraseña debe contener al menos una letra mayúscula.');
        }

        try {
          const token = localStorage.getItem('token');

          const body = { fullName };

          if (newPassword.trim() !== '') {
              body.password = newPassword;
          }

          const response = await fetch(`http://localhost:3000/users/${user.email}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(body)
          });

          const data = await response.json();

          if (!response.ok) {
            Swal.showValidationMessage(data.message || 'Error al actualizar perfil');
            return false;
          }

          const updatedUser = { ...user, fullName };

          localStorage.setItem('token', data.token);
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

  const logoLink = user?.role === 'admin' ? '/admin/dashboard' : '/';

  const location = useLocation();

  const contactLink = location.pathname === '/shop' ? '#shop-contact-section' : '#home-contact-section';


  return (
    <header className="header">
      <div className="logo">
        <Link to={logoLink}>
          <img src="https://res.cloudinary.com/df9wuyrbg/image/upload/v1747152138/Logo_ARDE_pab1ao.svg" alt="ARDE logo" className="logo-img" />
        </Link>
      </div>
      <nav className="nav-links">
        <ul>
          <li><Link to="/shop">Tienda</Link></li>
          {location.pathname !== '/admin/dashboard' && (
            <li><a href={contactLink}>Contacto</a></li>
          )}
          <li>
            {user ? (
              <div className="user-session">
                <span className="user-name" onClick={showProfileModal}><i className="bi bi-person"></i>{user.fullName}</span>
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
