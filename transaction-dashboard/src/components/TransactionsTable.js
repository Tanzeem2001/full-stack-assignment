// // TransactionsTable.js
// import React, { useState, useEffect } from 'react';
// import './transactionsTable.css';

// function TransactionsTable({ onFetchTransactions, selectedMonth: propSelectedMonth }) {
//   const [transactions, setTransactions] = useState([]);
//   const [searchText, setSearchText] = useState('');
//   const [months, setMonths] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const selectedMonth = propSelectedMonth || 'March';

//   useEffect(() => {
//     // Fetch transactions when the component mounts
//     fetchTransactions();
//     // Initialize months
//     setMonths([
//       'January', 'February', 'March', 'April', 'May', 'June',
//       'July', 'August', 'September', 'October', 'November', 'December'
//     ]);
//   }, [currentPage, selectedMonth, onFetchTransactions]);

//   const fetchTransactions = () => {
//     // Implement pagination logic based on the currentPage variable
//     // For simplicity, let's assume 10 items per page
//     const itemsPerPage = 10;
//     let startIndex = (currentPage - 1) * itemsPerPage;

//     // Ensure startIndex is not less than 0
//     startIndex = Math.max(startIndex, 0);

//     // Replace 'YOUR_TRANSACTIONS_API_ENDPOINT' with the actual API endpoint
//     fetch(`http://localhost:8000/api/transactions?month=${selectedMonth}&start=${startIndex}&limit=${itemsPerPage}`)
//       .then(response => response.json())
//       .then(data => setTransactions(data))
//       .catch(error => console.error('Error fetching transactions:', error));
//   };

//   const handleSearch = () => {
//     // Implement search logic here
//     // Update transactions by calling onFetchTransactions
//     onFetchTransactions(searchText);
//   };

//   const handleNextPage = () => {
//     setCurrentPage(prevPage => prevPage + 1);
//   };

//   const handlePrevPage = () => {
//     setCurrentPage(prevPage => (prevPage > 1 ? prevPage - 1 : prevPage));
//   };

//   return (
//     <div className='container'>
//       <div className='searchbar'>
//         <div className='search'>
//           <label htmlFor="searchInput">Search Transaction :</label>
//           <input
//             type="text"
//             className="form-control"
//             id="searchInput"
//             value={searchText}
//             onChange={(e) => setSearchText(e.target.value)}
//           />
//           <button className="btn" onClick={handleSearch}>
//             Search
//           </button>
//         </div>

//         <div className='select'>
//           <label htmlFor="monthDropdown">Select Month:</label>
//           <select
//             className="form-control"
//             id="monthDropdown"
//             defaultValue="March"
//             onChange={(e) => console.log(e.target.value)}  // Handle month change event
//           >
//             {months.map(month => (
//               <option key={month} value={month}>{month}</option>
//             ))}
//           </select>
//         </div>
//       </div>
//       {/* Transactions Table */}
//       <table className="table table-bordered">
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Title</th>
//             <th>Description</th>
//             <th>Price</th>
//             <th>Category</th>
//             <th>Sold</th>
//             <th>Image</th>
//           </tr>
//         </thead>
//         <tbody>
//           {transactions.map(transaction => (
//             <tr key={transaction.id}>
//               <td>{transaction.id}</td>
//               <td>{transaction.title}</td>
//               <td>{transaction.description}</td>
//               <td>{transaction.price}</td>
//               <td>{transaction.category}</td>
//               <td>{transaction.sold}</td>
//               <td>
//                 <img
//                   src={transaction.image}
//                   alt={`Image for ${transaction.title}`}
//                   style={{ maxWidth: '50px', maxHeight: '50px' }}
//                 />
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* Pagination buttons */}
//       <div className="text-center">
//         <button className="btn btn-secondary" onClick={handlePrevPage}>
//           Previous
//         </button>
//         <button className="btn btn-secondary" onClick={handleNextPage}>
//           Next
//         </button>
//       </div>
//     </div>
//   );
// }

// export default TransactionsTable;







import React, { useState, useEffect } from 'react';
import './transactionsTable.css';

function TransactionsTable({ onFetchTransactions, selectedMonth: propSelectedMonth }) {
  const [transactions, setTransactions] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [months, setMonths] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const selectedMonth = propSelectedMonth || 'March';

  useEffect(() => {
    fetchTransactions();
    setMonths([
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ]);
  }, [currentPage, selectedMonth, onFetchTransactions]);

  const fetchTransactions = () => {
    const itemsPerPage = 10;
    const startIndex = (currentPage - 1) * itemsPerPage;

    fetch(`http://localhost:8000/api/transactions?month=${selectedMonth}&start=${startIndex}&limit=${itemsPerPage}`)
      .then(response => response.json())
      .then(data => {
        console.log("API Response:", data);
        setTransactions(data.transactions || []); // Extract the array from the response or provide a default empty array
      })
      .catch(error => console.error('Error fetching transactions:', error));
  };

  const handleSearch = () => {
    onFetchTransactions(searchText);
  };

  const handleNextPage = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(prevPage => (prevPage > 1 ? prevPage - 1 : prevPage));
  };

  return (
    <div className='container'>
      <div className='searchbar'>
        <div className='search'>
          <label htmlFor="searchInput">Search Transaction :</label>
          <input
            type="text"
            className="form-control"
            id="searchInput"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button className="btn" onClick={handleSearch}>
            Search
          </button>
        </div>

        <div className='select'>
          <label htmlFor="monthDropdown">Select Month:</label>
          <select
            className="form-control"
            id="monthDropdown"
            defaultValue={selectedMonth}
            onChange={(e) => console.log(e.target.value)}  // Handle month change event
          >
            {months.map(month => (
              <option key={month} value={month}>{month}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Transactions Table */}
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
            <th>Category</th>
            <th>Sold</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(transaction => (
            <tr key={transaction.id}>
              <td>{transaction.id}</td>
              <td>{transaction.title}</td>
              <td>{transaction.description}</td>
              <td>{transaction.price}</td>
              <td>{transaction.category}</td>
              <td>{transaction.sold}</td>
              <td>
                <img
                  src={transaction.image}
                  alt={`Image for ${transaction.title}`}
                  style={{ maxWidth: '50px', maxHeight: '50px' }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination buttons */}
      <div className="text-center">
        <button className="btn btn-secondary" onClick={handlePrevPage}>
          Previous
        </button>
        <button className="btn btn-secondary" onClick={handleNextPage}>
          Next
        </button>
      </div>
    </div>
  );
}

export default TransactionsTable;
