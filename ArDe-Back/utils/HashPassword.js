import bcrypt from 'bcryptjs';

const password = 'Admin123';

bcrypt.hash(password, 10)
  .then(hash => {
    console.log('Hash generado para Admin123:\n', hash);
  })
  .catch(err => {
    console.error('Error al encriptar contraseña:', err);
  });
