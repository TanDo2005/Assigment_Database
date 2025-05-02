import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";

const BASE_URL = "http://localhost:3000";

export const useLoginStore = create((set, get) => ({
    user: localStorage.getItem("user") || null,
    loading: false,
    error: null,
    formData: {
        Username: "",
        Password: "",
    },
    setFormData: (formData) => {
        set({ formData });
    },

    resetForm: () => set({ formData: { Username: "", Password : "" } }),

    login: async (navigate) => {
        console.log("Login function called");
        // e.preventDefault();
        set({loading: true});
        console.log("Form data:", get().formData);
        const name = get().formData.Username;
        localStorage.setItem("user", name);
        console.log(name);
        try{
            const { formData } = get();
            await axios.post(`${BASE_URL}/api/login`, get().formData);
            // await get()
            get().resetForm();
            toast.success("Login successful");
            // navigate("/api/products");
            navigate("/");
        }catch (error) {
            set({ loading: false, error: error.message });
            console.error("Login error:", error);
            toast.error("Login failed. Please try again.");
        }finally{
            set({ loading: false });
        }
    },

    logout: () => {
        localStorage.setItem("user", null)
        set({ user: null });
        toast.success("Logout successful");
    },
}));