import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useBookStore } from "../store/useBookStore";

function ShoppingCartPage() {
  const navigate = useNavigate();
  // Local state to store quantities per book (using book id as key)
  const [quantities, setQuantities] = useState({});

  // State for checkout modal
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [shipmentOption, setShipmentOption] = useState(false);
  const [paidMethod, setPaidMethod] = useState("Cash");

  // On mount: ensure user is logged in and load shopping cart items
  useEffect(() => {
    if (!user) {
      navigate("/api/login");
      return;
    }
    fetchBookShoppingCart(user);
  }, [user, navigate, fetchBookShoppingCart]);

  // When shoppingCart changes, initialize each book's quantity to 1 if not already set
  useEffect(() => {
    const newQuantities = { ...quantities };
    shoppingCart.forEach((book) => {
      if (!newQuantities[book.id]) {
        newQuantities[book.id] = 1;
      }
    });
    setQuantities(newQuantities);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shoppingCart]);

  const handleQuantityChange = (bookId, value) => {
    const newValue = Math.max(1, Number(value));
    setQuantities((prev) => ({ ...prev, [bookId]: newValue }));
  };

  // Calculate total price based on quantity for each book
  const totalPrice = shoppingCart.reduce(
    (acc, book) => acc + Number(book.price) * (quantities[book.id] || 1),
    0
  );

  // Handle deletion of a book from the cart
  const handleDelete = (book) => {
    deleteBookFromCart(user, book.id);
    setQuantities((prev) => {
      const newQuantities = { ...prev };
      delete newQuantities[book.id];
      return newQuantities;
    });
    toast.success("Book removed from cart");
  };

  // Handler to refresh the shopping cart
  const handleRefresh = () => {
    if (user) {
      fetchBookShoppingCart(user);
      toast.success("Cart refreshed");
    }
  };

  // Handler to create the order using the selected checkout options
  const handleCreateOrder = () => {
    // Replace with your actual order creation logic
    console.log("Creating order with the following details:");
    console.log("Cart:", shoppingCart);
    console.log("Quantities:", quantities);
    console.log("Total Price:", totalPrice);
    console.log("User:", user);
    console.log("Shipment:", shipmentOption);
    console.log("Paid Method:", paidMethod);
    toast.success("Proceeding to checkout");
    setShowCheckoutModal(false);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center box-border">Shopping Cart</h1>
      <div>
        {shoppingCart.length === 0 ? (
          <p className="text-center">Your shopping cart is empty.</p>
        ) : (
          <>
            {shoppingCart.map((book) => (
              <div
                key={book.id}
                className="relative flex items-center shadow-md rounded-lg p-4 mb-4 transition-transform transform hover:scale-105"
              >
                <img
                  src={book.image}
                  alt={book.title}
                  className="w-24 h-32 object-cover rounded-md mr-4"
                />
                <div className="flex-1">
                  <p className="text-lg font-semibold text-gray-800">{book.title}</p>
                  <p className="text-gray-600">Price: ${Number(book.price).toFixed(2)}</p>
                  <p className="text-gray-500">Published Year: {book.publishedyear}</p>
                  <p className="text-gray-500">Stock: {book.stock}</p>
                  <div className="mt-2">
                    <label className="mr-2 font-medium">Quantity:</label>
                    <input
                      type="number"
                      min="1"
                      value={quantities[book.id] || 1}
                      onChange={(e) => handleQuantityChange(book.id, e.target.value)}
                      className="input input-bordered w-20"
                    />
                  </div>
                </div>
                <button
                  className="btn btn-danger absolute top-2 right-2"
                  onClick={() => handleDelete(book)}
                >
                  X
                </button>
              </div>
            ))}
            <div className="mt-8 text-center">
              <div className="font-bold text-xl mb-4">
                Total: ${totalPrice.toFixed(2)}
              </div>
              <div className="flex justify-center gap-4">
                <button
                  className="btn btn-primary"
                  onClick={() => setShowCheckoutModal(true)}
                >
                  Checkout
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={handleRefresh}
                >
                  Refresh Cart
                </button>
              </div>
            </div>
          </>
        )}
      </div>
      {showCheckoutModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">Checkout Options</h2>
            <div className="mb-4">
              <label className="block mb-1 font-medium">Shipment:</label>
              <select
                className="input input-bordered w-full"
                value={shipmentOption ? "true" : "false"}
                onChange={(e) => setShipmentOption(e.target.value === "true")}
              >
                <option value="false">No Shipment</option>
                <option value="true">With Shipment</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block mb-1 font-medium">Paid Method:</label>
              <select
                className="input input-bordered w-full"
                value={paidMethod}
                onChange={(e) => setPaidMethod(e.target.value)}
              >
                <option value="Cash">Cash</option>
                <option value="Credit Card">Credit Card</option>
                <option value="Bank Tranfer">Bank Tranfer</option>
              </select>
            </div>
            <div className="flex justify-end gap-2">
              <button
                className="btn btn-secondary"
                onClick={() => setShowCheckoutModal(false)}
              >
                Cancel
              </button>
              <button
                className="btn btn-primary"
                onClick={handleCreateOrder}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ShoppingCartPage;