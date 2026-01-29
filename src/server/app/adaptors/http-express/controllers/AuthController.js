import logger from "#logger";
import { LoginSchema } from "../../../core/modules/auth/auth.schema.js";
const AuthController = () => {
    const authenticate = async (req,res)=>{
        try {
            console.log(req.body);
            const validateData = LoginSchema.safeParse(req.body);
            console.log(validateData);
            logger.info(`Login Request Recieved`);
            res.status(200).json({
                status:"fail",
                message:"testing",
            })
        } catch (error) {
            console.error(error);   
        }
    };
    return {authenticate};
}
export default AuthController;