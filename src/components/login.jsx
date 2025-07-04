import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';


const Login = ({ setIsAuthenticated }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const url = `${import.meta.env.VITE_BACKEND_SERVER_URL}/login`
        const response = await axios.post(url, { username, password });
        if (!response.ok) {
            console.error('Login failed. Please try again.')
        }
        toast.success('Login successful.', {
            description: 'You are now logged in.',
            className: '!bg-black',
        });
        localStorage.setItem('token', response.data.token);
        setIsAuthenticated(true);
        navigate('/echo');
    };

    return (
        <form onSubmit={handleLogin}>
            <div className="flex justify-center items-center h-screen bg-[#111] max-md:h-[100vw] max-md:mt-40">
                <div className="login w-96 h-96 flex flex-col justify-between items-center border-[0.5px] p-4 rounded-xl shadow-md max-md:w-80">
                    <span className="text-teal-300 text-3xl pt-6 bg-transparent  font-semibold max-md:text-2xl   hover:scale-150 transition duration-500 ease-in-out select-none">Echo</span>

                    <div className="inputs mt-4 space-y-4 bg-transparent">
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter Your UserName"
                            className="w-full p-2 border border-teal-300 rounded mb-2 bg-[#111]"
                            autoComplete='username'
                        />
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter Your Password"
                            className="w-full p-2 border border-teal-300 rounded"
                            autoComplete='password'
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full h-10 flex justify-evenly items-center bg-blue-700 border-2 max-md:w-52 border-slate-800 text-center text-white rounded-md ml-3 max-md:bottom-0"
                    >Log In</button>
                    <span className='text-xs text-red-600 bg-transparent'>{message}</span>
                    <span className='text-sm bg-transparent'>Don't Have An Account <Link to="/signup" className="text-teal-300 bg-transparent">Sign Up</Link></span>
                </div>
            </div>
        </form>
    );
};

export default Login;