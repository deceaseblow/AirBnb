import React from 'react'
import ServicesFirstLineCardsHolder from '../components/ServicesFirstLineCardsHolder'
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
function s() {
    return (
        <div>
          <Navbar forceScrolled ={true}/>
            <div className='w-full px-10 py-3 mb-8'>
                <ServicesFirstLineCardsHolder selectFirstServiceOnMount={true}/>
            </div>
            <Footer/>
        </div>
    )
}

export default s
