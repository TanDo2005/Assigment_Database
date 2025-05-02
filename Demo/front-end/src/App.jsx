import Navbar from "./components/Navbar";

import HomePage from "./pages/HomePage";
import BookPage from "./pages/BookPage";
import LoginPage from "./pages/loginPage"; // Import LoginPage
import RegisterPage from "./pages/register";
import ShoppingCartPage from "./pages/shoppingcartPage";

import { Routes, Route } from "react-router-dom";
import { useThemeStore } from "./store/useThemeStore";

import { Toaster } from "react-hot-toast";
import AuthorPage from "./pages/AuthorPage";
import GenrePage from "./pages/GenrePage";

function App() {
  const { theme } = useThemeStore();

  return (
    <div
      className="min-h-screen bg-base-200 transition-colors duration-300"
      data-theme={theme}
    >
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/api/products/:id" element={<BookPage />} />
        <Route path="/api/authors/:id" element={<AuthorPage />} />
        <Route path="/api/genres/:id" element={<GenrePage />} />
        <Route path="/api/login" element={<LoginPage />} />
        <Route path="/api/register" element={<RegisterPage />} />
        <Route path="/api/products" element={<HomePage />} />
        <Route path="/api/shoppingcart" element={<ShoppingCartPage />} />
      </Routes>

      <Toaster />
    </div>
  );
}

export default App;