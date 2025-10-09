const cors = require('cors');

// Reusable CORS for serverless
const corsMiddleware = cors({
  origin: 'https://netcliq-front.vercel.app',
  credentials: true,
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
});

module.exports = function runCors(req, res) {
  return new Promise((resolve, reject) => {
    corsMiddleware(req, res, (result) => {
      if (result instanceof Error) reject(result);
      else resolve(result);
    });
  });
};
