import React, { useState } from "react";
import jwtDecode from "jwt-decode";
import { login, register, verifyOTP, forgotPassword, resetPassword } from "../../../utils/api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const CloseIcon = ({ className = "w-6 h-6" }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className={className}
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
        />
    </svg>
);

const EyeOpenIcon = ({ className = "w-5 h-5" }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className={className}
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.036 12.322a1.012 1.012 0 010-.639l4.436-7.15A12.025 12.025 0 0112 4.5c4.638 0 8.56 3.102 10.528 7.183.194.32.194.707 0 1.026l-4.436 7.15A12.025 12.025 0 0112 19.5c-4.638 0-8.56-3.102-10.528-7.183z"
        />
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
    </svg>
);

const EyeSlashIcon = ({ className = "w-5 h-5" }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className={className}
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.243 4.243l-4.243-4.243"
        />
    </svg>
);

const InputField = ({
    label,
    type,
    placeholder,
    value,
    onChange,
    children,
}) => {
    return (
        <div className="w-full">
            <label
                htmlFor={label}
                className="block text-sm font-medium text-gray-700 "
            >
                {label}
            </label>
            <div className="relative">
                <input
                    id={label}
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500 transition"
                    required
                />
                {children && (
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                        {children}
                    </div>
                )}
            </div>
        </div>
    );
};

const Button = ({
    children,
    onClick,
    variant = "primary",
    type = "button",
}) => {
    const baseStyle =
        "w-full py-3 rounded-lg font-semibold text-center transition duration-300";
    const styles = {
        primary: "bg-orange-500 text-white hover:bg-orange-600",
        secondary:
            "bg-white text-orange-500 border border-orange-500 hover:bg-orange-50",
    };

    return (
        <button
            type={type}
            onClick={onClick}
            className={`${baseStyle} ${styles[variant]}`}
        >
            {children}
        </button>
    );
};

const ForgotPasswordPopup = ({ onClose, onSwitchToReset }) => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email) {
            toast.error("Vui lòng nhập email!");
            return;
        }
        setLoading(true);
        await forgotPassword({ email })
            .then(() => {
                toast.success("Đã gửi email xác nhận. Vui lòng kiểm tra email!");
                onSwitchToReset && onSwitchToReset();
            })
            .catch(() => {
                toast.error("Không gửi được email. Vui lòng thử lại!");
            })
            .finally(() => setLoading(false));
    };

    return (
        <div className="fixed inset-0 flex justify-center items-center z-50 p-4" style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}>
            <div className="relative bg-white rounded-xl shadow-2xl md:p-4 w-full max-w-[420px] mx-auto">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition" aria-label="Đóng">
                    <CloseIcon />
                </button>
                <div className="flex flex-col items-center">
                    <img src="https://www.galaxycine.vn/_next/static/media/icon-login.fbbf1b2d.svg" alt="[Hình minh hoạ quên mật khẩu]" className="w-40 h-auto mb-4" />
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Quên mật khẩu</h2>
                    <form onSubmit={handleSubmit} className="w-full space-y-5">
                        <InputField
                            label="Email"
                            type="email"
                            placeholder="Nhập Email của bạn"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <div className="pt-2">
                            <Button type="submit" variant="primary" disabled={loading}>
                                {loading ? "Đang gửi..." : "Gửi email xác nhận"}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

