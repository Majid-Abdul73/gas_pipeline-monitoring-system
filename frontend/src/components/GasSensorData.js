import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import supabase from '../utils/supabaseClient';
import Header from '../components/Header';

const GasSensors = () => {
  const [gasData, setGasData] = useState({
    methane: 0.0,
    propane: 0.0,
    carbon_monoxide: 0.0,
    lpg: 0.0
  });

  // Fetch data from Supabase
  useEffect(() => {
    const fetchGasData = async () => {
      try {
        const { data, error } = await supabase
          .from('gas_pipeline')
          .select('methane, propane, carbon_monoxide, lpg, created_at')
          .order('created_at', { ascending: false })
          .limit(1);

        if (error) throw error;

        if (data && data.length > 0) {
          const latestData = data[0];
          setGasData({
            methane: latestData.methane || 0.0,
            propane: latestData.propane || 0.0,
            carbon_monoxide: latestData.carbon_monoxide || 0.0,
            lpg: latestData.lpg || 0.0
          });
        }
      } catch (error) {
        console.error('Error fetching gas data:', error.message);
      }
    };

    fetchGasData();

    // Set up real-time subscription for gas pipeline data
    const channel = supabase
      .channel('custom-gas-channel')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'gas_pipeline' }, (payload) => {
        const newData = payload.new;
        setGasData({
          methane: newData.methane || 0.0,
          propane: newData.propane || 0.0,
          carbon_monoxide: newData.carbon_monoxide || 0.0,
          lpg: newData.lpg || 0.0
        });
      })
      .subscribe();

    // Clean up the subscription on component unmount
    return () => {
      supabase.removeChannel(channel);
    };
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
        <Header title="Gas Sensor Data" />
        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <motion.div
              className="flex flex-wrap justify-between gap-3 p-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }} // Reduced duration
            >
              <div className="flex min-w-72 flex-col gap-3">
                <p className="text-white tracking-light text-[32px] font-bold leading-tight">Gas Concentrations</p>
                <p className="text-[#95b0c6] text-sm font-normal leading-normal">
                  Methane, Propane, Carbon Monoxide, LPG
                </p>
              </div>
            </motion.div>
            <div className="flex flex-wrap gap-4 p-4">
              <motion.div
                className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-xl p-6 border border-[#364f63]"
                style={{ backgroundColor: '#d0f0c0' }} // Light green for Methane
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }} // Reduced duration
              >
                <p className="text-black text-base font-medium leading-normal">Methane</p>
                <p className="text-black tracking-light text-2xl font-bold leading-tight">{gasData.methane} ppm</p>
              </motion.div>
              <motion.div
                className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-xl p-6 border border-[#364f63]"
                style={{ backgroundColor: '#ffebcd' }} // Light beige for Propane
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }} // Reduced duration
              >
                <p className="text-black text-base font-medium leading-normal">Propane</p>
                <p className="text-black tracking-light text-2xl font-bold leading-tight">{gasData.propane} ppm</p>
              </motion.div>
              <motion.div
                className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-xl p-6 border border-[#364f63]"
                style={{ backgroundColor: '#add8e6' }} // Light blue for Carbon Monoxide
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }} // Reduced duration
              >
                <p className="text-black text-base font-medium leading-normal">Carbon Monoxide</p>
                <p className="text-black tracking-light text-2xl font-bold leading-tight">{gasData.carbon_monoxide} ppm</p>
              </motion.div>
              <motion.div
                className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-xl p-6 border border-[#364f63]"
                style={{ backgroundColor: '#ffcccb' }} // Light red for LPG
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }} // Reduced duration
              >
                <p className="text-black text-base font-medium leading-normal">LPG</p>
                <p className="text-black tracking-light text-2xl font-bold leading-tight">{gasData.lpg} ppm</p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GasSensors;
