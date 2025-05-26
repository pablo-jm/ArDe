import UserModel from '../models/UserModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


const SECRET_KEY = 'clave_secreta';



const validateRegisterData = ({ fullName, email, password }) => {
  const errors = [];

  if (!fullName || fullName.length < 3 || fullName.length > 100) {
    errors.push('El nombre completo debe tener entre 3 y 100 caracteres.');
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    errors.push('El correo electrónico no es válido.');
  }

  if (!password || password.length < 8 || password.length > 100) {
    errors.push('La contraseña debe tener más de 8 caracteres.');
  }

  const hasUpperCase = /[A-Z]/.test(password);
  if (!hasUpperCase) {
    errors.push('La contraseña debe contener al menos una letra mayúscula.');
  }

  return errors;
};


export const register = async (req, res) => {
  const { email, password, fullName } = req.body;

  const validationErrors = validateRegisterData({ fullName, email, password });
    if (validationErrors.length > 0) {
      return res.status(400).json({ message: validationErrors.join(' ') });
    }

  try {
    
    const existingUser = await UserModel.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'El correo ya está registrado.' });
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await UserModel.create({ full_name: fullName, email, password: hashedPassword});

    const token = jwt.sign(
      { id: newUser.id, email: newUser.email, role: newUser.role },
      SECRET_KEY,
      { expiresIn: '2h' }
    );

    return res.status(201).json({
      message: 'Usuario creado exitosamente.',
      token,
      user: {
        id: newUser.id,
        fullName: newUser.full_name,
        email: newUser.email
      }
    });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ where: { email }, attributes: ['id', 'email', 'full_name', 'password', 'role'] });
    if (!user) return res.status(401).json({ message: 'Usuario no encontrado.' });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(401).json({ message: 'Contraseña incorrecta.' });

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      SECRET_KEY,
      { expiresIn: '2h' }
    );

    res.json({
      message: 'Inicio de sesión exitoso.',
      token,
      user: { 
        id: user.id, 
        email: user.email, 
        fullName: user.full_name, 
        role: user.role}
    });
    

  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ message: error.message });
  }
};

