'use client';

import { useEffect, useState } from 'react';
import { fetchLatestStories, fetchCases, StoryCard, Case } from '@/lib/api';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function Home() {
  const [stories, setStories] = useState<StoryCard[]>([]);
  const [cases, setCases] = useState<Case[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [storiesData, casesData] = await Promise.all([
          fetchLatestStories(1),
          fetchCases({ limit: 10 }),
        ]);
        setStories(storiesData);
        setCases(casesData.cases || []);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const topStory = stories[0];
  const chartData = cases.slice(0, 10).map(c => ({
    name: c.title.substring(0, 30),
    savings: c.euro_estimate,
  }));

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-16">
        {/* Hero */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Public Money Mirror
          </h1>
          <p className="text-2xl text-gray-600 mb-2">
            Follow the flow. Every euro has a story.
          </p>
          <p className="text-lg text-gray-500">
            Identifying savings and anomalies in public spending
          </p>
        </div>

        {/* Latest Story */}
        {topStory && (
          <div className="bg-white rounded-lg shadow-lg p-8 mb-16">
            <div className="mb-4">
              <span className="text-sm text-blue-600 font-semibold">Latest Story</span>
              <span className="text-sm text-gray-500 ml-4">
                €{topStory.euro_estimate.toLocaleString()} potential savings
              </span>
            </div>
            <h2 className="text-3xl font-bold mb-4">{topStory.title}</h2>
            <p className="text-xl text-gray-700 mb-4">{topStory.lede}</p>
            <div className="prose max-w-none">
              <p className="text-gray-600 mb-4">{topStory.what_we_found}</p>
              <p className="text-gray-600">{topStory.why_it_matters}</p>
            </div>
            {topStory.receipts && topStory.receipts.length > 0 && (
              <div className="mt-6">
                <p className="text-sm text-gray-500 mb-2">Sources:</p>
                <ul className="list-disc list-inside">
                  {topStory.receipts.map((url, idx) => (
                    <li key={idx} className="text-blue-600">
                      <a href={url} target="_blank" rel="noopener noreferrer">
                        {url}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Top Categories Chart */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-6">Top Cases by Potential Savings</h2>
          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                <YAxis />
                <Tooltip formatter={(value: number) => `€${value.toLocaleString()}`} />
                <Legend />
                <Bar dataKey="savings" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-gray-500">No cases available</p>
          )}
        </div>

        {/* Premium CTA */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-lg p-8 text-white">
            <h2 className="text-3xl font-bold mb-4">Unlock Premium Features</h2>
            <p className="text-lg mb-6">
              Get regional alerts, downloadable dossiers, and advanced filters
            </p>
            <a
              href="/premium/alerts"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              Subscribe Now - €4.99/month
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}

