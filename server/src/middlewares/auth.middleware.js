import jwt from 'jsonwebtoken';
import { asyncHandler } from '../utils/async-handler';
import { ApiError } from '../utils/api-error';
const authMiddleware = asyncHandler((req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json(new ApiError(401, 'Unauthorized: No token provided'));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json(new ApiError(401, 'Unauthorized: Invalid token', [], err.stack));
  }
});

export { authMiddleware };
