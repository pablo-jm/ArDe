import { useNavigate } from 'react-router-dom';
import { showRegisterModal } from '../../services/RegisterUser';
import Swal from 'sweetalert2';
import './AuthButton.css';


const AuthButton = () => {

  const Navigate = useNavigate();

  const handleLoginClick = () => {
    Swal.fire({
      title: 'Iniciar Sesión',
      html: `
        <div style="text-align: center;">
          <img src="https://res.cloudinary.com/df9wuyrbg/image/upload/v1747153355/Logo_ARDE_black_mzmcpa.svg" alt="ARDE logo" style="max-width: 80px; margin-bottom: 10px;">
          <form id="login-form">
            <input type="email" id="email" class="sweet-auth-input" placeholder="Email" style="width: 80%; padding: 6px; margin-bottom: 8px;">
            <input type="password" id="password" class="sweet-auth-input" placeholder="Contraseña" style="width: 80%; padding: 6px; margin-bottom: 12px;">
          </form>
          <div style="margin-top: 15px;">
            <a href="#" id="register-link" style="color: #1a73e8; text-decoration: none; font-size: 12px;">También puedes crear una cuenta aquí</a>
          </div>
        </div>
      `,
      confirmButtonText: 'Iniciar sesión',
      confirmButtonColor: '#1a73e8',
      focusConfirm: false,
      backdrop: 'rgba(0, 0, 0, 0.7)',
      customClass: {
        container: 'sweet-container',
        popup: 'sweet-popup',
        title: 'sweet-title',
        confirmButton: 'sweet-button'
      },

      didOpen: () => {
        document.getElementById('register-link').addEventListener('click', (e) => {
          e.preventDefault();
          Swal.close();
          showRegisterModal();
        });
      },
      preConfirm: async () => {
        const email = Swal.getPopup().querySelector('#email').value;
        const password = Swal.getPopup().querySelector('#password').value;

        if (!email || !password) {
          Swal.showValidationMessage('Por favor, ingresa usuario y contraseña.');
          return false;
        }

        try {
            const response = await fetch('http://localhost:3000/auth/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (!response.ok) {
              Swal.showValidationMessage(data.message || 'Error al iniciar sesión');
              return false;
            }

            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));

            if (data.user.role === 'admin') {
              Swal.fire({
                title: '¡Bienvenid@, Admin!',
                icon: 'success',
                confirmButtonText: 'Ok',
                customClass: {
                  confirmButton: 'sweet-button'
                }}).then(() => {
                  Navigate('/admin/dashboard');
                });

            } else {

              Swal.fire({
                title: '¡Bienvenido!',
                text: 'Inicio de sesión exitoso',
                icon: 'success', 
                confirmButtonText: 'Ok',
                customClass: {
                  confirmButton: 'sweet-button'
                }}).then(() => {
                    window.location.reload();
                });

              return data;

        }} catch (error) {
          Swal.showValidationMessage(error.message || 'Error de red o servidor');
          return false;
        }
      }
    });
  };

  return (
    <a href="#" className="auth-button" role='button' onClick={(e) => { e.preventDefault(); handleLoginClick(); }}>
      Iniciar Sesión
    </a>
  );
};

export default AuthButton;
