const {
   computeResult,
   retrieveCalculationHistory,
   deleteOperationById,
   resetCalculationHistory
} = require('../services/operation.service.js');

const performOperation = async (req, res) => {
    const email = req.headers['email'];
    console.log(email);
    const payload = req.body;

    try {
        const result = await computeResult(payload,email);
        res.status(201).json({ result });
    } catch (error) {
        console.error('Error performing operation:', error);
        res.status(500).json({ error: 'An error occurred while performing the operation.' });
    }
};

const getHistory = async (req, res) => {
    const email = req.headers['email'];

    try {
        
        const userHistory = await retrieveCalculationHistory(email);
        res.send(userHistory);

    } catch (error) {

        console.error('Error fetching history:', error);
        res.status(500).json({ error: 'An error occurred while fetching history.' });

    }
};

const clearHistory = async (req, res) => {
    const { id } = req.params;

    try {

        const deletedHistory = await deleteOperationById(id);
        res.send('History cleared');

    } catch (error) {

        console.error('Error clearing history:', error);
        res.status(500).json({ error: 'An error occurred while clearing history.' });
    }
};

const resetHistory = async (req, res) => {
    const email = req.headers['email'];

    try {

        await resetCalculationHistory(email);
        res.send('History reset');

    } catch (error) {

        console.error('Error resetting history:', error);
        res.status(500).json({ error: 'An error occurred while resetting history.' });
        
    }
};

module.exports = {
    performOperation,
    getHistory,
    clearHistory,
    resetHistory
};
