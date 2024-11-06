const  History  = require('../models/operation.model.js');

const computeResult = async (payload, email) => {
    const { operand1, operand2, operator } = payload;

    // Input validation
    if (typeof operand1 !== 'number' || typeof operand2 !== 'number') {
        throw new Error('Operands must be valid numbers');
    }

    let result;

    try {
        switch (operator) {
            case 'add':
                result = operand1 + operand2;
                break;
            case 'sub':
                result = operand1 - operand2;
                break;
            case 'mul':
                result = operand1 * operand2;
                break;
            case 'div':
                if (operand2 === 0) throw new Error('Cannot divide by zero');
                result = operand1 / operand2;
                break;
            default:
                throw new Error('Invalid operator');
        }

        // Ensure result is a valid number before saving
        if (isNaN(result)) {
            throw new Error('Result is not a valid number');
        }

        // Create and save the operation record
        const newOperation = new History({ operand1, operand2, operator, result, email });
        await newOperation.save();

        // Return the computed result
        return result;

    } catch (error) {
        console.error('Error in computeResult:', error);
        throw error; // Re-throw the error for consistent handling
    }
};

const retrieveCalculationHistory = async(email) => {

    try{
        const userHistory = await History.find({email:email});
        return userHistory
    }catch(error){
          console.error('Error retrieving history:', error);
    }
    
}

const deleteOperationById = async(id) => {
    try{
        const deletedHistory = await History.findByIdAndDelete(id);
        return deletedHistory
    }catch(error){
          console.error('Error retrieving history:', error);
    }
    
}

const resetCalculationHistory = async(email) => {
    try{
         const result = await History.deleteMany({email});
         return result;
    }catch(error){
          console.error('Error retrieving history:', error);
    }
   
}
module.exports = {
   computeResult,
   retrieveCalculationHistory,
   deleteOperationById,
   resetCalculationHistory
}