import { useState } from "react";
import { motion } from "framer-motion";
import { Wallet, TrendingUp, TrendingDown, DollarSign, Calendar, ArrowUpRight, ArrowDownRight, PieChart, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Mock cashflow data
const cashflowData = {
  balance: 15750000,
  totalIncome: 25000000,
  totalExpense: 9250000,
  transactions: [
    {
      id: 1,
      type: "income",
      description: "Donasi Anggota Bulan Maret",
      amount: 5000000,
      date: "15 Maret 2024",
      category: "Donasi",
    },
    {
      id: 2,
      type: "expense",
      description: "Pembelian Sembako Baksos",
      amount: 2500000,
      date: "12 Maret 2024",
      category: "Kegiatan",
    },
    {
      id: 3,
      type: "income",
      description: "Sponsor Kegiatan Ramadhan",
      amount: 7500000,
      date: "10 Maret 2024",
      category: "Sponsor",
    },
    {
      id: 4,
      type: "expense",
      description: "Santunan Anak Yatim",
      amount: 3000000,
      date: "5 Maret 2024",
      category: "Santunan",
    },
    {
      id: 5,
      type: "income",
      description: "Donasi Anggota Bulan Februari",
      amount: 4500000,
      date: "25 Februari 2024",
      category: "Donasi",
    },
    {
      id: 6,
      type: "expense",
      description: "Operasional Kegiatan",
      amount: 1500000,
      date: "20 Februari 2024",
      category: "Operasional",
    },
    {
      id: 7,
      type: "income",
      description: "Zakat & Infaq",
      amount: 8000000,
      date: "15 Februari 2024",
      category: "Zakat",
    },
    {
      id: 8,
      type: "expense",
      description: "Pengobatan Gratis",
      amount: 2250000,
      date: "10 Februari 2024",
      category: "Kesehatan",
    },
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

export default function Cashflow() {
  const [filter, setFilter] = useState<"all" | "income" | "expense">("all");

  const filteredTransactions = cashflowData.transactions.filter((t) => {
    if (filter === "all") return true;
    return t.type === filter;
  });

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <Badge className="mb-4" variant="accent">
            <Wallet className="w-4 h-4 mr-1" />
            Transparansi Dana
          </Badge>
          <h1 className="font-fredoka text-4xl md:text-5xl font-bold mb-4">
            Cashflow Komunitas
          </h1>
          <p className="font-nunito text-muted-foreground max-w-2xl mx-auto">
            Kami berkomitmen untuk transparansi dalam pengelolaan dana komunitas. 
            Lihat laporan keuangan lengkap di sini.
          </p>
        </motion.div>

        {/* Summary Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="bg-primary">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Saldo Saat Ini</CardTitle>
                <DollarSign className="w-5 h-5" />
              </CardHeader>
              <CardContent>
                <div className="font-fredoka text-3xl font-bold">
                  {formatCurrency(cashflowData.balance)}
                </div>
                <p className="text-sm mt-1 opacity-80">Per Maret 2024</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="bg-accent">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-accent-foreground">Total Pemasukan</CardTitle>
                <TrendingUp className="w-5 h-5 text-accent-foreground" />
              </CardHeader>
              <CardContent>
                <div className="font-fredoka text-3xl font-bold text-accent-foreground">
                  {formatCurrency(cashflowData.totalIncome)}
                </div>
                <p className="text-sm mt-1 text-accent-foreground/80">Tahun 2024</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="bg-highlight">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-highlight-foreground">Total Pengeluaran</CardTitle>
                <TrendingDown className="w-5 h-5 text-highlight-foreground" />
              </CardHeader>
              <CardContent>
                <div className="font-fredoka text-3xl font-bold text-highlight-foreground">
                  {formatCurrency(cashflowData.totalExpense)}
                </div>
                <p className="text-sm mt-1 text-highlight-foreground/80">Tahun 2024</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Transaction List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2"
          >
            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <CardTitle>Riwayat Transaksi</CardTitle>
                    <CardDescription>Daftar pemasukan dan pengeluaran</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant={filter === "all" ? "default" : "outline"}
                      onClick={() => setFilter("all")}
                    >
                      Semua
                    </Button>
                    <Button
                      size="sm"
                      variant={filter === "income" ? "default" : "outline"}
                      onClick={() => setFilter("income")}
                    >
                      <ArrowUpRight className="w-4 h-4 mr-1" />
                      Masuk
                    </Button>
                    <Button
                      size="sm"
                      variant={filter === "expense" ? "default" : "outline"}
                      onClick={() => setFilter("expense")}
                    >
                      <ArrowDownRight className="w-4 h-4 mr-1" />
                      Keluar
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredTransactions.map((transaction, index) => (
                    <motion.div
                      key={transaction.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-center justify-between p-4 rounded-xl bg-secondary/50 border-2 border-foreground/10"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center border-2 border-foreground shadow-cartoon-sm ${
                          transaction.type === "income" ? "bg-accent" : "bg-highlight"
                        }`}>
                          {transaction.type === "income" ? (
                            <ArrowUpRight className="w-5 h-5" />
                          ) : (
                            <ArrowDownRight className="w-5 h-5" />
                          )}
                        </div>
                        <div>
                          <p className="font-fredoka font-semibold">{transaction.description}</p>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Calendar className="w-3 h-3" />
                            <span>{transaction.date}</span>
                            <Badge variant="outline" className="text-xs">
                              {transaction.category}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <span className={`font-fredoka font-bold text-lg ${
                        transaction.type === "income" ? "text-accent" : "text-highlight"
                      }`}>
                        {transaction.type === "income" ? "+" : "-"}{formatCurrency(transaction.amount)}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Expense Breakdown */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="w-5 h-5" />
                  Distribusi Pengeluaran
                </CardTitle>
                <CardDescription>Berdasarkan kategori</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {expenseCategories.map((category, index) => {
                  const percentage = Math.round((category.amount / cashflowData.totalExpense) * 100);
                  return (
                    <motion.div
                      key={category.name}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                      className="space-y-2"
                    >
                      <div className="flex justify-between text-sm">
                        <span className="font-nunito font-medium">{category.name}</span>
                        <span className="font-fredoka font-semibold">{percentage}%</span>
                      </div>
                      <div className="h-3 bg-secondary rounded-full overflow-hidden border border-foreground/20">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${percentage}%` }}
                          transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
                          className={`h-full ${category.color} rounded-full`}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {formatCurrency(category.amount)}
                      </p>
                    </motion.div>
                  );
                })}
              </CardContent>
            </Card>

            {/* Transparency Note */}
            <Card className="mt-6 bg-secondary">
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-primary border-2 border-foreground shadow-cartoon-sm flex items-center justify-center">
                    <Wallet className="w-6 h-6" />
                  </div>
                  <h3 className="font-fredoka font-semibold mb-2">Komitmen Transparansi</h3>
                  <p className="text-sm text-muted-foreground font-nunito">
                    Setiap transaksi tercatat dan dapat dipertanggungjawabkan. 
                    Laporan lengkap tersedia untuk anggota.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
