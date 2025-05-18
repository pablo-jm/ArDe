import UserModel from '../models/UserModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


const SECRET_KEY = 'clave_secreta';


export const register = async (req, res) => {
  const { email, password, fullName } = req.body;

  try {
    
    const existingUser = await UserModel.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'El correo ya está registrado.' });
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await UserModel.create({ full_name: fullName, email, password: hashedPassword});

    const token = jwt.sign(
      { id: newUser.id, email: newUser.email },
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
    const user = await UserModel.findOne({ where: { email } });
    if (!user) return res.status(401).json({ message: 'Usuario no encontrado.' });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(401).json({ message: 'Contraseña incorrecta.' });

    const token = jwt.sign(
      { id: user.id, email: user.email },
      SECRET_KEY,
      { expiresIn: '2h' }
    );

    res.json({
      message: 'Inicio de sesión exitoso.',
      token,
      user: { id: user.id, email: user.email }
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

