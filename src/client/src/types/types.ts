export type Book = {
    title: string;
    author: string;
    price: number;
    image: string;
};
// Testomonial Interface
export type Testomonial = {
    id: number,
    name: string,
    role: string,
    content: string,
    image: string
}
// Interface for Event Form Data
export interface EventFormData {
    eventTitle: string;
    eventSlug: string;
    eventDate: string; // Date input returns a string
    location: string;
    featured: 'Yes' | 'No';
    message?: string; // Optional field
}

// Interface for Event List Data for each item
export interface EventData {
    id: string,
    title: string,
    slug: string,
    full_description: string,
    event_date: string,
    location: string,
    is_featured: boolean,
    created_at: string,
    updated_at: string,
    image_url: string,
    cloudinary_public_id: string,
}

// Event List Api Response
export interface EventListResponse{
    success: boolean,
    message: string,
    data : EventData[]
}
// Event by Id Response
export interface EventByIdResponse{
    success: boolean,
    message: string,
    data : EventData
}
