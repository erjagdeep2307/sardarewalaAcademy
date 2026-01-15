import { z } from 'zod';
export const contactSchema = z.object({
    firstName: z.string().min(5, 'First name is required'),
    lastName: z.string().min(5, 'Last name is required'),
    email: z.string().email('Invalid email address'),
    phone: z.string().max(12).optional(),
    program: z.string()
        .min(1, 'Please select a program') // Ensures dropdown isn't empty
        .transform((val) => val.trim().toUpperCase()), // Forces Uppercase
    message: z.string().min(10, 'Message must be at least 10 characters long'),
});