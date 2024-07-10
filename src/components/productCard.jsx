import React from 'react';
import Project1 from "../images/copy-document.png";
import { motion } from 'framer-motion';



const productCard = ({setActiveCard}) => {
    return (
        <>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            className="developer-card p-6  absolute right-20 bg-slate-800 rounded-lg shadow-lg w-80 mt-8 max-md:right-8">
                <div className="flex flex-col items-center">
                    <i onClick={() => setActiveCard(null)} className="ri-close-large-line top-0 bg-slate-800 absolute text-text-slate-400 hover:text-teal-300 right-6"></i>

                    <div className="product1 flex justify-center items-center w-[78%]  h-12 mt-2 pb-2">
                        <img src={Project1} alt="" className='w-8 h-8' />
                        <div className='pl-4 '>
                            <div className='flex items-center'>Text-Klean <span className='pl-2 text-lg '><a href="https://text-klean.vercel.app/" target='_blank'><i className="ri-external-link-line text-teal-200"></i></a></span></div>
                            <div className='text-xs text-slate-300 '>A Text File Cleaning App</div>
                            <span></span>
                        </div>
                    </div>
                   
                </div>
            </motion.div>
        </>
    )
}

export default productCard