const ResetPasswordPopup = ({ onClose, onSwitchToLogin }) => {
    const [token, setToken] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!token) {
            toast.error("Vui lòng nhập mã xác nhận!");
            return;
        }
        if (!newPassword || newPassword.length < 8) {
            toast.error("Mật khẩu mới phải có ít nhất 8 ký tự!");
            return;
        }
        if (newPassword !== confirmPassword) {
            toast.error("Mật khẩu nhập lại không khớp!");
            return;
        }
        setLoading(true);
        await resetPassword(token, newPassword)
            .then(() => {
                toast.success("Đổi mật khẩu thành công!");
                onSwitchToLogin && onSwitchToLogin();
            })
            .catch(() => {
                toast.error("Đổi mật khẩu thất bại. Vui lòng kiểm tra lại mã xác nhận!");
            })
            .finally(() => setLoading(false));
    };

    return (
        <div className="fixed inset-0 flex justify-center items-center z-50 p-4" style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}>
            <div className="relative bg-white rounded-xl shadow-2xl md:p-4 w-full max-w-[420px] mx-auto">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition" aria-label="Đóng">
                    <CloseIcon />
                </button>
                <div className="flex flex-col items-center">
                    <img src="https://www.galaxycine.vn/_next/static/media/icon-login.fbbf1b2d.svg" alt="[Hình minh hoạ đổi mật khẩu]" className="w-40 h-auto mb-4" />
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Đặt lại mật khẩu</h2>
                    <form onSubmit={handleSubmit} className="w-full space-y-5">
                        <InputField
                            label="Mã xác nhận"
                            type="text"
                            placeholder="Nhập mã xác nhận từ email"
                            value={token}
                            onChange={(e) => setToken(e.target.value)}
                        />
                        <InputField
                            label="Mật khẩu mới"
                            type={showPassword ? "text" : "password"}
                            placeholder="Nhập mật khẩu mới"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        >
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="text-gray-400 hover:text-gray-600"
                                aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                            >
                                {showPassword ? <EyeOpenIcon /> : <EyeSlashIcon />}
                            </button>
                        </InputField>
                        <InputField
                            label="Nhập lại mật khẩu mới"
                            type={showPassword ? "text" : "password"}
                            placeholder="Nhập lại mật khẩu mới"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <div className="pt-2">
                            <Button type="submit" variant="primary" disabled={loading}>
                                {loading ? "Đang đổi mật khẩu..." : "Đổi mật khẩu"}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

