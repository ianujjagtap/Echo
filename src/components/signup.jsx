import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Signup = ({setIsAuthenticated}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/signup', { username, password });
            setMessage(response.data.message);
            setIsAuthenticated(true)
        } catch (error) {
            setMessage('Signup failed. Please try again.');
        }
    };

    return (
        <form onSubmit={handleSignup}>
        <div className="flex justify-center items-center h-screen bg-[#111]">
            <div className="login w-96 h-96 flex flex-col justify-between items-center bg-slate-800 p-4 rounded-xl shadow-md">
                <span className="text-teal-300 text-3xl pt-6 bg-transparent  font-semibold max-md:text-2xl max-md:ml-12  hover:scale-150 transition duration-500 ease-in-out select-none">Echo</span>

                <div className="inputs mt-4 space-y-4 bg-transparent">
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter Your UserName"
                        className="w-full p-2 border border-teal-300 rounded mb-2 bg-[#111]"
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter Your Password"
                        className="w-full p-2 border border-teal-300 rounded"
                    />
                </div>
                <button
                    type="submit"
                    className="w-80 h-10 flex justify-evenly items-center bg-blue-700 border-2 border-slate-800 text-center text-white rounded-md ml-3 max-md:bottom-0"
                >Sign Up</button>
                <span className='text-xs'>{message}</span>
                <span className='text-sm bg-transparent'>Already Have Account<Link to="/" className="text-teal-300 bg-transparent"> Log In</Link></span>
            </div>
        </div>
    </form>
    );
};

export default Signup;
