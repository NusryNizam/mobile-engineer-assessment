import type { Transaction } from '../types';

export type TransactionFilter = 'all' | 'income' | 'expense';

export function filterTransactions(
  transactions: Transaction[],
  query: string,
  filter: TransactionFilter
): Transaction[] {
  const normalizedQuery = query.trim().toLowerCase();

  return transactions.filter((transaction) => {
    const matchesQuery =
      normalizedQuery.length === 0 ||
      transaction.recipientName.toLowerCase().includes(normalizedQuery) ||
      transaction.transferName.toLowerCase().includes(normalizedQuery);

    const matchesFilter =
      filter === 'all' ||
      (filter === 'income' ? transaction.amount >= 0 : transaction.amount < 0);

    return matchesQuery && matchesFilter;
  });
}
