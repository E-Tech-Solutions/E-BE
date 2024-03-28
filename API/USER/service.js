const pool = require('../../config/db')
module.exports = {
    create: (data, callBack) => {
        pool.query(`INSERT INTO user_details(uName, uId, uPassword, uRole) VALUES(?,?,?,?)`
            ,
            [
                data.uName,
                data.uId,
                data.uPassword,
                data.uRole,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    getUser: callBack => {
        pool.query(`select id, uName, uId, uRole from user_details`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            })
    },
    login: (uId, callBack) => {
        pool.query(
            `select * from user_details where uId = ?`,
            [uId],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },
    getUserByID: (id, callBack) => {
        pool.query(`select id, uName, uId, uRole from user_details where id = ?`,
            [id],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results[0])
            })
    },
    updateUser: (data, callBack) => {
        pool.query(`
        update user_details set uName = ?, uId = ?, uPassword = ?, uRole = ?  where id = ?;
`,
            [
                data.uName,
                data.uId,
                data.uPassword,
                data.uRole,
                data.id
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    deleteUser: (data, callBack) => {
        pool.query(
            'DELETE FROM user_details WHERE id = ?',
            [data.id],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
}