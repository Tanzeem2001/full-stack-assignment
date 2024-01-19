const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 8000;
const db = require("./db.js");
const Initialize = require('./routes/Initialize.js');
const Transaction = require('./routes/Transaction.js');
const Statistics = require('./routes/Statistics.js');
const Barchart = require('./routes/Barchart.js');
const PieChart = require('./routes/Piechart.js');
const Combine = require('./routes/Combine.js')
// Body Parser Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routing
app.use('/api/initialize-database', Initialize);
app.use('/api/transactions', Transaction);
app.use('/statistics', Statistics);
app.use('/barchart', Barchart);
app.use('/piechart',PieChart);
app.use('/combine', Combine);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
