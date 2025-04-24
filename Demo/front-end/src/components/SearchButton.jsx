import { useEffect } from "react";
import { useBookStore } from "../store/useBookStore";
import { useSearchFieldStore } from "../store/useSearchFieldStore";
import { Search } from "lucide-react";
import toast from "react-hot-toast";

const SearchButton = ({ query }) => {
  const { books, authors, genres, years, fetchBooks, fetchAuthors, fetchGenres, fetchYears } = useBookStore();
  const { searchField } = useSearchFieldStore();
  useEffect(() => {
    fetchBooks()
    fetchAuthors();
    fetchGenres();
    fetchYears();
  }, [fetchBooks, fetchAuthors, fetchGenres, fetchYears]);

  const baseUrl = "https://localhost:5173/api";

  const handleSearch = () => {
    if (!query) return;

    if (searchField === "author") {
      const matchedAuthor = authors.find((a) => a.authorid === query);
      if (matchedAuthor) {
        window.location.href = `${baseUrl}/authors/${matchedAuthor.authorid}`;
        return;
      } else {
        toast.error("No author found matching your query.");
        return;
      }
    }

    if (searchField === "genre") {
      const matchedGenre = genres.find((g) => g.genreid === query);
      if (matchedGenre) {
        window.location.href = `${baseUrl}/genres/${matchedGenre.genreid}`;
        return;
      } else {
        toast.error("No genre found matching your query.");
        return;
      }
    }

    if (searchField === "year") {
        const matchedYear = years.find((year) => String(year.publishedyear) === query);
        if (matchedYear) {
          window.location.href = `${baseUrl}/products/years/${matchedYear.publishedyear}`;
          return;
        } else {
          toast.error("No published year found matching your query.");
          return;
        }
    }

    let matchedBooks = [];

    if (searchField === "title") {
      matchedBooks = books.filter((b) => b.title.toLowerCase() === query.toLowerCase());
    } else if (searchField === "year") {
      matchedBooks = books.filter((b) => String(b.publishedyear) === query);
    }

    if (matchedBooks.length > 0) {
      if (matchedBooks.length === 1) {
        window.location.href = `${baseUrl}/products/${matchedBooks[0].id}`;
      } else {
        toast.success(`${matchedBooks.length} books found. Showing the first.`);
        window.location.href = `${baseUrl}/products/${matchedBooks[0].id}`;
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
