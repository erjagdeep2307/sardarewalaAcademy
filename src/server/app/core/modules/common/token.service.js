import jwt from 'jsonwebtoken';

const getToken = (type='access') =>{
    const JWT_SECRET = process.env.JWT_SECRET;
    const JWT_REF_SECRET = process.env.JWT_REF_SECRET;
    if(type === 'refresh'){
        if(!JWT_REF_SECRET){
            throw new Error('JWT_REF_SECRET is not defined in environment variables');
        }
        return JWT_REF_SECRET;
    }
    if(!JWT_SECRET){
        throw new Error('JWT_SECRET is not defined in environment variables');
    }
    return JWT_SECRET;
}
export function generateToken(payload, expiresIn = '2m') {
    return jwt.sign(payload, getToken(), { expiresIn });
}

export function generateRefreshToken(payload, expiresIn = '7d') {
    return jwt.sign(payload, getToken('refresh'), { expiresIn });
}

export function verifyToken(token,type='access') {
    try {
        return jwt.verify(token, getToken(type));
    } catch (error) {
        if((error instanceof jwt.JsonWebTokenError) || (error instanceof jwt.TokenExpiredError))
        {
            return null;
        }
    }
}
