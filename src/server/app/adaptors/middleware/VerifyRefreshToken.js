import { verifyToken } from "#common/token.service";
import { generateHashValue } from "#common/hash.service";
import AuthRepo from "#auth/auth.repo";
import connectionPool  from '#db';
import AppError from "#utilities/AppError";

export const HaveRefreshToken = async (req, res, next) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) {
            return res.status(401).json({
                status: "failed",
                message: "Missing refresh Token"
           });
        }
        const payload = verifyToken(refreshToken,'refresh');
        if(!payload) throw new AppError(`Token verification Failed`,401);
        const authRepo = AuthRepo(connectionPool);
        const hashedRefreshToken = generateHashValue(refreshToken);
        const is_revoked = await authRepo.isRefreshTokenRevoked(payload.jti,hashedRefreshToken);
        if(!is_revoked)
        {
            return res.status(401).json({
                status: "failed",
                message: "Token Expired"
           });
        }
        req.user = payload
        next();
    } catch (error) {
        next(error);
    }
}