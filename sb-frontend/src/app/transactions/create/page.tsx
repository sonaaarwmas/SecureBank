"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateTransactions() {
  const [senderId, setSenderId] = useState<string>("");
  const [receiverId, setReceiverId] = useState<string>("");
  const [transactionDateTime, setTransactionDateTime] = useState<string>("");
  const [reason, setReason] = useState<string>("");
  const [reference, setReference] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [error, setError] = useState<string>("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (parseFloat(amount) < 1 || isNaN(parseFloat(amount))) {
      setError("Amount must be a number greater than 0");
      return;
    }

    const transactionData = {
      senderId,
      receiverId,
      transactionDateTime,
      reason,
      reference,
      amount: parseFloat(amount),
    };

    try {
      const response = await fetch(
        "http://localhost:1337/api/Transaction/Create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(transactionData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || "Failed to create transaction");
        return;
      }
      console.log("Transaction created successfully");
      router.push("/transactions");
    } catch (error: any) {
      console.error("There was a problem with the fetch operation:", error);
      setError(error.message);
    }
  };

  return (
    <div className="container mx-auto p-4 mt-8">
      <div className="max-w-md mx-auto">
        <div className="bg-white shadow-md border rounded px-8 pt-6 pb-8 mb-4">
          <h4 className="text-2xl font-bold mb-4">Create new transaction</h4>
          <hr className="mb-4" />
          <form onSubmit={handleSubmit}>
            <div className="text-red-500">{error}</div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="SenderId"
              >
                Sender
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Sender e-mail"
                value={senderId}
                onChange={(e) => setSenderId(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="ReceiverId"
              >
                Receiver
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Receiver e-mail"
                value={receiverId}
                onChange={(e) => setReceiverId(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="TransactionDateTime"
              >
                Transaction Date
              </label>
              <input
                type="date"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={transactionDateTime}
                onChange={(e) => setTransactionDateTime(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="Reason"
              >
                Reason
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="Reference"
              >
                Reference
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={reference}
                onChange={(e) => setReference(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="Amount"
              >
                Amount
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                id="submitbutton"
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Create
              </button>
            </div>
          </form>
        </div>
        <div className="text-center">
          <a
            href="/transactions"
            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
          >
            Back to Transactions
          </a>
        </div>
      </div>
    </div>
  );
}
