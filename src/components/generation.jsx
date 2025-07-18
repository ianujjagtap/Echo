import React, { useState, useEffect, useRef } from 'react';
import { marked } from 'marked';
import hljs from 'highlight.js';
import 'highlight.js/styles/github-dark.css';
import echo_logo from "../images/echo-logo.png";
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import axios from 'axios';



const Generation = () => {
    const scrollRef = useRef(null);
    const generatedText = useSelector((state) => state.chat.generatedText);
    const showLogo = useSelector((state) => state.chat.showLogo);
    const prompt = useSelector((state) => state.chat.lockedPrompt);


    useEffect(() => {
        marked.setOptions({
            highlight: function (code, language) {
                return hljs.highlightAuto(code).value;
            }
        });
    }, []);

    useEffect(() => {
        if (generatedText) {
            sendConversationToBackend(prompt, generatedText);
        }
    }, [generatedText]);

    const sendConversationToBackend = async (prompt, generatedText) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_SERVER_URL}/conversation`, {
                prompt,
                response: generatedText,
            }, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            });

            if (response.status === 200) {
                console.log('Conversation saved successfully');
            } else {
                console.error('Failed to save conversation');
            }
        } catch (error) {
            console.error('Error saving conversation:', error);
        }
    };

    const formattedGeneratedText = marked(generatedText);

    return (
        <>
            <div data-scroll-container ref={scrollRef} className="scroll-container generation pt-16   overflow-y-scroll textarea-hide-scrollbar ml-96 w-[850px] scroll-smooth max-md:ml-4 max-md:w-[400px]">
                {showLogo && (
                    <motion.div initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                        className="logo-container absolute top-[18%] left-[43%] h-40 max-md:left-[25%] ">
                        <img className="w-48 pt-40 text-slate-500" src={echo_logo} alt="Logo" />
                    </motion.div>
                )}

                {!showLogo && (
                    <div data-scroll-section className="scroll-section flex  flex-col p-4">
                        <div className="prompt-text text-center border-[0.5px] rounded-lg p-4 w-[50%] ml-96 max-md:ml-44">
                            {prompt}
                        </div>
                        {generatedText ? (
                            <div
                                className="generated-text text-base space-y-4 leading-8 border-solid border-2 border-slate-700 p-8 rounded-lg mt-3 w-[40vw] mb-20 overflow-y-scroll textarea-hide-scrollbar max-md:w-[80vw] max-md:text-sm max-md:p-4 markdown-body"
                                dangerouslySetInnerHTML={{ __html: formattedGeneratedText }}
                            />
                        ) : (
                            <div className="skeleton mt-6  max-md:w-60">
                                <Stack spacing={1}>
                                    <Skeleton
                                        variant="rounded"
                                        animation="pulse"
                                        height={120}

                                        sx={{
                                            pt: 6,
                                            bgcolor: 'grey.700',
                                            width: { lg: 550 }
                                        }}
                                    />
                                </Stack>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </>
    );
};

export default Generation;
