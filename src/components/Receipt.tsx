import { BillData } from '../App';
import HospitalLogo from './HospitalLogo';

interface ReceiptProps {
  data: BillData;
}

export default function Receipt({ data }: ReceiptProps) {
  const total = data.services.reduce((sum, service) => sum + service.amount, 0);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="bill-container p-1 border-4 border-double border-blue-600">
      <div className="bg-white p-4 shadow-lg print:shadow-none rounded-lg">
        {/* Header */}
        <div className="border-b-2 border-blue-600 pb-3 mb-3">
          <div className="flex items-start gap-2">
            <HospitalLogo />
            <div className="flex-1">
              <h1 className="text-xl font-bold text-gray-800">{data.hospitalName}</h1>
              <p className="text-xs text-gray-700">{data.hospitalAddress}</p>
              <p className="text-xs text-gray-600">Payment Receipt</p>
              <div className="mt-1 grid grid-cols-3 gap-2 text-xs text-gray-600">
                <div>
                  <p className="font-semibold text-gray-700">Phone</p>
                  <p>{data.hospitalPhone}</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-700">Email</p>
                  <p className="line-clamp-1">{data.hospitalEmail}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Patient & Bill Info */}
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div className="bg-blue-50 p-2 rounded border border-blue-200">
            <h3 className="text-xs font-bold text-gray-700 mb-2 border-b pb-1">PATIENT INFO</h3>
            <div className="space-y-1 text-xs">
              <p><span className="font-semibold">Name:</span> {data.patientName}</p>
              <p><span className="font-semibold">ID:</span> {data.patientId}</p>
              <p><span className="font-semibold">Age:</span> {data.patientAge}</p>
              <p><span className="font-semibold">Phone:</span> {data.patientPhone}</p>
              <p className="line-clamp-1"><span className="font-semibold">Address:</span> {data.patientAddress}</p>
            </div>
          </div>

          <div className="bg-green-50 p-2 rounded border border-green-200">
            <h3 className="text-xs font-bold text-gray-700 mb-2 border-b pb-1">BILL DETAILS</h3>
            <div className="space-y-1 text-xs">
              <p><span className="font-semibold">Service Date:</span> {formatDate(data.dateOfService)}</p>
              <p><span className="font-semibold">Payment Date:</span> {formatDate(data.paymentDate)}</p>
              <p><span className="font-semibold">Method:</span> {data.paymentMethod.replace('-', ' ')}</p>
              <p><span className="font-semibold">Status:</span> <span className="text-green-600 font-bold">PAID</span></p>
            </div>
          </div>
        </div>

        {/* Charges Table */}
        <div className="mb-3">
          <h3 className="text-sm font-bold text-gray-800 mb-2 border-b pb-1">CHARGES</h3>
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-gray-100">
                <th className="text-left py-1 px-2 font-semibold">Description</th>
                <th className="text-right py-1 px-2 font-semibold">Amount</th>
              </tr>
            </thead>
            <tbody>
              {data.services.map((service, index) => (
                <tr key={index} className="border-b">
                  <td className="py-1 px-2">{service.description}</td>
                  <td className="text-right py-1 px-2 font-medium">{formatCurrency(service.amount)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Total */}
        <div className="bg-blue-100 p-2 rounded mb-3 border-l-4 border-blue-600">
          <div className="flex justify-between items-center">
            <span className="font-bold text-gray-800">TOTAL:</span>
            <span className="text-lg font-bold text-blue-600">{formatCurrency(total)}</span>
          </div>
        </div>

        {/* Footer - Terms & Notes */}
        <div className="border-t-2 border-gray-300 pt-2 mt-2">
          <div className="grid grid-cols-3 gap-2 text-center text-xs mb-2">
            <div className="col-span-3 space-y-1">
              <p className="text-gray-600">
                This is a system-generated document and does not require a signature
              </p>
              <p className="text-gray-600">
                No refunds once payment received.
              </p>
              <p className="text-gray-600">
                Terms & Conditions applicable*
              </p>
            </div>
          </div>

          <div className="text-center text-xs text-gray-600 pt-2 border-t">
            <p>Thank you for choosing {data.hospitalName}</p>
            <p>For inquiries: {data.hospitalPhone}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
