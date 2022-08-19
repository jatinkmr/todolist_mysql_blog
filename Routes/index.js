const router = require('express').Router();
const Controller = require('../Controller');

router.get('/home', Controller.homecontroller);
router.post('/createtask', Controller.createTaskController);
router.get('/gettask', Controller.fetchAllTaskController);
router.delete('/removetask/:taskId', Controller.removeTaskByTaskIdController);
router.patch('/updatetask', Controller.updateTaskController);
router.patch('/changestatus', Controller.changeTodoStatus);

module.exports = router;