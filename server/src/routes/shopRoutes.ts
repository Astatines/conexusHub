import express, { Request, Response, NextFunction } from 'express';
import multer, { FileFilterCallback } from 'multer';
import path from 'path';
import fs from 'fs';
import authenticateToken from '../middlewares/auth';

const router = express.Router();

const uploadsDir = './uploads/shops';
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

const storage = multer.diskStorage({
  destination: uploadsDir,
  filename: (req, file, cb) => {
    cb(
      null,
      req.body.shopName + '-' + Date.now() + path.extname(file.originalname)
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

router.post(
  '/register',
  upload.fields([
    {
      name: 'shopImageURL',
      maxCount: 1,
    },
    {
      name: 'productImageURL',
      maxCount: 1,
    },
  ]),
  async (req, res) => {
    console.log('server reached');
    console.log(req.body, req.files);
    res
      .status(200)
      .send(
        'Congratulations! You have successfully registered your marketplace.'
      );
  }
);

export default router;
