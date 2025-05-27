import { DataTypes } from 'sequelize';
import sequelize from '../database/db.js';

const WorkModel = sequelize.define('Work', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING(150),
    allowNull: false,
    validate: {
      len: [3, 100]
    }
  },
  description: {
    type: DataTypes.TEXT,
      allowNull: false,
      validate: {
      len: [10, 150]
    }
  },
  image_url: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      isUrl: true
    }
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      min: 1
    }
  },
  create_date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  dimensions: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  state: {
    type: DataTypes.ENUM('selling', 'sold'),
    allowNull: false,
    defaultValue: 'selling'
  }
});

export default WorkModel;
