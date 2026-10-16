import type { Transaction } from '../../types';
import { filterTransactions } from '../filterTransactions';

const transactions: Transaction[] = [
  {
    refId: 'A',
    transferDate: '2024-01-01T00:00:00Z',
    recipientName: 'John Doe',
    transferName: 'Salary Payment',
    amount: 1500,
  },
  {
    refId: 'B',
    transferDate: '2024-01-02T00:00:00Z',
    recipientName: 'Netflix',
    transferName: 'Subscription',
    amount: -15.99,
  },
  {
    refId: 'C',
    transferDate: '2024-01-03T00:00:00Z',
    recipientName: 'Robert Brown',
    transferName: 'Refund',
    amount: -500,
  },
];

describe('filterTransactions', () => {
  it('returns all transactions for an empty query and "all" filter', () => {
    expect(filterTransactions(transactions, '', 'all')).toHaveLength(3);
  });

  it('matches a query against the recipient name', () => {
    const result = filterTransactions(transactions, 'netflix', 'all');
    expect(result.map((t) => t.refId)).toEqual(['B']);
  });

  it('matches a query against the transfer description', () => {
    const result = filterTransactions(transactions, 'salary', 'all');
    expect(result.map((t) => t.refId)).toEqual(['A']);
  });

  it('matches case-insensitively and trims whitespace', () => {
    const result = filterTransactions(transactions, '  REFUND  ', 'all');
    expect(result.map((t) => t.refId)).toEqual(['C']);
  });

  it('filters to income (amount >= 0)', () => {
    const result = filterTransactions(transactions, '', 'income');
    expect(result.map((t) => t.refId)).toEqual(['A']);
  });

  it('filters to expense (amount < 0)', () => {
    const result = filterTransactions(transactions, '', 'expense');
    expect(result.map((t) => t.refId)).toEqual(['B', 'C']);
  });

  it('combines a query with a filter', () => {
    const result = filterTransactions(transactions, 'r', 'expense');
    expect(result.map((t) => t.refId)).toEqual(['B', 'C']);
  });

  it('returns an empty array when nothing matches', () => {
    expect(filterTransactions(transactions, 'nonexistent', 'all')).toEqual([]);
  });
});
