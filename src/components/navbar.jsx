import React, { useState, useEffect } from 'react';
import ProductCard from "./product-card";
import DeveloperCard from "./developer";
import { motion } from 'framer-motion';
import { BsLayoutSidebarInset, BsLayoutSidebarInsetReverse } from "react-icons/bs";
import { useDispatch, useSelector } from 'react-redux';
import { toggleSidebar } from '../features/chatSlice';

const navbar = () => {
    const dispatch = useDispatch();

    const [ActiveCard, setActiveCard] = useState(null);

    const isSidebarVisible = useSelector(state => state.chat.isSidebarVisible);

    useEffect(() => {
        if (ActiveCard == "DeveloperCard" || ActiveCard == "ProductCard") {
            const timer = setTimeout(() => {
                setActiveCard(null);
            }, 5000);

            return () => clearTimeout(timer); s
        }
    }, [ActiveCard]);
    return (
        <>
            <motion.nav initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className=" p-4 px-44  w-full fixed z-20 max-md:px-4">
                <div className="container mx-auto flex justify-between items-center">
                    <div className="flex items-center ">

                        {isSidebarVisible ? (
                            <span className='absolute left-16 z-50 max-md:left-8 '><BsLayoutSidebarInsetReverse className='text-xl select-none' onClick={() => dispatch(toggleSidebar())} /></span>
                        )
                            :
                            (
                                <span className='absolute left-16 z-50 max-md:left-8 '><BsLayoutSidebarInset className='text-xl select-none' onClick={() => dispatch(toggleSidebar())} /></span>
                            )

                        }
                        <span className="text-white text-2xl font-semibold max-md:text-2xl max-md:ml-12 hover:text-teal-300 hover:scale-150 trasition duration-500 ease-in-out select-none">Echo</span>
                    </div>
                    <div className="flex space-x-4 max-md:text-sm">
                        <a href="#" onClick={(e) => { e.preventDefault(); setActiveCard('ProductCard') }} className="text-white hover:text-teal-300 max-md:hidden">Other Products</a>
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