import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

const Url = sequelize.define('Url', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false
  },
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

sequelize.sync()
  .then(() => {
    console.log('Tabela Url sincronizada com sucesso.');
  })
  .catch((error) => {
    console.error('Erro ao sincronizar a tabela Url:', error);
  });

export default Url;
