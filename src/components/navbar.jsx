import React, { useState, useEffect } from 'react';
import ProductCard from "./productCard";
import DeveloperCard from "./developer";
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';



const navbar = () => {
    const [showDeveloperCard, setShowDeveloperCard] = useState(false);
    const [showProductCard, setShowProductCard] = useState(false);
    const [ActiveCard, setActiveCard] = useState(null);

    useEffect(() => {
        if (showDeveloperCard) {
            const timer = setTimeout(() => {
                setShowDeveloperCard(false);
            }, 5000); // Adjust the timeout duration as needed (5000ms = 5s)

            return () => clearTimeout(timer); // Cleanup the timer on component unmount or if showDeveloperCard changes
        }
    }, [showDeveloperCard]);
    useEffect(() => {
        if (showProductCard) {
            const timer = setTimeout(() => {
                setShowProductCard(false);
            }, 5000); // Adjust the timeout duration as needed (5000ms = 5s)

            return () => clearTimeout(timer); // Cleanup the timer on component unmount or if showDeveloperCard changes
        }
    }, [showProductCard]);



    return (
        <>
            <motion.nav initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className=" p-4 px-44 fixed w-full z-30 max-md:px-4 ">
                <div className="container mx-auto flex justify-between items-center ">
                    <div className="flex items-center ">

                        <span className="text-white text-xl font-semibold max-md:text-2xl hover:text-teal-300 hover:scale-150 trasition duration-500 ease-in-out select-none">Echo</span>
                    </div>
                    <div className="flex space-x-4 max-md:text-sm">
                        <a href="#" onClick={() => setActiveCard('ProductCard')} className="text-white hover:text-teal-300 max-md:hidden">Other Product</a>
                        <a href="#" onClick={() => setActiveCard('DeveloperCard')} className="  text-white hover:text-teal-300 max-md:pt-2 ">About Developer</a>
                    </div>
                </div>

                {ActiveCard == "DeveloperCard" && (
                    <DeveloperCard setShowDeveloperCard={setShowDeveloperCard} showDeveloperCard={showDeveloperCard} setActiveCard={setActiveCard} />
                )}
                {ActiveCard == "ProductCard" && (
                    <ProductCard setShowProductCard={setShowProductCard} showProductCard={showProductCard} setActiveCard={setActiveCard} />
                )}
            </motion.nav>
        </>
    )
}

export default navbar