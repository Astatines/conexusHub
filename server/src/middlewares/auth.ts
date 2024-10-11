import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { IUser } from '../models/userModel';

// Extend the Request interface to include the user object
export interface AuthenticatedRequest extends Request {
  user?: string | object;
}

const authenticateToken = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.header('Authorization')?.split(' ')[1];

  // If token is not present, return access denied error
  if (!token) {
    return res.status(403).json({
      error: 'Access Denied',
    });
  }

  try {
    // Verify and decode the token
    const decoded = jwt.verify(token, 'secret');

    // Ensure the decoded token is an object before assigning it to req.user
    if (typeof decoded === 'object' && decoded !== null) {
      req.user = decoded; // Type assertion to IUser
      console.log(req.user);
    }

    next(); // Proceed to the next middleware/route handler
  } catch (error) {
    return res.status(403).json({
      error: 'Invalid token',
    });
  }
};

export { authenticateToken };
