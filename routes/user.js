const express = require('express');
const {
    getUserProfile,
    getUsers,
    createUser,
    updateUser,
    removeUser,
    loginUser,
    getRefreshToken,
    getUserTasks,
    createUserTask,
    updateUserTask,
    removeUserTask
} = require('../controller/users');
const { authentication } = require('../middleware/auth');

const router = express.Router();

router.get('/profile', authentication, getUserProfile)
router.post('/login', loginUser)
router.post('/refresh-token', getRefreshToken)
router.get('/get-all', authentication, getUsers)
router.post('/register', createUser)
router.put('/:id/update', authentication, updateUser)
router.delete('/:id/remove', authentication, removeUser)


module.exports = router;