const LoginPopup = ({ onClose, onSwitchToRegister, onLoginSuccess, onSwitchToForgot }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login({ email, password })
            .then((response) => {
                const token = response.data.data;
                localStorage.setItem("token", token);
                const user = jwtDecode(token);
                if (user.role === "MANAGER") {
                    navigate("/manager");
                } else if (user.role === "ADMIN") {
                    navigate("/admin");
                } else {
                    onLoginSuccess && onLoginSuccess(user);
                }
                onClose();
            })
            .catch(() => {
                toast.error("Đăng nhập thất bại");
            });
    };

    return (
        <div
            className="fixed inset-0 flex justify-center items-center z-50 p-4"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}
        >
            <div className="relative bg-white rounded-xl shadow-2xl md:p-4 w-full max-w-[420px] mx-auto">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
                    aria-label="Đóng"
                >
                    <CloseIcon />
                </button>
                <div className="flex flex-col items-center">
                    <img
                        src="https://www.galaxycine.vn/_next/static/media/icon-login.fbbf1b2d.svg"
                        alt="[Hình minh hoạ đăng nhập]"
                        className="w-40 h-auto mb-4"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src =
                                "https://placehold.co/150x100/e0e0e0/999999?text=Image+Error";
                        }}
                    />

                    <h2 className="text-2xl font-bold text-gray-800 mb-6">
                        Đăng Nhập Tài Khoản
                    </h2>

                    <form onSubmit={handleSubmit} className="w-full space-y-5">
                        <InputField
                            label="Email"
                            type="email"
                            placeholder="Nhập Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <InputField
                            label="Mật khẩu"
                            type={showPassword ? "text" : "password"}
                            placeholder="Nhập Mật khẩu"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        >
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="text-gray-400 hover:text-gray-600"
                                aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                            >
                                {showPassword ? <EyeOpenIcon /> : <EyeSlashIcon />}
                            </button>
                        </InputField>
                        <div className="pt-2">
                            <Button type="submit" variant="primary">
                                ĐĂNG NHẬP
                            </Button>
                        </div>
                    </form>

                    <button
                        className="text-sm text-gray-500 hover:text-orange-500 mt-4"
                        onClick={onSwitchToForgot}
                        style={{ background: "none", border: "none", padding: 0, cursor: "pointer" }}
                    >
                        Quên mật khẩu ?
                    </button>

                    <div className="w-full border-t my-6 border-gray-300"></div>

                    <p className="text-sm text-gray-600">Bạn chưa có tài khoản ?</p>

                    <div className="w-full mt-4">
                        <Button variant="secondary" onClick={onSwitchToRegister}>
                            Đăng ký
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const OTPPopup = ({ onClose, onSubmitOTP }) => {
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [loading, setLoading] = useState(false);
    const inputs = [];

    const handleChange = (e, idx) => {
        const value = e.target.value.replace(/\D/g, "");
        if (value.length > 1) return;
        const newOtp = [...otp];
        newOtp[idx] = value;
        setOtp(newOtp);
        if (value && idx < 5) {
            inputs[idx + 1]?.focus();
        }
    };

    const handleKeyDown = (e, idx) => {
        if (e.key === "Backspace" && !otp[idx] && idx > 0) {
            inputs[idx - 1]?.focus();
        }
    };

    const handlePaste = (e) => {
        const paste = e.clipboardData
            .getData("text")
            .replace(/\D/g, "")
            .slice(0, 6);
        if (paste.length === 6) {
            setOtp(paste.split(""));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const otpCode = otp.join("");
        await verifyOTP({ token: otpCode })
            .then(() => {
                toast.success(" Đăng ký thành công ");
                onSubmitOTP && onSubmitOTP(otpCode);
            })
            .catch(() => {
                toast.error("Xác thực OTP thất bại. Vui lòng kiểm tra lại mã OTP.");
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <div
            className="fixed inset-0 flex justify-center items-center z-50 p-4"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}
        >
            <div className="relative bg-white rounded-xl shadow-2xl p-5 md:p-5 w-full max-w-[420px] mx-auto">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
                    aria-label="Đóng"
                >
                    <CloseIcon />
                </button>
                <div className="flex flex-col items-center">
                    <img
                        src="https://www.galaxycine.vn/_next/static/media/icon-login.fbbf1b2d.svg"
                        alt="[Hình minh hoạ OTP]"
                        className="w-40 h-auto mb-4"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src =
                                "https://placehold.co/150x100/e0e0e0/999999?text=Image+Error";
                        }}
                    />
                    <h2 className="text-2xl font-bold text-gray-800 mb-3">Nhập mã OTP</h2>
                    <p className="text-sm text-gray-600 mb-4 text-center">
                        Vui lòng nhập mã OTP gồm 6 số đã gửi về email hoặc số điện thoại của
                        bạn.
                    </p>
                    <form
                        onSubmit={handleSubmit}
                        className="w-full flex flex-col items-center space-y-6"
                    >
                        <div className="flex space-x-2 justify-center">
                            {otp.map((digit, idx) => (
                                <input
                                    key={idx}
                                    ref={(el) => (inputs[idx] = el)}
                                    type="text"
                                    inputMode="numeric"
                                    maxLength={1}
                                    value={digit}
                                    onChange={(e) => handleChange(e, idx)}
                                    onKeyDown={(e) => handleKeyDown(e, idx)}
                                    onPaste={handlePaste}
                                    className="w-10 h-12 text-center border border-gray-300 rounded-lg text-xl focus:ring-orange-500 focus:border-orange-500 transition"
                                    required
                                />
                            ))}
                        </div>
                        <Button type="submit" variant="primary" disabled={loading}>
                            {loading ? "Đang xác thực..." : "XÁC NHẬN"}
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
};

const RegisterPopup = ({ onClose, onSwitchToLogin, onRegisterSuccess }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [fullName, setFullName] = useState("");
    const [phone, setPhone] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email) {
            toast.error("Vui lòng nhập email hợp lệ !");
            return;
        }
        if (!email.includes("@")) {
            toast.error("Email phải là địa chỉ gmail hợp lệ!");
            return;
        }
        if (!fullName) {
            toast.error("Vui lòng nhập họ tên!");
            return;
        }
        if (!phone) {
            toast.error("Vui lòng nhập số điện thoại!");
            return;
        }
        if (!password) {
            toast.error("Vui lòng nhập mật khẩu!");
            return;
        }
        if (password.length < 8) {
            toast.error("Mật khẩu phải có ít nhất 8 ký tự!");
            return;
        }

        await register({ email, password, fullName, phone })
            .then(() => {
                onRegisterSuccess && onRegisterSuccess();
            })
            .catch((error) => {
                const msg = error.response.data;
                if (msg.includes("Duplicate entry"))
                    toast.error("Tài khoản này đã tồn tại");
            });
    };

    return (
        <div
            className="fixed inset-0  flex justify-center items-center z-50 p-4"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}
        >
            <div className="relative bg-white rounded-xl shadow-2xl p-5 md:p-5 w-full max-w-[420px] mx-auto">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
                    aria-label="Đóng"
                >
                    <CloseIcon />
                </button>
                <div className="flex flex-col items-center">
                    <img
                        src="https://www.galaxycine.vn/_next/static/media/icon-login.fbbf1b2d.svg"
                        alt="[Hình minh hoạ đăng ký]"
                        className="w-40 h-auto mb-4"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src =
                                "https://placehold.co/150x100/e0e0e0/999999?text=Image+Error";
                        }}
                    />
                    <h2 className="text-2xl font-bold text-gray-800 mb-3">
                        Tạo Tài Khoản
                    </h2>
                    <form onSubmit={handleSubmit} className="w-full space-y-5">
                        <InputField
                            label="Email"
                            type="email"
                            placeholder="Nhập Email của bạn"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <InputField
                            label="Họ và tên"
                            type="text"
                            placeholder="Nhập tên của bạn"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                        />
                        <InputField
                            label="Số Điện Thoại"
                            type="text"
                            placeholder="Nhập số điện thoại của bạn"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />

                        <InputField
                            label="Mật khẩu"
                            type={showPassword ? "text" : "password"}
                            placeholder="Tạo mật khẩu"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        >
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="text-gray-400 hover:text-gray-600"
                                aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                            >
                                {showPassword ? <EyeOpenIcon /> : <EyeSlashIcon />}
                            </button>
                        </InputField>

                        <div className="pt-2">
                            <Button type="submit" variant="primary">
                                ĐĂNG KÝ
                            </Button>
                        </div>
                    </form>
                    <div className="w-full border-t my-6"></div>
                    <p className="text-sm text-gray-600">
                        Bạn đã có tài khoản?{" "}
                        <button
                            onClick={onSwitchToLogin}
                            className="font-semibold text-orange-500 hover:underline"
                        >
                            Đăng nhập ngay
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default function Login({ onLoginSuccess }) {
    const [activePopup, setActivePopup] = useState("login");

    const handleRegisterSuccess = () => {
        setActivePopup("otp");
    };

    //  xác nhận OTP
    // const handleSubmitOTP = (otp) => {
    //   setActivePopup("login");
    // };

    // Thêm logic forgot password
    return (
        <div>
            {activePopup === "login" && (
                <LoginPopup
                    onClose={() => setActivePopup(null)}
                    onSwitchToRegister={() => setActivePopup("register")}
                    onLoginSuccess={onLoginSuccess}
                    onSwitchToForgot={() => setActivePopup("forgot")}
                />
            )}

            {activePopup === "register" && (
                <RegisterPopup
                    onClose={() => setActivePopup(null)}
                    onSwitchToLogin={() => setActivePopup("login")}
                    onRegisterSuccess={handleRegisterSuccess}
                />
            )}

            {activePopup === "otp" && (
                <OTPPopup
                    onClose={() => setActivePopup(null)}
                />
            )}
            {activePopup === "forgot" && (
                <ForgotPasswordPopup
                    onClose={() => setActivePopup("login")}
                    onSwitchToReset={() => setActivePopup("reset")}
                />
            )}
            {activePopup === "reset" && (
                <ResetPasswordPopup
                    onClose={() => setActivePopup(null)}
                    onSwitchToLogin={() => setActivePopup("login")}
                />
            )}
            <ToastContainer position="top-right" autoClose={2000} hideProgressBar />
        </div>
    );
}
