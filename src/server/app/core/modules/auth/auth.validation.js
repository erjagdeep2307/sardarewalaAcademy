import { email, z } from 'zod'
const LoginSchema = z.object({
    email: z.string().email("A valid Email is Required"),
    password: z.string().min(6, { message: "Password should be at least 6 characters" }).max(20, { message: "Password is too long" })
});


export {LoginSchema};