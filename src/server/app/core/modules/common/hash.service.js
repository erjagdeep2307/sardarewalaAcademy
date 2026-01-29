import bcrypt from 'bcrypt';
const generateHash = async (plainText) => {
    // const salt = await bcrypt.genSalt(10);
    // Use Auto-generated salt rounds 12
    const hash = await bcrypt.hash(plainText, 12);
    return hash;
}
const compareHash = async (plainText, hash) => {
    return await bcrypt.compare(plainText, hash);
}
export {generateHash, compareHash};