import React, { useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { Button } from '@/components/UI/Button';
import type { EventFormData } from '@/types/types';
import { slugify } from '@/utils/utility';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createEvent } from '@/apis/events';
import { toast } from 'react-toastify';

export const Create: React.FC = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue, // Function to programmatically set input values
        reset,
        control
    } = useForm<EventFormData>({
        // Set default value for select
        defaultValues: { featured: 'Yes' }
    });
    const queryClient = useQueryClient();
    const {mutate,isPending} = useMutation({
        mutationFn: createEvent,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["events"] });
            console.log('Event Created Successfully:', data);
            reset(); // Reset the form after successful submission
            toast.success('Event Created Successfully');
        },
        onError: (error) => {
            toast.error('Failed to create event. Please try again.');
            console.error('Error creating event:', error);
        }    
    })

    // Watch the eventTitle field for real-time changes
    const eventTitleValue = useWatch({
        control,
        name: 'eventTitle'
    });
    // 2. Use useEffect to update the slug whenever the title changes
    useEffect(() => {
        if (eventTitleValue) {
            const slug = slugify(eventTitleValue);
            // Programmatically set the eventSlug value in RHF state
            setValue('eventSlug', slug, { shouldValidate: true });
        }
    }, [eventTitleValue, setValue]);

    // 3. Define the submission handler with the correct type
    const onSubmitHandler = (data: EventFormData) => {
        const formData = new FormData();
        formData.append('title', data.eventTitle);
        formData.append('slug', data.eventSlug);
        formData.append('date', data.eventDate);
        formData.append('location', data.location);
        formData.append('featured', data.featured);
        formData.append('description', data.description);
        if (data.event_image && data.event_image.length > 0) {
            formData.append('event_image', data.event_image[0]);
        }
        mutate(formData);       
        // Your API integration logic goes here
    };

    return (
        <div className="space-y-8">
            <h2 className="text-2xl font-bold text-[#000080] dark:text-white mb-6">Create a New Event</h2>
            {/* 4. Correct onSubmit attachment (already fixed in your provided code) */}
            <form onSubmit={handleSubmit(onSubmitHandler)} className="space-y-4 bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-gray-100 dark:border-slate-800 p-6">
                <div className="grid grid-cols-3 gap-6">
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
                </div>

                <div className="grid grid-cols-3 gap-6">
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
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Upload Image</label>
                    <input
                        type="file"
                        accept='image/*'
                        {...register("event_image", { required: 'Event Image is required' })} // No required validation needed here
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#FF9933] focus:border-transparent outline-none dark:bg-slate-800 dark:text-white"
                    ></input>
                </div>

                <Button type="submit" variant="primary" disabled={isPending} className="w-full">
                    {isPending ? 'Creating Event...' : 'CREATE EVENT'}
                </Button>
            </form>
        </div>
    );
}