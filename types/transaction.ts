export interface Transaction {
  refId: string;
  /** ISO-8601 UTC timestamp, e.g. "2024-10-15T12:34:56Z" */
  transferDate: string;
  recipientName: string;
  transferName: string;
  /** Positive for money in, negative for money out/refunds */
  amount: number;
}
