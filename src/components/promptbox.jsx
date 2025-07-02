import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Send, AlertCircle } from 'lucide-react';
import { setGeneratedText, setShowLogo, setPrompt, setLockedPrompt } from '../features/chatSlice';
import axios from 'axios';

const Prompt = () => {
    const dispatch = useDispatch();
    const prompt = useSelector((state) => state.chat.prompt);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleGenerate = async () => {
        if (!prompt.trim()) {
            setError('Please enter a prompt.');
            return;
        }

        dispatch(setShowLogo(false));
        dispatch(setLockedPrompt(prompt));
        dispatch(setPrompt(''));
        setIsLoading(true);
        setError(null);

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_GEMINIT_API_URL}/v1beta/models/gemini-1.5-flash:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`,
                {
                    contents: [{ parts: [{ text: prompt }] }],
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            const text = response.data.candidates[0]?.content.parts[0].text || 'No response generated.';
            const formattedText = text.split('* .').join('\n');
            dispatch(setGeneratedText(formattedText));
        } catch (error) {
            console.error('Error generating content:', error);
            setError(errorMessage);
            dispatch(setGeneratedText(errorMessage));
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="prompt fixed z-20 bottom-0 w-full h-24 flex justify-center items-center max-md:bottom-0">
            <div className="relative flex justify-center items-center flex-col w-[830px] max-md:w-[370px]">
                <div className="relative flex items-center w-full">
                    <textarea
                        value={prompt}
                        onChange={(e) => {
                            dispatch(setPrompt(e.target.value));
                            setError(null);
                        }}
                        placeholder="Enter your prompt here..."
                        className="w-full h-14 rounded-full p-3 pt-4 pl-5 pr-16 text-white border-2 border-gray-300 focus:outline-none focus:border-teal-400 text-sm textarea-hide-scrollbar max-md:text-xs"
                        style={{ resize: 'none' }}
                    />
                    <button
                        type="button"
                        className="absolute right-2 h-10 w-10 flex items-center justify-center bottom-2 bg-teal-500 text-white rounded-full hover:bg-teal-600 transition-colors disabled:bg-gray-500 max-md:right-1 max-md:bottom-3"
                        onClick={handleGenerate}
                        disabled={isLoading || !prompt.trim()}
                        aria-label="Generate"
                    >
                        {isLoading ? (
                            <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
                        ) : (
                            <Send size={18} className='bg-transparent' />
                        )}
                    </button>
                </div>
                {error && (
                    <div className="flex items-center gap-1 text-red-400 text-xs mt-1 max-md:text-[8px]">
                        <AlertCircle size={14} />
                        <span>{error}</span>
                    </div>
                )}
                <span className="text-xs text-gray-300 mt-1 max-md:text-[8px]">
                    Echo may display inaccurate info, including about people, so double-check its responses.
                </span>
            </div>
        </div>
    );
};

export default Prompt;