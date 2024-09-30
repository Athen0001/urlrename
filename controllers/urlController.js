import Url from '../models/url.js';
import validateUrl from '../utils/validateUrls.js';
const crypto = require('crypto');

// Gera código aleatório para a URL encurtada
const generateCode = () => {
  return crypto.randomBytes(3).toString('hex'); // Gera um código de 6 caracteres
};

exports.shortenUrl = async (req, res) => {
  const { originalUrl } = req.body;

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
    res.status(500).json({ error: 'Erro no servidor.' });
  }
};

exports.redirectUrl = async (req, res) => {
  const { code } = req.params;

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
    res.status(500).json({ error: 'Erro no servidor.' });
  }
};
