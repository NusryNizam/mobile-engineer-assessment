const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

/** Formats a signed amount, e.g. 1500 -> "$1,500.00", -500 -> "-$500.00" */
export function formatCurrency(amount: number): string {
  const formatted = formatter.format(Math.abs(amount));
  return amount < 0 ? `-${formatted}` : formatted;
}
