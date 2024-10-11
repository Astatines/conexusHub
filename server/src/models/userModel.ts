import mongoose, { Schema, Document } from 'mongoose';
import { IShop } from './shopModel';
import { IProduct } from './productModel';

// Define the User interface extending Document from mongoose
export interface IUser extends Document {
  userName?: string;
  email: string;
  password: string;
  userImageURL?: string;
  number?: number;
  address?: string;
  role?: string;
  shops?: IShop['_id'][]; // Changed to an array to store multiple shops
  cart?: IProduct['_id'][]; // Changed to an array to store multiple products
}

// Create the User Schema with the required fields
const UserSchema: Schema<IUser> = new Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    userImageURL: {
      type: String,
      default: '/default.png', // Default image URL
    },
    number: {
      type: Number,
    },
    address: {
      type: String,
      required: true,
    },
    role: {
      type: String,
    },
    shops: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Shop', // Reference to the Shop model
      },
    ],
    cart: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Product', // Reference to the Product model
      },
    ],
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
  }
);

// Create the User model
const User = mongoose.model<IUser>('User', UserSchema);

export default User; // Export the User model
