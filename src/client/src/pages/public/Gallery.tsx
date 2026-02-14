import React from 'react';
import type { Events, ListApiResponse } from '@/types/types';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchEvents } from '@/apis/events';
import { useNavigate } from 'react-router-dom';
import PublicGallerySkelton from './Skeltons/PublicGallerySkelton';
export const Gallery: React.FC = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const {
    data: eventList,
    isLoading,
    error,
  } = useQuery<ListApiResponse<Events>>({
    queryKey: ["events"],
    queryFn: fetchEvents
  })
  if (isLoading) {
    return <PublicGallerySkelton count={6}/>
  }
  if (error) {
    return <p>{`Event Error :${error}`}</p>
  }
  const handleViewList = (event: Events) => {
    queryClient.setQueryData(["event", event.id], event)
    navigate(`/event/${event.id}`);
  }
  if (eventList && eventList?.data) {
    // {(eventList.data).map(()=>{
    return (
      <div className="bg-white dark:bg-slate-950 py-20 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-black text-[#000080] dark:text-white">TRAINING IN ACTION</h1>
            <p className="mt-4 text-gray-600 dark:text-gray-300">Glimpses of the sweat, grind, and glory at Sardarewala Academy.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {(eventList.data).map((src, idx) => (
              <div key={idx} className="group relative aspect-square overflow-hidden border-2 rounded-lg cursor-pointer bg-gray-100 dark:bg-slate-800 ">
                <img
                  src={src.image_url}
                  alt={`Gallery ${idx}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button onClick={() => {
                    handleViewList(src)
                  }} >
                    <span className="text-white font-bold border-2 border-[#FF9933] px-4 py-2 rounded uppercase tracking-wider">View</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
    // })}
  }
};