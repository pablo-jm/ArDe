import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import './AuthButton.css';


const AuthButton = () => {

  const validateRegisterData = ({ fullName, email, password, confirmPassword }) => {

    if (!fullName || fullName.length < 3 || fullName.length > 100) {
      return 'El nombre completo debe tener entre 3 y 100 caracteres.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return 'El correo electrónico no es válido.';
    }

    if (!password || password.length < 8 || password.length > 100) {
      return 'La contraseña debe tener más de 8 caracteres.';
    }

    const hasUpperCase = /[A-Z]/.test(password);
    if (!hasUpperCase) {
      return 'La contraseña debe contener al menos una letra mayúscula.';
    }

    if (password !== confirmPassword) {
      return 'Las contraseñas no coinciden.';
    }

    return null;
  };

  const showRegisterModal = () => {
  Swal.fire({
    title: 'Crear una Cuenta',
    html: `
      <div style="text-align: center;">
        <img src="https://res.cloudinary.com/df9wuyrbg/image/upload/v1747153355/Logo_ARDE_black_mzmcpa.svg" alt="ARDE logo" style="max-width: 80px; margin-bottom: 10px;">
        <form id="register-form">
          <input type="text" id="full-name" class="sweet-auth-input" placeholder="Nombre Completo" style="width: 80%; padding: 6px; margin-bottom: 8px;">
          <input type="text" id="email" class="sweet-auth-input" placeholder="Email" style="width: 80%; padding: 6px; margin-bottom: 8px;">
          <input type="password" id="password" class="sweet-auth-input" placeholder="Contraseña" style="width: 80%; padding: 6px; margin-bottom: 12px;">
          <input type="password" id="confirm-password" class="sweet-auth-input" placeholder="Confirmar Contraseña" style="width: 80%; padding: 6px; margin-bottom: 12px;">
        </form>
      </div>
    `,
    confirmButtonText: 'Crear cuenta',
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
      document.getElementById('full-name').focus();
    },
    preConfirm: async () => {
      const email = Swal.getPopup().querySelector('#email').value;
      const fullName = Swal.getPopup().querySelector('#full-name').value;
      const password = Swal.getPopup().querySelector('#password').value;
      const confirmPassword = Swal.getPopup().querySelector('#confirm-password').value;

      const errorMessage = validateRegisterData({ fullName, email, password, confirmPassword });
      if (errorMessage) {
        Swal.showValidationMessage(errorMessage);
        return false;
      }

      try {
        const response = await fetch('http://localhost:3000/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password, fullName })
        });

        const data = await response.json();

        if (!response.ok) {
          Swal.showValidationMessage(data.message || 'Error al registrar');
          return false;
        }

        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));

        Swal.fire({
        title: 'Bienvenid@',
        text: data.user.fullName,
        icon: 'success',
        customClass: {
            title: 'sweet-reg-title',
            popup: 'sweet-reg-popup'
        }
        }).then(() => {
            window.location.reload();
        });


        return data;

      } catch (error) {
        Swal.showValidationMessage(error.message || 'Error de red o del servidor.');
        return false;
      }
    }
  });
};




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
              Swal.fire('¡Bienvenid@, Admin!', '', 'success').then(() => {
                Navigate('/admin/dashboard');
              });

            } else {

            Swal.fire('¡Bienvenido!', 'Inicio de sesión exitoso', 'success').then(() => {
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
