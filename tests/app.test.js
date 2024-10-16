

const mongoose = require('mongoose');
const Operation = require('../src/models/operation.model.js');
const {
    computeResult,
    retrieveCalculationHistory,
    deleteOperationById,
    resetCalculationHistory
} = require('../src/services/operation.service.js');

jest.mock('../src/models/operation.model.js'); // Mock the Operation model

describe('Operation Service Test Cases', () => {
    let operationCreateMock, operationFindMock, operationDeleteMock;

    beforeEach(() => {
        // Mock Mongoose methods
        operationCreateMock = Operation.prototype.save = jest.fn();
        operationFindMock = Operation.find = jest.fn();
        operationDeleteMock = Operation.findByIdAndDelete = jest.fn();
        Operation.deleteMany = jest.fn(); // Mock deleteMany
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should perform addition correctly', async () => {
        const payload = { operand1: 5, operand2: 3, operator: 'add' };
        const result = await computeResult(payload, 'test@example.com');
        expect(result).toBe(8);
    });

    it('should perform subtraction correctly', async () => {
        const payload = { operand1: 10, operand2: 4, operator: 'sub' };
        const result = await computeResult(payload, 'test@example.com');
        expect(result).toBe(6);
    });

    it('should perform multiplication correctly', async () => {
        const payload = { operand1: 4, operand2: 5, operator: 'mul' };
        const result = await computeResult(payload, 'test@example.com');
        expect(result).toBe(20);
    });

    it('should perform division correctly', async () => {
        const payload = { operand1: 20, operand2: 4, operator: 'div' };
        const result = await computeResult(payload, 'test@example.com');
        expect(result).toBe(5);
    });

    it('should throw error when dividing by zero', async () => {
        const payload = { operand1: 20, operand2: 0, operator: 'div' };
        await expect(computeResult(payload, 'test@example.com')).rejects.toThrow('Cannot divide by zero');
    });

    it('should handle invalid operator', async () => {
        const payload = { operand1: 10, operand2: 5, operator: 'INVALID_OP' };
        await expect(computeResult(payload, 'test@example.com')).rejects.toThrow('Invalid operator');
    });

    it('should save operation to history', async () => {
        const payload = { operand1: 5, operand2: 3, operator: 'add' };
        const expectedResult = { operand1: 5, operand2: 3, operator: 'add', result: 8, email: 'test@example.com' };
        
        // Mock save method to resolve to the expected result
        operationCreateMock.mockResolvedValue(expectedResult);
        const result = await computeResult(payload, 'test@example.com');
        
        expect(operationCreateMock).toHaveBeenCalled(); // Ensure it called the model's save method
        expect(result).toBe(8); // Ensure the correct result was returned
    });

    it('should fetch history for a user', async () => {
        const email = 'test@example.com';
        const mockHistory = [
            { operand1: 5, operand2: 3, operator: 'add', result: 8, email },
            { operand1: 10, operand2: 2, operator: 'sub', result: 8, email }
        ];
        
        operationFindMock.mockResolvedValue(mockHistory);
        const history = await retrieveCalculationHistory(email);
        
        expect(history.length).toBe(2); // Should return 2 history records
        expect(history[0].result).toBe(8);
        expect(history[1].result).toBe(8);
    });

    it('should clear specific operation history', async () => {
        const id = 'fakeId';
        operationDeleteMock.mockResolvedValue({ acknowledged: true });
        const deleted = await deleteOperationById(id);
        
        expect(operationDeleteMock).toHaveBeenCalledWith(id); // Ensure the right ID was passed
        expect(deleted.acknowledged).toBe(true); // Check if deletion was acknowledged
    });

    it('should reset all operation history for a user', async () => {
        const email = 'test@example.com';
        const mockDeletedCount = { deletedCount: 3 };

        // Mock the deleteMany method to resolve to the mockDeletedCount
        Operation.deleteMany.mockResolvedValue(mockDeletedCount);
        
        const result = await resetCalculationHistory(email);
        
        expect(result.deletedCount).toBe(3); // Expect that 3 entries were deleted
    });
});




