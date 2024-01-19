// // TransactionsStatistics.js
// import React, { useState, useEffect } from 'react';
// import './TransactionsStatistics.css'; // Adjust the path based on your project structure

// function TransactionsStatistics({ selectedMonth }) {
//   const [statistics, setStatistics] = useState({});

//   useEffect(() => {
//     // Fetch statistics when the component mounts or when selectedMonth changes
//     fetchStatistics();
//   }, [selectedMonth]);

//   const fetchStatistics = () => {
//     // Replace 'YOUR_STATISTICS_API_ENDPOINT' with the actual API endpoint
//     fetch(`YOUR_STATISTICS_API_ENDPOINT?month=${selectedMonth}`)
//       .then(response => response.json())
//       .then(data => setStatistics(data))
//       .catch(error => console.error('Error fetching statistics:', error));
//   };

//   return (
//     <div className="transactions-statistics">
//       <h3>Transactions Statistics</h3>
//       {/* Display total amount, total sold items, and total not sold items using statistics */}
//       <div className="statistics-item">Total Amount: {statistics.totalAmount}</div>
//       <div className="statistics-item">Total Sold Items: {statistics.totalSoldItems}</div>
//       <div className="statistics-item">Total Not Sold Items: {statistics.totalNotSoldItems}</div>
//     </div>
//   );
// }

// export default TransactionsStatistics;



// TransactionsStatistics.js
import React, { useState, useEffect } from 'react';

function TransactionsStatistics({ selectedMonth }) {
  const [statistics, setStatistics] = useState({});

  useEffect(() => {
    // Fetch statistics when the component mounts or when selectedMonth changes
    fetchStatistics(selectedMonth);
  }, [selectedMonth]);

  const fetchStatistics = (month) => {
    // Replace 'http://localhost:8000/statistics' with your actual API endpoint
    fetch(`http://localhost:8000/statistics?month=${month}`)
      .then(response => response.json())
      .then(data => setStatistics(data))
      .catch(error => console.error('Error fetching statistics:', error));
  };

  return (
    <div className="transactions-statistics mt-4">
      <h3>Transactions Statistics - {selectedMonth}</h3>
      {/* Display total amount, total sold items, and total not sold items using statistics */}
      <div className="statistics-item">
        <label>Total Amount:</label> {statistics.totalAmount}
      </div>
      <div className="statistics-item">
        <label>Total Sold Items:</label> {statistics.totalSoldItems}
      </div>
      <div className="statistics-item">
        <label>Total Not Sold Items:</label> {statistics.totalNotSoldItems}
      </div>
    </div>
  );
}

export default TransactionsStatistics;
