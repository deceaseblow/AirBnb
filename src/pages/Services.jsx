import React from 'react'
import { useEffect, useState } from 'react'
import {
    getServicesPhoto,
    getServicesChef,
    getServicesMassage
} from '../services/servicesService'
import ServicesFirstLineCardsHolder from '../components/ServicesFirstLineCardsHolder'
import ServiceCardSwiper from '../components/ServiceCardSwiper'
function Services() {

  const [servicesPhoto, setServicesPhoto] = useState([])
  const [servicesChef, setServicesChef] = useState([])
  const [servicesMassage, setServicesMassage] = useState([])

  useEffect(() => {
    getServicesPhoto().then(setServicesPhoto) 
    getServicesChef().then(setServicesChef)
    getServicesMassage().then(setServicesMassage) 
  }, [])

  return (
  
    <div>
      <div className='w-full px-10 py-3'>
        <ServicesFirstLineCardsHolder/>
      </div>
      <div className='w-full px-10 py-8 space-y-12'>
      <ServiceCardSwiper services ={servicesPhoto} title="Photography" />
      <ServiceCardSwiper services={servicesChef} title="Chefs" />
      <ServiceCardSwiper services={servicesMassage} title="Massage"/>
    </div>
    </div>
  )
}

export default Services
