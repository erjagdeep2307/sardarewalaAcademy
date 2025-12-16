import React, { useState} from 'react';
import { Trash2 } from 'lucide-react';
// import { ImageUpload } from '../../../components/admin/ImageUploader';
// import { Button } from '../../../components/UI/Button';

// Mock initial data
const initialImages = [
    "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?q=80&w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?q=80&w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1552674605-5d226a5beb38?q=80&w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1574680096141-1cddd32e24d7?q=80&w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=400&h=400&fit=crop",
];

export const AdminGalleryView: React.FC = () => {
    const [images, setImages] = useState(initialImages);
    // const eventTitleRef = useRef<HTMLInputElement>(null);
    // const [isUploading, setIsUploading] = useState(false);
    // const evtTitleHandler = (event: React.FormEvent<HTMLInputElement>) => {
    //     if (eventTitleRef.current) {
    //         eventTitleRef.current.value = event.currentTarget.value.toUpperCase();
    //     }   
    // }

    // const processUpload = (file: File) => {
    //     setIsUploading(true);
    //     // Simulate network delay and upload
    //     setTimeout(() => {
    //         const reader = new FileReader();
    //         reader.onload = (e) => {
    //             if (e.target?.result) {
    //                 setImages([e.target.result as string, ...images]);
    //                 setIsUploading(false);
    //             }
    //         };
    //         reader.readAsDataURL(file);
    //     }, 1500);
    // };

    const handleDelete = (index: number) => {
        const newImages = images.filter((_, i) => i !== index);
        setImages(newImages);
    };

    return (        
            <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-gray-100 dark:border-slate-800 p-6">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="font-bold text-gray-800 dark:text-white text-lg">Uploaded Images ({images.length})</h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {images.map((src, idx) => (
                        <div key={idx} className="group relative aspect-square rounded-xl overflow-hidden bg-gray-100 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all">
                            <img src={src} alt={`Gallery ${idx}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                                <button
                                    onClick={() => handleDelete(idx)}
                                    className="p-3 bg-red-600 rounded-full text-white hover:bg-red-700 transition-all transform hover:scale-110 shadow-lg"
                                    title="Delete Image"
                                >
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
    );
};