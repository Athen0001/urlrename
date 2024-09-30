import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

const Url = sequelize.define('Url', {
  code: {
    type: DataTypes.STRING(10),
    allowNull: false,
    unique: true,
  },
  originalUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  accessCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
}, {
  timestamps: true, // Inclui as colunas `createdAt` e `updatedAt`
});

export default Url;
