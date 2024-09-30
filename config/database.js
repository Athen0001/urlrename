import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(
  process.env.DB_NAME, // Nome do banco de dados
  process.env.DB_USER, // Usuário do banco de dados
  process.env.DB_PASSWORD, // Senha do banco de dados
  {
    host: process.env.DB_HOST, // Host do banco (URL do Render)
    port: process.env.DB_PORT || 5432, // Porta do PostgreSQL
    dialect: 'postgres', // Dialeto usado pelo Sequelize
    logging: false,
  }
);

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexão ao banco de dados foi estabelecida com sucesso.');
  } catch (error) {
    console.error('Não foi possível conectar ao banco de dados:', error);
    process.exit(1);
  }
};

export { sequelize };

