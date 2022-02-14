const database = require('../database');

module.exports = {

    createTask: (title, dateCreated) => {
        return new Promise((resolve, reject) => {
            database.query('INSERT INTO tasks (title, dateCreated, closed) VALUES (?, ?, ?)', [title, dateCreated, false],
                (error, result) => {
                    if (error) {
                        reject(error);
                        return;
                    }

                    resolve(result.insertId)

                })
        });
    },

    getTasks: () => {
        return new Promise((resolve, reject) => {
            database.query('SELECT * FROM tasks',
                (error, result) => {
                    if (error) {
                        reject(error);
                        return;
                    }

                    resolve(result);
                })
        });
    },

    getTask: (id) => {
        return new Promise((resolve, reject) => {
            database.query('SELECT * FROM tasks WHERE id = ?', [id],
                (error, result) => {
                    if (error) {
                        reject(error);
                        return;
                    }

                    (result.length > 0)
                        ? resolve(result[0])
                        : resolve(false);
                })
        });
    },

    getTasksActive: () => {
        return new Promise((resolve, reject) => {
            database.query('SELECT * FROM tasks WHERE closed = ?', [false],
                (error, result) => {
                    if (error) {
                        reject(error);
                        return;
                    }

                    resolve(result);
                })
        });
    },

    getTasksClosed: () => {
        return new Promise((resolve, reject) => {
            database.query('SELECT * FROM tasks WHERE closed = ?', [true],
                (error, result) => {
                    if (error) {
                        reject(error);
                        return;
                    }

                    resolve(result);
                })
        });
    },

    updateTaskStatus: (id, closed) => {
        return new Promise((resolve, reject) => {
            database.query('UPDATE tasks SET closed = ? WHERE id = ?', [closed, id],
                (error, result) => {
                    if (error) {
                        reject(error);
                        return;
                    }

                    resolve(result);
                })
        });
    },

    taskEdit: (id, title) => {
        return new Promise((resolve, reject) => {
            database.query('UPDATE tasks SET title = ? WHERE id = ?', [title, id],
                (error, result) => {
                    if (error) {
                        reject(error);
                        return;
                    }

                    resolve(result);
                })
        });
    },

    deleteTask: (id) => {
        return new Promise((resolve, reject) => {
            database.query('DELETE FROM tasks WHERE id = ? ', [id],
                (error, result) => {
                    if (error) {
                        reject(error);
                        return;
                    }

                    resolve(result);
                })
        });
    },

}
