import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const Signup = ({ setIsAuthenticated }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()

    const handleSignup = async (e) => {
        e.preventDefault();
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_SERVER_URL}/signup`, { username, password });
        if (!response.ok) {
            console.error('Signup failed. Please try again.', {
                description: response.message,
                className: '!bg-black !text-white',
            });
        }

        toast.success("User signup successful", {
            className: '!bg-black !text-white',
        });
        navigate('/')
        setIsAuthenticated(true)
    };

    return (
        <form onSubmit={handleSignup}>
            <div className="flex justify-center items-center h-screen bg-[#111] max-md:h-[100vw] max-md:mt-40">
                <div className="signup w-96 h-96 flex flex-col justify-between items-center border-[0.5px] p-4 rounded-xl shadow-md max-md:w-80">
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
                        className="w-full h-10 flex justify-evenly items-center max-md:w-52 bg-blue-700 border-2 border-slate-800 text-center text-white rounded-md ml-3 max-md:bottom-0"
                    >Sign Up</button>
                    <span className='text-sm bg-transparent'>Already Have Account<Link to="/" className="text-teal-300 bg-transparent"> Log In</Link></span>
                </div>
            </div>
        </form>
    );
};

export default Signup;
