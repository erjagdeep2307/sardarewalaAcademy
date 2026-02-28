import bcrypt from 'bcrypt';
import { createHash } from 'crypto';
const generateHash = async (plainText) => {
    // const salt = await bcrypt.genSalt(10);
    // Use Auto-generated salt rounds 12
    const hash = await bcrypt.hash(plainText, 12);
    return hash;
}


const compareHash = async (plainText, hash) => {
    return await bcrypt.compare(plainText, hash);
}


    const generateHashValue = (input) =>{
        return createHash('sha256').update(input).digest('hex')
    }

export {generateHash, compareHash,generateHashValue};