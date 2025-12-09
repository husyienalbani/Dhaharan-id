import { useState } from "react";
import { motion } from "framer-motion";
import { Shield, Check, X, Eye, Clock, User, Calendar, MapPin, FileText, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

// Mock pending submissions
const initialSubmissions = [
  {
    id: 1,
    type: "activity",
    title: "Bagi-bagi Takjil di Stasiun",
    description: "Kegiatan pembagian takjil untuk penumpang KRL di stasiun Sudirman.",
    submittedBy: "Ahmad Fauzi",
    submittedAt: "2 jam lalu",
    date: "20 Maret 2024",
    location: "Stasiun Sudirman, Jakarta",
    status: "pending",
  },
  {
    id: 2,
    type: "activity",
    title: "Pengobatan Gratis Lansia",
    description: "Program pemeriksaan kesehatan dan pemberian obat gratis untuk lansia.",
    submittedBy: "Dr. Siti Aminah",
    submittedAt: "5 jam lalu",
    date: "25 Maret 2024",
    location: "Puskesmas Menteng",
    status: "pending",
  },
  {
    id: 3,
    type: "cashflow",
    title: "Donasi Anggota Baru",
    description: "Pemasukan dari donasi anggota baru bulan Maret.",
    submittedBy: "Treasurer Team",
    submittedAt: "1 hari lalu",
    amount: 2500000,
    status: "pending",
  },
  {
    id: 4,
    type: "activity",
    title: "Workshop Kewirausahaan",
    description: "Workshop pelatihan kewirausahaan untuk pemuda setempat.",
    submittedBy: "Rizki Pratama",
    submittedAt: "2 hari lalu",
    date: "1 April 2024",
    location: "Aula Kelurahan Menteng",
    status: "pending",
  },
];

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);
};

