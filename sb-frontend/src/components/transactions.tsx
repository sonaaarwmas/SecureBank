"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import { Button, buttonVariants } from "./ui/button";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type Transaction = {
  senderId: string;
  receiverId: string;
  dateTime: string;
  amount: number;
  reason: string;
  id: string;
};

type Props = {};

export default function Transactions({}: Props) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isAuthenticated } = useAuth();
  const router = useRouter();


  // Auth check 
  // useEffect(() => {
  //   if (!isAuthenticated) {
  //     router.push("/login");
  //     return;
  //   }

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch(
          "http://localhost:1337/api/Transaction/GetTransactions?draw=1&start=0&length=10",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );
        if (!response.ok) throw new Error("Failed to fetch transactions");
        const data = await response.json();
        setTransactions(data.data || []);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [isAuthenticated, router]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const TransactionDetailsDialog = ({ transaction }: { transaction: Transaction }) => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link">Details</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Details of transaction</DialogTitle>
          <DialogDescription>
            <div>
              <p><strong>SenderId:</strong> {transaction.senderId}</p>
              <p><strong>ReceiverId:</strong> {transaction.receiverId}</p>
              <p><strong>TransactionDateTime:</strong> {transaction.dateTime}</p>
              <p><strong>Reason:</strong> {transaction.reason}</p>
              <p><strong>Amount:</strong> {transaction.amount.toFixed(2)}€</p>
              <p><strong>Reference:</strong> {transaction.id}</p>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );


  return (
    <div className="p-8 mx-auto">
      <Card>
        <div className="grid grid-cols-2 justify-between">
          <div>
        <CardHeader className="px-7 background-primary">
          <CardTitle>Transactions</CardTitle>
              <CardDescription>Recent transactions</CardDescription>
            </CardHeader>
            </div>
            <div className="justify-items-end p-6 mr-1">
            <Link href="/transactions/create"className={buttonVariants({ variant: "link" })}>Create New Transaction</Link>
          </div>
            </div>
        <CardContent>
          <Table className="border">
            <TableHeader className="bg-slate-100">
              <TableRow>
                <TableHead>Sender</TableHead>
                <TableHead className="hidden sm:table-cell">Receiver</TableHead>
                <TableHead className="hidden sm:table-cell">Reason</TableHead>
                <TableHead className="hidden md:table-cell">
                  Transaction Date
                </TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="text-right">View</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>
                    <div className="font-medium">{transaction.senderId}</div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {transaction.receiverId}
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {transaction.reason}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {transaction.dateTime}
                  </TableCell>
                  <TableCell className="text-right">
                    {transaction.amount.toFixed(2)}€
                  </TableCell>
                  <TableCell className="text-right">
                  <TransactionDetailsDialog transaction={transaction} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="mt-8 p-8 items-center">
            <form
              method="post"
              encType="multipart/form-data"
              action="http://localhost:1337/upload/UploadTransactions"
            >
              <div className="form-group row">
                <div className="col-md-3">
                  <p>Upload one or more transactions in .xml:</p>
                  <input type="file" name="files" accept=".xml" />
                </div>
                <div className="col-md-2 align-center">
                  <input
                    type="submit"
                    value="Upload"
                    className="btn btn-primary"
                  />
                </div>
              </div>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}