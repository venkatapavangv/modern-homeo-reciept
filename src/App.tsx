import { useState } from 'react';
import { FileText, Printer } from 'lucide-react';
import BillForm from './components/BillForm';
import Receipt from './components/Receipt';

export interface BillData {
  patientName: string;
  patientId: string;
  patientAge: string;
  patientAddress: string;
  patientPhone: string;
  dateOfService: string;
  hospitalName: string;
  hospitalAddress: string;
  hospitalPhone: string;
  hospitalEmail: string;
  services: Array<{
    description: string;
    amount: number;
  }>;
  paymentMethod: string;
  paymentDate: string;
}

function App() {
  const [billData, setBillData] = useState<BillData | null>(null);
  const [showReceipt, setShowReceipt] = useState(false);

  const handleGenerateBill = (data: BillData) => {
    setBillData(data);
    setShowReceipt(true);
  };

  const handleNewBill = () => {
    setBillData(null);
    setShowReceipt(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* <header className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-2">
            <h1 className="text-4xl font-bold text-gray-800">Hospital Bill Payment</h1>
          </div>
          <p className="text-gray-600">Generate and print payment receipts</p>
        </header> */}

        {!showReceipt ? (
          <BillForm onSubmit={handleGenerateBill} />
        ) : (
          <div>
            <div className="mb-4 flex justify-center gap-4">
              <button
                onClick={() => window.print()}
                className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors print:hidden"
              >
                <Printer className="w-5 h-5" />
                Print Receipt
              </button>
              <button
                onClick={handleNewBill}
                className="flex items-center gap-2 bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors print:hidden"
              >
                New Bill
              </button>
            </div>
            {billData && <Receipt data={billData} />}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
