// Event validation Schema
import zod from 'zod';
// Creating Schema using Zod with object method to automatically strip out unknown fields
const EventValidationSchema = zod.object({
  title: zod.string().min(5).max(100),
  description: zod.string().min(10).max(1000).optional(),
    date: zod.string().refine((date) => !isNaN(Date.parse(date)), {
    message: 'Invalid date format',
  }),
  is_featured: zod.boolean().optional(),
  location: zod.string().min(5).max(200),
   slug: zod.string().min(5).max(100).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message: 'Slug can only contain lowercase letters, numbers, and hyphens',
  }), 
});

export default EventValidationSchema;