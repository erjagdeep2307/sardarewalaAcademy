
import { fetchEventById } from "@/apis/events";
import type { EventByIdResponse} from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import React from "react"
import { useParams } from "react-router-dom"
export const Event: React.FC = () => {
    const {eventId} = useParams(); 
    console.log(`Event id ${eventId}`);
    const {
        data:eventData,
        isLoading,
        error    
    } =  useQuery<EventByIdResponse>({
        queryKey:["event",eventId],
        queryFn: () => fetchEventById(eventId!)
    });
    if(isLoading)
    {
        return <p>Loading Data </p>
    }
    if(error)
    {
        return <p>{`Got An error:${error}`}</p>
    }
    if(eventData?.data)
    {
        return (
            <div className="bg-white dark:bg-slate-950 py-20 transition-colors duration-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-10">
                        <h1 className="text-4xl font-black text-[#000080] dark:text-white">{eventData?.data.title}</h1>
                        <p className="mt-4 text-gray-600 dark:text-gray-300">{(eventData?.data?.slug)?(eventData?.data?.slug)?.toUpperCase():""}</p>
                    </div>
    
                    <div className="grid grid-cols-1 place-items-center">
                        <div className="group relative aspect-square overflow-hidden rounded-lg bg-gray-100 dark:bg-slate-800">
                            <img
                            src={eventData?.data.image_url}
                            alt="Gallery"
                            className="w-full h-full object-cover"
                            />
                        </div>
                        </div>

                    <div className="text-center mb-6 mt-6">
                        <p>{eventData?.data.full_description}</p>
                    </div>
                </div>
            </div>
        )
    }
}
