import { create } from "zustand";

export const useSearchFieldStore = create((set) => ({
  searchField: localStorage.getItem("searchField") || "title",
  setSearchField: (field) => {
    localStorage.setItem("searchField", field);
    set({ searchField: field });
  },
}));
