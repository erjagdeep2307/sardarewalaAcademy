import { compareHash } from "#common/hash.service";
import { generateToken,generateRefreshToken } from "#common/token.service";
const AuthService = (authRepo) => {
    const authenticate = async (data) => {
        const response = await authRepo.findUserByEmail(data.email);
        if (!response) throw new Error(`INVALID_CREDENTIALS`);
        const isMatch = await compareHash(data.password, response.password_hash);
        if (!isMatch) throw new Error(`INVALID_CREDENTIALS`);
        const token  = generateToken({
            sub:response.email,
            role:response.role
        });
        if(!token) throw new Error(`Failed to create Access Token`);
        const refreshToken = generateRefreshToken({
            sub:response.email,
            role:response.role
        });
        if(!refreshToken) throw new Error(`Failed to create Refresh Token`);    
        // Using rest operator to exclude the password_hash only
        const {password_hash,...userData} = response;
        return {userData,token,refreshToken};
    }
    return { authenticate }
}

export default AuthService;