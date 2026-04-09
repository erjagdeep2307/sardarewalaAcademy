import AppError from "#utilities/AppError";

const ProgramService = (programRepo,cloudService) => {
    const addProgram = async(data,image) =>{
        if(!image){
            throw new AppError(`Image File is Missing for Program Thumb`);
        }
       // const cloudRes =      
        const result = await programRepo.addProgram(data);
    }
    return {addProgram}
}
export default ProgramService;
