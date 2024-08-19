import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Header from './Header'; 

const GPSData = () => {
  const [position, setPosition] = useState([5.75942, 0.31683]); // Default position (latitude, longitude)

  useEffect(() => {
    // Simulate fetching GPS data from your backend or hardware
    const fetchGPSData = () => {
      // Replace this with actual GPS data fetching logic
      const gpsData = { latitude: 5.75942, longitude: 0.31683 };
      setPosition([gpsData.latitude, gpsData.longitude]);
    };

    fetchGPSData();
  }, []);

  return (
    <div
      className="relative flex size-full min-h-screen flex-col bg-[#121a21] dark group/design-root overflow-x-hidden"
      style={{
        fontFamily: 'Inter, "Noto Sans", sans-serif',
        backgroundImage: 'url("https://images.unsplash.com/photo-1602079080437-55c3679e1ed3")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="layout-container flex h-full grow flex-col bg-black bg-opacity-50">
        <Header title="GPS" />

        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1 p-6">
            <header className="mb-0">
              <h1 className="text-2xl font-bold text-white">GPS Data</h1>
              <p className="text-gray-400">Real-time GPS location of the robot</p>
            </header>
            <div className="p-6 bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 rounded-lg shadow-xl">
              <MapContainer center={position} zoom={13} className="h-96 w-full rounded-lg">
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={position}>
                  <Popup>
                    Robot Location: <br /> {`Latitude: ${position[0]}, Longitude: ${position[1]}`}
                  </Popup>
                </Marker>
              </MapContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GPSData;
