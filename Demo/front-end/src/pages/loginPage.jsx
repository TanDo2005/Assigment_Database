import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginStore } from "../store/useLogin";
import toast from "react-hot-toast";
import { useBookStore } from "../store/useBookStore";

function LoginPage() {
    const {
        user,
        loading,
        error,
        formData,
        setFormData,
        login,
    } = useLoginStore();
    const { setUser } = useBookStore();

    const navigate = useNavigate();

    // Điều hướng đến trang sản phẩm nếu người dùng đã đăng nhập
    useEffect(() => {
        if (user) {
            navigate("/api/products");
        }
    }, [user, navigate]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="loading loading-spinner loading-lg" />
            </div>
        );
    }

    return (
        <main className="max-w-6xl mx-auto px-4 py-8">
            <div className="relative justify-between items-center mb-8">
                <h1 className="text-2xl font-semibold">Login</h1>
            </div>

            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    if (!formData.Username || !formData.Password) {
                        toast.error("Please fill in all fields.");
                        return;
                    }
                    setUser(formData.Username);
                    console.log("User set to:", formData.Username);
                    console.log("Form data:", formData);
                    login(navigate);
                }}
                className="space-y-4"
            >
                <div className="form-control w-full max-w-xs">
                    <label className="label" htmlFor="username">
                        <span className="label-text">Username</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Enter your username"
                        value={formData?.Username || ""}
                        onChange={(e) =>
                            setFormData({ ...formData, Username: e.target.value })
                        }
                        className="input input-bordered w-full max-w-xs"
                        required
                    />
                </div>

                <div className="form-control w-full max-w-xs">
                    <label className="label" htmlFor="password">
                        <span className="label-text">Password</span>
                    </label>
                    <input
                        type="password"
                        placeholder="Enter your password"
                        value={formData?.Password || ""}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                Password: e.target.value,
                            })
                        }
                        className="input input-bordered w-full max-w-xs"
                        required
                    />
                </div>

                {error && (
                    <div className="alert alert-error mb-4">
                        <span>{error}</span>
                    </div>
                )}

                <button
                    type="submit"
                    className={`btn btn-primary ${loading ? "loading" : ""}`}
                    disabled={loading}
                >
                    {loading ? "Logging in..." : "Login"}
                </button>
            </form>

            <div className="mt-4 text-center">
                <p className="text-sm text-gray-500">
                    Don't have an account?{" "}
                    <a href="/api/register" className="text-blue-500 hover:underline">
                        Register here
                    </a>
                </p>
            </div>
        </main>
    );
}

export default LoginPage;