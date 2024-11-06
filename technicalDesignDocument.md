# Basic Calculator Design Document
Author: Aakriti Khanna


## Introduction

The goal of this document is to design a basic calculator application with essential functions (addition, subtraction, multiplication, and division) while also incorporating user-based history. The calculator will store the user's calculation history based on their email, allowing users to retrieve their previous calculations.

## Background

The application will behave similarly to a standard handheld calculator. It is intended to be intuitive for users who are familiar with basic calculators, but with the added functionality of saving and retrieving the calculation history per user using their email.
Users will be able to:
Perform basic arithmetic operations (addition, subtraction, multiplication, division).
View their calculation history by entering their email.


## Features

### In Scope

**Core Calculator Functionality:**
- Addition (add)
- Subtraction (sub)
- Multiplication (mul)
- Division (div)
- Clear/reset functionality

**User-Based History:**
- Save Calculation History: Each calculation will be saved using the user's email as an identifier.
- Retrieve Calculation History: The user can view their past calculations by providing their email.

### Out of Scope
- Authentication system (e.g., password-based login).
- Advanced calculator functionalities (e.g., square roots, exponentiation).
- User Interface (UI) design for the application. Only backend and logic design are covered.

## Requirements

### Functional Requirements

**Perform Arithmetic Operations:**
- The user should be able to input two numbers and an operator (+, -, ×, ÷).
- The system should return the result of the operation immediately.
- Division by zero should return an appropriate error message.
Store Calculation History:
- After every calculation, the result should be saved in a database with the associated user's email and the details of the calculation (operands, operation, result, and timestamp).

**Retrieve Calculation History:**
- Users should be able to view their past calculations based on their email.
- The system should return the list of previous operations with details like the operands, operation, result, and timestamp.

**Clear/Reset Functionality:**
- The system should provide a "clear" function to reset the input fields and result.

**Input Validation:**
- The system should ensure that inputs are valid numbers and operators are one of the supported arithmetic operators (+, -, ×, ÷).
- Invalid inputs should return error messages.

### Non-Functional Requirements

- **Performance:**
The system should handle multiple user requests and calculations simultaneously without delays.
The calculation results should be returned in real-time (low latency).

### Technical Requirements
- **Backend:** Node.js(with Express).
- **Database:** MongoDB for storing the history of a user based on email.
- **Testing:** Jest for testing the server.


## Proposal

The solution will consist of a basic backend service that performs arithmetic operations, stores user-specific calculation history in a database, and retrieves the history based on user email input.
The system will implement basic input validation and error handling for operations like division by zero or invalid inputs. Users will be able to interact with the system by providing inputs (two numbers and an operator) and their email to view their history.

### Data Model

The application will use a simple data model to store user history and operations.

### Schema Definition:

**User_Calculation_History:**
- id: Unique identifier for each calculation entry.
- email: The email address provided by the user (used as an identifier).
- operands: array of operands
- operation: Type of operation (addition, subtraction, multiplication, division).
- result: Result of the operation.
- timestamp: The exact time when the operation was performed.


### Validation:
- Ensure that the email is in a valid format.
- Operand values must be numeric.
- Operation must be one of the allowed types: add, sub, mul, div.

### API/Interface Changes

The application will expose the following APIs for interaction.

**REST Endpoints:**

**API Endpoint for Calculate:**
- Endpoint: /operations
- Method: POST
- Payload:
- "+"
```json
{
  "email": "user@example.com",
  "operand1": 10,
  "operand2": 20,
  "operator": "+",
}
```
- "-"
```json
{
  "email": "user@example.com",
  "operand1": 20,
  "operand2": 10,
  "operator": "-",
}
```

- "*"
```json
{
  "email": "user@example.com",
  "operand1": 10,
  "operand2": 20,
  "operator": "*",
}
```

- "/"
```json
{
  "email": "user@example.com",
  "operand1": 20,
  "operand2": 10,
  "operator": "/",
}
```

- Response:
- result: Result of the calculation.
In case of an error (e.g., division by zero), return an appropriate error message.

- "+"
```json
{
"output": 30
}
```


- "-"
```json
{
"output": 10
}
```


- "*"
```josn
{
"output": 200
}
```


- "/"
```json
{
"output": 2
}
```



**API Endpoint for History**

- Endpoint: /history
- Method: GET
- Headers: email
- Response: Return a list of past calculations performed by the user, including operands, operations, results, and timestamps.

```json
[{
"operand1": 10,
"operand2": 20,
"operator": "+",
"output": 30,
"timestamp": "14-10-24 6:06pm"
},
{
"operand1": 20,
"operand2": 10,
"operator": "-",
"output": 10,
"timestamp": "14-10-24 6:16pm"
},
{
"operand1": 10,
"operand2": 20,
"operator": "*",
"output": 200,
"timestamp": "14-10-24 6:06pm"
},
{
"operand1": 20,
"operand2": 10,
"operator": "/",
"output": 2,
"timestamp": "14-10-24 6:06pm"
}]
```

- Endpoint: /history/:id 
- Method: DELETE
- Header: email
- queryParams: id
- Response: Delete single user history

- Endpoint: /history
- Method: DELETE
- Header: email
- Response: Delete all history of a user


**Error States:**

- Invalid input: If the user enters invalid numbers or an unsupported operation, the system should return a "400 Bad Request" response with an error message.
- Division by zero: Return an error response indicating that division by zero is not allowed.


###System Design

**A potential system diagram might include:**
- Frontend/Client (Out of Scope): User interface to input numbers, operations, and view history.
- Calculator Service: Handles the core arithmetic operations and input validation.
- History Service: Handles saving and retrieving calculation history using the email as an identifier.
- Database: Stores the user history and associated data (operation, result, timestamp).

**High-Level Flow:**
- The user inputs two numbers, selects an operator, and enters their email.
- The request is sent to the Calculator Service, which performs the operation.
- The result is returned and saved in the database by the History Service.
- The user can then request to view their history by providing their email, which - is retrieved from the database and displayed.

## Conclusion

This document outlines the functional and non-functional requirements for designing a basic calculator application that supports core arithmetic operations and saves the user's calculation history based on their email. The proposed system design focuses on ensuring simplicity, usability, and performance while considering scalability and security factors.