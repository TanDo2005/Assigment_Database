import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";
import shoppingcartModel from "../../../back-end/models/shoppingcart.model";
// import { useLoginStore } from "./useLogin";

// base url will be dynamic depending on the environment
// const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:3000" : "";
const BASE_URL = "http://localhost:3000";  
// const { user } = useLoginStore();

export const useBookStore = create((set, get) => ({
  // products state
  books: [],
  authors: [],
  genres: [],
  years: [],
  loading: false,
  error: null,
  currentBook: null,
  user:null,
  shoppingCart: [],

  // form state
  formData: {
    title: "",
    price: "",
    stock: "",
    publishedYear: "",
    authorid: "",
    genreid: "",
    image: "",
  },

  formShoppingCart:{
    shoppingCart: [],
    quantities: [],
    shipMent: false,
    status: "Pending",
    PaidMethod: "Cash",
    userName: null,
    totalPriceBooks: 0,
  },

  createOrder: async (shoppingcartModel)=>{
    console.log("createOrder function called", shoppingcartModel);
    set({ loading: true });
    try{
      const response = await axios.post(`${BASE_URL}/api/orders/user`, shoppingcartModel);
      console.log("response", response.data);
    }catch(error){
      console.log("Error in createOrder function", error);
      toast.error("Something went wrong");
    }finally{
      set({ loading: false });
    }
  },

  setFormShoppingCart: (formShoppingCart) => set({ formShoppingCart }),

  setUser: (user)=> set({ user }),

  logOut: ()=> {

    set({ user: null });
    toast.success("Logout successful");
    Navigate("/api/login");
  },
  

  setFormData: (formData) => set({ formData }),
  resetForm: () => set({ formData: { title: "", price: "", stock: "", publishedYear: "", author: "", genre: "", image: "" } }),

  addBook: async (e) => {
    set({ loading: true });

    try {
      const { formData } = get();
      await axios.post(`${BASE_URL}/api/products`, formData);
      get().resetForm();
      toast.success("Book added successfully");
      document.getElementById("add_product_modal").close();
    } catch (error) {
      console.log("Error in addProduct function", error);
      toast.error("Something went wrong");
    } finally {
      set({ loading: false });
    }
  },
  
  deleteBookFromCart: async (userName, bookID) =>{
    console.log("deleteBookFromCart function called", userName, bookID);
    set({ loading: true });

    try{  
      const userID = await axios.get(`${BASE_URL}/api/shoppingcart/forDelete/${userName}/${bookID}`);
      console.log("userID", userID.data);
      toast.success("Book deleted from cart successfully");

    }catch(error){
      console.log("Error in deleteBookFromCart function", error);
      toast.error("Something went wrong");
    }
    finally{
      set({ loading: false });
    }
  },

  fetchBooks: async () => {
    set({ loading: true });
    try {
      const response = await axios.get(`${BASE_URL}/api/products`);
      set({ books: response.data.data, error: null });
    } catch (err) {
      if (err.status == 429) set({ error: "Rate limit exceeded", books: [] });
      else set({ error: "Something went wrong", books: [] });
    } finally {
      set({ loading: false });
    }
  },
  
  fetchBookShoppingCart: async (userName)=>{
    set({ loading: true });
    console.log("fetchBookShoppingCart");

    try{
      console.log("user:", userName);
      const response = await axios.get(`${BASE_URL}/api/shoppingcart/forShoppingCart/${userName}/books`);
      set({ shoppingCart: response.data.data, error: null });
      console.log("response", response.data);
    }catch(error) {
      
      console.log("Error in fetchBookShoppingCart function", error);
      set({ error: "Something went wrong" });
    }finally{
      
      set({ loading: false });
    }
  },

  fetchAuthors: async () => {
    set({ loading: true });
    try {
      const response = await axios.get(`${BASE_URL}/api/authors`);
      set({ authors: response.data.data, error: null });
    } catch (err) {
      if (err.status == 429) set({ error: "Rate limit exceeded", authors: [] });
      else set({ error: "Something went wrong", authors: [] });
    } finally {
      set({ loading: false });
    }
  },

  fetchBookbyAuthor: async (id) => {
    set({ loading: true });
    try {
      const response = await axios.get(`${BASE_URL}/api/authors/${id}/books`);
      set({ books: response.data.data, error: null });
    } catch (err) {
      if (err.status == 429) set({ error: "Rate limit exceeded", books: [] });
      else set({ error: "Something went wrong", books: [] });
    } finally {
      set({ loading: false });
    }
  },

  fetchGenres: async () => {
    set({ loading: true });
    try {
      const response = await axios.get(`${BASE_URL}/api/genres`);
      set({ genres: response.data.data, error: null });
    } catch (err) {
      if (err.status == 429) set({ error: "Rate limit exceeded", genres: [] });
      else set({ error: "Something went wrong", genres: [] });
    } finally {
      set({ loading: false });
    }
  },

  fetchBookbyGenre: async (id) => {
    set({ loading: true });
    try {
      const response = await axios.get(`${BASE_URL}/api/genres/${id}/books`);
      set({ books: response.data.data, error: null });
    } catch (err) {
      if (err.status == 429) set({ error: "Rate limit exceeded", books: [] });
      else set({ error: "Something went wrong", books: [] });
    } finally {
      set({ loading: false });
    }
  },

  fetchYears: async () => {
    set({ loading: true });
    try {
      const response = await axios.get(`${BASE_URL}/api/products/years`);
      set({ years: response.data.data, error: null });
    } catch (err) {
      if (err.status == 429) set({ error: "Rate limit exceeded", years: [] });
      else set({ error: "Something went wrong", years: [] });
    } finally {
      set({ loading: false });
    }
  },

  deleteBook: async (id) => {
    console.log("deleteBook function called", id);
    set({ loading: true });
    try {
      await axios.delete(`${BASE_URL}/api/products/${id}`);
      set((prev) => ({ books: prev.books.filter((book) => book.id !== id) }));
      toast.success("Product deleted successfully");      
    } catch (error) {
      console.log("Error in deleteBook function", error);
      toast.error("Something went wrong");
    } finally {
      set({ loading: false });
    }
  },

  fetchBook: async (id) => {
    set({ loading: true });
    try {
      const response = await axios.get(`${BASE_URL}/api/products/${id}`);
      set({
        currentBook: response.data.data,
        formData: response.data.data, // pre-fill form with current product data
        error: null,
      });
    } catch (error) {
      console.log("Error in fetchBook function", error);
      set({ error: "Something went wrong", currentProduct: null });
    } finally {
      set({ loading: false });
    }
  },

  updateBook: async (id) => {
    set({ loading: true });
    try {
      const { formData } = get();
      const response = await axios.put(`${BASE_URL}/api/products/${id}`, formData);
      set({ currentBook: response.data.data });
      toast.success("Book updated successfully");
    } catch (error) {
      toast.error("Something went wrong");
      console.log("Error in updateProduct function", error);
    } finally {
      set({ loading: false });
    }
  },

  
}));