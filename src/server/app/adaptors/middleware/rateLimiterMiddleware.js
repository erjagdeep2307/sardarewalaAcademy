import {rateLimit} from  "express-rate-limit"

const publicRateLimiter = rateLimit({
    windowMs:5 * 60 * 1000,
    limit: 100,
    legacyHeaders:false
}) ;
export {publicRateLimiter};