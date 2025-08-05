import React from 'react'
import { useParams } from 'react-router-dom';
import MobileFooter from '../components/MobileFooter';
function ExperiencesDetailPage() {
    const { id } = useParams();
    return <div className="text-3xl">
        Service Detail Page for ID: {id}
        <div className="block md:hidden">
            <MobileFooter />
        </div>
    </div>
        ;
}

export default ExperiencesDetailPage
