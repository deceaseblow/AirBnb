import React, { useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useAllData } from '../contexts/AllDataContext';
import { useEffect } from 'react';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

const FitBounds = ({ positions }) => {
  const map = useMap();
  useMemo(() => {
    if (positions.length === 1) {
      map.setView(positions[0], 14);
    } else {
      const bounds = L.latLngBounds(positions);
      map.fitBounds(bounds, { padding: [20, 20] });
    }
  }, [positions, map]);
  return null;
};

const CustomZoomControl = () => {
  const map = useMap();

  useEffect(() => {
    const zoomControl = L.control.zoom({ position: 'topright' });
    zoomControl.addTo(map);

    return () => {
      zoomControl.remove();
    };
  }, [map]);

  return null;
};

const createPriceIcon = (price) => {
  return L.divIcon({
    className: 'custom-price-marker',
    html: `<div class="price-bubble">$${price}</div>`,
    iconSize: [60, 30],
    iconAnchor: [30, 15],
  });
};

const MapComponent = ({ results, searched }) => {
  const { findItemById } = useAllData();

  const validLocations = (results || [])
    .map(item => {
      const fullItem = findItemById(item?.id);
      const loc = fullItem?.location?.coordinates;
      if (!loc) return null;

      // Check if ID starts with 1, 2, 3, or 4 to determine which price field to use
      const itemId = String(item?.id || '');
      const startsWithHomeId = itemId.startsWith('1') || itemId.startsWith('2') || itemId.startsWith('3') || itemId.startsWith('4');
      
      const price = startsWithHomeId 
        ? fullItem?.price_per_night 
        : fullItem?.price_per_person;

      return {
        id: item.id,
        name: fullItem?.name || item.name || 'Unknown',
        address: fullItem?.location?.address || 'No address',
        price: typeof price === 'number' ? price : 'N/A',
        lat: parseFloat(loc.lat),
        lng: parseFloat(loc.lng),
      };
    })
    .filter(Boolean);

  if (validLocations.length === 0) {
    return (
      <div className="w-full h-full bg-gray-100 flex items-center justify-center">
        <p className="text-gray-500">No valid locations to display on map.</p>
      </div>
    );
  }

  const markerPositions = validLocations.map(loc => [loc.lat, loc.lng]);

  return (
    <>
      <MapContainer
        center={markerPositions[0]}
        zoom={19}
        scrollWheelZoom
        zoomControl={false}
        className="w-full h-full"
      >
        <CustomZoomControl />
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <FitBounds positions={markerPositions} />
        {validLocations.map(loc => (
          <Marker
            key={loc.id}
            position={[loc.lat, loc.lng]}
            icon={createPriceIcon(loc.price)}
          >
            <Popup>
              <div className="min-w-[160px]">
                <strong>{loc.name}</strong><br />
                {loc.address}<br />
                <span className="text-pink-600 font-bold">
                  ${loc.price}
                </span>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      <style>
        {`
          .price-bubble {
            background: white;
            border-radius: 9999px;
            padding: 4px 5px;
            font-weight: bold;
            color: black;
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
            white-space: nowrap;

            display: flex;
            align-items: center;
            justify-content: center;
          }

              .leaflet-control-attribution {
                display: none !important;
              }

              
              .leaflet-control-zoom {
                border: none;
                border-radius: 30px;
                overflow: hidden;
                box-shadow: 0 2px 8px rgba(0,0,0,0.2);
              }
                .leaflet-top.leaflet-right {
            top: 50px !important; /* 👈 pushes the zoom control down */
          }

          .leaflet-control-zoom {
            border: none;
            border-radius: 30px;
            overflow: hidden;
            box-shadow: 0 2px 8px rgba(0,0,0,0.2);
          }
        `}
      </style>

    </>
  );
};

export default MapComponent;