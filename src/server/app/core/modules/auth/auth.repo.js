import logger from "#logger";

const AuthRepo = (connectionPool) =>{
    const findUserByEmail = async(email) =>{
        let dbClient;
        try{
            const userQuery = "SELECT full_name,email,password_hash,role from users where is_active=$1 and email=$2";
            const values = ["t",email];
            console.log(email);
            dbClient = await connectionPool.connect();
            const queryResult =  await dbClient.query(userQuery,values);
            if(queryResult.rowCount===0)
            {
                return null;
            }
            logger.info(queryResult.rows[0],`User with email id:${email}`);
            return queryResult.rows[0];
        }
        catch(error){
            console.error(error);
            throw new Error('Failed to Fetch UserData');
        }
        finally{
            if(dbClient)
            {
                dbClient.release();
            }
        }

    }
    return {findUserByEmail}
}
export default AuthRepo;