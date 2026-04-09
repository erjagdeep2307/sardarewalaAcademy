import zod from "zod"
const ProgramSchema = zod.object({
    program_title:zod.string().min(5).max(255),
    program_slug:zod.string().min(5).max(255),
    program_desc:zod.string().min(5).max(255),
    program_level:zod.string().min(5).max(20),
    is_active: zod.preprocess((val) => val === 'true', zod.boolean()),
});
export default ProgramSchema;