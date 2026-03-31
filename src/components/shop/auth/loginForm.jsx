"use client"
import { useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { isEmpty, validateLogin } from '@/utils/validators';
import { login } from '@/services/authService';
import { AuthContext } from '@/context/AuthProvider';

const LoginForm = () => {
    const [username, setUsername] = useState("");
    const [pass, setPass] = useState("");
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");

    const router = useRouter();
    const { setUser } = useContext(AuthContext); 

    const handleSubmit = async (e) => {
        e.preventDefault();

        
        const newErrors = validateLogin({ username, pass });
        setErrors(newErrors);

        if (!isEmpty(newErrors)) return;

        try {
            setLoading(true);

            const res = await login({ username, pass });
            console.log("Login success:", res);

            const user = res?.user;
            setUser(user);
            setSuccess("Đăng nhập thành công");

            setTimeout(() => {
                if (user?.user_type === "admin") {
                    router.push('/admin');
                } else {
                    router.push('/');
                }
            }, 800);

        } catch (e) {
            setErrors({
                message: e.response?.data?.message || "Sai tài khoản hoặc mật khẩu"
            });
        } finally {
            setLoading(false);
        }
    };

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
                    Đăng nhập
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
                        {errors.username && (
                            <p className='text-red-500 text-sm mt-1'>{errors.username}</p>
                        )}
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
                        {errors.pass && (
                            <p className='text-red-500 text-sm mt-1'>{errors.pass}</p>
                        )}
                    </div>

                    {/* Remember + Forgot */}
                    <div className="flex items-center justify-between text-sm">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" className="accent-purple-500" />
                            Ghi nhớ tôi
                        </label>

                        <a href="/forgot-password" className="text-purple-600 hover:underline">
                            Quên mật khẩu?
                        </a>
                    </div>

                    {/* Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 rounded-xl bg-linear-to-r from-purple-500 to-indigo-500 text-white font-semibold hover:scale-105 transition disabled:opacity-50"
                    >
                        {loading ? "Loading..." : "Đăng nhập"}
                    </button>

                    {/* Register */}
                    <p className="text-center text-sm mt-4">
                        Chưa có tài khoản?{" "}
                        <a href="/register" className="text-purple-600 font-medium hover:underline">
                            Đăng ký ngay
                        </a>
                    </p>

                </form>
            </div>
        </div>
    );
};

export default LoginForm;