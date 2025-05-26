import { DataTypes } from 'sequelize';
import sequelize from '../database/db.js';
import WorkModel from '../models/WorkModel.js'
import UserModel from '../models/UserModel.js'

const OrderModel = sequelize.define('Order', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
        model: 'Users',
        key: 'id'
      }
  },
  work_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
        model: 'Works',
        key: 'id'
      }
  },
  order_date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  state: {
    type: DataTypes.ENUM('Paid', 'Unpaid'),
    allowNull: false,
    defaultValue: 'Unpaid'
  },
  ship_address: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      len: [10, 255]
    }
  },
  phone_number: {
    type: DataTypes.STRING(20),
    allowNull: false,
    validate: {
      is: /^[0-9+\-()\s]+$/i
    }
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      min: 0
    }
  }
});


OrderModel.belongsTo(UserModel, { foreignKey: 'user_id' });
OrderModel.belongsTo(WorkModel, { foreignKey: 'work_id' });


export default OrderModel;
