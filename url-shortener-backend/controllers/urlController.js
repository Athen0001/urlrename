import Url from "../models/url.js";
import validateUrl from "../utils/validateUrls.js";
import sanitizeHtml from "sanitize-html";
import CustomError from "../utils/customError.js";
import generateCode from "../utils/generateCode.js";
import path from "path";

const __dirname = path.resolve();

//GET HOME, serving the statics
export const home = (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
};
export const serveCss = (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/css/styles.css"));
};
export const serveJs = (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/js/script.js"));
};

//POST shorten
export const shortenUrl = async (req, res, next) => {
  let { originalUrl } = req.body;

  originalUrl = sanitizeHtml(originalUrl, {
    //here i block tags and attributes injection, but i think could be in the front
    allowedTags: [],
    allowedAttributes: {},
  });

  if (!validateUrl(originalUrl)) {
    return next(new CustomError("Invalid URL", 400));
  }

  try {
    let url = await Url.findOne({ where: { originalUrl } });

    if (url) {
      return res.json({ shortUrl: `${process.env.BASE_URL}/${url.code}` });
    }

    let code;
    let urlCreated = false;

    while (!urlCreated) {
      try {
        code = generateCode();
        url = await Url.create({ originalUrl, code });
        urlCreated = true;
      } catch (error) {
        if (error.name === "SequelizeUniqueConstraintError") {
          //a simple colision fix for a simple project. Algorythms complexity will grow.
          console.log("Colision detected, generating new code.");
        } else {
          throw new CustomError("Database error.", 500, error.message);
        }
      }
    }

    return res
      .status(201)
      .json({ shortUrl: `${process.env.BASE_URL}/${url.code}` });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

//GET redirect
export const redirectUrl = async (req, res, next) => {
  let { code } = req.params;

  code = sanitizeHtml(code, {
    allowedTags: [],
    allowedAttributes: {},
  });

  try {
    const url = await Url.findOne({ where: { code } });

    if (!url) {
      return next(new CustomError("URL not found.", 404));
    }

    // Update the access counter
    url.accessCount += 1;
    await url.save();

    return res.redirect(url.originalUrl);
  } catch (error) {
    console.error(error);
    next(error);
  }
};
