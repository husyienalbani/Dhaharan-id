// Cashflow.tsx - FULL SCRIPT FINAL

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  PieChart,
  Download,
  Filter,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";


// ---------------- MOCK DATA ----------------
const cashflowData = {
  balance: 15750000,
  totalIncome: 25000000,
  totalExpense: 9250000,

  monthlyData: [
    { month: "Jan", income: 5000000, expense: 2000000 },
    { month: "Feb", income: 4500000, expense: 1500000 },
    { month: "Mar", income: 6000000, expense: 2500000 },
    { month: "Apr", income: 5500000, expense: 1750000 },
    { month: "Mei", income: 4000000, expense: 1500000 },
  ],

  transactions: [
    { id: 1, type: "income", description: "Donasi Anggota Bulan Maret", amount: 5000000, date: "15 Maret 2024", category: "Donasi" },
    { id: 2, type: "expense", description: "Pembelian Sembako Baksos", amount: 2500000, date: "12 Maret 2024", category: "Kegiatan" },
    { id: 3, type: "income", description: "Sponsor Kegiatan Ramadhan", amount: 7500000, date: "10 Maret 2024", category: "Sponsor" },
    { id: 4, type: "expense", description: "Santunan Anak Yatim", amount: 3000000, date: "5 Maret 2024", category: "Santunan" },
    { id: 5, type: "income", description: "Donasi Tambahan", amount: 2000000, date: "1 Maret 2024", category: "Donasi" },
    { id: 6, type: "expense", description: "Operasional", amount: 900000, date: "27 Feb 2024", category: "Operasional" },
  ],
};

const expenseCategories = [
  { name: "Kegiatan", amount: 2500000, color: "bg-accent" },
  { name: "Santunan", amount: 3000000, color: "bg-highlight" },
  { name: "Operasional", amount: 1500000, color: "bg-primary" },
  { name: "Kesehatan", amount: 2250000, color: "bg-secondary" },
];

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);
};


