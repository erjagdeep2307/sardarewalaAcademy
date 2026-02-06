import {rateLimit} from  "express-rate-limit"

const publicRateLimiter = rateLimit({
    windowMs:5 * 60 * 1000,
    limit: 100,
    legacyHeaders:false
}) ;

const authRateLimiter = rateLimit({
    windowMs:5 * 60 * 1000,
    limit:5,
    legacyHeaders:false
})

export {publicRateLimiter,authRateLimiter};