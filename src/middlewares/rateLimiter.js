const rateLimit = require('express-rate-limit');

const freeLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // 5 requests per window
    message: 'Rate limit exceeded. Upgrade to paid plan for more requests.'
});

const paidLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 50, // 50 requests per window
    message: 'Rate limit exceeded. Contact support for higher limits.'
});

function rateLimiter(req, res, next) {
    if (req.userTier === 'free') {
        return freeLimiter(req, res, next);
    } else if (req.userTier === 'paid') {
        return paidLimiter(req, res, next);
    }
    next();
}

module.exports = rateLimiter;
