import React from 'react'
import { useLoginStore } from "../store/useLogin";

function loginModel() {
    const{
        user,
        loading,
        error,
        formData,
        setFormData,
        resetForm,
        login,
    } = useLoginStore();

    return (
        <dialog id="login_modal" className="modal">
            <div className="modal-box">
                <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">X</button>
                </form>

                <h3 className="font-bold text-xl mb-8">Login</h3>
                <form className="space-y-6" onSubmit={login}>
                <div className="grid gap-6">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-base font-medium">Username</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter your username"
                            className="input input-bordered w-full py-3 focus:input-primary transition-colors duration-200"
                            value={formData.Username}
                            onChange={(e) => setFormData({ ...formData, Username: e.target.value })}
                        />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-base font-medium">Password</span>
                        </label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            className="input input-bordered w-full py-3 focus:input-primary transition-colors duration-200"
                            value={formData.Password}
                            onChange={(e) => setFormData({ ...formData, Password: e.target.value })}
                        />
                    </div>
                </div>
                </form>
            </div>
        </dialog>
    )
}

export default loginModel