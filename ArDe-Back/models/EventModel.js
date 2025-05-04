import { DataTypes } from 'sequelize';
import sequelize from '../database/db.js';

const EventModel = sequelize.define('Event', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING(150),
    allowNull: false,
    validate: {
      len: [3, 150]
    }
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true, // descripción opcional
    validate: {
      len: [3, 150]
    }
  },
  event_time: {
    type: DataTypes.TIME,
    allowNull: false
  },
  event_date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  place: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      len: [3, 255]
    }
  }
});

export default EventModel;
