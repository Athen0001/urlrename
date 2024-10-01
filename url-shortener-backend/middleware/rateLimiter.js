import rateLimit from 'express-rate-limit';

const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100, 
  message: 'Muitas requisições criadas a partir deste IP. Tente novamente mais tarde.',
});

export default rateLimiter;
