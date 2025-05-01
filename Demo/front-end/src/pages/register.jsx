import React, { use } from 'react'
import { useRegisterStore } from '../store/useRegister'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function RegisterPage() {
    const {
        user,
        loading,
        errror,
        formData,
        setFormData,
        resetForm,
        register,
    } = useRegisterStore();

    const navigate = useNavigate();


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
                <h1 className="text-2xl font-semibold">Register</h1>
            </div>

            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    if (!formData.Username || !formData.Password) {
                        toast.error("Please fill in all fields.");
                        return;
                    }
                    console.log("Form data:", formData);
                    register(navigate);
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
                    />
                </div>
                {/* Add other input fields for Password, DateOfBirth, Address, Phone, Email */}
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
                    />
                </div>

                <div className="form-control w-full max-w-xs">
                    <label className="label" htmlFor="dateofbirth">
                        <span className="label-text">Date of Birth</span>
                    </label>
                    <input
                        type="date"
                        placeholder="Enter your date of birth"
                        value={formData?.DateOfBirth || ""}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                DateOfBirth: e.target.value,
                            })
                        }
                        className="input input-bordered w-full max-w-xs"
                    />
                </div>


                <div className="form-control w-full max-w-xs">
                    <label className="label" htmlFor="address">
                        <span className="label-text">Address</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Enter your address"
                        value={formData?.Address || ""}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                Address: e.target.value,
                            })
                        }
                        className="input input-bordered w-full max-w-xs"
                    />
                </div>

                <div className="form-control w-full max-w-xs">
                    <label className="label" htmlFor="phone">
                        <span className="label-text">Phone</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Enter your phone number"
                        value={formData?.Phone || ""}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                Phone: e.target.value,
                            })
                        }
                        className="input input-bordered w-full max-w-xs"
                    />
                </div>

                <div className="form-control w-full max-w-xs">
                    <label className="label" htmlFor="email">
                        <span className="label-text">Email</span>
                    </label>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={formData?.Email || ""}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                Email: e.target.value,
                            })
                        }
                        className="input input-bordered w-full max-w-xs"
                    />
                </div>

                <button type="submit" className="btn btn-primary w-full max-w-xs">
                    Register
                </button>
            </form>
        </main>
    )
}

export default RegisterPage