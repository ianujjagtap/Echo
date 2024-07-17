import React from 'react';
import Navbar from './navbar';
import SideBar from './sidebar';
import GenerateSection from './generation';
import Prompt from './promptbox';


const echo = () => {
    return (
        <>
            <Navbar />
            <SideBar />
            <GenerateSection />
            <Prompt />
        </>
    )
}

export default echo