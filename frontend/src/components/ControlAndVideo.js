import React, { useState } from 'react';
import { FaArrowUp, FaArrowDown, FaArrowLeft, FaArrowRight, FaRobot, FaStop, FaPlay, FaPause } from 'react-icons/fa';
import { motion } from 'framer-motion';
import ReactPlayer from 'react-player';
import Header from './Header';

const ControlAndVideo = () => {
  const [speed, setSpeed] = useState(50);
  const [isAutonomous, setIsAutonomous] = useState(false);
  const videoUrl = 'https://yutu.be/jjCg3jFLBuw?si=vFKffyvM8f-';

  const handleControl = (command) => {
    if (isAutonomous) {
      console.log('Autonomous mode is active. Control commands are ignored.');
      return;
    }
    console.log(command); // Example placeholder for actual command logic
  };

  const toggleMode = () => {
    setIsAutonomous(!isAutonomous);
  };

  return (
    <div
      className="relative flex flex-col min-h-screen bg-[#121a21] dark group/design-root overflow-x-hidden"
      style={{
        fontFamily: 'Inter, "Noto Sans", sans-serif',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="layout-container flex h-full grow flex-col bg-black bg-opacity-50">
        <Header title="Robot Control and Video Feed" />

        {/* Combined Headings */}
        <div className="text-center mb-0">
          <p className="text-white tracking-light text-[32px] font-bold leading-tight">
            Robot Control & Live Video Feed
          </p>
          <p className="text-[#95b0c6] text-sm font-normal leading-normal">
            Control your robot and monitor the pipeline in real-time
          </p>
        </div>

        <div className="flex flex-1 flex-col lg:flex-row">

          {/* Navigation Mode, Autonomous and Manual Mode Toggle */}
          <div className="flex flex-col items-center py-5 px-4 lg:px-10">
            <motion.div
              className="p-6 bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 rounded-lg shadow-xl"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              {/* Horizontal Layout */}
              <div className="flex flex-row items-center justify-center space-x-4">
                <h2 className="text-2xl font-bold mt-0 flex items-center text-white">
                  <FaRobot className="mr-2" /> Navigation Mode
                </h2>
                
                {/* Autonomous/Manual Toggle Buttons */}
                <div className="flex flex-row space-x-4">
                  <button
                    className={`flex items-center justify-center bg-${isAutonomous ? 'green' : 'blue'}-600 hover:bg-${isAutonomous ? 'green' : 'blue'}-800 text-white font-bold py-2 px-4 rounded-full`}
                    onClick={toggleMode}
                  >
                    {isAutonomous ? <FaPause className="mr-2" /> : <FaPlay className="mr-2" />}
                    {isAutonomous ? 'Autonomous Mode' : 'Manual Mode'}
                  </button>
                </div>
              </div>

              {!isAutonomous && (
                <div className="p-6 bg-gray-800 rounded-lg shadow-xl w-full mt-6">
                  <h2 className="text-2xl font-bold mb-6 flex items-center text-white">
                    <FaRobot className="mr-2" /> Controls
                  </h2>

                  <div className="flex flex-col items-center gap-6 mb-6">
                    <div className="flex flex-col items-center gap-4">
                      <button
                        className="flex items-center justify-center bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-full"
                        onClick={() => handleControl('Forward')}
                      >
                        <FaArrowUp className="mr-2" /> Forward
                      </button>
                      <div className="flex justify-around w-full">
                        <button
                          className="flex items-center justify-center bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-full"
                          onClick={() => handleControl('Left')}
                        >
                          <FaArrowLeft className="mr-2" /> Left
                        </button>
                        <button
                          className="flex items-center justify-center bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded-full"
                          onClick={() => handleControl('Stop')}
                        >
                          <FaStop className="mr-2" /> Stop
                        </button>
                        <button
                          className="flex items-center justify-center bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-full"
                          onClick={() => handleControl('Right')}
                        >
                          <FaArrowRight className="mr-2" /> Right
                        </button>
                      </div>
                      <button
                        className="flex items-center justify-center bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-full"
                        onClick={() => handleControl('Backward')}
                      >
                        <FaArrowDown className="mr-2" /> Backward
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col items-center">
                    <label className="mb-4 font-bold text-lg text-white">Speed: {speed}</label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={speed}
                      onChange={(e) => setSpeed(e.target.value)}
                      className="w-full"
                    />
                  </div>
                </div>
              )}
            </motion.div>
          </div>

          {/* Video Stream Section */}
          <div className="flex flex-1 items-center justify-center py-5 lg:px-10">
            <div className="w-full max-w-4xl px-4">
              <div className="flex flex-col items-center">
                <div className="aspect-w-16 aspect-h-9">
                  <ReactPlayer
                    url={videoUrl}
                    playing={true}
                    controls={true}
                    width="100%"
                    height="100%"
                    className="rounded-lg shadow-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ControlAndVideo;
