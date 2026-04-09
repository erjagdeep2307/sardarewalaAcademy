import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { slugify } from "@/utils/utility";
import { Button } from "@/components/UI/Button";
import { useForm, useWatch } from "react-hook-form";
import { Trash2, X, Plus, Search, ImageIcon } from "lucide-react";
import type { Events,EventFormData,ListApiResponse} from "@/types/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createEvent, deleteEventById, fetchEvents } from "@/apis/events";
import AdminGallerySkeleton from "./Skeltons/AdminGallerySkeleton";

export const AdminGallery: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [idToDelete, setIdToDelete] = useState<string | null>(null);
    //React Form hook
    const { register, handleSubmit, formState: { errors }, reset, control, setValue } = useForm<EventFormData>();

    // Set a watch on eventTitle's value
    const titleValue = useWatch({
        control,
        name: "eventTitle"
    });

    // UseEffect to Change Slug According the Title value
    useEffect(() => {
        if (titleValue) {
            const slug = slugify(titleValue)
            setValue("eventSlug", slug, { shouldValidate: true })
        }
    }, [titleValue, setValue])

    const queryClient = useQueryClient();

    // Mutation for Delete
    const { mutate, isPending: isDeleting } = useMutation({
        mutationFn: deleteEventById,
        onMutate: (id) => {
            setIdToDelete(id)
        },
        onSuccess: () => {
            setIdToDelete(null);
            queryClient.invalidateQueries({ queryKey: ["events"] });
        },
    });

    // Mutation for Create
    const { mutate: handleCreate, isPending: isCreating } = useMutation({
        mutationFn: createEvent,
        onSuccess: (data) => {
            if (!data.success) {
                toast.warning(`${data.message}`);
                return;
            }
            queryClient.invalidateQueries({ queryKey: ["events"] });
            reset();
            setIsModalOpen(false);
            toast.success(`Event Created Successfully`);
        },
        onError: () => {
            toast.error(`Failed to Create the Event`);
        }
    })

    const {
        data: events,
        isLoading,
    } = useQuery<ListApiResponse<Events>>({
        queryKey: ["events"],
        queryFn: fetchEvents,
    });

    const handleDelete = (eventid: string) => {
        mutate(eventid);
    };

    //   Create Event Form Submit Handler
    const handleEventCreateSubmit = (data: EventFormData) => {
        const eventFormData = new FormData();
        eventFormData.append('title', data.eventTitle);
        eventFormData.append('slug', data.eventSlug);
        eventFormData.append('date', data.eventDate);
        eventFormData.append('location', data.location);
        eventFormData.append('featured', data.featured);
        eventFormData.append('description', data.description);
        if (data.event_image && data.event_image.length > 0) {
            eventFormData.append('event_image', data.event_image[0]);
        }
        handleCreate(eventFormData);
    }

    return (

        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center">
                        <ImageIcon className="w-6 h-6 mr-2 text-[#FF9933]" />
                        Gallery Management
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">Pubic Gallery Management (List,Create,Update and Delete Events).</p>
                </div>
                <div className="flex gap-3 w-full md:w-auto">
                    <div className="relative flex-1 md:flex-none">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search by name..."
                            className="pl-10 pr-4 py-2 border border-gray-300 dark:border-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-[#FF9933] w-full md:w-64 bg-white dark:bg-slate-900 dark:text-white text-sm"
                        />
                    </div>
                    <Button
                        className="bg-[#138808] whitespace-nowrap"
                        onClick={() => setIsModalOpen(true)}
                    >
                        <Plus className="w-4 h-4 mr-2" /> Add New
                    </Button>
                </div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-gray-100 dark:border-slate-800 p-6">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="font-bold text-gray-800 dark:text-white text-lg">
                        {events?.data?.length} Events Found.
                    </h3>
                </div>
                {isLoading ? <AdminGallerySkeleton count={6} /> : (
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                        {events && events?.data.map((src, idx) => (
                            <div
                                key={idx}
                                className="group relative aspect-square rounded-xl overflow-hidden bg-gray-100 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all"
                            >
                                <img
                                    src={src.image_url}
                                    alt={`Gallery ${idx}`}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                                    <button
                                        onClick={() => handleDelete(src.id)}
                                        className="p-3 bg-red-600 rounded-full text-white hover:bg-red-700 transition-all transform hover:scale-110 shadow-lg"
                                        title="Delete Image"
                                    >
                                        {(isDeleting && (idToDelete === src.id)) ? "Deleting..." : <Trash2 className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                {isModalOpen && (
                    <>
                        <div className="fixed inset-0 bg-black/60 flex items-start sm:items-center justify-center z-[60] p-4 sm:p-6 backdrop-blur-sm overflow-y-auto">
                           <div className="bg-white dark:bg-slate-900 rounded-xl shadow-2xl w-full max-w-xl border border-gray-100 dark:border-slate-800 max-h-[90dvh] flex flex-col overflow-hidden">
                                <div className="bg-[#000080] p-4 flex justify-between items-center text-white">
                                    <h3 className="font-bold flex items-center">
                                        Create New Event
                                    </h3>
                                    <button
                                        className="hover:bg-white/10 p-1 rounded-full transition-colors"
                                        disabled={isCreating}
                                        onClick={() => setIsModalOpen(false)}
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>

                                <form onSubmit={handleSubmit(handleEventCreateSubmit)} className="p-6 space-y-4 overflow-y-auto flex-1">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-1">
                                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Event Title</label>
                                            <input
                                                type="text"
                                                {...register("eventTitle", { required: "Event Title is required.", maxLength: { value: 100, message: "Title cannot exceed 100 characters." } })}
                                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#FF9933] focus:border-transparent outline-none dark:bg-slate-800 dark:text-white"
                                                placeholder="eg: District Zonal Games."
                                            />
                                            {errors.eventTitle && <p className="text-sm text-red-500 mt-1">{errors.eventTitle.message}</p>}
                                        </div>

                                        <div className="space-y-1">
                                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Event Slug</label>
                                            <input
                                                type="text"
                                                // RHF handles the ref internally, no manual ref needed
                                                {...register("eventSlug", { required: "Slug is required", maxLength: { value: 100, message: "Slug cannot exceed 100 characters" } })}
                                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#FF9933] focus:border-transparent outline-none dark:bg-slate-800 dark:text-white"
                                                readOnly // Ensure the user cannot edit the slug
                                            />
                                            {errors.eventSlug && <p className="text-sm text-red-500 mt-1">{errors.eventSlug.message}</p>}
                                        </div>

                                        <div className="space-y-1">
                                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Event Date</label>
                                            <input
                                                type="date"
                                                {...register("eventDate", { required: "Date is required" })}
                                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#FF9933] focus:border-transparent outline-none dark:bg-slate-800 dark:text-white"
                                            />
                                            {errors.eventDate && <p className="text-sm text-red-500 mt-1">{errors.eventDate.message}</p>}
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Location</label>
                                            <input
                                                type="text"
                                                {...register("location", { required: "Location is required", maxLength: { value: 150, message: "Location cannot exceed 150 characters" } })}
                                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#FF9933] focus:border-transparent outline-none dark:bg-slate-800 dark:text-white"
                                            />
                                            {errors.location && <p className="text-sm text-red-500 mt-1">{errors.location.message}</p>}
                                        </div>

                                        <div className="space-y-1">
                                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Featured</label>
                                            <select
                                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#FF9933] focus:border-transparent outline-none bg-white dark:bg-slate-800 dark:text-white"
                                                {...register("featured", { required: "Featured status is required" })}
                                            >
                                                <option value="Yes">Yes</option>
                                                <option value="No">No</option>
                                            </select>
                                            {errors.featured && <p className="text-sm text-red-500 mt-1">{errors.featured.message}</p>}
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Upload Image</label>
                                            <input
                                                type="file"
                                                accept='image/*'
                                                {...register("event_image", { required: 'Event Image is required' })} // No required validation needed here
                                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#FF9933] focus:border-transparent outline-none dark:bg-slate-800 dark:text-white"
                                            ></input>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Event Description</label>
                                        <textarea
                                            rows={4}
                                            {...register("description")} // No required validation needed here
                                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#FF9933] focus:border-transparent outline-none dark:bg-slate-800 dark:text-white"
                                            placeholder="Type the Event Description..."
                                        ></textarea>
                                    </div>
                                    <Button type="submit" variant="primary" disabled={isCreating} className="w-full">
                                        {isCreating ? 'Creating Event...' : 'CREATE EVENT'}
                                    </Button>
                                </form>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};
