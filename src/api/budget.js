import { apiFetch } from './client';

export async function fetchBudgetCategories(year = 2024) {
    return apiFetch(`/budget/categories?year=${year}`);
}
