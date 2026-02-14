// Interface for Event Form Data
export interface EventFormData {
    eventTitle: string;
    eventSlug: string;
    eventDate: string; // Date input returns a string
    location: string;
    featured: 'Yes' | 'No';
    description: string; // Optional field
    event_image?: FileList; // For file input
}
// Interface for Event List Data for each item
export interface Events{
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

// Testomonial Type
export interface Testomonial{
    id:number,
    client_name:string,
    designation:string,
    department:string,
    testimonial_text:string,
    rating:string,
    image_url:string
    is_featured:boolean
} 

// Contact Type
export interface Contact{
    id:number,
    first_name: string,
    last_name: string,
    email: string,
    phone: string,
    program: string,
    message: string,
    created_at: string,
    status:string
}

// Contact Form Data
export interface ContactFormData{
    firstName:string,
    lastName:string,
    email:string,
    phone?:string,
    program?:string,
    message?:string
}

export interface TestomonialFormData{
    id:number,
    client_name:string,
    designation:string,
    department:string,
    testimonial_text:string,
    rating:string,
    image_url:FileList
    is_featured:boolean
} 
interface NavChild{
    label: string;
    path: string;  
    icon?: React.ElementType;
}

export interface NavItem {
  icon: React.ElementType;
  label: string;
  path: string;
  children?:NavChild[];
}

// Generic Api Response Interface 
 interface ApiResponseBase{
    success:boolean,
    message:string,
 }

// Api Response for Returning List in response Data
 export interface ListApiResponse<T> extends ApiResponseBase{
    data:T[] | []
 }

// Api Response for Return a single data object by Id
export interface ItemApiResponse<T> extends ApiResponseBase{
    data:T|null
}
// Api Response for Actions Delete Patch 
export interface ActionApiResponse extends ApiResponseBase{
    data?:never
} 