// const mongoose = require('mongoose');
// const Operation = require('../src/models/operation.model.js');
// const {
//     computeResult,
//    retrieveCalculationHistory,
//    deleteOperationById,
//    resetCalculationHistory
// } = require('../src/services/operation.service.js');

// jest.mock('../src/models/operation.model.js'); // Mock the Operation model
// describe('Operation Service Test Cases', () => {
//   let operationCreateMock, operationFindMock, operationDeleteMock;
//   beforeEach(() => {
//     // Mock Mongoose methods
//     operationCreateMock = Operation.prototype.save = jest.fn();
//     operationFindMock = Operation.find = jest.fn();
//     operationDeleteMock = Operation.findByIdAndDelete = jest.fn();
//   });
//   afterEach(() => {
//     jest.clearAllMocks();
//   });
//   it('should perform addition correctly', async () => {
//     const payload = { operand1: 5, operand2: 3, operator: 'add' };
//     const result = await computeResult(payload, 'test@example.com');
//     expect(result).toBe(8);
//   });
//   it('should perform subtraction correctly', async () => {
//     const payload = { operand1: 10, operand2: 4, operator: 'sub' };
//     const result = await  computeResult(payload, 'test@example.com');
//     expect(result).toBe(6);
//   });
//   it('should perform multiplication correctly', async () => {
//     const payload = { operand1: 4, operand2: 5, operator: 'mul' };
//     const result = await  computeResult(payload, 'test@example.com');
//     expect(result).toBe(20);
//   });
//   it('should perform division correctly', async () => {
//     const payload = { operand1: 20, operand2: 4, operator: 'div' };
//     const result = await  computeResult(payload, 'test@example.com');
//     expect(result).toBe(5);
//   });
//   it('should throw error when dividing by zero', async () => {
//     const payload = { operand1: 20, operand2: 0, operator: 'div' };
//     await expect( computeResult(payload, 'test@example.com')).rejects.toThrow('Cannot divide by zero');
//   });
//   it('should handle invalid operator', async () => {
//     const payload = { operand1: 10, operand2: 5, operator: 'INVALID_OP' };
//     await expect(computeResult(payload, 'test@example.com')).rejects.toThrow('Invalid operator');
//   });
//   it('should save operation to history', async () => {
//     const payload = { operand1: 5, operand2: 3, operator: 'add' };
//     const expectedResult = { operand1: 5, operand2: 3, operator: 'add', result: 8, email: 'test@example.com' };
//     operationCreateMock.mockResolvedValue(expectedResult);
//     const result = await  computeResult(payload, 'test@example.com');
//     expect(operationCreateMock).toHaveBeenCalled(); // Ensure it called the model's save method
//     expect(result).toBe(8); // Ensure the correct result was returned
//   });
//   it('should fetch history for a user', async () => {
//     const email = 'test@example.com';
//     const mockHistory = [
//       { operand1: 5, operand2: 3, operator: 'add', result: 8, email },
//       { operand1: 10, operand2: 2, operator: 'sub', result: 8, email }
//     ];
//     operationFindMock.mockResolvedValue(mockHistory);
//     const history = await retrieveCalculationHistory(email);
//     expect(history.length).toBe(2); // Should return 2 history records
//     expect(history[0].result).toBe(8);
//     expect(history[1].result).toBe(8);
//   });
//   it('should clear specific operation history', async () => {
//     const id = 'fakeId';
//     operationDeleteMock.mockResolvedValue({ acknowledged: true });
//     const deleted = await deleteOperationById(id);
//     expect(operationDeleteMock).toHaveBeenCalledWith(id); // Ensure the right ID was passed
//     expect(deleted.acknowledged).toBe(true); // Check if deletion was acknowledged
//   });
//   it('should reset all operation history for a user', async () => {
//     const email = 'test@example.com';
//     const mockDeletedCount = { deletedCount: 3 };
//     Operation.deleteMany.mockResolvedValue(mockDeletedCount);
//     const result = await resetCalculationHistory(email);
//     expect(result.deletedCount).toBe(3); // Expect that 3 entries were deleted
//   });
// });