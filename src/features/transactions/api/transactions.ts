import type { Transaction } from "../types";

const MOCK_TRANSACTIONS: Transaction[] = [
  {
    refId: "123ABC",
    transferDate: "2024-10-15T12:34:56Z",
    recipientName: "John Doe",
    transferName: "Salary Payment",
    amount: 1500.0,
  },
  {
    refId: "456DEF",
    transferDate: "2024-09-21T09:12:45Z",
    recipientName: "Jane Smith",
    transferName: "Invoice Payment",
    amount: 2300.75,
  },
  {
    refId: "789GHI",
    transferDate: "2024-10-05T16:18:30Z",
    recipientName: "Robert Brown",
    transferName: "Refund",
    amount: -500.0,
  },
  {
    refId: "101JKL",
    transferDate: "2024-08-30T11:47:22Z",
    recipientName: "Emily Davis",
    transferName: "Bonus Payment",
    amount: 1200.0,
  },
];

const MOCK_DELAY_MS = 600;

/**
 * Flip to true to see the list screen's error state during development/demo.
 * A real client would surface this from an actual failed network response.
 */
const SIMULATE_ERROR = false;

export function fetchTransactions(): Promise<Transaction[]> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (SIMULATE_ERROR) {
        reject(new Error("Failed to load transactions"));
        return;
      }
      resolve(MOCK_TRANSACTIONS);
    }, MOCK_DELAY_MS);
  });
}
