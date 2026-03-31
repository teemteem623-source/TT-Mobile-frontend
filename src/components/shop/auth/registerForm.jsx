"use client"
import { register } from '@/services/authService';
import { isEmpty, validateRegister } from '@/utils/validators';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useState } from 'react';

const RegisterFrom = (props) => {
    const [username, setUsername] = useState("");
    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [confirm_password, setConfirm_password] = useState("");
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validateErrors = validateRegister({
            username,
            fullname,
            email,
            pass,
            confirm_password,
        });
        setErrors(validateErrors);

        if (!isEmpty(errors)) return;

        let data = {
            username,
            fullname,
            email,
            pass
        }

        try {
            setLoading(true)
            let res = await register(data);
            console.log("Thông báo: ", res)
            setSuccess("Đăng kí thành công")
            setTimeout(() => {
                router.push('/login')
            }, 2000);

        }
        catch (e) {
            setErrors({ message: e.data?.errors || "Lỗi server" })
        }
        finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex justify-center items-center min-h-[70vh]">
            <div className="w-full max-w-md bg-white/70 backdrop-blur-2xl p-8 rounded-3xl shadow-xl border border-white/40">

                {errors.message && (
                    <p className='text-red-500 text-center mb-3'>{errors.message}</p>
                )}

                {success && (
                    <p className='text-green-500 text-center mb-3'>{success}</p>
                )}

                <h2 className="text-2xl font-bold text-center mb-6 text-purple-700">
                    Đăng ký
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">

                    {/* Username */}
                    <div>
                        <input
                            type="text"
                            value={username}
                            placeholder="Tên đăng nhập"
                            className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        {errors.username && <p className='text-red-500 text-sm mt-1'>{errors.username}</p>}
                    </div>

                    {/* Fullname */}
                    <div>
                        <input
                            type="text"
                            value={fullname}
                            placeholder="Họ và tên"
                            className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
                            onChange={(e) => setFullname(e.target.value)}
                        />
                        {errors.fullname && <p className='text-red-500 text-sm mt-1'>{errors.fullname}</p>}
                    </div>

                    {/* Email */}
                    <div>
                        <input
                            type="email"
                            value={email}
                            placeholder="Email"
                            className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {errors.email && <p className='text-red-500 text-sm mt-1'>{errors.email}</p>}
                    </div>

                    {/* Password */}
                    <div>
                        <input
                            type="password"
                            value={pass}
                            placeholder="Mật khẩu"
                            className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
                            onChange={(e) => setPass(e.target.value)}
                        />
                        {errors.pass && <p className='text-red-500 text-sm mt-1'>{errors.pass}</p>}
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <input
                            type="password"
                            value={confirm_password}
                            placeholder="Nhập lại mật khẩu"
                            className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
                            onChange={(e) => setConfirm_password(e.target.value)}
                        />
                        {errors.confirm_password && <p className='text-red-500 text-sm mt-1'>{errors.confirm_password}</p>}
                    </div>
                    
                    <div className="flex items-start gap-2 text-sm">
                        <input
                            type="checkbox"
                            className="mt-1 accent-purple-500"
                        />

                        <label className="leading-5">
                            Tôi đồng ý với{" "}
                            <a href="/terms" className="text-purple-600 hover:underline">
                                điều khoản sử dụng
                            </a>{" "}
                            và{" "}
                            <a href="/privacy" className="text-purple-600 hover:underline">
                                chính sách bảo mật
                            </a>
                        </label>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 rounded-xl bg-linear-to-r from-purple-500 to-indigo-500 text-white font-semibold hover:scale-105 transition disabled:opacity-50"
                    >
                        {loading ? "Loading..." : "Đăng kí"}
                    </button>
                    <p className="text-center text-sm mt-4">
                        Đã có tài khoản?{" "}
                        <a href="/login" className="text-purple-600 font-medium hover:underline">
                            Đăng nhập ngay
                        </a>
                    </p>

                </form>
            </div>
        </div>
    );
};

export default RegisterFrom;