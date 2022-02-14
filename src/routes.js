const express = require('express');

const router = express.Router();

const TaskController = require('./controllers/TaskController');

// tasks routes
router.post('/create/task', TaskController.createTask);

router.get('/tasks', TaskController.getTasks);
router.get('/task/:id', TaskController.getTask);
router.get('/tasks/active', TaskController.getTasksActive);
router.get('/tasks/closed', TaskController.getTasksClosed);

router.patch('/closed/task/:id', TaskController.closedTask);
router.patch('/active/task/:id', TaskController.activeTask);

router.patch('/edit/task/:id', TaskController.taskEdit)

router.delete('/delete/task/:id', TaskController.deleteTask);

module.exports = router;