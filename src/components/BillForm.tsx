import { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { BillData } from '../App';

interface BillFormProps {
  onSubmit: (data: BillData) => void;
}

interface Service {
  description: string;
  amount: string;
}

export default function BillForm({ onSubmit }: BillFormProps) {
  const [patientName, setPatientName] = useState('');
  const [patientId, setPatientId] = useState('');
  const [patientAge, setPatientAge] = useState('');
  const [patientAddress, setPatientAddress] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [dateOfService, setDateOfService] = useState('');
  const [hospitalName, setHospitalName] = useState('Modern Homeo Hospital');
  const [hospitalAddress, setHospitalAddress] = useState('Beside MGB Mall Street, Dargamitta, Nellore-524003');
  const [hospitalPhone, setHospitalPhone] = useState('+91 88198 81934');
  const [hospitalEmail, setHospitalEmail] = useState('modernhomeohospita@gmail.com');
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [services, setServices] = useState<Service[]>([
    { description: '', amount: '' }
  ]);

  const addService = () => {
    setServices([...services, { description: '', amount: '' }]);
  };

  const removeService = (index: number) => {
    if (services.length > 1) {
      setServices(services.filter((_, i) => i !== index));
    }
  };

  const updateService = (index: number, field: keyof Service, value: string) => {
    const newServices = [...services];
    newServices[index][field] = value;
    setServices(newServices);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const billData: BillData = {
      patientName,
      patientId,
      patientAge,
      patientAddress,
      patientPhone,
      dateOfService,
      hospitalName,
      hospitalAddress,
      hospitalPhone,
      hospitalEmail,
      services: services.map(s => ({
        description: s.description,
        amount: parseFloat(s.amount) || 0
      })),
      paymentMethod,
      paymentDate: new Date().toISOString().split('T')[0]
    };

    onSubmit(billData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8">
      <div className="mb-8 pb-6 border-b">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Hospital Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Hospital Name
            </label>
            <input
              type="text"
              required
              value={hospitalName}
              onChange={(e) => setHospitalName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter hospital name"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Hospital Address
            </label>
            <input
              type="text"
              required
              value={hospitalAddress}
              onChange={(e) => setHospitalAddress(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter hospital address"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Hospital Phone
            </label>
            <input
              type="tel"
              required
              value={hospitalPhone}
              onChange={(e) => setHospitalPhone(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter hospital phone"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Hospital Email
            </label>
            <input
              type="email"
              required
              value={hospitalEmail}
              onChange={(e) => setHospitalEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter hospital email"
            />
          </div>
        </div>
      </div>

      <div className="mb-8 pb-6 border-b">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Patient Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Patient Name
            </label>
            <input
              type="text"
              required
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter patient name"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Patient ID
            </label>
            <input
              type="text"
              required
              value={patientId}
              onChange={(e) => setPatientId(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter patient ID"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Age
            </label>
            <input
              type="number"
              required
              min="0"
              max="150"
              value={patientAge}
              onChange={(e) => setPatientAge(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter age"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              required
              value={patientPhone}
              onChange={(e) => setPatientPhone(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter phone number"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Address
            </label>
            <textarea
              required
              value={patientAddress}
              onChange={(e) => setPatientAddress(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter complete address"
              rows={2}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Date of Service
            </label>
            <input
              type="date"
              required
              value={dateOfService}
              onChange={(e) => setDateOfService(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <label className="block text-sm font-semibold text-gray-700">
            Services & Charges
          </label>
          <button
            type="button"
            onClick={addService}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
          >
            <Plus className="w-4 h-4" />
            Add Service
          </button>
        </div>

        <div className="space-y-3">
          {services.map((service, index) => (
            <div key={index} className="flex gap-3">
              <input
                type="text"
                required
                value={service.description}
                onChange={(e) => updateService(index, 'description', e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Service description"
              />
              <input
                type="number"
                required
                step="0.01"
                min="0"
                value={service.amount}
                onChange={(e) => updateService(index, 'amount', e.target.value)}
                className="w-32 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Amount"
              />
              {services.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeService(index)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Payment Method
        </label>
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="cash">Cash</option>
          <option value="credit-card">Credit Card</option>
          <option value="debit-card">Debit Card</option>
          <option value="insurance">Insurance</option>
          <option value="check">Check</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
      >
        Generate Bill
      </button>
    </form>
  );
}
