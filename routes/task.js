const express = require('express');
const {
    getUserTasks,
    createUserTask,
    updateUserTask,
    removeUserTask
} = require('../controller/users');
const { authentication } = require('../middleware/auth');

const router = express.Router();

router.post('/', authentication, createUserTask)
router.get('/fetch', authentication, getUserTasks)
router.put('/:id', authentication, updateUserTask)
router.delete('/:id', authentication, removeUserTask)

module.exports = router;
