const express = require('express');
const {
    performOperation,
    getHistory,
    clearHistory,
    resetHistory
} = require('../controllers/operation.controllers.js')

const router = express.Router();

// Routes for API

router.post('/operations', performOperation);

router.get('/history', getHistory);

router.delete('/history/:id', clearHistory);

router.delete('/history', resetHistory);



module.exports = router;