import express from 'express';
import { shortenUrl, redirectUrl } from '../controllers/urlController.js';
import rateLimiter from '../middleware/rateLimiter.js';

const router = express.Router();

router.post('/shorten', rateLimiter, shortenUrl);
router.get('/:code', redirectUrl);

export default router;
