import zod from "zod";
const TestomonialSchema = zod.object({
    name: zod.string().min(2).max(100),
    designation: zod.string().min(2).max(100).optional(), 
    department: zod.string().min(2).max(100).optional(),
    testimonial_text: zod.string().min(10).max(1000),
    rating: zod.string().max(1),
    is_featured: zod.preprocess((val) => val === 'true', zod.boolean()),
    // image_file: zod.string() because it is handled separately via multer
});
export default TestomonialSchema;