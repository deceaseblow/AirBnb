import React from 'react'
import { useNavigate } from 'react-router-dom'

function ServicesFirstLineCard({ service }) {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/s/${service.id}`) 
  }

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer w-full h-full font-sans"
    >
      <img
        src={service.image}
        alt={service.name}
        className="w-40 h-40 object-cover rounded-md mb-2"
      />
      <h3 className="text-[18px] font-medium truncate">{service.name}</h3>
      <p className="text-[16px] text-gray-400 font-semibold">
        {service.data?.length > 0 ? `${service.data.length} available` : 'Coming soon'}
      </p>
    </div>
  )
}

export default ServicesFirstLineCard
