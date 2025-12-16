import {clsx,type ClassValue} from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
//  Returns a merged className string by combining clsx and tailwind-merge functionalities
    return twMerge(clsx(inputs));
}
// Function to convert a string into a URL-friendly slug
export const slugify = (text: string) => {
    return text.toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, '') // Remove non-alphanumeric chars (except space and hyphen)
        .replace(/[\s-]+/g, '-')       // Collapse whitespace and replace with hyphen
        .replace(/^-+|-+$/g, '');      // Remove leading/trailing hyphens
};
