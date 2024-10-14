import express, { Request, Response, NextFunction } from 'express';
import multer, { FileFilterCallback } from 'multer';
import path from 'path';
import fs from 'fs';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { IUser } from '../models/userModel';
import userModel from '../models/userModel';
import dotenv from 'dotenv';
import authenticateToken from '../middlewares/auth';

dotenv.config();

const router = express.Router();

const uploadsDir = './uploads/users';
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

const storage = multer.diskStorage({
  destination: uploadsDir,
  filename: (req, file, cb) => {
    cb(
      null,
      req.body.userName + '-' + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 }, // Limit file size to 1MB
  fileFilter: (
    req: Request,
    file: Express.Multer.File,
    cb: FileFilterCallback
  ) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Error: Only images (jpeg, jpg, png, gif) are allowed!'));
    }
  },
});

// Async error wrapper
const asyncHandler =
  (fn: Function) => (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(fn(req, res, next)).catch(next);

router.post(
  '/signup',
  upload.single('userImageURL'),
  asyncHandler(async (req: Request, res: Response) => {
    console.log('hi');
    const { email, password, userName, number, address } = req.body;
    const filePath = req.file?.path;
    console.log(filePath);

    // Check if the user already exists
    const existingUser = await userModel.findOne({ email });
    console.log(existingUser);

    if (existingUser) {
      return res.status(400).send({
        error: 'User already exists',
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);

    // Create a new user
    const newUser: IUser = await userModel.create({
      email,
      password: hashedPassword,
      userName,
      number,
      address,
      userImageURL: filePath || '',
    });

    console.log(newUser);

    // Respond with success
    res.status(200).send({
      user: newUser,
      message: 'SignUp Successful',
    });
  })
);

router.post(
  '/login',
  asyncHandler(async (req: Request, res: Response) => {
    console.log(req.body);
    const { email, password } = req.body;
    console.log('hi');
    console.log(email);

    // Find user by email
    const user = await userModel.findOne({ email });
    console.log(user);

    if (!user) {
      console.log('user not found');
      return res.status(400).send({
        error: 'User not found',
      });
    }

    // Compare the passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send({ error: 'Invalid credentials' });
    }
    console.log(isMatch);

    // Create a JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string);

    console.log(token);
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    });

    res.status(200).send({
      message: 'Login Successful! Conexus is now open to you!',
      user: user,
      token: token,
    });
  })
);

router.get(
  '/profile',

  async (req: Request, res: Response) => {
    const { email } = req.headers;
    const user = await userModel.findOne({ email });
    console.log(user);
    res.status(200).send({
      user,
    });
  }
);

router.put('/profile/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { userName, number, address } = req.body;

  await userModel.updateOne(
    {
      _id: id,
    },
    {
      $set: { userName, address, number },
    }
  );
  console.log('HI');

  const updatedUser = await userModel.findOne({
    _id: id,
  });
  console.log(updatedUser);
  res.status(200).send({
    user: updatedUser,
  });
});
export default router;
