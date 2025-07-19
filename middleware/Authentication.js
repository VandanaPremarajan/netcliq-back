const jwt = require("jsonwebtoken");

const getToken = (user) => {
  const jwtSecretKey = process.env.JWT_SECRET_KEY;
  const data = {
    time: Date(),
    userId: user._id,
    role: user.role,
    email: user.email_address
  };
  return jwt.sign(data, jwtSecretKey, { expiresIn: '1d' });
};


const verifyToken = (req) => {
  try {
    const token = req.header(process.env.TOKEN_HEADER_KEY); // e.g., 'x-access-token'
    if (!token) return false;

    const jwtSecretKey = process.env.JWT_SECRET_KEY;
    const decoded = jwt.verify(token, jwtSecretKey);

    req.user = decoded; // store decoded user info in request
    return true;
  } catch (error) {
    console.error('Token verification failed:', error.message);
    return false;
  }
};

const checkToken = (req, res, next) => {
  // console.log('Request to:', req.originalUrl); 

  // const publicPaths = ['/api/users/login', '/api/users']; // Add any public routes here
  // if (publicPaths.includes(req.originalUrl.toLowerCase())) {
  //   return next();
  // }

  if (verifyToken(req)) {
    console.log("Token valid");
    return next();
  } else {
    console.log("Token Invalid");
    return res.status(403).json({ accessToken: "Invalid Token" });
  }
};

// Checks role in the token
const allowRoles = (...allowedRoles) => {
  return (req, res, next) => {
    const role = req.user?.role;
    if (!allowedRoles.includes(role)) {
      return res.status(403).json({ message: 'Access denied' });
    }
    next();
  };
};

module.exports = { getToken, verifyToken, checkToken, allowRoles };
