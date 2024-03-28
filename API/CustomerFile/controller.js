const { createCustomerFile, getCustomerFile, getCustomerFileByID, deleteCustomerFile, updateCustomerFile } = require('./service')

module.exports = {
    createCustomerFile: (req, res) => {
        const body = req.body
        createCustomerFile(body, (err, results) => {
            if (err) {
                console.error('Error:', err);
                res.status(500).json({ message: 'Error adding Customer File' });
            } else {
                console.log('Customer File added successfully');
                res.status(200).json({ message: 'Success' });
            }
        })
    },
    getCustomerFileByID: (req, res) => {
        const id = req.params.id
        getCustomerFileByID(id, (err, results) => {
            if (err) {
                console.log(err)
                return
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "Record not found"
                })
            }
            res.status(200).json(results);
        })
    },
    getCustomerFile: (req, res) => {
        getCustomerFile((err, results) => {
            if (err) {
                console.log(err)
                return
            }
            res.status(200).json(results);
        })
    },
    updateCustomerFile: (req, res) => {
        const body = req.body
        updateCustomerFile(body, (err, results) => {
            if (err) {
                console.log(err)
                return
            } if (!results) {
                return res.json({
                    success: 0,
                    message: "Record Not Found"
                })
            }
            return res.json({
                success: 1,
                message: "Success"
            })
        })
    },
    deleteCustomerFile: (req, res) => {
        const id = req.params.id
        deleteCustomerFile({ id }, (err, results) => {
            if (err) {
                console.log(err)
                return
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "Record Not Found"
                })
            }
            return res.json({
                success: 1,
                message: "Customer File Deleted Success Fully"
            })
        })
    }
}