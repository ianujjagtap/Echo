import { motion, AnimatePresence } from 'framer-motion';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaRegPenToSquare } from "react-icons/fa6";
import { MdOutlineFeedback } from "react-icons/md";
import { setShowLogo } from '../features/chatSlice';



const sidebar = () => {
    const dispatch = useDispatch();
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
                        className="sidebar w-72 h-[81vh] top-[60px] z-10 absolute p-4 bg-slate-800 max-md:w-56 ">
                        <div className="button flex justify-end max-md:pl-44 bg-transparent">
                            <FaRegPenToSquare className='text-xl bg-transparent' onClick={() => dispatch(setShowLogo(true))} />
                        </div>
                        <div className="conversations h-[65vh] mt-4 max-md:h-[70vh]">Conversatiion</div>

                        <div className=" h-[4vh] mt-4 flex justify-end items-center gap-2 max-md:gap-0 max-md:mt-2  bg-slate-800 text-teal-300">
                            <div className="text text-sm bg-transparent max-md:text-[10px] max-md:pr-2">Give Your Valuable Feedback Here</div>
                            <a href="mailto:anujjagtap2004@gmail.com" className='bg-slate-800'>
                                <i className="ri-feedback-line bg-slate-800 text-teal-300 text-2xl py-[1px] border-b-2 border-teal-300 " />
                            </a>


                        </div>

                    </motion.div>
                }
            </AnimatePresence>
        </>
    )
}

export default sidebar