export default function Admin() {
  const [submissions, setSubmissions] = useState(initialSubmissions);
  const [selectedSubmission, setSelectedSubmission] = useState<typeof initialSubmissions[0] | null>(null);

  const handleApprove = (id: number) => {
    setSubmissions(submissions.filter((s) => s.id !== id));
    setSelectedSubmission(null);
    toast({
      title: "Disetujui! ✓",
      description: "Pengajuan berhasil disetujui dan akan ditampilkan.",
    });
  };

  const handleReject = (id: number) => {
    setSubmissions(submissions.filter((s) => s.id !== id));
    setSelectedSubmission(null);
    toast({
      title: "Ditolak",
      description: "Pengajuan telah ditolak.",
      variant: "destructive",
    });
  };

  const pendingCount = submissions.filter((s) => s.status === "pending").length;

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 rounded-xl bg-accent border-2 border-foreground shadow-cartoon flex items-center justify-center">
                  <Shield className="w-6 h-6 text-accent-foreground" />
                </div>
                <div>
                  <h1 className="font-fredoka text-2xl md:text-3xl font-bold">
                    Panel Admin
                  </h1>
                  <p className="text-muted-foreground font-nunito text-sm">
                    Kelola pengajuan dan approval
                  </p>
                </div>
              </div>
            </div>
            <Link to="/">
              <Button variant="outline">
                <LogOut className="w-4 h-4" />
                Keluar
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="bg-primary">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium opacity-80">Menunggu</p>
                    <p className="font-fredoka text-3xl font-bold">{pendingCount}</p>
                  </div>
                  <Clock className="w-8 h-8 opacity-50" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            <Card className="bg-accent">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-accent-foreground/80">Disetujui</p>
                    <p className="font-fredoka text-3xl font-bold text-accent-foreground">24</p>
                  </div>
                  <Check className="w-8 h-8 text-accent-foreground/50" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="bg-highlight">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-highlight-foreground/80">Ditolak</p>
                    <p className="font-fredoka text-3xl font-bold text-highlight-foreground">3</p>
                  </div>
                  <X className="w-8 h-8 text-highlight-foreground/50" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
          >
            <Card className="bg-secondary">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-secondary-foreground/80">Total Bulan Ini</p>
                    <p className="font-fredoka text-3xl font-bold">31</p>
                  </div>
                  <FileText className="w-8 h-8 opacity-50" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Submissions List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2"
          >
            <Card>
              <CardHeader>
                <CardTitle>Pengajuan Menunggu Approval</CardTitle>
                <CardDescription>
                  Klik untuk melihat detail dan melakukan review
                </CardDescription>
              </CardHeader>
              <CardContent>
                {submissions.length > 0 ? (
                  <div className="space-y-4">
                    {submissions.map((submission, index) => (
                      <motion.div
                        key={submission.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        onClick={() => setSelectedSubmission(submission)}
                        className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                          selectedSubmission?.id === submission.id
                            ? "border-primary bg-primary/10 shadow-cartoon"
                            : "border-foreground/20 hover:border-foreground/40 hover:bg-secondary/50"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge variant={submission.type === "activity" ? "highlight" : "accent"}>
                                {submission.type === "activity" ? "Kegiatan" : "Cashflow"}
                              </Badge>
                              <Badge variant="outline">
                                <Clock className="w-3 h-3 mr-1" />
                                {submission.submittedAt}
                              </Badge>
                            </div>
                            <h3 className="font-fredoka font-semibold mb-1">
                              {submission.title}
                            </h3>
                            <p className="text-sm text-muted-foreground line-clamp-1">
                              {submission.description}
                            </p>
                            <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                              <User className="w-3 h-3" />
                              <span>{submission.submittedBy}</span>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="accent"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleApprove(submission.id);
                              }}
                            >
                              <Check className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleReject(submission.id);
                              }}
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-secondary border-2 border-foreground shadow-cartoon flex items-center justify-center">
                      <Check className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <h3 className="font-fredoka text-lg font-semibold mb-2">
                      Semua Sudah Diproses!
                    </h3>
                    <p className="text-muted-foreground font-nunito text-sm">
                      Tidak ada pengajuan yang menunggu approval.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Detail Panel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  Detail Pengajuan
                </CardTitle>
              </CardHeader>
              <CardContent>
                {selectedSubmission ? (
                  <div className="space-y-4">
                    <Badge variant={selectedSubmission.type === "activity" ? "highlight" : "accent"}>
                      {selectedSubmission.type === "activity" ? "Kegiatan" : "Cashflow"}
                    </Badge>

                    <div>
                      <h3 className="font-fredoka text-lg font-semibold mb-2">
                        {selectedSubmission.title}
                      </h3>
                      <p className="text-sm text-muted-foreground font-nunito">
                        {selectedSubmission.description}
                      </p>
                    </div>

                    <div className="space-y-3 pt-4 border-t border-foreground/10">
                      <div className="flex items-center gap-2 text-sm">
                        <User className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Diajukan oleh:</span>
                        <span className="font-semibold">{selectedSubmission.submittedBy}</span>
                      </div>

                      {selectedSubmission.date && (
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          <span className="text-muted-foreground">Tanggal:</span>
                          <span className="font-semibold">{selectedSubmission.date}</span>
                        </div>
                      )}

                      {selectedSubmission.location && (
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin className="w-4 h-4 text-muted-foreground" />
                          <span className="text-muted-foreground">Lokasi:</span>
                          <span className="font-semibold">{selectedSubmission.location}</span>
                        </div>
                      )}

                      {selectedSubmission.amount && (
                        <div className="flex items-center gap-2 text-sm">
                          <FileText className="w-4 h-4 text-muted-foreground" />
                          <span className="text-muted-foreground">Jumlah:</span>
                          <span className="font-semibold text-accent">
                            {formatCurrency(selectedSubmission.amount)}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="flex gap-2 pt-4">
                      <Button
                        className="flex-1"
                        variant="accent"
                        onClick={() => handleApprove(selectedSubmission.id)}
                      >
                        <Check className="w-4 h-4" />
                        Setujui
                      </Button>
                      <Button
                        className="flex-1"
                        variant="destructive"
                        onClick={() => handleReject(selectedSubmission.id)}
                      >
                        <X className="w-4 h-4" />
                        Tolak
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-secondary border-2 border-foreground shadow-cartoon-sm flex items-center justify-center">
                      <Eye className="w-6 h-6 text-muted-foreground" />
                    </div>
                    <p className="text-muted-foreground font-nunito text-sm">
                      Pilih pengajuan untuk melihat detail
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
