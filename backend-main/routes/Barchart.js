const express = require('express');
const Transaction = require('../model/TransactionModel');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { month } = req.query;

    if (!isValidMonth(month)) {
      return res.status(400).json({ message: 'Invalid month' });
    }

    const startDate = new Date(`${month}-01`);
    const endDate = new Date(new Date(startDate).setMonth(startDate.getMonth() + 1) - 1);

    const priceRanges = [
      { min: 0, max: 100 },
      { min: 101, max: 200 },
      { min: 201, max: 300 },
      { min: 301, max: 400 },
      { min: 401, max: 500 },
      { min: 501, max: 600 },
      { min: 601, max: 700 },
      { min: 701, max: 800 },
      { min: 801, max: 900 },
      { min: 901, max: Number.MAX_SAFE_INTEGER },
    ];

    const barChartData = await Promise.all(priceRanges.map(async (range) => {
      const count = await Transaction.countDocuments({
        dateOfSale: {
          $gte: startDate,
          $lte: endDate,
        },
        price: { $gte: range.min, $lte: range.max },
      });
      return {
        priceRange: `${range.min}-${range.max}`,
        itemCount: count,
      };
    }));

    res.json(barChartData);
  } catch (error) {
    console.error(error);
    const errorMessage = process.env.NODE_ENV === 'production' ? 'Internal Server Error' : error.message;
    res.status(500).json({ message: errorMessage });
  }
});

function isValidMonth(month) {
  const validMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  return validMonths.includes(month);
}

module.exports = router;
