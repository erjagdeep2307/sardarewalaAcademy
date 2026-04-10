import logger from "#logger";
const ProgramRepo = (connPool) => {
    const addProgram = async (programData) => {
        let dbClient = null;
        try {
            dbClient = await connPool.connect();
            const insertQuery = "INSERT INTO programs(title,slug,description,level,thumbnail,is_active,duration) VALUES($1,$2,$3,$4,$5,$6,'3 Months') RETURNING *";
            const { title, slug, description, level, thumbnail, is_active } = programData;
            const values = [title, slug, description, level, thumbnail, is_active];
            const resutlSet = await dbClient.query(insertQuery, values);
            return resutlSet.rows[0];
        } catch (error) {
            logger.info(error, "Error on Add a new Program")
            throw new Error(`Failed to Add Program`);
        }
        finally {
            if (dbClient) {
                dbClient.release();
            }
        }
    }
    const listProgram = async () => {
        let dbClient = null;
        try {
            dbClient = await connPool.connect();
            const selectQuery = "SELECT * FROM programs ORDER BY created_at  DESC";
            const resultSet = await dbClient.query(selectQuery);
            // console.log(resultSet);
            return resultSet.rows;
        } catch (error) {
            logger.error(error, `Failed to Fetch Programs List`);
            throw new Error(`Failed to List Programs`);
        }
        finally {
            if (dbClient) {
                dbClient.release();
            }
        }

    }
    const removeProgram = async (id) => {
        let dbClient = null;
        try {
            dbClient = await connPool.connect();
            const deleteQuery = "DELETE FROM programs where id=$1 RETURNING id";
            const values = [id];
            const result = await dbClient.query(deleteQuery, values);
            return result.rows[0];
        } catch (error) {
            logger.error(error, `Failed to Delete Program with id:${id}`);
            throw new Error(`Failed to Delete Program`);
        }
        finally {
            if (dbClient) {
                dbClient.release();
            }
        }
    }
    return { addProgram, listProgram, removeProgram }
}
export default ProgramRepo;