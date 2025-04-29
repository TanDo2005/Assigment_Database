import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";

const BASE_URL = "http://localhost:3000";

export const useRegisterStore = create((set, get) =>({
    user:null, 
    loading: false, 
    error: null,
    //INSERT INTO "User" (username, password, dateofbirth, address, phone, email)
    formData: {
        Username: "",
        Password: "",
        DateOfBirth: "",
        Address: "",
        Phone: "",
        Email: ""
    },
    setFormData: (formData) => set({ formData }),

    resetForm: () => set({ formData: { Username: "", Password: "", DateOfBirth: "", Address: "", Phone: "", Email: "" } }),

    register: async(navigate) => {
        console.log("Register function called");
        set({ loading: true });
        try {
            const { formData } = get();
            await axios.post(`${BASE_URL}/api/register`, formData);
            get().resetForm();
            toast.success("Register successful");
            navigate("/api/login");
        } catch (error) {
            set({ loading: false, error: error.message });
            console.error("Register error:", error);
            toast.error("Register failed. Please try again.");
        } finally {
            set({ loading: false });
        }
    }

}));