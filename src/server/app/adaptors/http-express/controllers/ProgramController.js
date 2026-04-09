import logger from "#logger";
import ProgramSchema from "#program/program.validation";
import { success } from "zod";
const ProgramController = (programService) => {
    const createProgram = async (req, res, next) => {
        try {
            logger.info(`Request recieved for Create a new Program`);
            if (!req.file) {
                return res.status(400).json({
                    success: false,
                    message: "Image file is required",
                    data: null
                });
            }
            const payload = ProgramSchema.safeParse(req.body);
            if(!payload.success)
            {
                return res.status(400).json({
                    success: false,
                    message: "Invalid Request",
                    error: payload.error.flatten().fieldErrors
                });

            }
            const data = await programService.createProgram(payload.data,req.file);
            return res.status(200).json(
                {
                    success: true,
                    message: "Program Added Successfully",
                    data:data
                }
            )
        } catch (error) {
            next(error);
        }
    }
    return { createProgram }
}
export default ProgramController;