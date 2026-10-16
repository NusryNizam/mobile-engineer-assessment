import { create } from 'zustand';

import { fetchTransactions as fetchTransactionsFromApi } from '@/api/transactions';
import type { Transaction } from '@/types/transaction';

export type TransactionsStatus = 'idle' | 'loading' | 'success' | 'error';

interface TransactionsState {
  transactions: Transaction[];
  status: TransactionsStatus;
  error: string | null;
  fetchTransactions: () => Promise<void>;
  getByRefId: (refId: string) => Transaction | undefined;
}

function sortByDateDesc(transactions: Transaction[]): Transaction[] {
  return [...transactions].sort(
    (a, b) => new Date(b.transferDate).getTime() - new Date(a.transferDate).getTime()
  );
}

export const useTransactionsStore = create<TransactionsState>((set, get) => ({
  transactions: [],
  status: 'idle',
  error: null,

  fetchTransactions: async () => {
    set({ status: 'loading', error: null });
    try {
      const data = await fetchTransactionsFromApi();
      set({ transactions: sortByDateDesc(data), status: 'success' });
    } catch (err) {
      set({
        status: 'error',
        error: err instanceof Error ? err.message : 'Something went wrong',
      });
    }
  },

  getByRefId: (refId) => get().transactions.find((transaction) => transaction.refId === refId),
}));
