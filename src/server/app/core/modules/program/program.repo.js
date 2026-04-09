import logger from "#logger";
const ProgramRepo = (connPool) => {
    const addProgram = async() => { 
        let dbClient=null;
        try {
            dbClient = await connPool.connect();
        } catch (error) {
            logger.info(error,"Error on Add a new Program")
            throw new Error(`Failed to Add Program`);
        }
        finally {
            if(dbClient)
            {
                dbClient.release();
            }
        }
    }
    return {addProgram}
}
export default ProgramRepo;