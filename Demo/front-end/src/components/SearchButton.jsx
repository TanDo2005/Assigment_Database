import { useEffect } from "react";
import { useBookStore } from "../store/useBookStore";
import { useSearchFieldStore } from "../store/useSearchFieldStore";
import { Search } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const SearchButton = ({ query }) => {
  const navigate = useNavigate();
  const { books, authors, genres, years, fetchBooks, fetchAuthors, fetchGenres, fetchYears } = useBookStore();
  const { searchField } = useSearchFieldStore();

  useEffect(() => {
    fetchBooks();
    fetchAuthors();
    fetchGenres();
    fetchYears();
  }, [fetchBooks, fetchAuthors, fetchGenres, fetchYears]);

  const handleSearch = () => {
    if (!query) return;

    if (searchField === "author") {
      const matchedAuthor = authors.find((a) => a.authorid === query);
      if (matchedAuthor) {
        navigate(`api/authors/${matchedAuthor.authorid}`);
        return;
      } else {
        toast.error("No author found matching your query.");
        return;
      }
    }

    if (searchField === "genre") {
      const matchedGenre = genres.find((g) => g.genreid === query);
      if (matchedGenre) {
        navigate(`api/genres/${matchedGenre.genreid}`);
        return;
      } else {
        toast.error("No genre found matching your query.");
        return;
      }
    }

    if (searchField === "year") {
      const matchedYear = years.find((year) => String(year.publishedyear) === query);
      if (matchedYear) {
        navigate(`api/products/years/${matchedYear.publishedyear}`);
        return;
      } else {
        toast.error("No published year found matching your query.");
        return;
      }
    }

    let matchedBooks = [];

    if (searchField === "title") {
      matchedBooks = books.filter((b) => b.id === query);
    } else if (searchField === "year") {
      matchedBooks = books.filter((b) => String(b.publishedyear) === query);
    }

    if (matchedBooks.length > 0) {
      if (matchedBooks.length === 1) {
        navigate(`api/products/${matchedBooks[0].id}`);
      } else {
        toast.success(`${matchedBooks.length} books found. Showing the first.`);
        navigate(`/products/${matchedBooks[0].id}`);
      }
    } else {
      toast.error("No book found matching your query.");
    }
  };

  return (
    <button className="btn btn-primary" onClick={handleSearch}>
      <Search className="size-5" />
    </button>
  );
};

export default SearchButton;
