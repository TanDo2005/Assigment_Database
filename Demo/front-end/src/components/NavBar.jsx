import { Link, useResolvedPath, useNavigate } from "react-router-dom";
import { LogOutIcon, ShoppingBagIcon, ShoppingCartIcon } from "lucide-react";
import ThemeSelector from "./ThemeSelector";
import { useBookStore } from "../store/useBookStore";
import SearchBar from "./SearchBar";
import SearchButton from "./SearchButton";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";


function Navbar() {
  const { pathname } = useResolvedPath();
  const navigate = useNavigate();
  const isHomePage = pathname === "/";
  const [value, setValue] = useState("");

  const { books, fetchBooks } = useBookStore();

  const handleChange = (val) => {
    setValue(val);
  };

  // Log out handler: clear stored token and navigate to login page.
  const handleLogout = () => {
    localStorage.removeItem("token");  // Adjust if your token key is different.
    toast.success("Logged out successfully");
    navigate("/api/login");
  };

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  return (
    <div className="bg-base-100/80 backdrop-blur-lg border-b border-base-content/10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto">
        <div className="navbar px-4 min-h-[4rem] justify-between">
          {/* LOGO */}
          <div className="flex-1 lg:flex-none">
            <Link to="/" className="hover:opacity-80 transition-opacity">
              <div className="flex items-center gap-2">
                {/* Inline square image next to "BOOKSTORE" text */}
                <img
                  src="https://th.bing.com/th/id/OIP.efzZ1mOWZ5hKEMbBXoKPJwHaHf?rs=1&pid=ImgDetMain" 
                  alt="Square Logo"
                  className="w-16 h-16 object-cover rounded"
                  loading="lazy"
                />
                <span
                  className="font-semibold font-mono tracking-widest text-2xl 
                      bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary"
                >
                  BOOKSTORE
                </span>
              </div>
            </Link>
          </div>

          {/* SEARCH BAR */}
          <div className="relative hidden lg:flex flex-1 max-w-[600px]">
            <SearchBar
              selectedVal={value}
              handleChange={handleChange}
              options={books}
              title="title"
              id="id"
            />
            <SearchButton query={value} />
          </div>

          {/* RIGHT SECTION */}
          <div className="flex items-center gap-4">
            <ThemeSelector />

            {isHomePage && (
              <Link to="/api/shoppingcart">
                <div className="indicator cursor-pointer">
                  <div className="p-2 rounded-full hover:bg-base-200 transition-colors">
                    <ShoppingBagIcon className="size-5" />
                  </div>
                </div>
              </Link>
            )}

            <button
              className="btn btn-outline"
              onClick={handleLogout}
            >
              <LogOutIcon className="size-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;