const { createTask, getTask, getTaskByID, deleteTask, updateTask, updateEmployeeTask } = require('./controller');
const express = require('express');
const router = express.Router();

router.post('/task', createTask);
router.get('/get-task', getTask);
router.get('/get-task-by-id/:id', getTaskByID);
router.put('/update-task/:id', updateTask);
router.put('/update-employee-task/:id', updateEmployeeTask);
router.delete('/delete-task/:id', deleteTask)

module.exports = router;
