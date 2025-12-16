export type Book = {
    title: string;
    author: string;
    price: number;
    image: string;
};
export type Testomonial= {
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