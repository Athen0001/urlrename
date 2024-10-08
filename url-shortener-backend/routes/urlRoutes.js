import express from 'express';
import { shortenUrl, redirectUrl, home, serveCss, serveJs } from '../controllers/urlController.js';
import rateLimiter from '../middleware/rateLimiter.js';

const router = express.Router();

router.get('/', home);
router.get('/css/styles.css', serveCss);
router.get('/js/script.js', serveJs);

router.post('/shorten', rateLimiter, shortenUrl);
router.get('/:code', redirectUrl);

export default router;
