/// <reference types="vite/client" />

interface IUser {
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

interface IShop {
  _id: string;
  shopName: string;
  estd: Date; // Establishment date
  owner: IUser; // Reference to the user who owns the shop
  location: string; // Location of the shop
  shopImageURL: string; // URL for the shop's image
  products: IProduct['_id'][]; // Array of product ObjectIds
}

interface ICartItem {
  product: IProduct['_id'];
  quantity: number;
}

interface IProduct {
  productName: string;
  productImageURL: string;
  quantity: number;
  price: number;
  unit: string;
  shop: IShop['_id'];
  category: string;
}

interface ICart {
  owner: IUser['_id'];
  items: ICartItem[];
  totalAmount: number;
}

export { IUser, IShop, ICartItem, IProduct, ICart };
