import logger from "#logger";

const AuthRepo = (connectionPool) => {
    const findUserByEmail = async (email) => {
        let dbClient;
        try {
            const userQuery = "SELECT id,full_name,email,password_hash,role from users where is_active=$1 and email=$2";
            const values = ["t", email];
            console.log(email);
            dbClient = await connectionPool.connect();
            const queryResult = await dbClient.query(userQuery, values);
            if (queryResult.rowCount === 0) {
                return null;
            }
            logger.info(queryResult.rows[0], `User with email id:${email}`);
            return queryResult.rows[0];
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to Fetch UserData');
        }
        finally {
            if (dbClient) {
                dbClient.release();
            }
        }

    }

    const checkRefreshToken = async (userId, tokenHash) => {
        let dbClient = null;
        try {
            dbClient = await connectionPool.connect();
            const userQuery = "SELECT id from refresh_tokens where user_id=$1 AND token=$2 AND is_revoked=$3 AND expires_at > NOW()";
            const values = [userId, tokenHash, 'false'];
            const resultSet = await dbClient.query(userQuery, values);
            if (resultSet.rowCount === 0) {
                return null;
            }
            return resultSet.rows[0];
        }
        catch (error) {
            console.error(error.message);
            throw new Error(`Failed to Fetch Refresh Token`);
        }
        finally {
            if (dbClient) {
                dbClient.release();
            }
        }

    }

    const revokeRefreshToken = async (userId) => {
        let dbClient = null;
        try {
            dbClient = await connectionPool.connect();
            const userQuery = "UPDATE refresh_tokens SET is_revoked=$1 WHERE user_id=$2 AND is_revoked=$3  AND expires_at > NOW()";
            const values = ["true", userId, "false"];
            const resultSet = await dbClient.query(userQuery, values);
            return resultSet.rowCount;
        } catch (error) {
            console.error(error.message);
            throw new Error(`Failed to Revoke Refresh Token`);
        } finally {
            if (dbClient) {
                dbClient.release();
            }
        }
    }
   
    const createRefreshToken = async (t_id, u_id, t_hash, expire_d) => {
        let dbClient = null;
        try {
            dbClient = await connectionPool.connect();
            const userQuery = "INSERT INTO refresh_tokens(id,user_id,token,expires_at) values($1,$2,$3,$4)";
            console.log(`User Id: ${u_id}`);
            const values = [t_id, u_id, t_hash, expire_d];
            const resultSet = await dbClient.query(userQuery, values);
            return resultSet.rowCount;
        } catch (error) {
            console.error(error.message);
            throw new Error(`Failed to create a new Record of Refresh Token`);
        } finally {
            if (dbClient) {
                dbClient.release();
            }
        }
    }
    return { findUserByEmail, checkRefreshToken, revokeRefreshToken, createRefreshToken }
}
export default AuthRepo;