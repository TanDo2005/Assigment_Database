import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";

const BASE_URL = "http://localhost:3000";

export const useShoppingCartStore = create((set,get) => ({


  addBook: async (userName, bookId) => {
    set({ loading: true });
    try {
      const response = await axios.get(`${BASE_URL}/api/shoppingcart/${bookId}/${userName}`);
      console.log("response", response.data);
      toast.success("Book added to cart successfully");
    } catch (error) {
      console.error("Error adding book to cart:", error);
      toast.error("Failed to add book to cart");
    } 
  },
}))