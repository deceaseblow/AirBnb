import React from 'react'
import { useEffect, useState } from 'react'
import {
  getExperiencesTbilisi,
  getExperiencesRome,
  getExperiencesFatih
} from '../services/experiencesService'
import ExperienceCardSwiper from '../components/ExperienceCardSwiper'
function Experiences() {
  const [tbilisiExperiences, setTbilisiExperiences] = useState([])
  const [romeExperiences, setRomeExperiences] = useState([])
  const [fatihExperiences, setFatihExperiences] = useState([])
  useEffect(() => {
    getExperiencesTbilisi().then(setTbilisiExperiences)
    getExperiencesRome().then(setRomeExperiences)
    getExperiencesFatih().then(setFatihExperiences)
  }, [])
  return (
    <div className='w-full px-10 py-8 space-y-12'>
      <ExperienceCardSwiper experiences={tbilisiExperiences} title="Experiences in Tbilisi" />
      <ExperienceCardSwiper experiences={romeExperiences} title="Experiences in Rome" />
      <ExperienceCardSwiper experiences={fatihExperiences} title="Experiences in Fatih"/>
    </div>
  )
}

export default Experiences
