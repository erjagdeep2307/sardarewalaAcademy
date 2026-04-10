import AppError from "#utilities/AppError";

const ProgramService = (programRepo, cloudService) => {
    const addProgram = async (data, image) => {
        if (!image) {
            throw new AppError(`Image File is Missing for Program Thumb`);
        }
        const uploadResult = await cloudService.uploadImage(image.buffer, "Programs");
        if (!uploadResult || !uploadResult.optimizedUrl) {
            throw new Error(`Program Image uploading failed`);
        }
        const programPayload = {
            title: data.program_title,
            slug: data.program_slug,
            description: data.program_desc,
            level: data.program_level,
            is_active: data.is_active,
            thumbnail: uploadResult.optimizedUrl
        };
        return await programRepo.addProgram(programPayload);
    }
    const listProgram = async () => {
        return await programRepo.listProgram();
    }
    const removeProgram = async (id) => {
        return await programRepo.removeProgram(id);
    }
    return { addProgram, listProgram, removeProgram }
}
export default ProgramService;
