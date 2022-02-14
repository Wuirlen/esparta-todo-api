const TaskService = require('../services/TaskService');

module.exports = {
    createTask: async (request, response) => {
        let json = { error: '', result: {} };

        let { title, dateCreated } = request.body;

        if (title && dateCreated) {

            const taskId = await TaskService.createTask(title, dateCreated);

            const taskCreated = await TaskService.getTask(taskId);

            json.result = {
                id: taskCreated.id,
                dateCreated: taskCreated.dateCreated,
                title: taskCreated.title,
                close: taskCreated.closed
            };

        } else json.error = 'Campos não enviados!';

        response.json(json);
    },

    getTasks: async (request, response) => {
        let json = { error: '', result: [] };

        let tasks = await TaskService.getTasks();

        tasks.forEach(task => {

            json.result.push(
                {
                    id: task.id,
                    dateCreated: task.dateCreated,
                    title: task.title,
                    closed: task.closed
                }
            )
        });

        response.json(json);

    },

    getTask: async (request, response) => {
        let json = { error: '', result: {} };

        let { id } = request.params;

        let task = await TaskService.getTask(id);

        if (task) {

            const { id, dateCreated, title, closed } = task;

            json.result = {
                id,
                title,
                dateCreated,
                closed
            }

        } else json.error = 'Task não encontrada';

        response.json(json);
    },


    getTasksActive: async (request, response) => {
        let json = { error: '', result: [] };

        let tasks = await TaskService.getTasksActive();

        tasks.forEach(task => {

            json.result.push(
                {
                    id: task.id,
                    dateCreated: task.dateCreated,
                    title: task.title,
                    closed: task.closed
                }
            )
        });

        response.json(json);
    },

    getTasksClosed: async (request, response) => {
        let json = { error: '', result: [] };

        let tasks = await TaskService.getTasksClosed();

        tasks.forEach(task => {

            json.result.push(
                {
                    id: task.id,
                    dateCreated: task.dateCreated,
                    title: task.title,
                    closed: task.closed
                }
            )
        });

        response.json(json);
    },

    closedTask: async (request, response) => {
        let json = { error: '', message: '', result: [] };

        let { id } = request.params;

        let task = await TaskService.updateTaskStatus(id, true);

        if (task.affectedRows === 1) {
            let updateTask = await TaskService.getTask(id)
            json.result.push(
                {
                    id: updateTask.id,
                    dateCreated: updateTask.dateCreated,
                    title: updateTask.title,
                    closed: updateTask.closed
                }
            );

            json.message = 'Task Closed';
        } else json.error = 'Erro ao realizar operação';

        response.json(json);
    },

    activeTask: async (request, response) => {
        let json = { error: '', message: '', result: [] };

        let { id } = request.params;

        let task = await TaskService.updateTaskStatus(id, false);

        if (task.affectedRows === 1) {
            let updateTask = await TaskService.getTask(id)
            json.result.push(
                {
                    id: updateTask.id,
                    dateCreated: updateTask.dateCreated,
                    title: updateTask.title,
                    closed: updateTask.closed
                }
            );

            json.message = 'Task Active';

        } else json.error = 'Erro ao realizar operação';

        response.json(json);
    },

    taskEdit: async (request, response) => {
        let json = { error: '', message: '', result: [] };

        let { id } = request.params;
        let { title } = request.body;

        let task = await TaskService.taskEdit(id, title);

        let updateTask = await TaskService.getTask(id)

        json.result.push(
            {
                id: updateTask.id,
                dateCreated: updateTask.dateCreated,
                title: updateTask.title,
                closed: updateTask.closed
            }
        );

        json.message = 'Task Edited';

        response.json(json);
    },

    deleteTask: async (request, response) => {
        let json = { result: {} };

        let { id } = request.params;

        const taskDeleted = await TaskService.deleteTask(id);

        if (taskDeleted.affectedRows === 1) {
            json.result.status = 'Success'
            json.result.message = 'Task deleted'
        } else json.result.error = 'Error when trying to perform the operation '

        response.json(json);
    }
}