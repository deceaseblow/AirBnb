import React, { useEffect, useState } from 'react'
import {
  getAllTokyoData,
  getAllParisData,
  getAllLondonData,
  getAllSeoulData
} from '../services/hotelService'
import HotelCardSwiper from '../components/HotelCardSwiper'

function Home() {
  const [tokyoHotels, setTokyoHotels] = useState([])
  const [parisHotels, setParisHotels] = useState([])
  const [londonHotels, setLondonHotels] = useState([])
  const [seoulHotels, setSeoulHotels] = useState([])

  useEffect(() => {
    getAllTokyoData().then(setTokyoHotels)
    getAllParisData().then(setParisHotels)
    getAllLondonData().then(setLondonHotels)
    getAllSeoulData().then(setSeoulHotels)
  }, [])

  return (
<div className="w-full px-10 py-8 space-y-12">
      <HotelCardSwiper hotels={parisHotels} title="Popular Homes in Paris" />
      <HotelCardSwiper hotels={londonHotels} title="Stay in London" />
      <HotelCardSwiper hotels={tokyoHotels} title="Places to stay in Tokyo" />
      <HotelCardSwiper hotels={seoulHotels} title="Homes in Seoul" />
    </div>
  )
}

export default Home