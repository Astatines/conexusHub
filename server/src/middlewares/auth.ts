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
    const { authorization } = req.headers;
    if (!authorization) {
      res.status(404).send({
        message: 'You are not authorized yet.',
      });
    }
    const accessToken = authorization.split(' ')[1];
    const payload = await jwt.verify(
      accessToken,
      process.env.JWT_SECRET as string
    );
    const { id } = payload as any;

    if (!id) {
      res.send('Invalid token provided');
    }

    const user = await userModel.findById(id);
    if (!user) {
      res.send('User not registered on database.');
    }
    req.user(user);
    next();
  } catch (error) {
    if (error === 'TokenExpiredError') {
      req.send({
        message: 'Token has expired!',
      });
    }
    res.status(500).send('Server Error');
  }
};

export default authenticateToken;
