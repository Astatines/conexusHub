import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import multer, { FileFilterCallback } from 'multer';
import path from 'path';
import fs, { unlink } from 'fs';
import authenticateToken from '../middlewares/auth';
import shopModel from '../models/shopModel';
import productModel from '../models/productModel';
import userModel from '../models/userModel';
import { asyncHandler } from './userRoutes';
import { UploadApiResponse } from 'cloudinary';
import cloudinary from '../config/cloudinaryConfig';
import { unlinkSync } from 'fs';

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
  asyncHandler(async (req: Request, res: Response) => {
    const session = await mongoose.startSession(); // Start a session
    session.startTransaction(); // Begin transaction

    console.log('server reached');
    const files = req.files as fileType | undefined;

    const shopImageURL = files?.shopImageURL[0].path;
    const productImageURL = files?.productImageURL[0].path;
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

    if (shopImageURL && productImageURL) {
      try {
        const cloudinaryResult: UploadApiResponse =
          await cloudinary.uploader.upload(shopImageURL, {
            folder: 'shops',
            use_filename: true,
            resource_type: 'image',
          });
        unlinkSync(shopImageURL);
        const shopImageUrl = cloudinaryResult.secure_url;

        const shop = await shopModel.create(
          [
            {
              shopName,
              estd,
              owner,
              location,
              shopImageURL: shopImageUrl,
            },
          ],
          { session } // Pass the session to the create method
        );

        const cloudinaryResult2: UploadApiResponse =
          await cloudinary.uploader.upload(productImageURL, {
            folder: 'products',
            use_filename: true,
            resource_type: 'image',
          });

        unlinkSync(productImageURL);
        const productImageUrl = cloudinaryResult2.secure_url;

        const exampleProduct = await productModel.create(
          [
            {
              productName,
              productImageURL: productImageUrl,
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

        const shopOwner = await userModel.findOne({
          _id: owner,
        });
        console.log(shopOwner);

        shopOwner?.shops?.push(shop[0]);
        await shopOwner?.save({ session });

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
  })
);

router.get('/explore', async (req: Request, res: Response) => {
  const shops = await shopModel.find({}).populate('owner');
  console.log(shops);
  res.send({
    shops: shops,
  });
});

router.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;

  console.log(id);

  const shop = await shopModel
    .findOne({
      _id: id,
    })
    .populate('products');

  res.status(200).send({
    shop,
  });
});

export default router;
