import 'dotenv/config'; // Carrega as variáveis de ambiente
import express from 'express';
import { connectDB } from './config/database.js';
import urlRoutes from './routes/urlRoutes.js';
import errorHandler from './middleware/errorHandler.js';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';

const app = express();

// Conexão ao banco de dados
connectDB();

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('tiny'));
app.use(express.json());

// Rotas
app.use('/', urlRoutes);

// Middleware de tratamento de erros
app.use(errorHandler);

// Iniciar o servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
