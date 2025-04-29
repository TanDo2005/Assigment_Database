import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useLoginStore } from "../store/useLogin";
import { useShoppingCartStore } from "../store/useShoppingCart";
import { useBookStore } from "../store/useBookStore";

function ShoppingCartPage() {
  const navigate = useNavigate();
  const { user, fetchBookShoppingCart, shoppingCart } = useBookStore();
  
  // Check user login on mount
  useEffect(() => {
    if (!user) {
      toast.error("Please log in to view your shopping cart");
      navigate("/api/login");
    }
    // Fetch shopping cart items when the component mounts
    fetchBookShoppingCart(user);
  }, [user, navigate,fetchBookShoppingCart]);



  return (
    <div >
      <h1 className="text-3xl font-bold mb-6 text-center">Shopping Cart</h1>
      <div>
        {shoppingCart.length === 0 ? (
          <p>Your shopping cart is empty.</p>
        ) : (
          // Map and render your shopping cart items here
          shoppingCart.map((book) => (
            <div key={book.id} className="mb-4">
              <p className="text-lg font-semibold">{book.title}</p>
              <p>{book.price}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ShoppingCartPage;