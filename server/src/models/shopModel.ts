import mongoose, { Document, Schema } from 'mongoose';
import { IUser } from './userModel';
import { IProduct } from './productModel';

// Define the Shop interface extending Document from mongoose
export interface IShop extends Document {
  shopName: string;
  estd: Date; // Establishment date
  owner: IUser['_id']; // Reference to the user who owns the shop
  location: string; // Location of the shop
  shopImageURL: string; // URL for the shop's image
  products?: IProduct['_id'][]; // Array of product ObjectIds
}

// Create the Shop Schema with the required fields
const ShopSchema: Schema<IShop> = new Schema({
  shopName: {
    type: String,
    required: true, // Mark as required
  },
  estd: {
    type: Date,
    required: true, // Mark as required
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true, // Mark as required
  },
  location: {
    type: String,
    required: true, // Mark as required
  },
  shopImageURL: {
    type: String,
    required: true, // Mark as required
  },
  products: [{
    type: Schema.Types.ObjectId,
    ref: 'Product', // Reference to the Product model
  }],
}, {
  timestamps: true, // Automatically manage createdAt and updatedAt fields
});

// Create the Shop model
const Shop = mongoose.model<IShop>('Shop', ShopSchema);

export default Shop; // Export the Shop model
