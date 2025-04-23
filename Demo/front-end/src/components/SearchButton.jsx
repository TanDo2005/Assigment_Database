import { useEffect } from "react";
import { useBookStore } from "../store/useBookStore";
import { Search } from "lucide-react";

const SearchButton = ({ query }) => {
    const { books, fetchBooks } = useBookStore();
    const SearchUrl = "https://localhost:5173/api/products"; // Removed trailing slash

    const handleSearch = async () => {
        try {
            const matchedBook = books.find(
                (p) => p.title.toLowerCase() === query.toLowerCase()
            );

            if (matchedBook) {
                console.log("Found product ID:", matchedBook.id);
                const SearchURL = `${SearchUrl}/${matchedBook.id}`
                window.location.href = SearchURL;
            } else {
                console.log("No product found with that title.");
            }
        } catch (error) {
            console.error("Error when finding book: ", error);
        }
    };

    useEffect(() => {
        if (query) {
            handleSearch();
        }
    }, [query] [fetchBooks]);

    return (
        <button className="btn btn-primary" onClick={handleSearch}>
            <Search className="size-5" />
        </button>
    );
};

export default SearchButton;
