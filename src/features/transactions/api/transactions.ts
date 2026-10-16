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
  {
    refId: "112MNO",
    transferDate: "2024-10-20T08:05:00Z",
    recipientName: "Grab Holdings",
    transferName: "Ride Hailing",
    amount: -18.5,
  },
  {
    refId: "223PQR",
    transferDate: "2024-10-18T14:22:10Z",
    recipientName: "Netflix",
    transferName: "Subscription",
    amount: -15.99,
  },
  {
    refId: "334STU",
    transferDate: "2024-10-12T07:40:00Z",
    recipientName: "Starbucks",
    transferName: "Coffee",
    amount: -6.75,
  },
  {
    refId: "445VWX",
    transferDate: "2024-10-10T19:00:00Z",
    recipientName: "NTUC FairPrice",
    transferName: "Groceries",
    amount: -84.32,
  },
  {
    refId: "556YZA",
    transferDate: "2024-10-08T10:15:00Z",
    recipientName: "Michael Tan",
    transferName: "Freelance Payment",
    amount: 650.0,
  },
  {
    refId: "667BCD",
    transferDate: "2024-10-02T13:30:00Z",
    recipientName: "SP Group",
    transferName: "Utility Bill",
    amount: -120.45,
  },
  {
    refId: "778EFG",
    transferDate: "2024-09-28T09:00:00Z",
    recipientName: "Sarah Lee",
    transferName: "Rent",
    amount: -1800.0,
  },
  {
    refId: "889HIJ",
    transferDate: "2024-09-25T17:45:00Z",
    recipientName: "Singtel",
    transferName: "Phone Bill",
    amount: -45.0,
  },
  {
    refId: "990KLM",
    transferDate: "2024-09-18T11:10:00Z",
    recipientName: "David Wong",
    transferName: "Dividend Payout",
    amount: 320.5,
  },
  {
    refId: "101NOP",
    transferDate: "2024-09-14T08:50:00Z",
    recipientName: "Amazon",
    transferName: "Online Shopping",
    amount: -92.1,
  },
  {
    refId: "212QRS",
    transferDate: "2024-09-10T16:00:00Z",
    recipientName: "Lisa Chen",
    transferName: "Loan Repayment",
    amount: -300.0,
  },
  {
    refId: "323TUV",
    transferDate: "2024-09-05T12:00:00Z",
    recipientName: "Spotify",
    transferName: "Subscription",
    amount: -9.99,
  },
  {
    refId: "434WXY",
    transferDate: "2024-08-28T15:20:00Z",
    recipientName: "Mark Johnson",
    transferName: "Consulting Fee",
    amount: 1750.0,
  },
  {
    refId: "545ZAB",
    transferDate: "2024-08-22T09:30:00Z",
    recipientName: "Shell",
    transferName: "Fuel",
    amount: -65.4,
  },
  {
    refId: "656CDE",
    transferDate: "2024-08-18T13:00:00Z",
    recipientName: "HDB",
    transferName: "Mortgage Payment",
    amount: -2200.0,
  },
  {
    refId: "767FGH",
    transferDate: "2024-08-12T10:45:00Z",
    recipientName: "Grace Lim",
    transferName: "Birthday Gift",
    amount: 100.0,
  },
  {
    refId: "878IJK",
    transferDate: "2024-08-05T18:30:00Z",
    recipientName: "Uber Eats",
    transferName: "Food Delivery",
    amount: -28.9,
  },
  {
    refId: "989LMN",
    transferDate: "2024-07-30T11:00:00Z",
    recipientName: "Prudential",
    transferName: "Insurance Premium",
    amount: -210.0,
  },
  {
    refId: "100OPQ",
    transferDate: "2024-07-25T09:15:00Z",
    recipientName: "Kevin Ng",
    transferName: "Salary Advance",
    amount: 500.0,
  },
  {
    refId: "211RST",
    transferDate: "2024-07-20T14:40:00Z",
    recipientName: "Apple",
    transferName: "App Store",
    amount: -4.99,
  },
  {
    refId: "322UVW",
    transferDate: "2024-07-15T08:00:00Z",
    recipientName: "ATM Withdrawal",
    transferName: "Cash Withdrawal",
    amount: -200.0,
  },
  {
    refId: "433XYZ",
    transferDate: "2024-07-10T16:50:00Z",
    recipientName: "Rachel Koh",
    transferName: "Refund",
    amount: -150.0,
  },
  {
    refId: "544ABC",
    transferDate: "2024-07-05T12:20:00Z",
    recipientName: "CPF Board",
    transferName: "CPF Contribution",
    amount: -550.0,
  },
  {
    refId: "655DEF",
    transferDate: "2024-06-28T10:00:00Z",
    recipientName: "Daniel Teo",
    transferName: "Freelance Payment",
    amount: 890.0,
  },
  {
    refId: "766GHI",
    transferDate: "2024-06-20T09:40:00Z",
    recipientName: "Gym Membership",
    transferName: "Fitness Subscription",
    amount: -55.0,
  },
  {
    refId: "877JKL",
    transferDate: "2024-06-15T13:15:00Z",
    recipientName: "Victoria Ong",
    transferName: "Wedding Gift",
    amount: 250.0,
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
