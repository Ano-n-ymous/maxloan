'use client';

import { useLocalStorage } from '@/hooks/useLocalStorage';
import { LoanApplication } from '@/types';
import { useState } from 'react';
import { Trash2, Download } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function AdminPage() {
  const [applications, setApplications] = useLocalStorage<LoanApplication[]>('maxloan_applications', []);
  const [showConfirm, setShowConfirm] = useState(false);

  const clearAll = () => {
    setApplications([]);
    setShowConfirm(false);
  };

  const exportAsJSON = () => {
    const dataStr = JSON.stringify(applications, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `maxloan-applications-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Loan Applications Admin</h1>
        <div className="flex gap-3">
          <Button onClick={exportAsJSON} variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export JSON
          </Button>
          {applications.length > 0 && (
            <Button onClick={() => setShowConfirm(true)} variant="secondary" size="sm">
              <Trash2 className="h-4 w-4 mr-2" />
              Clear All
            </Button>
          )}
        </div>
      </div>

      {showConfirm && (
        <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg flex items-center justify-between">
          <p className="text-sm">Are you sure? This cannot be undone.</p>
          <div className="flex gap-2">
            <Button onClick={clearAll} variant="secondary" size="sm">Yes, Clear</Button>
            <Button onClick={() => setShowConfirm(false)} variant="outline" size="sm">Cancel</Button>
          </div>
        </div>
      )}

      {applications.length === 0 ? (
        <p className="text-gray-500 text-center py-12">No applications yet.</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Loan Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Purpose</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Detected Income</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fee Paid</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applied At</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {applications.map((app, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{app.fullName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{app.phoneNumber}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">KSH {app.loanAmount.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{app.loanPurpose}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {app.detectedIncome ? `KSH ${app.detectedIncome.toLocaleString()}` : '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {app.verificationFeePaid ? (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Yes
                      </span>
                    ) : (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                        No
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {app.appliedAt ? new Date(app.appliedAt).toLocaleString() : '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
