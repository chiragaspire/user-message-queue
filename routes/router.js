const express = require('express');
const router = express.Router();
const userRouter =require('./user');
const taskRouter =require('./task');


router.use('/users', userRouter);
router.use('/tasks', taskRouter);

module.exports = router;