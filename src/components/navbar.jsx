import React, { useState , useEffect } from 'react';
import { FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa';
import Photo from "../images/myphoto.jpg"


const navbar = () => {
    const [showDeveloperCard, setShowDeveloperCard] = useState(false);
    const [showProductCard, setProductCard] = useState(false);

    const toggleDeveloperCard = () => {
        setShowDeveloperCard(!showDeveloperCard);
    };
    const toggleProductCard = () => {
        setShowDeveloperCard(showDeveloperCard);
    };

    useEffect(() => {
        if (showDeveloperCard) {
          const timer = setTimeout(() => {
            setShowDeveloperCard(false);
          }, 5000); // Adjust the timeout duration as needed (5000ms = 5s)
    
          return () => clearTimeout(timer); // Cleanup the timer on component unmount or if showDeveloperCard changes
        }
      }, [showDeveloperCard]);
    


    return (
        <>
            <nav className=" p-4 px-44 fixed w-full z-30 max-md:px-4 ">
                <div className="container mx-auto flex justify-between items-center ">
                    <div className="flex items-center ">

                        <span className="text-white text-xl font-semibold max-md:text-2xl hover:text-teal-300 hover:scale-150 trasition duration-500 ease-in-out select-none">Echo</span>
                    </div>
                    <div className="flex space-x-4 max-md:text-sm">
                        <a href="#" className="text-white hover:text-teal-300 max-md:hidden">Other Product</a>
                        <a href="#" onClick={toggleDeveloperCard}  className="  text-white hover:text-teal-300 max-md:pt-2 ">About Developer</a>
                    </div>
                </div>

                {showDeveloperCard && (
                    <div className="developer-card p-6  absolute right-20  rounded-lg shadow-lg w-80 mt-8 max-md:right-8">
                        <div className="flex flex-col items-center">
                        <i  onClick={()=>setShowDeveloperCard(!showDeveloperCard)} className="ri-close-large-line absolute text-text-slate-400 hover:text-teal-300 right-8"></i>
                            <img src={Photo} alt="Developer" className="w-32 h-32 rounded-full object-cover mb-4" />
                            <h2 className="text-xl font-semibold mb-2">Jagtap Anuj</h2>
                            <p className="text-gray-600 mb-4 text-center">Aspiring MERN Stack Developer Who Loves Crafting Web Apps❤️</p>
                            <div className="flex space-x-4">
                                <a href="https://twitter.com/JagtapAnuj15836" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700"><FaTwitter size={24} /></a>
                                <a href="linkedin.com/in/anuj-jagtap-66a23429a" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-900"><FaLinkedin size={24} /></a>
                                <a href="https://github.com/Anuj2004-Jagtap" target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:text-gray-600"><FaGithub size={24} /></a>
                            </div>
                        </div>
                    </div>
                )}
            </nav>
        </>
    )
}

export default navbar