const express = require('express');
const axios = require('axios');
const Transaction = require('../model/TransactionModel'); // Import your model

const router = express.Router();

// Initialization Endpoint
router.get('/', async (req, res) => {
  try {
    // Fetch data from the third-party API
    const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
    const seedData = response.data;

    // Initialize the database with seed data
    await Transaction.collection.insertMany(seedData);

    res.json({ message: 'Database initialized successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
