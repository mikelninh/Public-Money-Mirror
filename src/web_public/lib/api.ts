import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface StoryCard {
  id: number;
  title: string;
  lede: string;
  what_we_found: string;
  why_it_matters: string;
  receipts: string[];
  confidence: number;
  next_steps?: string;
  case_id: number;
  euro_estimate: number;
}

export interface Case {
  id: number;
  title: string;
  score: number;
  euro_estimate: number;
  risk_tags: string[];
  confidence: number;
}

export const fetchLatestStories = async (limit: number = 3): Promise<StoryCard[]> => {
  const response = await api.get(`/stories/latest?limit=${limit}`);
  return response.data;
};

export const fetchCases = async (params?: {
  limit?: number;
  min_score?: number;
  min_euro?: number;
}): Promise<{ cases: Case[]; total: number }> => {
  const response = await api.get('/cases', { params });
  return response.data;
};

export default api;

