// // App.js
// // import React, { useState, useEffect } from 'react';
// import TransactionsTable from './components/TransactionsTable'
// import TransactionsStatistics from './components/TransactionsStatistics';
// import TransactionsBarChart from './components/TransactionsBarChart';

// function App() {
  

 
//   return (
//     <div className="container mt-5">
    

//       {/* Transactions Table */}
//       <TransactionsTable/>

//       {/* Pagination buttons
//       <div className="text-center">
//         <button className="btn btn-secondary" onClick={handlePrevPage}>
//           Previous
//         </button>
//         <button className="btn btn-secondary" onClick={handleNextPage}>
//           Next
//         </button>
//       </div> */}

//       {/* Transactions Statistics Box */}
//       <TransactionsStatistics />

//       {/* Transactions Bar Chart */}
//       <TransactionsBarChart />
//     </div>
//   );
// }

// export default App;





// App.js
import React, { useState } from 'react';
import TransactionsTable from './components/TransactionsTable';
import TransactionsStatistics from './components/TransactionsStatistics';
import TransactionsBarChart from './components/TransactionsBarChart';

function App() {
  const [selectedMonth, setSelectedMonth] = useState('March');

  const handleFetchChartData = async (selectedMonth) => {
    // Replace 'YOUR_CHART_DATA_API_ENDPOINT' with the actual API endpoint
    const response = await fetch(`YOUR_CHART_DATA_API_ENDPOINT?month=${selectedMonth}`);
    const data = await response.json();
    return data;
  };

  return (
    <div className="container mt-5">
      {/* Transactions Table */}
      <TransactionsTable selectedMonth={selectedMonth} onFetchTransactions={() => {}} />

     
      {/* Transactions Statistics Box */}
      <TransactionsStatistics
        selectedMonth={selectedMonth}
        onFetchStatistics={() => {}}
      />

       {/* Transactions Bar Chart */}
       <TransactionsBarChart
        selectedMonth={selectedMonth}
        onFetchChartData={handleFetchChartData}
      />

    </div>
  );
}

export default App;
