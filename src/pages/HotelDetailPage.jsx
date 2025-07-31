import React from 'react';
import { useParams } from 'react-router-dom';
import { useAllData } from '../contexts/AllDataContext';
import HotelDetail from './HotelDetail';

const HotelDetailPage = () => {
  const { id } = useParams();
  const { findItemById, loading, error, refreshData } = useAllData();

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <HotelDetail 
      hotelId={id}
      findItemById={findItemById}
      loading={loading}
      error={error}
      onRetry={refreshData}
    />
  );
};

export default HotelDetailPage;