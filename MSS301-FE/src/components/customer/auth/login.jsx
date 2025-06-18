import React, { useState } from 'react';


const CloseIcon = ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);

const EyeOpenIcon = ({ className = "w-5 h-5" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639l4.436-7.15A12.025 12.025 0 0112 4.5c4.638 0 8.56 3.102 10.528 7.183.194.32.194.707 0 1.026l-4.436 7.15A12.025 12.025 0 0112 19.5c-4.638 0-8.56-3.102-10.528-7.183z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

const EyeSlashIcon = ({ className = "w-5 h-5" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.243 4.243l-4.243-4.243" />
    </svg>
);


const InputField = ({ label, type, placeholder, value, onChange, children }) => {
    return (
        <div className="w-full">
            <label htmlFor={label} className="block text-sm font-medium text-gray-700 ">{label}</label>
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

const Button = ({ children, onClick, variant = 'primary', type = 'button' }) => {
    const baseStyle = "w-full py-3 rounded-lg font-semibold text-center transition duration-300";
    const styles = {
        primary: "bg-orange-500 text-white hover:bg-orange-600",
        secondary: "bg-white text-orange-500 border border-orange-500 hover:bg-orange-50"
    };

    return (
        <button type={type} onClick={onClick} className={`${baseStyle} ${styles[variant]}`}>
            {children}
        </button>
    );
};



const LoginPopup = ({ onClose, onSwitchToRegister }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({ email, password });
        alert(`Đăng nhập với:\nEmail: ${email}`);
        onClose();
    };

    return (
        <div className="fixed inset-0 flex justify-center items-center z-50 p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}>
            <div className="relative bg-white rounded-xl shadow-2xl md:p-4 w-full max-w-[420px] mx-auto">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition" aria-label="Đóng"><CloseIcon /></button>
                <div className="flex flex-col items-center">

                    <img src="https://www.galaxycine.vn/_next/static/media/icon-login.fbbf1b2d.svg" alt="[Hình minh hoạ đăng nhập]" className="w-40 h-auto mb-4" onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/150x100/e0e0e0/999999?text=Image+Error'; }} />

                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Đăng Nhập Tài Khoản</h2>

                    <form onSubmit={handleSubmit} className="w-full space-y-5">
                        <InputField label="Email" type="email" placeholder="Nhập Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <InputField label="Mật khẩu" type={showPassword ? 'text' : 'password'} placeholder="Nhập Mật khẩu" value={password} onChange={(e) => setPassword(e.target.value)}>
                            <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-gray-400 hover:text-gray-600" aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}>
                                {showPassword ? <EyeOpenIcon /> : <EyeSlashIcon />}
                            </button>
                        </InputField>
                        <div className="pt-2"><Button type="submit" variant="primary">ĐĂNG NHẬP</Button></div>
                    </form>

                    <a href="#" className="text-sm text-gray-500 hover:text-orange-500 mt-4">Quên mật khẩu ?</a>

                    <div className="w-full border-t my-6 border-gray-300"></div>

                    <p className="text-sm text-gray-600">Bạn chưa có tài khoản ?</p>

                    <div className="w-full mt-4">
                        <Button variant="secondary" onClick={onSwitchToRegister}>Đăng ký</Button>
                    </div>

                </div>
            </div>
        </div>
    );
};

const RegisterPopup = ({ onClose, onSwitchToLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [fullName, setFullName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({ email, password, fullName, phoneNumber });
        onClose();
    };

    return (
        <div className="fixed inset-0  flex justify-center items-center z-50 p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}>
            <div className="relative bg-white rounded-xl shadow-2xl p-5 md:p-5 w-full max-w-[420px] mx-auto">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition" aria-label="Đóng"><CloseIcon /></button>
                <div className="flex flex-col items-center">
                    <img src="https://www.galaxycine.vn/_next/static/media/icon-login.fbbf1b2d.svg" alt="[Hình minh hoạ đăng ký]" className="w-40 h-auto mb-4" onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/150x100/e0e0e0/999999?text=Image+Error'; }} />
                    <h2 className="text-2xl font-bold text-gray-800 mb-3">Tạo Tài Khoản</h2>
                    <form onSubmit={handleSubmit} className="w-full space-y-5">
                        <InputField label="Email" type="email" placeholder="Nhập Email của bạn" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <InputField label="Họ và tên" type="text" placeholder="Nhập tên của bạn" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                        <InputField label="Số Điện Thoại" type="text" placeholder="Nhập số điện thoại của bạn" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />

                        <InputField label="Mật khẩu" type={showPassword ? 'text' : 'password'} placeholder="Tạo mật khẩu" value={password} onChange={(e) => setPassword(e.target.value)}>
                            <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-gray-400 hover:text-gray-600" aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}>
                                {showPassword ? <EyeOpenIcon /> : <EyeSlashIcon />}
                            </button>
                        </InputField>


                        <div className="pt-2"><Button type="submit" variant="primary">ĐĂNG KÝ</Button></div>

                    </form>
                    <div className="w-full border-t my-6"></div>
                    <p className="text-sm text-gray-600">
                        Bạn đã có tài khoản?{' '}
                        <button onClick={onSwitchToLogin} className="font-semibold text-orange-500 hover:underline">
                            Đăng nhập ngay
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default function Login() {

    const [activePopup, setActivePopup] = useState('login');

    return (
        <div>
            {activePopup === 'login' && (
                <LoginPopup
                    onClose={() => setActivePopup(null)}
                    onSwitchToRegister={() => setActivePopup('register')}
                />
            )}

            {activePopup === 'register' && (
                <RegisterPopup
                    onClose={() => setActivePopup(null)}
                    onSwitchToLogin={() => setActivePopup('login')}
                />
            )}
        </div>
    );
}
