const { Sequelize } = require('sequelize');
const dataBase = require('../index');
const Tasks = dataBase.task;

const checkIsPriorityExist = async priority => {
    const isExist = await Tasks.findOne({
        where: {
            priority
        }
    });
    return isExist;
};

const createNewTask = async reqObj => {
    return await Tasks.create(reqObj);
};

const fetchAllTask = async () => {
    return await Tasks.findAll();
};

const checkIsTaskExist = async taskId => {
    const isTaskExist = await Tasks.findOne({
        where: {
            id: taskId
        }
    });

    if (isTaskExist) {
        return true;
    } else {
        return false;
    }
};

const removeTaskById = async taskId => {
    return await Tasks.destroy({
        where: {
            id: taskId
        }
    });
};

const checkIsPriorityAvailable = async body => {
    const isDataExist = await Tasks.findOne({
        where: {
            priority: body.priority
        }
    });

    if ((!isDataExist) || (isDataExist.id == body.taskId)) {
        return false;
    }

    return true;
};

const updateAvailableTask = async body => {
    return await Tasks.update(body, {
        where: {
            id: body.taskId
        }
    });
};

const updateStatus = async todoId => {
    const isDataExist = await Tasks.findOne({
        where: {
            id: todoId
        }
    });

    return await Tasks.update({
        completed: !isDataExist.completed
    }, {
        where: {
            id: todoId
        }
    });
}

module.exports = {
    checkIsPriorityExist,
    createNewTask,
    fetchAllTask,
    checkIsTaskExist,
    removeTaskById,
    checkIsPriorityAvailable,
    updateAvailableTask,
    updateStatus
};
