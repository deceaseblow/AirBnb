import React, { useEffect, useState } from 'react'
import { getServicesParis } from '../services/servicesService'
import ServicesFirstLineCard from './ServicesFirstLineCard'
import ServicesFirstLineSCard from './ServicesFirstLineSCard'
import { Heart } from 'lucide-react'

function ServicesFirstLineCardsHolder({ selectFirstServiceOnMount = false }) {
  const [services, setServices] = useState([])
  const [selectedService, setSelectedService] = useState(null)
  const [favorites, setFavorites] = useState([])

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getServicesParis()
        setServices(data)
        if (selectFirstServiceOnMount && data.length > 0) {
          setSelectedService(data[0])
        }
      } catch (error) {
        console.error('Error loading services:', error)
      }
    }

    fetchData()
  }, [])

  const toggleFavorite = (serviceId) => {
    setFavorites((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId]
    )
  }

  return (
    <div className="mt-4 space-y-6">
      <div>
        <h2 className="text-lg font-semibold mb-2">Services in Paris</h2>
        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
          {services.map((service) => (
            <div key={service.id} onClick={() => setSelectedService(service)}>
              <ServicesFirstLineCard service={service} />
            </div>
          ))}
        </div>
      </div>

      {selectedService && (
        <div>
          <h3 className="text-md font-semibold mb-2">
            {selectedService.name}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {selectedService.data?.map((service) => (
              <ServicesFirstLineSCard
                key={service.id}
                service={service}
                isFavorite={favorites.includes(service.id)}
                toggleFavorite={toggleFavorite}
                totalCount={selectedService.data?.length || 0}
                selectedService={selectedService}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default ServicesFirstLineCardsHolder