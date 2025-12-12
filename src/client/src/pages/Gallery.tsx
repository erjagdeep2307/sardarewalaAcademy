import React from 'react';

export const Gallery: React.FC = () => {
  const images = [
    "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?q=80&w=600&h=600&fit=crop", // Kushti/Wrestling
    "https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?q=80&w=600&h=600&fit=crop", // Group running
    "https://images.unsplash.com/photo-1552674605-5d226a5beb38?q=80&w=600&h=600&fit=crop", // Track run
    "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=600&h=600&fit=crop", // Sprint start
    "https://images.unsplash.com/photo-1574680096141-1cddd32e24d7?q=80&w=600&h=600&fit=crop", // Training
    "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=600&h=600&fit=crop", // Gym
    "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?q=80&w=600&h=600&fit=crop", // Ropes
    "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=600&h=600&fit=crop", // Abs
    "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=600&h=600&fit=crop"  // Weights
  ];

  return (
    <div className="bg-white dark:bg-slate-950 py-20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-black text-[#000080] dark:text-white">TRAINING IN ACTION</h1>
          <p className="mt-4 text-gray-600 dark:text-gray-300">Glimpses of the sweat, grind, and glory at Sardarewala Academy.</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((src, idx) => (
            <div key={idx} className="group relative aspect-square overflow-hidden rounded-lg cursor-pointer bg-gray-100 dark:bg-slate-800">
              <img 
                src={src} 
                alt={`Gallery ${idx}`} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-white font-bold border-2 border-[#FF9933] px-4 py-2 rounded uppercase tracking-wider">View</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};