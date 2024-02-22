const crypto=require('crypto');

const REFRESH_TOKEN_KEY = crypto.randomBytes(32).toString('hex');
const ACCESS_TOKEN_KEY = crypto.randomBytes(32).toString('hex');
console.table({ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY});