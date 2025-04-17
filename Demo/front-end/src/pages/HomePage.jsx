import { useEffect } from "react";
import { useBookStore } from "../store/useBookStore";
import { PackageIcon, PlusCircleIcon, RefreshCwIcon } from "lucide-react";
import ProductCard from "../components/BookCard";
import AddProductModal from "../components/AddProductModal";

function HomePage() {
  const { books, loading, error, fetchBooks} = useBookStore();

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

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
        <button className="absolute top-0 right-0 btn btn-ghost btn-circle" onClick={fetchBooks}>
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
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </main>
  );
}
export default HomePage;