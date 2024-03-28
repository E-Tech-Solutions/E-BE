const { createLead, getLead, getLeadByID, deleteLead, updateLead } = require('./controller');
const express = require('express');
const router = express.Router();

router.post('/lead', createLead);
router.get('/get-lead', getLead);
router.get('/get-lead-by-id/:id', getLeadByID);
router.put('/update-lead/:id', updateLead);
router.delete('/delete-lead/:id', deleteLead)

module.exports = router;
