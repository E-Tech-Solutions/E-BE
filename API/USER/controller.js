const { create, getUser, getUserByID, login, updateUser, deleteUser } = require('./service')
const { genSaltSync, hashSync, compareSync } = require('bcrypt')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { sign } = require("jsonwebtoken")
require('dotenv').config()
module.exports = {
    createUser: (req, res) => {
        const body = req.body
        const salt = genSaltSync(10)
        body.uPassword = hashSync(body.uPassword, salt)
        create(body, (err, results) => {
            if (err) {
                console.log(err)
                return res.status(500).json({
                    success: 0,
                    message: "DB Connection error"
                })
            }
            return res.json({ message: 'User added successfully' });
        })
    },
    getUser: (req, res) => {
        getUser((err, results) => {
            if (err) {
                console.log(err)
                return
            }
            return res.status(200).json(results);
        })
    },
    login: (req, res) => {
        const { uId, uPassword } = req.body;
        login(uId, (err, checkExistingUser) => {
            if (err) {
                console.error(err);
                return res.status(500).json({
                    message: "Internal Server Error"
                });
            }
            if (!checkExistingUser) {
                return res.status(404).json({
                    message: "User Not Found"
                });
            }
            const decryptPass = compareSync(uPassword, checkExistingUser.uPassword);
            if (uId === checkExistingUser.uId && decryptPass) {
                const token = sign({
                    id: checkExistingUser.id,
                    uId: checkExistingUser.uId,
                    uName: checkExistingUser.uName,
                    uPassword: checkExistingUser.uPassword,
                    uRole: checkExistingUser.uRole,
                },
                    process.env.SECRET_KEY
                );

                return res.status(200).json({
                    message: "Successfully Logged In",
                    token: token
                });
            } else {
                return res.json({
                    message: "Invalid Credentials"
                });
            }
        });
    },
    getUserByID: (req, res) => {
        const id = req.params.id
        getUserByID(id, (err, results) => {
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
    updateUser: (req, res) => {
        const body = req.body
        const salt = genSaltSync(10)
        body.uPassword = hashSync(body.uPassword, salt)
        updateUser(body, (err, results) => {
            if (err) {
                console.error('Error updating User:', err);
                res.status(500).json({ message: 'Error updating User' });
            } else {
                console.log('User updated successfully');
                res.json({ message: 'Success' });
            }
        })
    },
    deleteUser: (req, res) => {
        const id = req.params.id;
        deleteUser({ id }, (err, results) => {
            if (err) {
                console.log(err)
                return
            }
            res.json({ message: 'User deleted successfully' })
        })
    },
    logout: (req, res) => {
        res.clearCookie('token');
        return res.json({ Status: "Success" });
    }
}