import { useNavigate, useParams } from "react-router-dom";
import { useBookStore } from "../store/useBookStore";
import { useEffect, useState } from "react";
import { ArrowLeftIcon, SaveIcon, Trash2Icon } from "lucide-react";
import { useLoginStore } from "../store/useLogin";

function BookPage() {
  const { user } = useLoginStore();
  const [selectedAuthorId, setSelectedAuthorId] = useState(null);
  const [selectedGenreId, setSelectedGenreId] = useState(null);
  const {
    authors,
    genres,
    currentProduct,
    formData,
    setFormData,
    loading,
    error,
    fetchBook,
    updateBook,
    deleteBook,
  } = useBookStore();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetchBook(id);
  }, [fetchBook, id]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      await deleteBook(id);
      navigate("/");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="loading loading-spinner loading-lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="alert alert-error">{error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <button onClick={() => navigate("/")} className="btn btn-ghost mb-8">
        <ArrowLeftIcon className="size-4 mr-2" />
        Back to Books
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* PRODUCT IMAGE */}
        <div className="rounded-lg overflow-hidden shadow-lg bg-base-100">
          <img
            src={formData?.image}
            alt={formData?.title}
            className="size-full object-cover"
          />
        </div>

        {/* PRODUCT FORM */}
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <h2 className="card-title text-2xl mb-6">Edit Book</h2>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                updateBook(id);
              }}
              className="space-y-6"
            >
              {/* PRODUCT NAME */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base font-medium">Book's Title</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter product name"
                  className="input input-bordered w-full"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base font-medium">Book's Author</span>
                </label>
                <select
                  className="select select-bordered w-full py-3"
                  value={selectedAuthorId || formData.authorid}
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
                  value={selectedGenreId || formData.genreid}
                  onChange={(e) => {
                    const selectedName = e.target.value;
                    setSelectedGenreId(selectedName);
                    setFormData({ ...formData, genreid: selectedName });
                  }}
                >
                  <option value="" disabled>Select a genre</option>
                  {genres.map((genre) => (
                    <option key={genre.genreid} value={genre.genreid}>{genre.name}</option>
                  ))}
                </select>
              </div>

              {/* PRODUCT PRICE */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base font-medium">Price</span>
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  className="input input-bordered w-full"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                />
              </div>

              {/* PRODUCT IMAGE URL */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base font-medium">Image URL</span>
                </label>
                <input
                  type="text"
                  placeholder="https://example.com/image.jpg"
                  className="input input-bordered w-full"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                />
              </div>

              {/* FORM ACTIONS */}
              {(user === "Do Thanh Tan" || user === "Tan Do") && (
                <div className="flex justify-between mt-8">
                  <button type="button" onClick={handleDelete} className="btn btn-error">
                    <Trash2Icon className="size-4 mr-2" />
                    Delete Product
                  </button>

                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading || !formData.title || !formData.price || !formData.image}
                  >
                    {loading ? (
                      <span className="loading loading-spinner loading-sm" />
                    ) : (
                      <>
                        <SaveIcon className="size-4 mr-2" />
                        Save Changes
                      </>
                    )}
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
export default BookPage;