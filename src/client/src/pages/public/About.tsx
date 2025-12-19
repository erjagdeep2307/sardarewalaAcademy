import React from 'react';
import { Target, Flag, Shield } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="bg-gray-50 dark:bg-slate-950 pb-20 transition-colors duration-300">
      {/* Header */}
      <div className="bg-[#000080] dark:bg-slate-900 text-white py-20 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-black mb-4">ABOUT THE ACADEMY</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">Founded on the principles of Honour, Duty, and Discipline.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10">
        <div className="bg-white dark:bg-slate-900 rounded-lg shadow-xl p-8 md:p-12 transition-colors duration-300">

          <div className="grid md:grid-cols-3 gap-12 text-center mb-16">
            <div className="p-6 border border-gray-100 dark:border-slate-800 rounded-xl hover:shadow-lg transition-all dark:bg-slate-800">
              <div className="w-16 h-16 bg-[#FF9933]/10 dark:bg-[#FF9933]/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="w-8 h-8 text-[#FF9933]" />
              </div>
              <h3 className="text-xl font-bold text-[#000080] dark:text-white mb-3">Our Mission</h3>
              <p className="text-gray-600 dark:text-gray-300">To empower Indian youth with the physical and mental strength required to serve the nation.</p>
            </div>
            <div className="p-6 border border-gray-100 dark:border-slate-800 rounded-xl hover:shadow-lg transition-all dark:bg-slate-800">
              <div className="w-16 h-16 bg-[#138808]/10 dark:bg-[#138808]/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Flag className="w-8 h-8 text-[#138808] dark:text-green-400" />
              </div>
              <h3 className="text-xl font-bold text-[#000080] dark:text-white mb-3">Our Vision</h3>
              <p className="text-gray-600 dark:text-gray-300">To be the leading physical training institute recognized for excellence and integrity.</p>
            </div>
            <div className="p-6 border border-gray-100 dark:border-slate-800 rounded-xl hover:shadow-lg transition-all dark:bg-slate-800">
              <div className="w-16 h-16 bg-[#000080]/10 dark:bg-blue-900/40 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-[#000080] dark:text-blue-300" />
              </div>
              <h3 className="text-xl font-bold text-[#000080] dark:text-white mb-3">Core Values</h3>
              <p className="text-gray-600 dark:text-gray-300">Discipline, Dedication, and Determination are the pillars of our training methodology.</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-[#000080] dark:text-white">From Humble Beginnings to National Excellence</h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Sardarewala Physical Training Academy was founded in 2024 by Rajwinder Singh, a highly respected athlete known across Punjab and Haryana for his exceptional running achievements. Having won numerous races and built a strong reputation in the athletic community, Rajwinder brings deep experience, discipline, and passion for physical training.
              </p>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                What began as a small effort to guide local youth has grown rapidly. Over the years, he has trained countless students—many of whom are now serving with pride in the Army, Police, and other uniformed forces. Along with defence aspirants, he has also coached numerous school athletes who have gone on to excel in district- and state-level competitions.
              </p>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">

                Today, Sardarewala Physical Training Academy continues to stand as a dedicated centre for professional physical training, helping young aspirants unlock their potential with the right guidance, discipline, and athletic knowledge.
              </p>

            </div>
            <div>
              <img src="https://img.youtube.com/vi/teG5f15mdKg/maxresdefault.jpg" className="rounded-lg shadow-lg border-4 border-white dark:border-slate-800 object-cover" alt="Academy History" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};