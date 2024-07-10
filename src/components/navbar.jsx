import React, { useState, useEffect } from 'react';
import ProductCard from "./productCard";
import DeveloperCard from "./developer";
import { motion } from 'framer-motion';

const navbar = () => {
    /* We Have Not Stored This State Variables In Store Becuase They Are being Used In Only This 
     Componet*/

    const [ActiveCard, setActiveCard] = useState(null);

    useEffect(() => {
        if (ActiveCard == "DeveloperCard" || ActiveCard == "ProductCard") {
            const timer = setTimeout(() => {
                setActiveCard(null);
            }, 5000); // Adjust the timeout duration as needed (5000ms = 5s)

            return () => clearTimeout(timer); // Cleanup the timer on component unmount or if showDeveloperCard changes
        }
    }, [ActiveCard]);




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
                        <a href="#" onClick={(e) => { e.preventDefault(); setActiveCard('ProductCard') }} className="text-white hover:text-teal-300 max-md:hidden">Other Product</a>
                        <a href="#" onClick={(e) => { e.preventDefault(); setActiveCard('DeveloperCard') }} className="  text-white hover:text-teal-300 max-md:pt-2 ">About Developer</a>
                    </div>
                </div>

                {ActiveCard == "DeveloperCard" && (
                    <DeveloperCard setActiveCard={setActiveCard} />
                )}

                {ActiveCard == "ProductCard" && (
                    <ProductCard setActiveCard={setActiveCard} />
                )}
            </motion.nav>
        </>
    )
}

export default navbar