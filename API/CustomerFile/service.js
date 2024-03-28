const pool = require('../../config/db')

module.exports = { 
    createCustomerFile: (data, callBack) => {
        pool.query('INSERT INTO customer_file(cFile) VALUES (?)',
            [data.cFile],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getCustomerFile: callBack => {
        pool.query(`select id ,cFile from customer_file`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            })
    },
    getCustomerFileByID: (id, callBack) => {
        pool.query(`select id ,cFile from customer_file where id = ?`,
            [id],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results[0])
            })
    },
    updateCustomerFile: (data, callBack) => {
        pool.query(`update customer_file set cFile = ? where id = ?`,
            [data.cFile, data.id],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    deleteCustomerFile: (data, callBack) => {
        pool.query(
            'DELETE FROM customer_file WHERE id = ?',
            [data.id],
            (error, results, fields) => {
                if (error) {
                    console.error('Error deleting Customer File:', error);
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    }
}