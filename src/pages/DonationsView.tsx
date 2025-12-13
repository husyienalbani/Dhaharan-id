import { useState } from "react";
import { motion } from "framer-motion";
import {
  Heart,
  Check,
  X,
  Mail,
  Phone,
  MessageSquare,
  Search,
} from "lucide-react";

import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatCurrency, formatDate } from "@/utils/formatters";

/* =====================
   TYPES
===================== */
type DonationStatus = "pending" | "approved" | "rejected";

interface DonationRequest {
  id: string;
  name: string;
  email: string;
  phone: string;
  amount: number;
  message?: string;
  status: DonationStatus;
  createdAt: string;
}

/* =====================
   STATUS CONFIG
===================== */
const statusConfig = {
  pending: {
    label: "Menunggu",
    className: "bg-yellow-100 text-yellow-700 border-yellow-300",
  },
  approved: {
    label: "Disetujui",
    className: "bg-emerald-100 text-emerald-700 border-emerald-300",
  },
  rejected: {
    label: "Ditolak",
    className: "bg-rose-100 text-rose-700 border-rose-300",
  },
};

export default function DonationsView() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<"all" | DonationStatus>("all");

  const [donations, setDonations] = useState<DonationRequest[]>([
    {
      id: "1",
      name: "Ahmad Fauzi",
      email: "ahmad@mail.com",
      phone: "08123456789",
      amount: 250000,
      message: "Semoga bermanfaat",
      status: "pending",
      createdAt: new Date().toISOString(),
    },
    {
      id: "2",
      name: "Siti Aminah",
      email: "siti@mail.com",
      phone: "08987654321",
      amount: 500000,
      status: "approved",
      createdAt: new Date().toISOString(),
    },
  ]);

  const updateStatus = (id: string, status: DonationStatus) => {
    setDonations((prev) =>
      prev.map((d) => (d.id === id ? { ...d, status } : d))
    );
  };

  const filteredDonations = donations.filter((d) => {
    const matchSearch =
      d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchStatus = filter === "all" || d.status === filter;
    return matchSearch && matchStatus;
  });

  return (
    <DashboardLayout>
      {/* ================= HEADER ================= */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ rotate: [0, -10, 10, 0] }}
            transition={{ duration: 0.5 }}
            className="w-12 h-12 rounded-xl bg-accent border-2 border-foreground shadow-cartoon flex items-center justify-center"
          >
            <Heart className="w-6 h-6" />
          </motion.div>
          <div>
            <h1 className="font-fredoka text-2xl md:text-3xl font-bold">
              Donasi Masuk
            </h1>
            <p className="text-muted-foreground text-sm">
              Kelola dan verifikasi donasi dari donatur
            </p>
          </div>
        </div>
      </motion.div>

      {/* ================= SEARCH & FILTER ================= */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-col md:flex-row gap-4 mb-6 justify-between"
      >
        {/* SEARCH */}
        <div className="relative max-w-md w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Cari nama / email donatur..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12"
          />
        </div>

        {/* FILTER */}
        <div className="flex gap-2 flex-wrap">
          {(["all", "pending", "approved", "rejected"] as const).map(
            (status) => (
              <Button
                key={status}
                size="sm"
                variant={filter === status ? "secondary" : "outline"}
                onClick={() => setFilter(status)}
              >
                {status === "all"
                  ? "Semua"
                  : statusConfig[status].label}
              </Button>
            )
          )}
        </div>
      </motion.div>

      {/* ================= LIST ================= */}
      {filteredDonations.length > 0 ? (
        <div className="grid md:grid-cols-2 gap-4">
          {filteredDonations.map((donation, index) => (
            <motion.div
              key={donation.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="h-full">
                <CardHeader className="flex flex-row items-start justify-between gap-4">
                  <div className="min-w-0">
                    <CardTitle className="truncate">
                      {donation.name}
                    </CardTitle>
                    <p className="text-xs text-muted-foreground">
                      {formatDate(donation.createdAt)}
                    </p>
                  </div>
                  <Badge
                    className={`border ${statusConfig[donation.status].className}`}
                  >
                    {statusConfig[donation.status].label}
                  </Badge>
                </CardHeader>

                <CardContent className="space-y-3">
                  <div className="text-sm text-muted-foreground space-y-1">
                    <div className="flex gap-2 items-center truncate">
                      <Mail className="w-4 h-4 shrink-0" />
                      <span className="truncate">
                        {donation.email}
                      </span>
                    </div>
                    <div className="flex gap-2 items-center">
                      <Phone className="w-4 h-4 shrink-0" />
                      {donation.phone}
                    </div>
                    {donation.message && (
                      <div className="flex gap-2 items-start">
                        <MessageSquare className="w-4 h-4 mt-0.5 shrink-0" />
                        <em className="line-clamp-2">
                          "{donation.message}"
                        </em>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t">
                    <p className="font-fredoka text-lg text-accent">
                      {formatCurrency(donation.amount)}
                    </p>

                    {donation.status === "pending" && (
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-rose-600 border-rose-300 hover:bg-rose-50"
                          onClick={() =>
                            updateStatus(donation.id, "rejected")
                          }
                        >
                          <X className="w-4 h-4" />
                          Tolak
                        </Button>
                        <Button
                          size="sm"
                          className="bg-emerald-500 hover:bg-emerald-600 text-white"
                          onClick={() =>
                            updateStatus(donation.id, "approved")
                          }
                        >
                          <Check className="w-4 h-4" />
                          Setujui
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      ) : (
        /* ================= EMPTY STATE ================= */
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <Card>
            <CardContent className="py-16 text-center">
              <Heart className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p className="text-muted-foreground">
                {searchQuery ? "Data tidak ditemukan" : "Belum ada donasi"}
              </p>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </DashboardLayout>
  );
}
