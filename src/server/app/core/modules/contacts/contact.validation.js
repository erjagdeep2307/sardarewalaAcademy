import { z } from 'zod';
export const contactSchema = z.object({
    firstName: z.string().min(3, 'First name is required').max(50,'First name must be less than 50 characters'),
    lastName: z.string().min(3, 'Last name is required').max(50,'Last name must be less than 50 characters'),
    email: z.string().email('Invalid email address'),
    phone: z.string().max(12).optional(),
    program: z.string()
        .min(1, 'Please select a program') // Ensures dropdown isn't empty
        .transform((val) => val.trim().toUpperCase()), // Forces Uppercase
    message: z.string().min(10, 'Message must be at least 10 characters long').max(255, 'Message must be at most 255 characters long'),
});

export const updateStatusSchema = z.object({
    status:z.enum(["Pending","Approved"])
});