import React from 'react'
import { useParams } from 'react-router-dom';
function ExperiencesDetailPage() {
   const { id } = useParams();
    return <div className="text-3xl">Service Detail Page for ID: {id}</div>;
}

export default ExperiencesDetailPage
