import logger from "#logger";
import TestomonialSchema from "#testomonial/testomonial.schema";
const TestomonialController = (testmnlService) => {
    // Create a New Testomonial
    const createTestomonial = async (req, res) => {
        try {
            // Check if file is present
            if (!req.file) {
                res.status(400).send({
                    success: false,
                    message: "Image file is required",
                    data: null
                });
            }
            const validatedData = TestomonialSchema.safeParse(req.body);
            if (validatedData.success === false) {
                logger.warn(`Testomonial Create Payload validation failed`);
                return res.status(400).send({
                    success: false,
                    message: 'Validation failed',
                    errors: validatedData.error.flatten().fieldErrors
                });
            }
            console.log(validatedData);
            if (testmnlService) {
                console.log("Service is present");
            }
            else {
                console.log("Service is absent");
            }
            const response = await testmnlService.createTestomonial(validatedData.data, req.file);
            return res.status(201).send({
                success: true,
                message: "Testomonial created successfully",
                data: response
            });
        } catch (error) {
            console.error(error);
            logger.error(`Create Testomonial Controller Error:${error.message}`);
            return res.status(501).send({
                success: false,
                message: "Generic Error",
                data: null
            });
        }
    }

    // Get all Testomonials
    const listTestomonial = async (req, res) => {
        try {
            const response = await testmnlService.listTestomonial();
            return res.status(200).send({
                success: true,
                message: `${response.length > 0 ? "List of Testomonials fetched successfully" : "No Testomonials found"}`,
                data: response
            });
        } catch (error) {
            console.error(error);
            logger.error(`List Testomonial Controller Error:${error.message}`);
            return res.status(501).send({
                success: false,
                message: "Generic Error",
                data: null
            });
        }
    }
    const removeTestomonial = async (req, res) => {
        try {
            if(req.params.id===undefined || req.params.id===null){
                return res.status(400).send({
                    success: false,
                    message: "Testomonial ID is required",
                    data: null
                });
            }
            const response = await testmnlService.removeTestomonial(req.params.id);
            return res.status(200).send({
                success: true,
                message: `${response === "ok" ? "Testomonial removed successfully" : "Testomonial data or Image not Removed"}`,
                data: response
            });
        } catch (error) {
            console.error(error);
            logger.error(`Remove Testomonial Controller Error:${error.message}`);
            return res.status(501).send({
                success: false,
                message: "Generic Error",
                data: null
            });
        }
    }
    // // Get a Testomonial by Id 
    // const getTestomonialById = async (req, res) => {
    
    // }
    // // Update a Testomonial by Id
    // const updateTestomonial = async (req, res) => {
    // }
    return {
        createTestomonial,
        listTestomonial,
        // getTestomonialById,
        // updateTestomonial,
        removeTestomonial
    }
}
export default TestomonialController;