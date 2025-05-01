import { useEffect, useRef, useState } from "react";
import { useThemeStore } from "../store/useThemeStore";
import { useBookStore } from "../store/useBookStore";
import { useSearchFieldStore } from "../store/useSearchFieldStore";

const SearchBar = ({ options, title, id, selectedVal, handleChange }) => {
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);
  const { theme } = useThemeStore();
  const { books, authors, genres, years, fetchAuthors, fetchGenres, fetchYears } = useBookStore();
  const { searchField, setSearchField } = useSearchFieldStore();

  useEffect(() => {
    if (fetchAuthors) fetchAuthors();
    if (fetchGenres) fetchGenres();
    if (fetchYears) fetchYears();
  }, [fetchAuthors, fetchGenres, fetchYears]);

  const getDisplayValue = () => {
    if (query != null) return query;
    if (selectedVal) return selectedVal;
    return "";
  };

  const selectOption = (item) => {
    if (searchField === "author") {
      setQuery(item?.name || "");
      handleChange(item?.authorid);
    } else if (searchField === "genre") {
      setQuery(item?.name || "");
      handleChange(item?.genreid);
    } else if (searchField === "year") {
      setQuery(item);
      handleChange(item);
    } else {
      setQuery(item[title]);
      handleChange(item.id);
    }
  };

  const filter = (query) => {
    if (!query) return [];

    if (searchField === "author" && Array.isArray(authors)) {
      return authors.filter((author) =>
        author?.name?.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (searchField === "genre" && Array.isArray(genres)) {
      return genres.filter((genre) =>
        genre?.name?.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (searchField === "year" && Array.isArray(years)) {
        const years = books
        .map((book) => String(book.publishedyear))
        .filter((year, index, self) =>
          year.includes(query) && self.indexOf(year) === index
        ).sort((a, b) => b - a);
      return years;
    }

    return books.filter((book) =>
      book[title]?.toLowerCase().includes(String(query).toLowerCase())
    );
  };

  const filteredOptions = filter(query);

  return (
    <div className="relative w-full max-w-md flex gap-2 items-start" data-theme={theme}>
      <select
        value={searchField}
        onChange={(e) => setSearchField(e.target.value)}
        className="px-4 py-3 rounded-xl border border-gray-300 bg-base-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="title">Title</option>
        <option value="author">Author's Name</option>
        <option value="genre">Genre</option>
        <option value="year">Published Year</option>
      </select>

      <div className="relative w-full">
        <input
          ref={inputRef}
          type="text"
          placeholder={`Search by ${searchField}...`}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm bg-base-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={getDisplayValue()}
          onChange={(e) => {
            setQuery(e.target.value);
            handleChange(null);
          }}
        />
        {Array.isArray(filteredOptions) && filteredOptions.length > 0 ? (
          <div className="absolute z-10 mt-2 w-full border border-gray-200 rounded-xl shadow-lg max-h-60 overflow-y-auto bg-base-100">
            {filteredOptions.map((option, index) => (
              <div
                key={index}
                onClick={() => selectOption(option)}
                className="px-4 py-2 cursor-pointer hover:bg-blue-100 transition-colors duration-150"
              >
                {searchField === "author" || searchField === "genre" ? option?.name : searchField === "year" ? option : option.title}  
              </div>
            ))}
          </div>
        ) : (
          query && (
            <div className="absolute z-10 mt-2 w-full border border-gray-200 rounded-xl shadow-md p-3 bg-base-100 text-gray-500">
              No results found.
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default SearchBar;