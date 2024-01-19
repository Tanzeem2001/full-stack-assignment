const express = require('express');
const Transaction = require('../model/TransactionModel');
const router = express.Router();

// Define the isValidMonth function
function isValidMonth(month) {
  const validMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  return validMonths.includes(month);
}

router.get('/', async (req, res) => {
  try {
    const { month, search, page = 1, perPage = 10 } = req.query;

    // Validate month input
    if (!isValidMonth(month)) {
      return res.status(400).json({ message: 'Invalid month' });
    }

    // Construct the date range for the specified month
    const startDate = new Date(`${month}-01`);
    const endDate = new Date(new Date(startDate).setMonth(startDate.getMonth() + 1) - 1);

    // Construct the query object based on search and date range
    // const query = {
    //   dateOfSale: {
    //     $gte: startDate,
    //     $lte: endDate,
    //   },
    //   $or: [
    //     { title: { $regex: search || '', $options: 'i' } },
    //     { description: { $regex: search || '', $options: 'i' } },
    //     { price: { $regex: search || '', $options: 'i' } },
    //   ],
    // };
const query = {
  dateOfSale: {
    $gte: startDate,
    $lte: endDate,
  },
  $or: [
    { title: { $regex: search || '', $options: 'i' } },
    { description: { $regex: search || '', $options: 'i' } },
    // Use $gte and $lte for numeric price comparisons
    { price: { $gte: parseFloat(search) || 0, $lte: parseFloat(search) || Number.MAX_SAFE_INTEGER } },
  ],
};
    // Count total records for pagination
    const totalRecords = await Transaction.countDocuments(query);

    // Fetch transactions with pagination
    const transactions = await Transaction.find(query)
      .skip((page - 1) * perPage)
      .limit(parseInt(perPage));

    res.json({
      totalRecords,
      currentPage: parseInt(page),
      totalPages: Math.ceil(totalRecords / perPage),
      transactions,
    });
    
  } catch (error) {
    console.error(error);
    const errorMessage = process.env.NODE_ENV === 'production' ? 'Internal Server Error' : error.message;
    res.status(500).json({ message: errorMessage });
  }
});

module.exports = router;
