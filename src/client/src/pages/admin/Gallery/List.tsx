import React from 'react';
import { Trash2 } from 'lucide-react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteEventById, fetchEvents } from '@/apis/events';
import type {EventListResponse } from '@/types/types';
import AdminGallerySkeleton from '../Skeltons/AdminGallerySkeleton';
// import { ImageUpload } from '../../../components/admin/ImageUploader';
// import { Button } from '../../../components/UI/Button';

export const AdminGalleryView: React.FC = () => {

    const queryClient  = useQueryClient();
    const {mutate,isPending} = useMutation({
        mutationFn:deleteEventById,
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:["events"]});
        }

    });

    const {
        data:events,
        isLoading,
        isError,
        error
    } = useQuery<EventListResponse>({
        queryKey:["events"],
        queryFn:fetchEvents
    });
    if(isLoading)
    {
        return <AdminGallerySkeleton count={6}/>;
    }
    if(isError)
    {
        return <p>{`Got an ${error}`}</p>;
    } 
   
    const handleDelete = (eventid: string) => {
        mutate(eventid);
    };
    if(events?.data)
    {
        return (              
                <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-gray-100 dark:border-slate-800 p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold text-gray-800 dark:text-white text-lg">Uploaded Images ({events?.data?.length})</h3>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                        {(events.data).map((src, idx) => (
                            <div key={idx} className="group relative aspect-square rounded-xl overflow-hidden bg-gray-100 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all">
                                <img src={src.image_url} alt={`Gallery ${idx}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                                    <button
                                        onClick={() => handleDelete(src.id)}
                                        className="p-3 bg-red-600 rounded-full text-white hover:bg-red-700 transition-all transform hover:scale-110 shadow-lg"
                                        title="Delete Image"
                                    >
                                        {isPending ? "Deleting..." : <Trash2 className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
        );
    }
};