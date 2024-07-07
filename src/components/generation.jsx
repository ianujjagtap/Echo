import React, { useState, useEffect, useRef } from 'react';
import { marked } from 'marked';
import hljs from 'highlight.js';
import echo_logo from "../images/echo-logo.png";
import LocomotiveScroll from 'locomotive-scroll';

const Generation = ({ generatedText, showLogo, prompt }) => {
    const scrollRef = useRef(null);

    useEffect(() => {
        const scroll = new LocomotiveScroll({
            el: scrollRef.current,
            smooth: true
        });

        return () => {
            if (scroll) scroll.destroy();
        };
    }, []);

    useEffect(() => {
        // Configure Marked.js to use highlight.js for code highlighting
        marked.setOptions({
            highlight: function (code, language) {
                return hljs.highlightAuto(code).value;
            }
        });
    }, []);

    const formattedGeneratedText = marked(generatedText);

    return (
        <>
            <div data-scroll-container ref={scrollRef} className="scroll-container genaration pt-16  overflow-y-scroll textarea-hide-scrollbar ml-96 w-[850px] scroll-smooth  max-md:ml-4 max-md:w-[400px]">
                {showLogo && (
                    <div className=" logo-container absolute top-[18%] left-[32%] h-40 max-md:left-[25%] ">
                        <img className="w-48 pt-40 text-slate-500" src={echo_logo} alt="Logo" />
                    </div>
                )}

                {!showLogo && (
                    <div data-scroll-section className="scroll-section flex flex-col p-4">
                        <div className="prompt-text text-center bg-slate-600 rounded-lg p-4  w-[50%] ml-96 max-md:ml-44">
                            {prompt}
                        </div>
                        <div className="generated-text  text-sm border-solid border-2 border-slate-700  p-8 rounded-lg mt-3 w-[40vw] mb-20  overflow-y-scroll textarea-hide-scrollbar max-md:w-[80vw] max-md:text-sm max-md:p-4"
                            dangerouslySetInnerHTML={{ __html: formattedGeneratedText }}
                        />
                    </div>
                )}
            </div>
        </>
    )
}

export default Generation