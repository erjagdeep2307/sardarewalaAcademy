// import React, { useState, useEffect } from 'react';
import {motion} from 'motion/react';
import { ChevronRight, Award, Users, Timer, Target} from 'lucide-react';
import { Button } from '@/components/UI/Button';
import { Link } from 'react-router-dom';
import Slider from '@/components/UI/Slider';
import type {Testomonial } from '@/types/types';
import { useQuery } from '@tanstack/react-query';
import { fetcthTestomonials } from '@/apis/testomonials';


const stats = [
  { label: 'Students Trained', value: '5,000+', icon: Users, color: 'text-[#FF9933]' },
  { label: 'Selections', value: '1,200+', icon: Award, color: 'text-[#138808]' },
  { label: 'Years Experience', value: '15+', icon: Timer, color: 'text-[#000080] dark:text-blue-400' },
  { label: 'Success Rate', value: '98%', icon: Target, color: 'text-[#FF9933]' },
];

const testimonials:Testomonial[] = [
  {
    id: 1,
    name: "Vikram Singh",
    role: "Selected - Indian Army (GD)",
    content: "The discipline at Sardarewala is unlike anywhere else. The early morning drills and the obstacle course helped me clear my physical in the first attempt. Jai Hind!",
    image: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=155&h=155&fm=webp&fit=crop&q=80"
  },
  {
    id: 2,
    name: "Gurpreet Kaur",
    role: "Punjab Police Constable",
    content: "I was struggling with my 1600m timing. The coaches here analyzed my running form and improved my stamina within 2 months. I owe my uniform to this academy.",
    image: "https://images.unsplash.com/photo-1623091410901-00e2d5b68181?w=155&h=155&fm=webp&fit=crop&q=80"
  },
  {
    id: 3,
    name: "Rahul Verma",
    role: "National Athlete (400m)",
    content: "From a village runner to a National level athlete, the journey was tough but the guidance here was world-class. The diet plans and gym sessions are excellent.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=155&h=155&fm=webp&fit=crop&q=80"
  },
  {
    id: 4,
    name: "Amit Chaudhary",
    role: "CISF Sub-Inspector",
    content: "The mock physical tests conducted every Saturday gave me the confidence to face the actual recruitment day without fear. Highly recommended!",
    image: "https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?w=155&h=155&fm=webp&fit=crop&q=80"
  }
];

export const Home: React.FC = () => {
  const {data,isLoading} =  useQuery({
    queryKey:['testomonials'],
    queryFn:fetcthTestomonials
  });
   return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative h-[600px] md:h-[800px] flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://img.youtube.com/vi/teG5f15mdKg/maxresdefault.jpg"
            alt="Indian Army Recruitment Training"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#000080]/90 via-[#000080]/60 to-transparent dark:from-slate-900/90 dark:via-slate-900/70" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl space-y-6"
          >
            <div className="inline-block bg-[#FF9933] px-4 py-1 text-xs font-bold uppercase tracking-widest mb-2 rounded-sm">
              Training Champions. Inspiring Discipline
            </div>
            <h1 className="text-5xl md:text-7xl font-black leading-tight">
              BUILD YOUR <span className="text-[#FF9933]">LEGACY</span> <br />
              SERVE THE <span className="text-[#138808]">NATION</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 font-light max-w-2xl">
              Your path to Army, Police, and Sports excellence starts here.
              Sardarewala Physical Training Academy trains you to convert discipline into power.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link to="/programs">
                <Button size="lg" variant="primary" className="w-full sm:w-auto">
                  EXPLORE PROGRAMS
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-[#000080] dark:hover:text-slate-900">
                  BOOK A TRIAL
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 relative -mt-16 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 bg-white dark:bg-slate-800 rounded-xl shadow-xl p-8 border-b-4 border-[#138808] transition-colors duration-300">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center space-y-2">
                <stat.icon className={`w-8 h-8 mx-auto ${stat.color}`} />
                <div className="text-3xl md:text-4xl font-black text-slate-800 dark:text-white">{stat.value}</div>
                <div className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-20 bg-gray-50 dark:bg-slate-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-[#FF9933] rounded-tl-3xl opacity-20" />
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-[#138808] rounded-br-3xl opacity-20" />
              <img
                src="https://images.unsplash.com/photo-1605296867304-46d5465a13f1?q=80&fm=webp&w=500&auto=format&fit=crop"
                alt="Wrestling and Traditional Indian Training"
                className="relative rounded-lg shadow-2xl w-full object-cover h-[500px]"
              />
            </div>
            <div className="space-y-6">
              <h2 className="text-4xl font-black text-[#000080] dark:text-white">WHY CHOOSE SARDAREWALA?</h2>
              <div className="w-20 h-1.5 bg-[#FF9933]" />
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                We don't just train bodies; we mould character. Our academy specializes in preparing candidates for the Indian Armed Forces and State Police services. With a scientifically designed curriculum and discipline at our core, we ensure you are ready for any challenge.
              </p>
              <ul className="space-y-4">
                {[
                  "Expert Trainers from Ex-Defence Backgrounds",
                  "Scientific Approach to Endurance Building",
                  "Nutrition and Diet Guidance",
                  "Regular Assessment and Mock Tests"
                ].map((item, i) => (
                  <li key={i} className="flex items-center space-x-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#138808]/10 dark:bg-[#138808]/20 flex items-center justify-center">
                      <ChevronRight className="w-4 h-4 text-[#138808] dark:text-green-400" />
                    </div>
                    <span className="font-medium text-gray-700 dark:text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
              <Link to="/about">
                <Button variant="navy" className="mt-4">READ MORE ABOUT US</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Slider */}
      <section className="py-20 bg-white dark:bg-slate-950 overflow-hidden transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-[#FF9933] font-bold tracking-widest uppercase mb-3">Success Stories</h2>
            <h1 className="text-4xl md:text-5xl font-black text-[#000080] dark:text-white">WALL OF FAME</h1>
            <div className="w-24 h-1 bg-[#138808] mx-auto mt-6 rounded-full"></div>
          </div>
          <Slider data={(data?.data)?data.data:[] } isLoading={isLoading} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#000080] dark:bg-blue-950 text-white text-center transition-colors duration-300">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-black mb-6">READY TO PUSH YOUR LIMITS?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Join the batch starting next Monday. Limited seats available for the upcoming recruitment drive training.
          </p>
          <Link to="/contact">
            <Button size="lg" variant="primary" className="text-lg px-12">
              START REGISTRATION
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};