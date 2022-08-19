const Services = require('../Models/Todo/Services');

const homecontroller = async (req, res, next) => {
    try {
        res.status(200).send('Welcome to Home Page Controller !!');
    } catch (error) {
        next(error);
    }
};

const createTaskController = async (req, res, next) => {
    try {
        const isPriorityExist = await Services.checkIsPriorityExist(req.body.priority);
        if (isPriorityExist) {
            return res.status(200).json({
                error: true,
                message: 'Same Priority Already Exists!!'
            });
        }

        let reqObj = {
            priority: req.body.priority,
            taskname: req.body.taskName,
            completed: req.body.completed
        };

        const response = await Services.createNewTask(reqObj);

        if (response) {
            return res.status(201).json({
                error: false,
                data: response,
                message: 'Task Created Successfully!!'
            });
        } else {
            return res.status(200).json({
                error: true,
                message: 'Unable to Create any Task!!'
            });
        }
    } catch (error) {
        next(error);
    }
};

const fetchAllTaskController = async (req, res, next) => {
    try {
        const response = await Services.fetchAllTask();

        if (response.length) {
            res.status(200).json({
                error: false,
                message: 'Available Task',
                data: response
            });
        } else{
            res.status(200).json({
                error: false,
                message: 'No Task Available',
                data: []
            });
        }
    } catch (error) {
        next(error);
    }
};

const removeTaskByTaskIdController = async (req, res, next) => {
    try {
        const isTaskExist = await Services.checkIsTaskExist(req.params.taskId);

        if (!isTaskExist) {
            return res.status(200).json({
                error: true,
                message: 'No Such Task Avaiable!!'
            });
        }

        const response = await Services.removeTaskById(req.params.taskId);

        if (response) {
            return res.status(200).json({
                error: false,
                message: 'Task Removed Successfully!!'
            });
        } else {
            return res.status(200).json({
                error: true,
                message: 'Error Occurred While Removing the Task!!'
            });
        }
    } catch (error) {
        next(error);
    }
};

const updateTaskController = async (req, res, next) => {
    try {
        const isTaskExist = await Services.checkIsTaskExist(req.body.taskId);

        if (!isTaskExist) {
            return res.status(200).json({
                error: true,
                message: 'No Such Task Avaiable!!'
            });
        }

        const isPriorityAvailable = await Services.checkIsPriorityAvailable(req.body);

        if (isPriorityAvailable) {
            return res.status(200).json({
                error: true,
                message: 'Same Priority Already Exists!!'
            });
        }

        const response = await Services.updateAvailableTask(req.body);

        if (response) {
            return res.status(200).json({
                error: false,
                message: 'Task Updated Successfully!!'
            });
        } else {
            return res.status(200).json({
                error: true,
                message: 'Error Occurred While updating the Task!!'
            });
        }
    } catch (error) {
        next(error);
    }
};

const changeTodoStatus = async (req, res, next) => {
    try {
        const isTaskExist = await Services.checkIsTaskExist(req.body.todoId);

        if (!isTaskExist) {
            return res.status(200).json({
                error: true,
                message: 'No Such Task Avaiable!!'
            });
        }

        const response = await Services.updateStatus(req.body.todoId);

        if (response) {
            return res.status(200).json({
                error: false,
                message: 'Todo Status Updated!!'
            });
        } else {
            return res.status(200).json({
                error: true,
                message: 'Error Occurred while Changing the Todo Status!!'
            });
        }
    } catch (error) {
        next(error);
    }
};

module.exports = {
    homecontroller,
    createTaskController,
    fetchAllTaskController,
    removeTaskByTaskIdController,
    updateTaskController,
    changeTodoStatus
};
