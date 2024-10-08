import Url from '../models/url.js';
import validateUrl from '../utils/validateUrls.js';
import crypto from 'crypto';
import sanitizeHtml from 'sanitize-html';
import path from 'path';

const __dirname = path.resolve();

// Gera código aleatório para a URL encurtada
const generateCode = () => {
  return crypto.randomBytes(3).toString('hex'); // Gera um código de 6 caracteres
};

//GET HOME
export const home = (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
};
export const serveCss = (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/css/styles.css'));
};
export const serveJs = (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/js/script.js'));
};

//POST shorten
export const shortenUrl = async (req, res) => {
  let { originalUrl } = req.body;

  originalUrl = sanitizeHtml(originalUrl, {
    allowedTags: [],
    allowedAttributes: {}
  });

  if (!validateUrl(originalUrl)) {
    return res.status(400).json({ error: 'URL inválida.' });
  }

  try {
    let url = await Url.findOne({ where: { originalUrl } });

    if (url) {
      return res.json({ shortUrl: `${process.env.BASE_URL}/${url.code}` });
    }

    const code = generateCode();
    url = await Url.create({ originalUrl, code });

    return res.status(201).json({ shortUrl: `${process.env.BASE_URL}/${url.code}` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro no servidor.', details: error.message });
  }
};

//GET redirect
export const redirectUrl = async (req, res) => {
  let { code } = req.params;

  code = sanitizeHtml(code, {
    allowedTags: [],
    allowedAttributes: {}
  });

  try {
    const url = await Url.findOne({ where: { code } });

    if (!url) {
      return res.status(404).json({ error: 'URL não encontrada.' });
    }

    // Atualiza contador de acessos
    url.accessCount += 1;
    await url.save();

    return res.redirect(url.originalUrl);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro no servidor.', details: error.message });
  }
};
