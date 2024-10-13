import mongoose, { Document, Schema } from 'mongoose';
import { IShop } from './shopModel'; // Assuming you have a separate shop model defined

// Define the Product interface extending Document from mongoose
export interface IProduct extends Document {
  productName: string;
  productImageURL: string;
  quantity: number;
  price: number;
  unit: string;
  shop: IShop['_id'];
  category: string;
}

// Create the Product Schema with the required fields
const ProductSchema: Schema<IProduct> = new Schema(
  {
    productName: {
      type: String,
      required: true, // Mark as required
    },
    productImageURL: {
      type: String,
      default: './defaultProduct.png',
    },
    quantity: {
      type: Number,
      required: true, // Mark as required
      min: 0, // Prevent negative quantities
    },
    price: {
      type: Number,
      required: true, // Mark as required
      min: 0, // Prevent negative prices
    },
    unit: {
      type: String,
      required: true, // Mark as required
    },
    shop: {
      type: Schema.Types.ObjectId,
      ref: 'Shop', // Reference to the Shop model
      required: true, // Mark as required
    },
    category: {
      type: String,
      required: true, // Mark as required
    },
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
  }
);

// Create the Product model
const Product = mongoose.model<IProduct>('Product', ProductSchema);

export default Product; // Export the Product model
