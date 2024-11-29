import rateLimit from "express-rate-limit";

const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requisitions coming from this IP address. Try again soon.",
});

export default rateLimiter;
