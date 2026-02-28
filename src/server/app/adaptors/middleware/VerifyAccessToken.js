import { verifyToken } from "#common/token.service";
export const AuthGuard = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    const accessToken = authHeader && authHeader.split(' ')[1];
    try {
        if (!accessToken) {
            return res.status(401).json({
                status: "failed",
                message: "Access Token is missing"
            })
        }
        const decoded = verifyToken(accessToken, process.env.JWT_SECRET);
        if(!decoded)
        {
            return res.status(401).json({
                status:"failed",
                message:"Invalid token or token expired"
            })
        }
        req.user = decoded?.user;
        next();
    } catch (error) {
            next(error);
    }
}