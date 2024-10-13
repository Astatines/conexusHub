import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import userModel from '../models/userModel';
import dotenv from 'dotenv';

dotenv.config();

const authenticateToken = async (
  req: Request | any,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      res
        .status(401)
        .send({ message: 'Access token is missing. You are not authorized.' });
    }

    // Verify the token
    let payload: any;
    try {
      payload = jwt.verify(token, process.env.JWT_SECRET as string);
    } catch (error) {
      console.error('Token verification error:', error);
      res.status(403).send('Invalid or expired token.');
    }

    const { id } = payload;
    if (!id) {
      res.status(403).send('Invalid token: missing user ID.');
    }

    // Check if user exists
    const user = await userModel.findById(id);
    if (!user) {
      res.status(404).send('User not found in the database.');
    }

    req.user = user; // Attach user to request
    next(); // Proceed to the next middleware
  } catch (error) {
    console.error('Server error in authenticateToken:', error);
    res.status(500).send('Internal Server Error');
  }
};

export default authenticateToken;
