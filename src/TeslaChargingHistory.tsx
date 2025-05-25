import React from 'react';
import './TeslaCharging.css';

interface TeslaCharge {
  date: string;
  amount: number;
}

const TeslaChargingHistory: React.FC = () => {
  const teslaCharges: TeslaCharge[] = [
    { date: "Mar 21", amount: 8.33 },
    { date: "Mar 24", amount: 3.11 },
    { date: "Mar 24", amount: 4.05 },
    { date: "Mar 26", amount: 4.53 },
    { date: "Mar 27", amount: 5.10 },
    { date: "Mar 28", amount: 2.12 },
    { date: "Mar 31", amount: 8.15 },
    { date: "Mar 31", amount: 1.55 },
    { date: "Apr 01", amount: 4.21 },
    { date: "Apr 03", amount: 7.12 },
    { date: "Apr 04", amount: 3.93 },
    { date: "Apr 07", amount: 0.79 },
    { date: "Apr 07", amount: 8.18 },
    { date: "Apr 07", amount: 5.42 },
    { date: "Apr 09", amount: 5.52 },
    { date: "Apr 10", amount: 4.91 },
    { date: "Apr 10", amount: 8.41 },
    { date: "Apr 14", amount: 5.88 },
    { date: "Apr 15", amount: 2.65 },
    { date: "Apr 15", amount: 6.29 },
    { date: "Apr 19", amount: 5.63 },
    { date: "Apr 19", amount: 7.23 },
    { date: "Apr 19", amount: 10.95 },
    { date: "Apr 21", amount: 2.18 },
    { date: "Apr 23", amount: 6.16 },
    { date: "Apr 24", amount: 4.83 },
    { date: "Apr 25", amount: 0.91 },
    { date: "Apr 26", amount: 6.95 },
    { date: "Apr 28", amount: 1.77 },
    { date: "Apr 28", amount: 2.20 },
    { date: "Apr 28", amount: 3.78 },
    { date: "May 01", amount: 5.07 },
    { date: "May 02", amount: 4.03 },
    { date: "May 03", amount: 5.93 },
    { date: "May 05", amount: 6.13 },
    { date: "May 06", amount: 3.81 },
    { date: "May 06", amount: 7.19 },
    { date: "May 07", amount: 3.23 },
    { date: "May 08", amount: 2.50 },
    { date: "May 10", amount: 5.18 },
    { date: "May 12", amount: 1.98 },
    { date: "May 12", amount: 3.33 },
    { date: "May 14", amount: 6.55 },
    { date: "May 16", amount: 5.04 },
    { date: "May 17", amount: 5.92 },
    { date: "May 19", amount: 3.04 },
    { date: "May 19", amount: 8.09 },
    { date: "May 19", amount: 10.95 },
    { date: "May 20", amount: 9.96 },
    { date: "May 21", amount: 4.38 },
    { date: "May 23", amount: 14.26 }
  ];

  const totalAmount = teslaCharges.reduce((sum, charge) => sum + charge.amount, 0);
  const averageCharge = totalAmount / teslaCharges.length;

  // Split charges into batches of 10
  const chargeBatches = [];
  for (let i = 0; i < teslaCharges.length; i += 10) {
    chargeBatches.push(teslaCharges.slice(i, i + 10));
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="tesla-charging-container">
      <button className="print-button" onClick={handlePrint}>
        Print/Save as PDF
      </button>
      
      <div className="header">
        <div className="tesla-logo">T</div>
        <h1>Tesla Charging History</h1>
        <p>Account: George B. ...6891 | Period: March - May 2025</p>
      </div>
      
      <div className="summary">
        <h3>Summary</h3>
        <div className="summary-stats">
          <div className="stat-item">
            <span className="stat-label">Total Charges:</span>
            <span className="stat-value">{teslaCharges.length} transactions</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Total Amount:</span>
            <span className="stat-value">${totalAmount.toFixed(2)}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Average Charge:</span>
            <span className="stat-value">${averageCharge.toFixed(2)}</span>
          </div>
        </div>
      </div>
      
      <div className="charges-section">
        {chargeBatches.map((batch, batchIndex) => {
          const batchTotal = batch.reduce((sum, charge) => sum + charge.amount, 0);
          const startIndex = batchIndex * 10 + 1;
          const endIndex = Math.min(startIndex + 9, teslaCharges.length);
          
          return (
            <div key={batchIndex} className="charge-batch">
              <div className="batch-header">
                <h3>Charges {startIndex}-{endIndex}</h3>
                <span className="batch-total">Batch Total: ${batchTotal.toFixed(2)}</span>
              </div>
              
              <table className="charges-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Date</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {batch.map((charge, index) => (
                    <tr key={startIndex + index}>
                      <td className="charge-number">{startIndex + index}</td>
                      <td className="charge-date">{charge.date}</td>
                      <td className="charge-amount">${charge.amount.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="batch-total-row">
                    <td colSpan={2}><strong>Batch Total</strong></td>
                    <td><strong>${batchTotal.toFixed(2)}</strong></td>
                  </tr>
                </tfoot>
              </table>
            </div>
          );
        })}
      </div>
      
      <div className="grand-total">
        <h2>Grand Total: ${totalAmount.toFixed(2)}</h2>
      </div>
    </div>
  );
};

export default TeslaChargingHistory;