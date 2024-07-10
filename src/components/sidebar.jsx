import { motion, AnimatePresence } from 'framer-motion';
import React from 'react';
import { useSelector } from 'react-redux';




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
                        className="sidebar w-72 h-full z-0 absolute  bg-slate-700 max-md:w-56  ">

                    </motion.div>
                }
            </AnimatePresence>
        </>
    )
}

export default sidebar