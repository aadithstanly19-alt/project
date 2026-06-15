const Task = require("../models/Task");

// Create Task
exports.createTask = async (req, res) => {
    try {

        const { title } = req.body;

        if (!title) {
            return res.status(400).json({
                message: "Title is required"
            });
        }

        const task = await Task.create({

            ...req.body,

            createdBy: req.user.userId

        });

        res.status(201).json(task);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

// Get All Tasks
exports.getTasks = async (req, res) => {
    try {

        const tasks = await Task.find({
            createdBy: req.user.userId
        }).populate(
            "createdBy",
            "name email"
        );

        res.status(200).json(tasks);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

// Get Single Task
exports.getTaskById = async (req, res) => {
    try {

        const task = await Task.findById(
            req.params.id
        ).populate(
            "createdBy",
            "name email"
        );

        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        res.status(200).json(task);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

// Update Task
exports.updateTask = async (req, res) => {
    try {

        const task =
            await Task.findByIdAndUpdate(

                req.params.id,

                req.body,

                {
                    new: true
                }

            );

        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        res.status(200).json(task);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

// Delete Task
exports.deleteTask = async (req, res) => {
    try {

        const task =
            await Task.findByIdAndDelete(
                req.params.id
            );

        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        res.status(200).json({
            message: "Task deleted"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};