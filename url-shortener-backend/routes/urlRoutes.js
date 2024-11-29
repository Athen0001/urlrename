import express from "express";
import {
  shortenUrl,
  redirectUrl,
  home,
  serveCss,
  serveJs,
} from "../controllers/urlController.js";
import rateLimiter from "../middleware/rateLimiter.js";

const router = express.Router(); //start the router

router.get("/", home);
//i needed to build get routes to serve the statics, till fix the static express issue.
router.get("/css/styles.css", serveCss);
router.get("/js/script.js", serveJs);

router.post("/shorten", rateLimiter, shortenUrl);
router.get("/:code", redirectUrl);

export default router;
