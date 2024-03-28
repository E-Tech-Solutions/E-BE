const { createCustomerFile, getCustomerFile, getCustomerFileByID, updateCustomerFile, deleteCustomerFile } = require('./controller');
const express = require('express');
const router = express.Router();

router.post('/customer-file', createCustomerFile)
router.get('/get-customer-file', getCustomerFile)
router.get('/get-customer-file-by-id/:id', getCustomerFileByID)
router.put('/update-customer-file/:id', updateCustomerFile)
router.delete('/delete-customer-file/:id', deleteCustomerFile);

module.exports = router