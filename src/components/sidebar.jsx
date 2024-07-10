import { motion, AnimatePresence } from 'framer-motion';
import React from 'react';
import { useSelector } from 'react-redux';
import { FaRegPenToSquare } from "react-icons/fa6";
import { MdOutlineLightMode, MdOutlineDarkMode } from "react-icons/md";


const sidebar = () => {
    const isSidebarVisible = useSelector((state) => state.chat.isSidebarVisible);
    return (
        <>
            <AnimatePresence>
                {isSidebarVisible &&
                    <motion.div
                        initial={{ x: '-100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '-100%' }}
                        transition={{ duration: 0.6, ease: 'easeIn' }}
                        className="sidebar w-72 h-[81vh] top-[60px] z-10 absolute p-4 bg-slate-700 max-md:w-56 ">
                        <div className="button pl-60 max-md:pl-44"><FaRegPenToSquare className='text-xl' /></div>
                        <div className="conversations h-[65vh] mt-4 max-md:h-[70vh]">Conversatiion</div>
                        <div className="dark mode  h-[4vh] mt-4 flex justify-end gap-4 max-md:mt-4">
                            <MdOutlineDarkMode className='text-2xl' />
                            <MdOutlineLightMode className='text-2xl' />
                        </div>

                    </motion.div>
                }
            </AnimatePresence>
        </>
    )
}

export default sidebar