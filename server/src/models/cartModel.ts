import mongoose, { Document, Schema } from 'mongoose';
import { IProduct } from './productModel';
import { IUser } from './userModel';

export interface ICartItem extends Document {
  product: IProduct['_id'];
  quantity: number;
}

export interface ICart extends Document {
  owner: IUser['_id'];
  items: ICartItem[];
  totalAmount: number;
}

const CartSchema: Schema<ICart> = new mongoose.Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    items: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: 'Product', // Reference to the Product model
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1, // Minimum quantity is 1
        },
      },
    ],
    totalAmount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Cart = mongoose.model<ICart>('Cart', CartSchema);

export default Cart;
