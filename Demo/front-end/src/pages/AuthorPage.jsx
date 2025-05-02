import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useBookStore } from "../store/useBookStore";
import { PackageIcon, PlusCircleIcon, RefreshCwIcon } from "lucide-react";
import BookCard from "../components/BookCard";
import AddProductModal from "../components/AddProductModal";
import { useLoginStore } from "../store/useLogin";

function AuthorPage() {
    const {
        books,
        formData,
        setFormData,
        loading,
        error,
        fetchBookbyAuthor,
        updateBook,
        deleteBook,
      } = useBookStore();
    const { user } = useLoginStore();
    const navigate = useNavigate();
    const { id } = useParams();

    if(!user) {
        return (
          <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-8 text-center">
              <h2 className="text-2xl font-bold text-red-500 mb-4">Access Denied</h2>
              <p className="text-gray-600 mb-6">
                You need to log in to access this page. Please log in to continue.
              </p>
              <button
                className="btn btn-primary px-6 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-lg shadow-md"
                onClick={() => window.location.href = "/api/login"}
              >
                Go to Login
              </button>
            </div>
          </div>
        );
      }

    useEffect(() => {
        if (id) {
            fetchBookbyAuthor(id);
        }
    }, [fetchBookbyAuthor, id]);

    return (
        <main className="max-w-6xl mx-auto px-4 py-8 ">
            <div className="relative justify-between items-center mb-8">
                {/* <button
                    className="btn btn-primary"
                    onClick={() => document.getElementById("add_product_modal").showModal()}
                    >
                    <PlusCircleIcon className="size-5 mr-2" />
                    Add Book
                </button> */}
                <button
                    className="absolute top-0 right-0 btn btn-ghost btn-circle"
                    onClick={async () => fetchBookbyAuthor(id)}
                >
                    <RefreshCwIcon className="size-5" />
                </button>
            </div>

            <AddProductModal />

            {error && <div className="alert alert-error mb-8">{error}</div>}

            {books.length === 0 && !loading && (
                <div className="flex flex-col justify-center items-center h-96 space-y-4">  
                <div className="bg-base-100 rounded-full p-6">
                    <PackageIcon className="size-12" />
                </div>
                <div className="text-center space-y-2">
                    <h3 className="text-2xl font-semibold ">No books found</h3>
                    <p className="text-gray-500 max-w-sm">
                    Get started by adding your first book to the inventory
                    </p>
                </div>
                </div>
            )}

            {loading ? (
                <div className="flex justify-center items-center h-64">
                <div className="loading loading-spinner loading-lg" />
                </div>
            ) : (
                <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {books.map((product) => (
                    <BookCard key={product.id} product={product} />
                ))}
                </div>
            )}
            </main>
        );
}
export default AuthorPage;