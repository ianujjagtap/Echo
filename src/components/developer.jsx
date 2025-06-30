import React from 'react';
import Photo from "../images/myphoto.jpg";
import { FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa';
import { motion } from 'framer-motion';


const developer = ({ setActiveCard }) => {
    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="developer-card p-6  absolute right-20  rounded-lg shadow-lg w-80 mt-8 max-md:right-8">

                <div className="flex flex-col items-center">

                    <i onClick={() => setActiveCard(null)} className="ri-close-large-line absolute text-text-slate-400 hover:text-teal-300 right-8"></i>
                    <img src={Photo} alt="Developer" className="w-32 h-32 rounded-full object-cover mb-4" />
                    <h2 className="text-xl font-semibold mb-2">Jagtap Anuj</h2>
                    <p className="text-gray-600 mb-4 text-center">Aspiring MERN Stack Developer Who Loves Crafting Web Apps❤️</p>
                    <div className="flex space-x-4">
                        <a href="https://twitter.com/JagtapAnuj15836" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700"><FaTwitter size={24} /></a>
                        <a href="linkedin.com/in/anuj-jagtap-66a23429a" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-900"><FaLinkedin size={24} /></a>
                        <a href="https://github.com/Anuj2004-Jagtap" target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:text-gray-600"><FaGithub size={24} /></a>

                    </div>
                </div>
            </motion.div>
        </>
    )
}

export default developer