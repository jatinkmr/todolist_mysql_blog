module.exports = (sequelize, DataTypes) => {
    const Task = sequelize.define("task", {
        taskname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        priority: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        completed: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    }, {
        timestamps: true
    })

    return Task;
};