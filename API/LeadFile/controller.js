const { createLead, getLead, getLeadByID, updateLead, deleteLead } = require('./service');
const moment = require('moment');

module.exports = {
    createLead: (req, res) => {
        const { callerName, callerPhone, callerAddress, callerEmail, callerNOB, service, status, callerDate, qAmount, comments } = req.body;
        const formattedDate = moment(callerDate, 'YYYY-MM-DD', true).format('YYYY-MM-DD');
        if (!formattedDate) {
            res.status(400).json({ message: 'Invalid date format. Use YYYY-MM-DD.' });
            return;
        }
        createLead(
            {
                callerName, callerPhone, callerAddress, callerEmail, callerNOB, service, status, callerDate: formattedDate, qAmount, comments
            },
            (err, results) => {
                if (err) {
                    console.error('Error:', err);
                    res.status(500).json({ message: 'Error adding Lead' });
                } else {
                    console.log('Lead added successfully');
                    res.json({ message: 'Success' });
                }
            }
        );
    },
    getLeadByID: (req, res) => {
        const id = req.params.id
        getLeadByID(id, (err, results) => {
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
    getLead: (req, res) => {
        getLead((err, results) => {
            if (err) {
                console.log(err)
                return
            }
            res.status(200).json(results);
        })
    },
    updateLead: (req, res) => {
        const body = req.body
        updateLead(body, (err, results) => {
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
    deleteLead: (req, res) => {
        const id = req.params.id
        deleteLead({ id }, (err, results) => {
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
                message: "Lead Deleted Success Fully"
            })
        })
    }
};
