import logger from "#logger";

const AuthRepo = (connectionPool) => {
    const findUserByEmail = async (email) => {
        let dbClient;
        try {
            const userQuery = "SELECT id,full_name,email,password_hash,role from users where is_active=$1 and email=$2";
            const values = ["t", email];
            dbClient = await connectionPool.connect();
            const queryResult = await dbClient.query(userQuery, values);
            if (queryResult.rowCount === 0) {
                return null;
            }
            // logger.info(queryResult.rows[0], `User with email id:${email}`);
            return queryResult.rows[0];
        }
        catch (error) {
            logger.error(error, `Error on Fetch User Data for email id: ${email}`);
            throw new Error('Failed to Fetch UserData');
        }
        finally {
            if (dbClient) {
                dbClient.release();
            }
        }

    }

    const isRefreshTokenRevoked = async (userId, tokenHash) => {
        let dbClient = null;
        try {
            dbClient = await connectionPool.connect();
            const userQuery = "SELECT id,expires_at from refresh_tokens where id=$1 AND token= $2 AND is_revoked=$3 AND expires_at > NOW()";
            const values = [userId, tokenHash, 'f'];
            const resultSet = await dbClient.query(userQuery, values);
            if (resultSet.rowCount === 0) {
                return null;
            }
            return resultSet.rows[0];
        }
        catch (error) {
            logger.error(error, `Error on Fetch Refresh Token for validation for ${userId}`);
            throw new Error(`Failed to Fetch Refresh Token`);
        }
        finally {
            if (dbClient) {
                dbClient.release();
            }
        }

    }

    const revokeRefreshToken = async (userId, tokenHash) => {
        let dbClient = null;
        try {
            dbClient = await connectionPool.connect();
            const userQuery = "UPDATE refresh_tokens SET is_revoked=$1 WHERE token=$2 AND id=$3 AND is_revoked=$4  AND expires_at > NOW() RETURNING *";
            const values = ["t", tokenHash, userId, "f"];
            const resultSet = await dbClient.query(userQuery, values);
            return resultSet.rowCount;
        } catch (error) {
            logger.error(error, "Error on Revoke refresh Token");
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
            const values = [t_id, u_id, t_hash, expire_d];
            const resultSet = await dbClient.query(userQuery, values);
            return resultSet.rowCount;
        } catch (error) {
            logger.error(error, "Error on Create Refresh Token");
            throw new Error(`Failed to create a new Record of Refresh Token`);
        } finally {
            if (dbClient) {
                dbClient.release();
            }
        }
    }
    return { findUserByEmail, isRefreshTokenRevoked, revokeRefreshToken, createRefreshToken }
}
export default AuthRepo;