import React, { useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useDispatch, useSelector } from 'react-redux';
import { setGeneratedText, setShowLogo, setPrompt, setLockedPrompt } from '../features/chatSlice';




const genAI = new GoogleGenerativeAI('AIzaSyAG1hnTOoQ6ioyIVzCDer3MCsjxrMajzhI');

const Prompt = () => {
    const dispatch = useDispatch();
    const prompt = useSelector((state) => state.chat.prompt);

    const handleGenerate = async () => {

        dispatch(setShowLogo(false));
        dispatch(setLockedPrompt(prompt));
        dispatch(setPrompt(''));

        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash", tools: [
                {
                    codeExecution: {},
                },
            ],
        });

        try {
            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = await response.text();
            const splitedText = text.split("* .");
            const joinedText = splitedText.join("\n")
            dispatch(setGeneratedText(joinedText));

        } catch (error) {
            console.error('Error generating content:', error);
        }
    };
    
    return (
        <>
            <div className="prompt fixed z-20 bottom-0 w-full h-20 flex justify-center items-center max-md:bottom-0 ">
                <div className='relative flex justify-center items-center flex-col'>

                    <textarea
                        value={prompt}
                        onChange={(e) => dispatch(setPrompt(e.target.value))}
                        placeholder="Enter your prompt here..."
                        className="w-[830px] bg-[#111] focus:outline-none h-14 relative rounded-full p-2 pl-6 pr-28 pt-4 text-wrap border-2 border-solid border-slate-500 textarea-hide-scrollbar flex items-center max-md:w-[370px]"
                        style={{ resize: 'none' }}
                    />
                    <button
                        className="absolute right-2 h-10 px-4 bottom-7 bg-blue-500 text-white rounded-full max-md:right-2 max-md:bottom-7"
                        onClick={handleGenerate}
                    >
                        Generate
                    </button>
                    <span className='text-xs text-slate-300 mt-1 max-md:text-[8px]'>Echo may display inaccurate info, including about people, so double-check its responses. </span>
                </div>

            </div>
        </>
    )
}

export default Prompt