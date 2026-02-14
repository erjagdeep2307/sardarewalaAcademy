import { compareHash } from "#common/hash.service";
import {v4 as uuid} from 'uuid';
import {createHash} from 'crypto';
import { generateToken,generateRefreshToken,verifyToken} from "#common/token.service";
const AuthService = (authRepo) => {

    // Private Function to be used for create Expiry date of token
    const generateExpiryDate = (days = 30) => {
        const date = new Date();
        date.setDate(date.getDate() + days);
        return date;
    }

    const authenticate = async (data) => {
        const user = await authRepo.findUserByEmail(data.email);
        if (!user) throw new Error(`INVALID_CREDENTIALS`);
        const isMatch = await compareHash(data.password, user.password_hash);
        if (!isMatch) throw new Error(`INVALID_CREDENTIALS`);
        const token  = generateToken({
            sub:user.email,
            role:user.role
        });
        if(!token) throw new Error(`Failed to create Access Token`);
        const refreshTokenUid = uuid();
        const refreshToken = generateRefreshToken({
            sub:user.email,
            name:user.id,
            role:user.role,
            jti:refreshTokenUid
        });
        if(!refreshToken) throw new Error(`Failed to create Refresh Token`);    
        // Using rest operator to exclude the password_hash only
        const hashedRefreshToken = createHash('sha256').update(refreshToken).digest('hex');
        const expireAt = generateExpiryDate();

        // const createRefreshToken = async(t_id,u_id,t_hash,expire_d) =>{
        console.log(`User ID in serveri ${user.id}`);
        const result = authRepo.createRefreshToken(refreshTokenUid,user.id,hashedRefreshToken,expireAt);
        const {password_hash,...userData} = user;
        return {userData,token,refreshToken};
    }

    const refreshAccessToken = async(refToken)=>{

        const payload = verifyToken(refToken,'refresh');
        if( !payload.sub)
        {
            // if user information does'nt Exist
            return null;
        }
        const user = await authRepo.findUserByEmail(payload.sub);
        const newAccessToken = generateToken({
            sub:user.email,
            role:user.role
        });
        if(!newAccessToken) throw new Error(`Failed to create new Access Token`);
        // Destructure data from user Object except password_hash
        const {password_hash,...userData} = user;
        return {userData,token:newAccessToken};
    }

    const revokeToken = async (token) =>{
        const payload = verifyToken(token,'refresh');
        if(!payload.sub)
        {
            return null;
        }
        return await authRepo.revokeRefreshToken(payload.name);
    }
    return { authenticate,refreshAccessToken,revokeToken }
}

export default AuthService;