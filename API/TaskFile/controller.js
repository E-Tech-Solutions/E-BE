const { createTask, getTask, getTaskByID, updateTask, updateEmployeeTask, deleteTask } = require('./service');
const moment = require('moment');

module.exports = {
    createTask: (req, res) => { 
        const body = req.body;
        createTask(body, (err, results) => {
            if (err) {
                console.error('Error:', err);
                res.status(500).json({ message: 'Error adding Task' });
            } else {
                console.log('Task added successfully');
                res.json({ message: 'Success', data: results });
            }
        });
    },
    getTaskByID: (req, res) => {
        const id = req.params.id
        getTaskByID(id, (err, results) => {
            if (err) {
                console.log(err)
                return
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "Record not found"
                })
            }
            res.status(200).json(results);
        })
    },
    getTask: (req, res) => {
        getTask((err, results) => {
            if (err) {
                console.log(err)
                return
            }
            res.status(200).json(results);
        })
    },
    updateTask: (req, res) => {
        const body = req.body
        updateTask(body, (err, results) => {
            if (err) {
                console.log(err)
                return
            } if (!results) {
                return res.json({
                    success: 0,
                    message: "Record Not Found"
                })
            }
            return res.json({
                success: 1,
                message: "Success"
            })
        })
    },
    updateEmployeeTask: (req, res) => {
        const body = req.body
        updateEmployeeTask(body, (err, results) => {
            if (err) {
                console.log(err)
                return
            } if (!results) {
                return res.json({
                    success: 0,
                    message: "Record Not Found"
                })
            }
            return res.json({
                success: 1,
                message: "Success"
            })
        })
    },
    deleteTask: (req, res) => {
        const id = req.params.id
        deleteTask({ id }, (err, results) => {
            if (err) {
                console.log(err)
                return
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "Record Not Found"
                })
            }
            return res.json({
                success: 1,
                message: "Task Deleted Success Fully"
            })
        })
    }
};
