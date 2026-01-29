import jwt from 'jsonwebtoken';

const getToken = () =>{
    const JWT_SECRET = process.env.JWT_SECRET;
    if(!JWT_SECRET){
        throw new Error('JWT_SECRET is not defined in environment variables');
    }
    return JWT_SECRET;
}
export function generateToken(payload, expiresIn = '1h') {
    return jwt.sign(payload, getToken(), { expiresIn });
}

export function generateRefreshToken(payload, expiresIn = '7d') {
    return jwt.sign(payload, getToken(), { expiresIn });
}

export function verifyToken(token) {
    return jwt.verify(token, getToken());
}
