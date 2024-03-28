const pool = require('../../config/db');
module.exports = {
    createTask: (data, callBack) => {
        const { cName, eName, reqDate, status, sDate, cDate, details } = data;

        const mainQuery = 'INSERT INTO task_table(cName, eName, reqDate, status, sDate,cDate) VALUES (?, ?, ?, ?, ?, ?)';

        pool.query(mainQuery, [cName, eName, reqDate, status, sDate, cDate], (mainErr, mainResults) => {
            if (mainErr) {
                return callBack(mainErr);
            }
 
            const detailQuery =
                'INSERT INTO task_table_detail(task_id, task, task_status) VALUES ?';
            const detailValues = details.map(detailItem => [
                mainResults.insertId,
                detailItem.task,
                detailItem.task_status
            ]);

            pool.query(detailQuery, [detailValues], (detailErr, detailResults) => {
                if (detailErr) {
                    return callBack(detailErr);
                }

                return callBack(null, { mainResults, detailResults });
            });
        });
    },
    getTask: (callBack) => {
        const query = `
        SELECT c.*, 
        GROUP_CONCAT(
            JSON_OBJECT(
                'id', d.id,
                'task', d.task,
                'task_status', d.task_status
            )
        ) AS details,
        cName.cFile AS customer_name,
        uName.uName AS employee_name
 FROM task_table c
 LEFT JOIN customer_file cName ON c.cName = cName.id
 LEFT JOIN user_details uName ON c.eName = uName.uId
 LEFT JOIN task_table_detail d ON c.id = d.task_id
 GROUP BY c.id, cName.cFile, uName.uName;
 `;

        pool.query(query, (error, results, fields) => {
            if (error) {
                return callBack(error);
            }
            const formattedResults = results.map(result => ({
                ...result,
                details: result.details ? JSON.parse(`[${result.details}]`) : []
            }));

            return callBack(null, formattedResults);
        });
    },
    getTaskByID: (id, callBack) => {
        const query = `
        SELECT c.*, 
        GROUP_CONCAT(
            JSON_OBJECT(
                'id', d.id,
                'task', d.task,
                'task_status', d.task_status
            )
        ) AS details,
        cName.cFile AS customer_name,
        uName.uName AS employee_name
    FROM task_table c
    LEFT JOIN customer_file cName ON c.cName = cName.id
    LEFT JOIN user_details uName ON c.eName = uName.uId
    LEFT JOIN task_table_detail d ON c.id = d.task_id
    WHERE c.id = ?
    GROUP BY c.id, cName.cFile, uName.uName`;
        pool.query(query, [id], (error, results, fields) => {
            if (error) {
                return callBack(error);
            }

            if (results.length === 0) {
                return callBack({ message: 'Bank Receipt not found' });
            }

            const formattedResult = {
                ...results[0],
                details: results[0].details ? JSON.parse(`[${results[0].details}]`) : []
            };

            return callBack(null, formattedResult);
        });
    },
    // updateTask: (data, callBack) => {
    //     pool.query(`UPDATE task_table SET cName = ?, cTask = ?, eName = ?, reqDate = ?, status = ?, sDate = ?, cDate = ? WHERE id = ? `,
    //         [data.cName, data.cTask, data.eName, data.reqDate, data.status, data.sDate, data.cDate, data.id],
    //         (error, results, feilds) => {
    //             if (error) {
    //                 return callBack(error)
    //             }
    //             return callBack(null, results)
    //         }
    //     )
    // },
    updateTask: (data, callBack) => {
        const { cName, eName, reqDate, status, sDate, cDate, details, id } = data;

        const deleteDetailQuery = 'DELETE FROM task_table_detail WHERE task_id = ?';

        pool.query(deleteDetailQuery, [id], (deleteErr, deleteResults) => {
            if (deleteErr) {
                return callBack(deleteErr);
            }

            const insertDetailQuery =
            'INSERT INTO task_table_detail(task_id, task, task_status) VALUES ?';
            const detailValues = details.map(detailItem => [
                id,
                detailItem.task,
                detailItem.task_status
            ]);

            pool.query(insertDetailQuery, [detailValues], (insertErr, insertResults) => {
                if (insertErr) {
                    return callBack(insertErr);
                }
                const mainQuery = `
                    UPDATE task_table
                    SET cName = ?, eName = ?, reqDate = ?, status = ?, sDate = ?, cDate = ?
                    WHERE id = ?`;

                pool.query(mainQuery, [cName, eName, reqDate, status, sDate, cDate, id], (mainErr, mainResults) => {
                    if (mainErr) {
                        return callBack(mainErr);
                    }
                    return callBack(null, { mainResults, insertResults });
                });
            });
        });
    },
    updateEmployeeTask: (data, callBack) => {
        const { status, details, id } = data;

        const deleteDetailQuery = 'DELETE FROM task_table_detail WHERE task_id = ?';

        pool.query(deleteDetailQuery, [id], (deleteErr, deleteResults) => {
            if (deleteErr) {
                return callBack(deleteErr);
            }

            const insertDetailQuery =
            'INSERT INTO task_table_detail(task_id, task, task_status) VALUES ?';
            const detailValues = details.map(detailItem => [
                id,
                detailItem.task,
                detailItem.task_status
            ]);

            pool.query(insertDetailQuery, [detailValues], (insertErr, insertResults) => {
                if (insertErr) {
                    return callBack(insertErr);
                }
                const mainQuery = `
                    UPDATE task_table
                    SET status = ? WHERE id = ?`;

                pool.query(mainQuery, [status, id], (mainErr, mainResults) => {
                    if (mainErr) {
                        return callBack(mainErr);
                    }
                    return callBack(null, { mainResults, insertResults });
                });
            });
        });
    },
    deleteTask: (data, callBack) => {
        pool.query(
            'DELETE FROM task_table WHERE id = ?',
            [data.id],
            (error, results, fields) => {
                if (error) {
                    console.error('Error deleting project file:', error);
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    }
};