// ---------------- COMPONENT ----------------
export default function Cashflow() {
  const [filter, setFilter] = useState<"all" | "income" | "expense">("all");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<"asc" | "desc">("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  let filteredTransactions = cashflowData.transactions
    .filter((t) => (filter === "all" ? true : t.type === filter))
    .filter((t) => t.description.toLowerCase().includes(search.toLowerCase()));

  filteredTransactions = filteredTransactions.sort((a, b) =>
    sort === "asc" ? a.amount - b.amount : b.amount - a.amount
  );

  const totalPages = Math.max(1, Math.ceil(filteredTransactions.length / itemsPerPage));
  if (currentPage > totalPages) setCurrentPage(totalPages);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedTransactions = filteredTransactions.slice(startIndex, startIndex + itemsPerPage);


  // Export PDF
  const exportPDF = () => {
    const doc = new jsPDF({ unit: "pt" });
    doc.setFontSize(12);
    doc.text("Laporan Riwayat Transaksi Komunitas", 40, 40);

    autoTable(doc, {
      startY: 60,
      head: [["Tanggal", "Deskripsi", "Kategori", "Jenis", "Jumlah"]],
      body: filteredTransactions.map((t) => [
        t.date,
        t.description,
        t.category,
        t.type === "income" ? "Masuk" : "Keluar",
        formatCurrency(t.amount),
      ]),
      styles: { font: "helvetica", fontSize: 10 },
      headStyles: { fillColor: [30, 64, 175] },
    });

    doc.save("cashflow-transactions.pdf");
  };


  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">

        {/* HEADER */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <Badge className="mb-4" variant="accent">
            <Wallet className="w-4 h-4 mr-1" /> Transparansi Dana
          </Badge>

          <h1 className="font-fredoka text-4xl md:text-5xl font-bold">Cashflow Komunitas</h1>
          <p className="font-nunito text-muted-foreground max-w-xl mx-auto mt-3">
            Laporan pemasukan dan pengeluaran yang disusun secara transparan & terbuka.
          </p>
        </motion.div>


        {/* MAIN GRID */}
        <div className="grid lg:grid-cols-3 gap-8 items-start">


          {/* LEFT — TRANSACTIONS */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="lg:col-span-2 flex flex-col h-full">
            <Card className="flex flex-col h-full shadow-lg">

              <CardHeader>
                <div className="flex flex-col gap-4">

                  {/* Sort + Search + PDF + Balance */}
                  <div className="flex items-center gap-3">

                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setSort(sort === "asc" ? "desc" : "asc")}
                      className="flex items-center gap-2"
                    >
                      <Filter className="w-4 h-4" />
                      Sort: {sort === "asc" ? "Termurah" : "Termahal"}
                    </Button>

                    <Input
                      placeholder="Cari transaksi..."
                      className="flex-1"
                      value={search}
                      onChange={(e) => {
                        setSearch(e.target.value);
                        setCurrentPage(1);
                      }}
                    />

                    <div className="flex flex-col items-end">
                      <Button size="sm" variant="default" onClick={exportPDF}>
                        <Download className="w-4 h-4 mr-1" /> PDF
                      </Button>


                    </div>
                  </div>

                 <div className="flex items-center justify-between">

                {/* Left: Filter buttons */}
                <div className="flex gap-2">
                  <Button size="sm" variant={filter === "all" ? "default" : "outline"} onClick={() => { setFilter("all"); setCurrentPage(1); }}>
                    Semua
                  </Button>

                  <Button size="sm" variant={filter === "income" ? "default" : "outline"} onClick={() => { setFilter("income"); setCurrentPage(1); }}>
                    <ArrowUpRight className="w-4 h-4 mr-1" /> Masuk
                  </Button>

                  <Button size="sm" variant={filter === "expense" ? "default" : "outline"} onClick={() => { setFilter("expense"); setCurrentPage(1); }}>
                    <ArrowDownRight className="w-4 h-4 mr-1" /> Keluar
                  </Button>
                </div>

                {/* Right: Saldo */}
                <Button
                  size="sm"
                  variant="outline"
                  className="bg-green-600 text-white hover:bg-green-700 hover:text-white px-3 py-1"
                >
                  Saldo: {formatCurrency(cashflowData.balance)}
                </Button>

              </div>

                </div>
              </CardHeader>


              <CardContent className="flex flex-col h-full">
                <div className="space-y-4 flex-1 overflow-auto pr-1">

                  {paginatedTransactions.length === 0 && (
                    <p className="text-center text-muted-foreground">
                      Tidak ada transaksi ditemukan.
                    </p>
                  )}

                  {paginatedTransactions.map((transaction, i) => (
                    <motion.div
                      key={transaction.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="flex items-center justify-between p-4 rounded-xl bg-secondary/50 border-2 border-foreground/10"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center border-2 border-foreground shadow-cartoon-sm ${
                          transaction.type === "income" ? "bg-accent" : "bg-highlight"
                        }`}>
                          {transaction.type === "income"
                            ? <ArrowUpRight className="w-6 h-6" />
                            : <ArrowDownRight className="w-6 h-6" />
                          }
                        </div>

                        <div>
                          <p className="font-fredoka font-semibold">{transaction.description}</p>
                          <p className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Calendar className="w-3 h-3" /> {transaction.date}
                            <Badge variant="outline" className="text-xs ml-2">{transaction.category}</Badge>
                          </p>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className={`font-fredoka font-bold text-lg ${
                          transaction.type === "income" ? "text-accent" : "text-highlight"
                        }`}>
                          {transaction.type === "income" ? "+" : "-"}
                          {formatCurrency(transaction.amount)}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {transaction.type === "income" ? "Pemasukan" : "Pengeluaran"}
                        </div>
                      </div>
                    </motion.div>
                  ))}

                </div>

                {/* Pagination */}
                {filteredTransactions.length > itemsPerPage && (
                  <div className="flex justify-center items-center gap-4 mt-4">
                    <Button size="sm" variant="outline" disabled={currentPage === 1}
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}>
                      Prev
                    </Button>

                    <div className="text-sm font-medium">
                      Halaman {currentPage} / {totalPages}
                    </div>

                    <Button size="sm" variant="outline" disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}>
                      Next
                    </Button>
                  </div>
                )}

              </CardContent>
            </Card>
          </motion.div>



          {/* RIGHT — Charts + Breakdown */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-6">

            {/* Expense breakdown */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="w-5 h-5" /> Distribusi Pengeluaran
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">
                {expenseCategories.map((c) => {
                  const percentage = Math.round((c.amount / cashflowData.totalExpense) * 100);
                  return (
                    <div key={c.name}>
                      <div className="flex justify-between text-sm">
                        <span>{c.name}</span>
                        <span className="font-fredoka">{percentage}%</span>
                      </div>

                      <div className="h-3 bg-secondary rounded-full overflow-hidden border border-foreground/20 mt-2">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${percentage}%` }}
                          transition={{ duration: 0.6 }}
                          className={`h-full ${c.color}`}
                        />
                      </div>

                      <p className="text-xs text-muted-foreground mt-1">
                        {formatCurrency(c.amount)}
                      </p>
                    </div>
                  );
                })}
              </CardContent>
            </Card>


            {/* Bar chart */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="font-fredoka">Grafik Cashflow Per Bulan</CardTitle>
              </CardHeader>

              <CardContent>
                <div className="w-full h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={cashflowData.monthlyData}>
                      <XAxis dataKey="month" />
                      <YAxis tickFormatter={(v) => v / 1000000 + " jt"} />
                      <Tooltip formatter={(v) => formatCurrency(v as number)} />
                      <Legend />

                      <Bar dataKey="income" name="Pemasukan" fill="#86a9cf" radius={[6,6,0,0]} />
                      <Bar dataKey="expense" name="Pengeluaran" fill="#e37749" radius={[6,6,0,0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

          </motion.div>
        </div>
      </div>
    </div>
  );
}
