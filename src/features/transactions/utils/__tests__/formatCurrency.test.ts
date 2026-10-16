import { formatCurrency } from '../formatCurrency';

describe('formatCurrency', () => {
  it('formats a positive amount with a dollar sign and two decimals', () => {
    expect(formatCurrency(1500)).toBe('$1,500.00');
  });

  it('formats a negative amount with a leading minus before the dollar sign', () => {
    expect(formatCurrency(-500)).toBe('-$500.00');
  });

  it('formats amounts with cents correctly', () => {
    expect(formatCurrency(2300.75)).toBe('$2,300.75');
  });

  it('formats zero without a sign', () => {
    expect(formatCurrency(0)).toBe('$0.00');
  });
});
