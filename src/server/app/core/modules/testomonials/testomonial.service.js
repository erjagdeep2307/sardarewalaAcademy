import logger from "#logger";
import e from "express";

const TestomonialService = (testomonialRepo, cloudService) => {
    const createTestomonial = async (data, image) => {
        // Need Try catch here to handle errors from cloudinary
        try {
            if (!image) {
                throw new Error('Image file is required');
            }
            const uploadResult = await cloudService.uploadImage(image.buffer, "Testomonials");
            // console.log(...uploadResult);
            if (!uploadResult || !uploadResult.secure_url) {
                throw new Error('Testomonial Image upload failed');
            }
            const testomonialPayload = {
                client_name: data.name,
                designation: data.designation,
                department: data.department,
                testimonial_text: data.testimonial_text,
                rating: data.rating,
                is_featured: data.is_featured,
                image_url: uploadResult.optimizedUrl,
                image_public_id: uploadResult.public_id
            }
            return await testomonialRepo.createTestomonial(testomonialPayload);
        } catch (error) {
            throw error;
        }
    }
    const listTestomonial = async () => {
        return await testomonialRepo.listTestomonial();
    }
    const removeTestomonial = async (id) => {
        try {
            const response = await testomonialRepo.removeTestomonial(id);
            if(response && response.image_public_id){
                console.log(`Image id to be removed: ${response.image_public_id}`);
                const cloudResponse = await cloudService.removeImage(response.image_public_id);
                return cloudResponse.result;
            }
            else{
                logger.warn(`No image found for Testomonial ID:${id} to delete from cloudinary`);
                return -1;
            }
        } catch (error) {
            logger.error(`Remove Testomonial Service Error:${error.message}`);
            throw new Error('Failed to remove testomonial');
        }
    }
    return {
        createTestomonial,
        listTestomonial,
        removeTestomonial
    };
}
export default TestomonialService;