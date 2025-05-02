import { Diff, EditIcon, Trash2Icon, User } from "lucide-react";
import { Link } from "react-router-dom";
import { useShoppingCartStore } from "../store/useShoppingCart";
import { useBookStore } from "../store/useBookStore";
import { useNavigate } from "react-router-dom";
import { useLoginStore } from "../store/useLogin";

function BookCard({ product }) {
  const { deleteBook } = useBookStore();
  const { user } = useLoginStore();
  const { addBook } = useShoppingCartStore();
  const navigate = useNavigate();
  return (
    <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300">
      <Link to={`/api/products/${product.id}`}>
        {/* PRODUCT IMAGE */}
        <figure className="relative pt-[56.25%]">
          <img
            src={product.image}
            alt={product.title}
            className="absolute top-0 left-0 w-full h-full object-cover"
          />
        </figure>

        <div className="card-body">
          {/* PRODUCT INFO */}
          <h2 className="card-title text-lg font-semibold">{product.title}</h2>
          <p className="text-2xl font-bold text-primary">${Number(product.price).toFixed(2)}</p>

          {/* CARD ACTIONS */}
          <div className="card-actions justify-end mt-4">
            <Link to={`/api/products/${product.id}`} className="btn btn-sm btn-info btn-outline">
              <EditIcon className="size-4" />
            </Link>
          </div>
        </div>
      </Link>
      <button
        className="btn btn-sm btn-error  btn-outline"
        onClick={() => deleteBook(product.id)}
      >
        <Trash2Icon className="size-4" />
      </button>
      <button className="btn btn-sm btn-primary btn-outline"

        onClick={() => {
          addBook(user, product.id);
        }}
      >

        <Diff className="size-4" />
      </button>
    </div>
  );
}
export default BookCard;