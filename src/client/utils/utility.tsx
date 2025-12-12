import {clsx,type ClassValue} from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
//  Returns a merged className string by combining clsx and tailwind-merge functionalities
    return twMerge(clsx(inputs));
}