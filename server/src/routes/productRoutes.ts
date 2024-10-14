import express, { Request, Response } from 'express';
import multer, { FileFilterCallback } from 'multer';
import fs from 'fs';
import path from 'path';
import productModel from '../models/productModel';
import shopModel from '../models/shopModel';

const router = express.Router();

const uploadsDir = './uploads/products';
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

const storage = multer.diskStorage({
  destination: uploadsDir,
  filename: (req, file, cb) => {
    cb(
      null,
      req.headers.id +
        req.body.productName +
        '-' +
        Date.now() +
        path.extname(file.originalname)
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
  '/add',
  upload.single('productImageURL'),
  async (req: Request, res: Response) => {
    const { id } = req.headers;
    const file = req.file as Express.Multer.File | undefined;
    console.log(req.body, req.file);
    const { productName, price, quantity, category, unit } = req.body;
    const productImageURL = file?.filename;
    console.log(productImageURL);

    const newProduct = await productModel.create({
      productName,
      price,
      quantity,
      category,
      unit,
      productImageURL,
      shop: id,
    });

    const productWalaShop = await shopModel.findOne({
      _id: id,
    });

    productWalaShop?.products?.push(newProduct);
    console.log(productWalaShop);
    await productWalaShop?.save();

    res.status(200).send({
      message: 'Product added successfully!',
    });
  }
);

export default router;
