const { generateAccessToken, generateRefreshToken, authenticationRefreshToken } = require("../middleware/auth");
const { verifyPassword, comparePassword } = require("../middleware/security");

const Tasks = require("../models/tasks");
const Users = require("../models/users");

const getUserTasks = async (req, res) => {
    try {
        const tasks = await Tasks.find({ user: req.userId });
        res.status(200).send({ message: 'get user tasks successfully!!', tasks });

    } catch (err) {
        console.log(`err in getUserProfile:: err=`, err)
        res.status(500).send({ message: err });
    }
}
const getUserTasksByQuery = async (query={}) => {
    try {
        const tasks = await Tasks.find({});
        return tasks;

    } catch (err) {
        console.log(`err in getUserProfile:: err=`, err)
        return [];
    }
}
const updateTasksByQueue = async (query) => {
    try {
        const tasks = await Tasks.findByIdAndUpdate(query, {status: 'completed'});
        return true

    } catch (err) {
        console.log(`err in getUserProfile:: err=`, err)
        return false;
    }
}
const getUserProfile = async (req, res) => {
    try {
        const userId = req.userId;
        const users = await Users.findOne({ _id: userId });
        res.status(200).send({ message: 'get profile successfully!!', users });

    } catch (err) {
        console.log(`err in getUserProfile:: err=`, err)
        res.status(500).send({ message: err });
    }
}
const getUsers = async (req, res) => {
    try {
        const users = await Users.findAll();
        res.status(200).send({ message: 'get users successfully!!', users });
    } catch (err) {
        console.log(`err in getUsers:: err=`, err)
        res.status(500).send({ message: err });
    }
}
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await Users.findOne({ email: email });
        if (!user) throw new Error('user not found');

        const matchedPassword = await comparePassword(user.password, password);
        if (!matchedPassword) throw new Error('Username/Password invalid!');

        const accessToken = await generateAccessToken(user.id);
        const refreshToken = await generateRefreshToken(user.id)
        res.status(200).send({ accessToken, refreshToken });
    } catch (err) {
        console.log(`err in getUsers:: err=`, err)
        res.status(404).json({ message: err.message });
    }
}
const getRefreshToken = async (req, res) => {
    try {
        const { refreshToken } = req.body;

        const userId = await authenticationRefreshToken(refreshToken);
        if (!userId) throw new Error('Unauthorized');

        const accessToken = await generateAccessToken(userId);
        const newRefreshToken = await generateRefreshToken(userId)
        res.status(200).send({ accessToken, refreshToken: newRefreshToken });
    } catch (err) {
        console.log(`err in getUsers:: err=`, err)
        res.status(404).json({ message: err.message });
    }
}
const createUser = async (req, res) => {
    try {
        const { password } = req.body;
        const generatedPassword = await verifyPassword(password);
        req.body.password = generatedPassword;
        const users = await Users.create(req.body);
        res.status(201).send({ message: 'created successfully!!', users });
    } catch (err) {
        console.log(`err in createUser:: err=`, err)
        res.status(500).send({ message: err });
    }
}
const createUserTask = async (req, res) => {
    try {
        const { userId } = req;
        const taskObject = {
            user: userId,
            title: req.body.title,
            status: "pending",
            due_date: new Date(req.body.due_date)
        }
        const createdTask = await Tasks.create(taskObject);

        res.status(201).send({ message: 'created task successfully!!', createdTask });
    } catch (err) {
        console.log(`err in createUser:: err=`, err)
        res.status(500).send({ message: err });
    }
}
const updateUser = async (req, res) => {
    try {
        const user = await Users.findOne({ _id: req.params.id });
        if (!user) throw new Error('user not found');
        const { name, email, age } = req.body;
        if (name) user.name = name;
        if (email) user.email = email;
        if (age) user.age = age;

        await user.save();

        res.status(200).send({ message: 'updated successfully!!', user });
    } catch (err) {
        console.log(`err in updateUser:: err=`, err)
        res.status(500).send({ message: err });
    }
}
const updateUserTask = async (req, res) => {
    try {
        const { title, due_date } = req.body;

        const task = await Tasks.findOne({ _id: req.params.id })
        if (!task) throw new Error('task not found');
        if (title) task.title = title;
        if (due_date) task.due_date = due_date;

        await task.save();

        res.status(200).send({ message: 'updated the task successfully!!', task });
    } catch (err) {
        console.log(`err in updateUserTask:: err=`, err)
        res.status(500).send({ message: err });
    }
}
const removeUser = async (req, res) => {
    try {
        console.log('hello!', req.body);
        const users = await Users.destroy({ where: { id: req.params.id } });
        res.status(200).send({ message: 'removed successfully!!', users });
    } catch (err) {
        console.log(`err in removeUser:: err=`, err)
        res.status(500).send({ message: err });
    }
}
const removeUserTask = async (req, res) => {
    try {
        const users = await Tasks.deleteOne({ _id: req.params.id });
        res.status(200).send({ message: 'removed the task successfully!!', users });
    } catch (err) {
        console.log(`err in removeUser:: err=`, err)
        res.status(500).send({ message: err });
    }
}

module.exports = {
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
    removeUserTask,
    getUserTasksByQuery,
    updateTasksByQueue
}