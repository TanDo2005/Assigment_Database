import { Link, useResolvedPath } from "react-router-dom";
import { ShoppingBagIcon, ShoppingCartIcon, Search } from "lucide-react";
import ThemeSelector from "./ThemeSelector";
import { useBookStore } from "../store/useBookStore";
import SearchBar from "./SearchBar";
import SearchButton from "./SearchButton";
import { useEffect, useState } from "react";
import { useLoginStore } from "../store/useLogin";

function Navbar() {
  const { pathname } = useResolvedPath();
  const isHomePage = pathname === "/";
  const [value, setValue] = useState("");
  const { user } = useLoginStore();

  const { books, fetchBooks } = useBookStore();

  const handlechange = (val) => {
    setValue(val);
  }

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
                <ShoppingCartIcon className="size-9 text-primary" />
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
          <div className="relative hidden lg:flex flex-1 max-w-[600px]"  >
            <SearchBar
              selectedVal={value}
              handleChange={handlechange}

              options={books}
              title="title"
              id="id"
            />
            <SearchButton query={value} />
          </div>

          {/* RIGHT SECTION */}
          <div className="flex items-center gap-4">
            <ThemeSelector />

            {user && (
              <Link to="/api/shoppingcart">
                <div className="indicator cursor-pointer">
                  <div className="p-2 rounded-full hover:bg-base-200 transition-colors">
                    <ShoppingBagIcon className="size-5" />
                    {/* <span className="badge badge-sm badge-primary indicator-item">
                      {0}
                    </span> */}
                  </div>
                </div>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Navbar;