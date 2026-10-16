import { fireEvent, render, screen } from '@testing-library/react-native';

import type { Transaction } from '../../types';
import TransactionListItem from '../TransactionListItem';

const transaction: Transaction = {
  refId: '123ABC',
  transferDate: '2024-10-15T12:34:56Z',
  recipientName: 'John Doe',
  transferName: 'Salary Payment',
  amount: 1500,
};

describe('TransactionListItem', () => {
  it('renders the transfer name, date, and amount', async () => {
    await render(<TransactionListItem transaction={transaction} onPress={jest.fn()} />);

    expect(screen.getByText('Salary Payment')).toBeTruthy();
    expect(screen.getByText('Oct 15, 2024')).toBeTruthy();
    expect(screen.getByText('$1,500.00')).toBeTruthy();
  });

  it('calls onPress with the transaction when tapped', async () => {
    const onPress = jest.fn();
    await render(<TransactionListItem transaction={transaction} onPress={onPress} />);

    await fireEvent.press(screen.getByRole('button'));

    expect(onPress).toHaveBeenCalledWith(transaction);
  });
});
