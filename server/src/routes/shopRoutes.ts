import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import multer, { FileFilterCallback } from 'multer';
import path from 'path';
import fs from 'fs';
import authenticateToken from '../middlewares/auth';
import shopModel from '../models/shopModel';
import productModel from '../models/productModel';

interface fileType {
  shopImageURL: Express.Multer.File[];
  productImageURL: Express.Multer.File[];
}
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

router.get(
  '/register',
  authenticateToken,
  async (req: Request, res: Response) => {
    res.send({
      message: 'Register Marketplace',
    });
  }
);

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
    const session = await mongoose.startSession(); // Start a session
    session.startTransaction(); // Begin transaction

    console.log('server reached');
    const files = req.files as fileType | undefined;

    const shopImageURL = files?.shopImageURL[0].filename;
    const productImageURL = files?.productImageURL[0].filename;

    try {
      const {
        shopName,
        estd,
        owner,
        location,
        price,
        productName,
        quantity,
        category,
        unit,
      } = req.body;

      // 1. Create the shop within the transaction
      const shop = await shopModel.create(
        [
          {
            shopName,
            estd,
            owner,
            location,
            shopImageURL,
          },
        ],
        { session } // Pass the session to the create method
      );

      // 2. Create the product with the shop._id within the transaction
      const exampleProduct = await productModel.create(
        [
          {
            productName,
            productImageURL,
            price,
            quantity,
            category,
            unit,
            shop: shop[0]._id, // Get the shop's ID from the first (and only) element of the array
          },
        ],
        { session } // Pass the session to the create method
      );

      // 3. Update the shop to reference the product
      shop[0].products?.push(exampleProduct[0]._id); // Push the product ID into the shop's products array

      await shop[0].save({ session }); // Save the updated shop document with session

      // Commit the transaction if everything is successful
      await session.commitTransaction();
      session.endSession();

      res.status(200).send({
        message:
          'Congratulations, you have successfully registered your marketplace.',
      });
    } catch (error) {
      // Rollback the transaction in case of an error
      await session.abortTransaction();
      session.endSession();
      res.status(500).json({
        error: 'Registration failed',
        details: error,
      });
      console.log(error);
    }
  }
);

export default router;
