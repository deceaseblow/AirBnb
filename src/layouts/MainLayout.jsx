import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'  
import FooterSecond from "../components/FooterSecond" 
function MainLayout() {
    return (
        <>
            <Navbar />
            <main>
                <Outlet />
            </main>
            <FooterSecond />
            <Footer />
        </>
    )
}

export default MainLayout
