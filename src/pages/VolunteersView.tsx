import { useState } from "react";
import { motion } from "framer-motion";
import {
  Users,
  Check,
  X,
  Mail,
  Phone,
  Briefcase,
} from "lucide-react";

import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { VolunteerRequest } from "@/types";
import { formatDate } from "@/utils/formatters";

/* ================= STATUS CONFIG ================= */
const statusConfig = {
  pending: { label: "Menunggu", variant: "default" as const },
  approved: { label: "Diterima", variant: "success" as const },
  rejected: { label: "Ditolak", variant: "destructive" as const },
};

export default function VolunteersView() {
  const [filter, setFilter] = useState<
    "all" | VolunteerRequest["status"]
  >("all");

  /* ================= DUMMY DATA ================= */
  const [volunteers, setVolunteers] = useState<VolunteerRequest[]>([
    {
      id: "1",
      name: "Andi Pratama",
      email: "andi@mail.com",
      phone: "08123456789",
      skills: ["Logistik", "Event"],
      motivation: "Ingin membantu kegiatan sosial",
      status: "pending",
      createdAt: new Date().toISOString(),
    },
  ]);

  /* ================= HANDLER ================= */
  const onUpdateStatus = (
    id: string,
    status: VolunteerRequest["status"]
  ) => {
    setVolunteers((prev) =>
      prev.map((v) => (v.id === id ? { ...v, status } : v))
    );
  };

  const filteredVolunteers = volunteers
    .filter((v) => filter === "all" || v.status === filter)
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() -
        new Date(a.createdAt).getTime()
    );

  const pendingCount = volunteers.filter(
    (v) => v.status === "pending"
  ).length;

  const approvedCount = volunteers.filter(
    (v) => v.status === "approved"
  ).length;

  return (
    <DashboardLayout>
      {/* ================= HEADER ================= */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="font-fredoka text-3xl md:text-4xl font-bold mb-2">
          Pengajuan Volunteer
        </h1>
        <p className="text-muted-foreground font-nunito">
          Kelola dan review pengajuan volunteer
        </p>
      </motion.div>

      {/* ================= SUMMARY ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="bg-secondary">
            <CardContent className="p-5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary border-2 border-foreground shadow-cartoon-sm flex items-center justify-center">
                <Users className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <p className="text-sm opacity-70">Menunggu Review</p>
                <p className="font-fredoka text-2xl font-bold">
                  {pendingCount}
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-accent">
            <CardContent className="p-5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-card border-2 border-foreground shadow-cartoon-sm flex items-center justify-center">
                <Users className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <p className="text-sm opacity-70 text-accent-foreground">
                  Volunteer Aktif
                </p>
                <p className="font-fredoka text-2xl font-bold text-accent-foreground">
                  {approvedCount}
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* ================= FILTER ================= */}
      <div className="flex gap-2 flex-wrap mb-6">
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

      {/* ================= LIST ================= */}
      {filteredVolunteers.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filteredVolunteers.map((v, index) => (
            <motion.div
              key={v.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="hover:shadow-cartoon transition-all">
                <CardContent className="p-5 space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-fredoka text-lg font-bold">
                        {v.name}
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        {formatDate(v.createdAt)}
                      </p>
                    </div>
                    <Badge
                      variant={statusConfig[v.status].variant}
                    >
                      {statusConfig[v.status].label}
                    </Badge>
                  </div>

                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      {v.email}
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      {v.phone}
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <Briefcase className="w-4 h-4" />
                      {v.skills.map((s) => (
                        <span
                          key={s}
                          className="px-2 py-0.5 text-xs rounded-full bg-secondary border"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  {v.status === "pending" && (
                    <div className="flex gap-2 pt-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1"
                        onClick={() =>
                          onUpdateStatus(v.id, "rejected")
                        }
                      >
                        <X className="w-4 h-4 mr-1" />
                        Tolak
                      </Button>
                      <Button
                        size="sm"
                        className="flex-1 bg-emerald-400 hover:bg-emerald-500"
                        onClick={() =>
                          onUpdateStatus(v.id, "approved")
                        }
                      >
                        <Check className="w-4 h-4 mr-1" />
                        Terima
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 text-muted-foreground">
          <Users className="w-12 h-12 mx-auto mb-3 opacity-50" />
          Belum ada pengajuan volunteer
        </div>
      )}
    </DashboardLayout>
  );
}
