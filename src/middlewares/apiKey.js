const VALID_API_KEYS = {
    'free_user_key': { tier: 'free' },
    'paid_user_key': { tier: 'paid' }
};

function apiKeyValidation(req, res, next) {
    const apiKey = req.headers['x-api-key'];
    if (!apiKey || !VALID_API_KEYS[apiKey]) {
        return res.status(401).json({ error: 'Invalid or missing API key.' });
    }
    req.userTier = VALID_API_KEYS[apiKey].tier;
    next();
}

module.exports = apiKeyValidation;
