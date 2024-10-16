
const express = require('express');
const dotenv = require('dotenv');
const { dbconnect } = require('./db/database.js');

const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const path = require('path');
const swaggerDocument = YAML.load(path.join(__dirname, './swagger/swagger.yaml'));
const calculatorRoutes = require('./routes/operation.routes.js');

dotenv.config();

const app = express();
app.use(express.json());
// Connect to MongoDB
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
dbconnect();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// Routes
app.use('/api/calculators', calculatorRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports={app};