'use client'
import React, { useEffect, useRef } from 'react';
import 'leaflet/dist/leaflet.css';
import * as L from 'leaflet'; // Import all components from Leaflet
const DEFAULT_ZOOM = 2;
const DEFAULT_CENTER = { lat: 0, lng: 0 };
const TILES_URL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'; // Replace with offline tiles if needed

const Map = ({ resellers, onMapClick }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    const map = new L.map('map-container').setView(DEFAULT_CENTER, DEFAULT_ZOOM);

    // Use OpenStreetMap tiles for online usage
    const tiles = new L.tileLayer(TILES_URL, {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors - 0xe'
    });
    tiles.addTo(map);

    // Alternatively, use pre-downloaded offline tiles for offline usage
    // You can find resources for offline tiles online

    resellers.forEach((reseller) => {
      const marker = L.marker([reseller.lat, reseller.lng]).addTo(map);
      marker.bindPopup(`<p>${reseller.name}</p>`);
      marker.on('click', (e) => onMapClick(e.latlng.lat, e.latlng.lng));
    });

    mapRef.current = map;

    return () => {
      map.remove();
    };
  }, [resellers, onMapClick]);

  return (
    <div className="h-full">
      <div id="map-container" style={{ height: '100%' }} />
      <button onClick={() => mapRef.current.setView(DEFAULT_CENTER, DEFAULT_ZOOM)}>
        Center Map
      </button>
    </div>
  );
};

export default Map;
