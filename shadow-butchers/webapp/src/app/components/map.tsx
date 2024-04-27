'use client'
import React, { useEffect, useRef } from 'react';
let L: any;
if (typeof window !== 'undefined') {
    L = require('leaflet');
    require('leaflet/dist/leaflet.css');
}

const DEFAULT_ZOOM = 2;
const DEFAULT_CENTER = { lat: 0, lng: 0 };
const TILES_URL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'; // Replace with offline tiles if needed



type MapProps = {
  resellers: Reseller[];
}

const Map: React.FC<MapProps> = ({ resellers }) => {
  const mapRef = useRef<L.Map | null>(null); // Specify the type as RefObject<L.Map | null>
  useEffect(() => {
    const map: L.Map = new L.Map('map-container').setView(DEFAULT_CENTER, DEFAULT_ZOOM);
    // Use OpenStreetMap tiles for online usage
    const tiles: L.TileLayer = L.tileLayer(TILES_URL, {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors - 0xe'
  });
    tiles.addTo(map);
    var emojiIcon = L.divIcon({
      className: 'leaflet-div-icon',
      html: '<span>📍</span>', // Emoji here
      iconSize: [15, 22]
    });
    resellers.forEach((reseller: { lat: any; lng: any; name: any; }) => {
      const marker = L.marker([reseller.lat, reseller.lng], { icon: emojiIcon }).addTo(map);
      marker.bindPopup(`<p>🥩 ${reseller.name}</p>`);
    });

    mapRef.current = map;

    return () => {
      map.remove();
    };
  }, [resellers]);

  return (
    <div className="h-full">
      <div id="map-container" style={{ height: '100%' }} />
      <button onClick={() => mapRef.current?.setView(DEFAULT_CENTER, DEFAULT_ZOOM)}
        className='text-black dark:text-stone-600 bg-white dark:bg-stone-400 p-2 rounded-md w-1/2 mx-auto focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent'
      >
        Center Map
      </button>
    </div>
  );
};

export default Map;
