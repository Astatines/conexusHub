/// <reference types="vite/client" />

export interface IUser {
  _id: string;
  userName: string;
  email: string;
  password: string; // Consider not storing passwords in the state for security
  address: string;
  cart: ICart[]; // Adjust the type based on what your cart contains
  createdAt: string; // Use Date type if you plan to handle dates
  updatedAt: string; // Use Date type if you plan to handle dates
  userImageURL: string;
  number: number; // Adjust type based on what you expect
  shops: IShop[]; // Adjust the type based on what your shops array contains
  __v: number; // Optional; if you're using versioning with Mongoose
}

export interface IShop {
  shopName: string;
  estd: Date; // Establishment date
  owner: IUser['_id']; // Reference to the user who owns the shop
  location: string; // Location of the shop
  imageURL: string; // URL for the shop's image
  products: IProduct['_id'][]; // Array of product ObjectIds
}

export interface ICartItem {
  product: IProduct['_id'];
  quantity: number;
}

export interface IProduct {
  productName: string;
  productImageURL: string;
  quantity: number;
  price: number;
  unit: string;
  shop: IShop['_id'];
  category: string;
}

export { IUser };
