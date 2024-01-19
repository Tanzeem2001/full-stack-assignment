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

    const soldItems = await Transaction.countDocuments({
      dateOfSale: {
        $gte: startDate,
        $lte: endDate,
      },
      sold: true,
    });

    const unsoldItems = await Transaction.countDocuments({
      dateOfSale: {
        $gte: startDate,
        $lte: endDate,
      },
      sold: false,
    });

    const totalSaleAmount = await Transaction.aggregate([
      {
        $match: {
          dateOfSale: {
            $gte: startDate,
            $lte: endDate,
          },
          sold: true,
        },
      },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: '$price' },
        },
      },
    ]);

    const statistics = {
      totalSaleAmount: totalSaleAmount.length > 0 ? totalSaleAmount[0].totalAmount : 0,
      totalSoldItems: soldItems,
      totalUnsoldItems: unsoldItems,
    };

    res.json(statistics);
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
