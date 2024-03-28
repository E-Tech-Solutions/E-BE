const { createUser, getUser, getUserByID, login, updateUser, deleteUser, logout } = require('./controller')
const router = require('express').Router()


router.post("/signup", createUser)
router.post("/login", login)
router.get("/get-all-user", getUser)
router.get("/get-user-by-id/:id", getUserByID)
router.put("/update-user/:id", updateUser)
router.delete("/delete-user/:id", deleteUser)
router.get('/logout',logout)

module.exports = router