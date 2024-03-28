const pool = require('../../config/db');
module.exports = {
    createLead: (data, callBack) => {
        pool.query(
            'INSERT INTO lead_file(callerName, callerPhone, callerAddress, callerEmail, callerNOB, service, status, callerDate, qAmount, comments) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [data.callerName, data.callerPhone, data.callerAddress, data.callerEmail, data.callerNOB, data.service, data.status, data.callerDate, data.qAmount,data.comments],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getLead: callBack => {
        pool.query(`SELECT * from lead_file`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            })
    },
    getLeadByID: (id, callBack) => {
        pool.query(`SELECT * from lead_file where id = ?`,
            [id],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results[0])
            })
    },
    updateLead: (data, callBack) => {
        pool.query(`UPDATE lead_file SET callerName = ?, callerPhone = ?, callerAddress = ?, callerEmail = ?, callerNOB = ?, service = ?, status = ?, callerDate = ?, qAmount = ?, comments = ? WHERE id = ? `,
            [data.callerName, data.callerPhone, data.callerAddress, data.callerEmail, data.callerNOB, data.service, data.status, data.callerDate,data.qAmount,data.comments, data.id],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    deleteLead: (data, callBack) => {
        pool.query(
            'DELETE FROM lead_file WHERE id = ?',
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
