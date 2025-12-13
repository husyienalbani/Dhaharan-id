import { motion } from "framer-motion";
import {
  Calendar,
  Wallet,
  TrendingUp,
  TrendingDown,
  Users,
  ArrowRight,
  LogOut
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { initialActivities, initialCashflow } from "@/data/mockData";
import { formatCurrency, formatShortDate } from "@/utils/formatters";
import { Activity, CashflowItem } from "@/types";

export default function Dashboard() {
  const navigate = useNavigate();

  const [activities] = useLocalStorage<Activity[]>(
    "activities",
    initialActivities
  );
  const [cashflow] = useLocalStorage<CashflowItem[]>(
    "cashflow",
    initialCashflow
  );

  const totalIncome = cashflow
    .filter((c) => c.type === "income")
    .reduce((sum, c) => sum + c.amount, 0);

  const totalExpense = cashflow
    .filter((c) => c.type === "expense")
    .reduce((sum, c) => sum + c.amount, 0);

  const balance = totalIncome - totalExpense;

  const upcomingActivities = activities
    .filter((a) => a.status === "upcoming")
    .slice(0, 3);

  const recentCashflow = cashflow.slice(0, 3);

  // LOGOUT FUNCTION
  const handleLogout = () => {
    localStorage.removeItem("user"); // bersihkan data login
    navigate("/login"); // arahkan ke halaman login
  };

  const stats = [
    {
      title: "Kegiatan Aktif",
      value: activities.filter((a) => a.status !== "completed").length,
      icon: Calendar,
      bg: "bg-primary",
      iconColor: "text-primary-foreground",
    },
    {
      title: "Total Pemasukan",
      value: formatCurrency(totalIncome),
      icon: TrendingUp,
      bg: "bg-accent",
      iconColor: "text-accent-foreground",
    },
    {
      title: "Total Pengeluaran",
      value: formatCurrency(totalExpense),
      icon: TrendingDown,
      bg: "bg-highlight",
      iconColor: "text-highlight-foreground",
    },
    {
      title: "Saldo",
      value: formatCurrency(balance),
      icon: Wallet,
      bg: "bg-secondary",
      iconColor: "text-secondary-foreground",
    },
  ];

  return (
    <DashboardLayout>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="font-fredoka text-3xl md:text-4xl font-bold mb-2">
          Selamat Datang! 👋
        </h1>
        <p className="text-muted-foreground font-nunito">
          Kelola kegiatan sosial dan keuangan organisasi Anda dengan mudah.
        </p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className={stat.bg}>
                <CardContent className="p-4 md:p-6">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs md:text-sm font-medium opacity-80">
                      {stat.title}
                    </p>
                    <Icon
                      className={`w-5 h-5 md:w-6 md:h-6 opacity-60 ${stat.iconColor}`}
                    />
                  </div>
                  <p className="font-fredoka text-xl md:text-2xl font-bold truncate">
                    {stat.value}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Content Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Upcoming Activities */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Kegiatan Mendatang
              </CardTitle>
              <Link to="/activities">
                <Button variant="ghost" size="sm">
                  Lihat Semua
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              {upcomingActivities.length > 0 ? (
                <div className="space-y-3">
                  {upcomingActivities.map((activity, index) => (
                    <motion.div
                      key={activity.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="flex items-center gap-4 p-3 rounded-xl bg-secondary/50 border-2 border-foreground/10 hover:border-foreground/30 transition-all"
                    >
                      <div className="w-12 h-12 rounded-xl bg-primary border-2 border-foreground shadow-cartoon-sm flex items-center justify-center font-fredoka text-sm font-bold">
                        {formatShortDate(activity.date)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold truncate">
                          {activity.title}
                        </h4>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Users className="w-3 h-3" />
                          <span>{activity.participants} peserta</span>
                        </div>
                      </div>
                      <Badge variant="accent">Akan Datang</Badge>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Calendar className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p className="font-nunito">Belum ada kegiatan mendatang</p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Cashflow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Wallet className="w-5 h-5" />
                Transaksi Terakhir
              </CardTitle>
              <Link to="/addcashflow">
                <Button variant="ghost" size="sm">
                  Lihat Semua
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              {recentCashflow.length > 0 ? (
                <div className="space-y-3">
                  {recentCashflow.map((item, index) => {
                    const isIncome = item.type === "income";
                    return (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 + index * 0.1 }}
                        className="flex items-center gap-4 p-3 rounded-xl bg-secondary/50 border-2 border-foreground/10 hover:border-foreground/30 transition-all"
                      >
                        <div
                          className={`w-10 h-10 rounded-xl border-2 border-foreground shadow-cartoon-sm flex items-center justify-center ${
                            isIncome ? "bg-accent" : "bg-highlight"
                          }`}
                        >
                          {isIncome ? (
                            <TrendingUp className="w-5 h-5 text-accent-foreground" />
                          ) : (
                            <TrendingDown className="w-5 h-5 text-highlight-foreground" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold truncate text-sm">
                            {item.title}
                          </h4>
                          <p className="text-xs text-muted-foreground">
                            {item.category}
                          </p>
                        </div>
                        <span
                          className={`font-fredoka font-bold text-sm ${
                            isIncome ? "text-accent" : "text-highlight"
                          }`}
                        >
                          {isIncome ? "+" : "-"} {formatCurrency(item.amount)}
                        </span>
                      </motion.div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Wallet className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p className="font-nunito">Belum ada transaksi</p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* LOGOUT BUTTON DI BAGIAN BAWAH */}
      {/* <div className="mt-10 flex justify-center">
        <Button
          variant="destructive"
          className="flex items-center gap-2 px-6 py-3 text-lg font-semibold"
          onClick={handleLogout}
        >
          <LogOut className="w-5 h-5" />
          Keluar
        </Button> */}
      {/* </div> */}
    </DashboardLayout>
  );
}
