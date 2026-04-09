'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { fetchCases, Case } from '@/lib/api';

export default function AlertsPage() {
  const router = useRouter();
  const [isPremium, setIsPremium] = useState(false);
  const [loading, setLoading] = useState(true);
  const [cases, setCases] = useState<Case[]>([]);

  useEffect(() => {
    // Check premium status
    // In production, would call API
    const checkPremium = async () => {
      // Simulated check
      const premium = false; // Would come from API
      setIsPremium(premium);
      setLoading(false);

      if (!premium) {
        // Redirect to checkout or show paywall
      }
    };
    checkPremium();

    // Load cases
    fetchCases({ limit: 50 }).then(data => {
      setCases(data.cases);
    });
  }, []);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!isPremium) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-2xl font-bold mb-4">Premium Required</h1>
          <p className="text-gray-600 mb-6">
            This feature requires a premium subscription. Subscribe now for €4.99/month.
          </p>
          <button
            onClick={() => router.push('/checkout')}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Subscribe Now
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-8">Regional Alerts</h1>

        {/* Alert Filters */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Create Alert</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Region</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
                placeholder="e.g., Berlin, Bavaria"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Min Score</label>
              <input
                type="number"
                min="0"
                max="100"
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
                placeholder="50"
              />
            </div>
          </div>
          <button className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
            Create Alert
          </button>
        </div>

        {/* Cases List */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold">Cases Matching Your Alerts</h2>
          </div>
          <div className="divide-y">
            {cases.map(case_item => (
              <div key={case_item.id} className="p-6 hover:bg-gray-50">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-lg">{case_item.title}</h3>
                    <p className="text-gray-600">
                      Score: {case_item.score.toFixed(1)} | 
                      Potential: €{case_item.euro_estimate.toLocaleString()}
                    </p>
                    <div className="mt-2">
                      {case_item.risk_tags.map(tag => (
                        <span
                          key={tag}
                          className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mr-2"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

