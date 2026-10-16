import { useTransactionsStore } from '../useTransactionsStore';
import type { Transaction } from '../../types';

jest.mock('../../api/transactions', () => ({
  fetchTransactions: jest.fn(),
}));

import { fetchTransactions } from '../../api/transactions';

const mockTransactions: Transaction[] = [
  {
    refId: 'A',
    transferDate: '2024-01-01T00:00:00Z',
    recipientName: 'A',
    transferName: 'A',
    amount: 10,
  },
  {
    refId: 'B',
    transferDate: '2024-03-01T00:00:00Z',
    recipientName: 'B',
    transferName: 'B',
    amount: 20,
  },
  {
    refId: 'C',
    transferDate: '2024-02-01T00:00:00Z',
    recipientName: 'C',
    transferName: 'C',
    amount: 30,
  },
];

describe('useTransactionsStore', () => {
  beforeEach(() => {
    useTransactionsStore.setState({ transactions: [], status: 'idle', error: null });
    (fetchTransactions as jest.Mock).mockReset();
  });

  it('sorts transactions by transferDate descending on fetch', async () => {
    (fetchTransactions as jest.Mock).mockResolvedValue(mockTransactions);

    await useTransactionsStore.getState().fetchTransactions();

    const { transactions, status } = useTransactionsStore.getState();
    expect(status).toBe('success');
    expect(transactions.map((transaction) => transaction.refId)).toEqual(['B', 'C', 'A']);
  });

  it('sets an error status and message when the fetch fails', async () => {
    (fetchTransactions as jest.Mock).mockRejectedValue(new Error('network down'));

    await useTransactionsStore.getState().fetchTransactions();

    const { status, error } = useTransactionsStore.getState();
    expect(status).toBe('error');
    expect(error).toBe('network down');
  });

  it('getByRefId finds a transaction by its refId', () => {
    useTransactionsStore.setState({ transactions: mockTransactions });

    expect(useTransactionsStore.getState().getByRefId('C')?.recipientName).toBe('C');
    expect(useTransactionsStore.getState().getByRefId('missing')).toBeUndefined();
  });
});
