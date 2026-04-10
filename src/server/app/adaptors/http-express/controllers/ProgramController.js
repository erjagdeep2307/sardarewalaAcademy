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
            if (!payload.success) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid Request",
                    error: payload.error.flatten().fieldErrors
                });

            }
            const data = await programService.addProgram(payload.data, req.file);
            return res.status(200).json(
                {
                    success: true,
                    message: "Program Added Successfully",
                    data: data
                }
            )
        } catch (error) {
            next(error);
        }
    }
    const listProgram = async (req, res, next) => {
        try {
            const proramList = await programService.listProgram();
            return res.status(200).json({
                success: true,
                message: (proramList.length > 0) ? "Program Data List" : "No Program Found",
                data: proramList
            })
        } catch (error) {
            next(error)
        }
    }
    const removeProgram = async (req, res, next) => {
        try {
            const prgId = req.params.id;
            logger.info(`Program Remove Request Recieved for id:${prgId}`);
            const prgDeleted = await programService.removeProgram(prgId);
            if (!prgDeleted.id) {
                return res.status(404).json({
                    success: false,
                    message: "Program not Found"
                })
            }
            return res.status(200).json({
                success: true,
                message: "Program deleted",
                data:prgDeleted
            })
        } catch (error) {
            next(error);
        }
    }
    return { createProgram, listProgram, removeProgram }
}
export default ProgramController;