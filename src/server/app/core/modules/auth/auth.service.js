import { compareHash, generateHashValue } from "#common/hash.service";
import { v4 as uuid } from 'uuid';
import { generateToken, generateRefreshToken, verifyToken } from "#common/token.service";
import AppError from "#utilities/AppError";
import logger from "#logger";

const AuthService = (authRepo) => {

    // Private Function to be used for create Expiry date of token
    const generateExpiryDate = (days = 30) => {
        const date = new Date();
        date.setDate(date.getDate() + days);
        return date;
    }

    const authenticate = async (data) => {

        const user = await authRepo.findUserByEmail(data.email);
        if (!user) {
            logger.warn(`User not found by Email id:${data.email}`);
            throw new AppError(`INVALID_CREDENTIALS`, 401);
        }
        const isMatch = await compareHash(data.password, user.password_hash);
        if (!isMatch) {
            logger.warn(`Password not matched for user:${data.email}`);
            throw new AppError(`INVALID_CREDENTIALS`, 401);
        }

        /* Create Access Token for User */
        const token = generateToken({
            sub: user.email,
            role: user.role
        });

        /* Create Refresh Token for User */
        const refreshTokenUid = uuid();
        const refreshToken = generateRefreshToken({
            sub: user.email,
            name: user.id,
            role: user.role,
            jti: refreshTokenUid
        });

        /* Create Hash value of RefreshToken to be stored in DB*/
        const hashedRefreshToken = generateHashValue(refreshToken);
        const expireAt = generateExpiryDate();

        /* Store RefreshToken Entry for later validation purpose */
        const recCreated = await authRepo.createRefreshToken(refreshTokenUid, user.id, hashedRefreshToken, expireAt);
        if (recCreated === 0) {
            logger.warn(`Failed to create a refreshToken entry in database for user Id:${user.id} email Id: ${user.email}`);
            throw new Error(`Internal System Error`)
        }

        const { password_hash, ...userData } = user;
        return { userData, token, refreshToken };
    }


    const refreshAccessToken = async (useEmail) => {
        const user = await authRepo.findUserByEmail(useEmail);
        if (!user) {
            logger.info(`User not found in database for ${useEmail}`);
            throw new Error(`User does'nt Exist`);
        }
        const newAccessToken = generateToken({
            sub: user.email,
            role: user.role
        });
        if (!newAccessToken) throw AppError(`Failed to create new Access Token`, 401);
        logger.info(`New Access Token Generated for :${useEmail}`);
        // Destructure data from user Object except password_hash
        const { password_hash, ...userData } = user;
        return { userData, token: newAccessToken };
    }

    const revokeToken = async (userId, token) => {
        const hashedRefreshToken = generateHashValue(token);
        const resp = await authRepo.revokeRefreshToken(userId, hashedRefreshToken);
        if (resp === 0) {
            logger.warn(`Unable to revoke refresh token for id:${userId}`);
        }
        else {
            logger.warn(`Refresh Token revoked for id:${userId} sucessfully`);
        }
        // Attaching user Email for logging purpose 
        return {
            response: resp,
            user: userId
        };
    }
    return { authenticate, refreshAccessToken, revokeToken }
}

export default AuthService;