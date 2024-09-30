import { Sequelize } from "sequelize";

// Configurando o Sequelize para o PostgreSQL
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'postgres',
  logging: false, // Desativa logs de SQL para um ambiente mais limpo
});

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexão ao banco de dados foi estabelecida com sucesso.');
  } catch (error) {
    console.error('Não foi possível conectar ao banco de dados:', error);
    process.exit(1); // Para a aplicação se a conexão falhar
  }
};

export { sequelize };
