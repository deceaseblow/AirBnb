import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import FooterSecond from "../components/FooterSecond"
import MobileFooter from '../components/MobileFooter'
function MainLayout() {
    return (
        <>
            <Navbar />
            <main>
                <Outlet />
            </main>
            <FooterSecond />
            <Footer />
            <div className="block md:hidden">
                <MobileFooter />
            </div>

        </>
    )
}

export default MainLayout
