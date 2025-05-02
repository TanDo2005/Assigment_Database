import { DollarSignIcon, ImageIcon, Package2Icon, PlusCircleIcon, BookType, LibraryBig, CalendarDays, PenTool } from "lucide-react";
import { useBookStore } from "../store/useBookStore";
import { useShoppingCartStore } from "../store/useShoppingCart";
import { useEffect, useState } from "react";

function AddProductModal() {
  const { books, authors, genres, addBook, formData, fetchBooks, setFormData, loading, resetForm, fetchAuthors, fetchGenres } = useBookStore();
  const [selectedAuthorId, setSelectedAuthorId] = useState(null);
  const [selectedGenreId, setSelectedGenreId] = useState(null);

  useEffect(() => {
    fetchAuthors && fetchAuthors();
    fetchGenres && fetchGenres();
    fetchBooks();
  }, [fetchAuthors, fetchGenres]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormData({ ...formData, id: books.length + 1})
    addBook(formData);
  };

  return (
    <dialog id="add_product_modal" className="modal">
      <div className="modal-box">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">X</button>
        </form>

        <h3 className="font-bold text-xl mb-8">Add New Product</h3>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text text-base font-medium">Book's Title</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base-content/50">
                  <Package2Icon className="size-5" />
                </div>
                <input
                  type="text"
                  placeholder="Enter book's title"
                  className="input input-bordered w-full pl-10 py-3 focus:input-primary transition-colors duration-200"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text text-base font-medium">Price</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base-content/50">
                  <DollarSignIcon className="size-5" />
                </div>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  className="input input-bordered w-full pl-10 py-3 focus:input-primary transition-colors duration-200"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text text-base font-medium">Stock</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base-content/50">
                  <LibraryBig className="size-5" />
                </div>
                <input
                  type="number"
                  min="0"
                  placeholder="Enter Book's Stock"
                  className="input input-bordered w-full pl-10 py-3 focus:input-primary transition-colors duration-200"
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text text-base font-medium">Published Year</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base-content/50">
                  <CalendarDays className="size-5" />
                </div>
                <input
                  type="number"
                  min="1990"
                  placeholder="Enter Book's Published Year"
                  className="input input-bordered w-full pl-10 py-3 focus:input-primary transition-colors duration-200"
                  value={formData.publishedYear}
                  onChange={(e) => setFormData({ ...formData, publishedYear: e.target.value })}
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text text-base font-medium">Book's Author</span>
              </label>
              <select
                className="select select-bordered w-full py-3"
                value={selectedAuthorId || ""}
                onChange={(e) => {
                  const selectedName = e.target.value;
                  setSelectedAuthorId(selectedName);
                  setFormData({ ...formData, authorid: selectedName });
                }}
              >
                <option value="" disabled>Select an author</option>
                {authors.map((author) => (
                  <option key={author.authorid} value={author.authorid}>{author.name}</option>
                ))}
              </select>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text text-base font-medium">Genre</span>
              </label>
              <select
                className="select select-bordered w-full py-3"
                value={selectedGenreId || ""}
                onChange={(e) => {
                  const selectedName = e.target.value;
                  setSelectedGenreId(selectedName);
                  setFormData({ ...formData, genreid: selectedName});
                }}
              >
                <option value="" disabled>Select a genre</option>
                {genres.map((genre) => (
                  <option key={genre.genreid} value={genre.genreid}>{genre.name}</option>
                ))}
              </select>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text text-base font-medium">Image URL</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base-content/50">
                  <ImageIcon className="size-5" />
                </div>
                <input
                  type="text"
                  placeholder="https://example.com/image.jpg"
                  className="input input-bordered w-full pl-10 py-3 focus:input-primary transition-colors duration-200"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                />
              </div>
            </div>
          </div>

          <div className="modal-action">
            <form method="dialog">
              <button className="btn btn-ghost" onClick={resetForm}>Cancel</button>
            </form>
            <button
              type="submit"
              className="btn btn-primary min-w-[120px]"
              disabled={
                !formData.title ||
                !formData.price ||
                !formData.stock ||
                !formData.publishedYear ||
                !selectedAuthorId ||
                !selectedGenreId ||
                !formData.image ||
                loading
              }
            >
              {loading ? (
                <span className="loading loading-spinner loading-sm" />
              ) : (
                <>
                  <PlusCircleIcon className="size-5 mr-2" />
                  Add New Book
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}

export default AddProductModal;
