const bcrypt = require('bcrypt');
const verifyPassword = async (password) => {
    const salt = await bcrypt.genSalt(10)
    const newPassword = await bcrypt.hash(password, salt)
    console.log(salt);
    return newPassword;
}
const comparePassword = async (password, scriptedPassword) => {
    const matchedPassword = await bcrypt.compare(scriptedPassword, password);
    if (matchedPassword) return true;
    return false;
}

module.exports = {
    verifyPassword,
    comparePassword
}