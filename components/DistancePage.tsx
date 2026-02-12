
import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Heart, ChevronRight } from 'lucide-react';

// Coordinate constants
const MY_COORDS: [number, number] = [10.3065, 123.9485]; // Cebu
const HER_COORDS: [number, number] = [22.9691, 120.2458]; // Tainan

interface DistancePageProps {
  onNext: () => void;
}

export const DistancePage: React.FC<DistancePageProps> = ({ onNext }) => {
  const [distance, setDistance] = useState<number | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const leafletInstance = useRef<any>(null);

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return Math.round(R * c);
  };

  useEffect(() => {
    const d = calculateDistance(MY_COORDS[0], MY_COORDS[1], HER_COORDS[0], HER_COORDS[1]);
    setDistance(d);

    if (mapRef.current && !leafletInstance.current) {
      // Initialize Leaflet map
      const L = (window as any).L;
      if (!L) return;

      const map = L.map(mapRef.current, {
        zoomControl: false,
        attributionControl: false,
        scrollWheelZoom: true,
        doubleClickZoom: true,
        touchZoom: true,
        dragging: true,
      }).setView([16.6, 122.1], 4);

      // Soft/Pastel Tile Layer (CartoDB Positron)
      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        maxZoom: 19,
        minZoom: 3,
      }).addTo(map);

      // Custom Heart Icon
      const createHeartIcon = (color: string) => L.divIcon({
        html: `<div class="heart-marker"><svg width="32" height="32" viewBox="0 0 24 24" fill="${color}" stroke="white" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l8.78-8.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg></div>`,
        className: 'custom-div-icon',
        iconSize: [32, 32],
        iconAnchor: [16, 16],
      });

      // Markers
      L.marker(HER_COORDS, { icon: createHeartIcon('#f43f5e') }).addTo(map)
        .bindTooltip("書雅 ở Tainan", { permanent: true, direction: 'top', className: 'font-bold text-rose-500' });
      
      L.marker(MY_COORDS, { icon: createHeartIcon('#0ea5e9') }).addTo(map)
        .bindTooltip("浩然 ở Cebu", { permanent: true, direction: 'bottom', className: 'font-bold text-sky-500' });

      // Curved Line
      const latlngs = [];
      const steps = 100;
      const offsetX = 8;
      const midLat = (MY_COORDS[0] + HER_COORDS[0]) / 2;
      const midLng = (MY_COORDS[1] + HER_COORDS[1]) / 2 + offsetX;

      for (let i = 0; i <= steps; i++) {
        const t = i / steps;
        const lat = (1 - t) * (1 - t) * MY_COORDS[0] + 2 * (1 - t) * t * midLat + t * t * HER_COORDS[0];
        const lng = (1 - t) * (1 - t) * MY_COORDS[1] + 2 * (1 - t) * t * midLng + t * t * HER_COORDS[1];
        latlngs.push([lat, lng]);
      }

      L.polyline(latlngs, {
        color: '#f43f5e',
        weight: 3,
        dashArray: '10, 10',
        opacity: 0.8,
        lineCap: 'round'
      }).addTo(map);

      // Distance Label
      const labelPos: [number, number] = [midLat, midLng];
      L.marker(labelPos, {
        icon: L.divIcon({
          className: 'custom-label-icon',
          html: `<div class="distance-label"><s>Khoảng cách: ${d} km</s> <br/> <span class="text-rose-600">Đủ gần để yêu em.</span></div>`,
          iconSize: [200, 60],
          iconAnchor: [100, 30]
        })
      }).addTo(map);

      const bounds = L.latLngBounds([MY_COORDS, HER_COORDS, [midLat, midLng + 2]]);
      map.fitBounds(bounds, { padding: [80, 80] });

      leafletInstance.current = map;
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-4 w-full max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-3">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-romantic font-bold text-rose-600"
        >
          Love Knows No Distance
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-stone-500 italic text-lg"
        >
          Dù Tainan hay Cebu, khoảng cách chỉ là những con số...
        </motion.p>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="relative w-full aspect-video md:aspect-[21/9] bg-white rounded-[2.5rem] border-8 border-white shadow-2xl overflow-hidden"
      >
        <div ref={mapRef} className="w-full h-full z-10" />
        <div className="absolute top-4 right-4 z-20">
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-lg"
          >
            <Heart fill="#f43f5e" className="text-transparent w-6 h-6" />
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="text-center max-w-xl bg-white/50 backdrop-blur-sm p-6 rounded-3xl border border-rose-100 shadow-sm"
      >
        <p className="text-stone-600 leading-relaxed font-medium text-lg">
          "Khoảng cách địa lý có thể ngăn cản chúng ta gặp nhau mỗi ngày, nhưng nó không bao giờ có thể ngăn cản tình yêu anh dành cho em."
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2 }}
        className="flex flex-col items-center gap-4"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onNext}
          className="group bg-rose-500 hover:bg-rose-600 text-white flex items-center gap-4 text-xl md:text-2xl font-romantic font-bold py-5 px-12 rounded-full shadow-2xl"
        >
          Tiếp tục tới bất ngờ cuối cùng <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
        </motion.button>
        <span className="text-rose-400 text-sm font-bold tracking-widest uppercase">Something Special is Waiting</span>
      </motion.div>
    </div>
  );
};
