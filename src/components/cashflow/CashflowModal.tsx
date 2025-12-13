import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, TrendingUp, TrendingDown, Tag, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { CashflowItem, ModalMode } from "@/types";
import { formatCurrency, formatDate } from "@/utils/formatters";

interface CashflowModalProps {
  isOpen: boolean;
  mode: ModalMode;
  item: CashflowItem | null;
  onClose: () => void;
  onSave: (item: Omit<CashflowItem, "id" | "createdAt">) => void;
}

const categories = ["Donasi", "Operasional", "Transport", "Perlengkapan", "Lainnya"];

export default function CashflowModal({
  isOpen,
  mode,
  item,
  onClose,
  onSave,
}: CashflowModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    amount: 0,
    type: "income" as CashflowItem["type"],
    category: "Donasi",
    date: "",
  });

  useEffect(() => {
    if (item && (mode === "edit" || mode === "view")) {
      setFormData({
        title: item.title,
        description: item.description,
        amount: item.amount,
        type: item.type,
        category: item.category,
        date: item.date,
      });
    } else {
      setFormData({
        title: "",
        description: "",
        amount: 0,
        type: "income",
        category: "Donasi",
        date: new Date().toISOString().split("T")[0],
      });
    }
  }, [item, mode, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const isViewMode = mode === "view";
  const isIncome = formData.type === "income";

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-foreground/30 z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-x-4 top-[10%] md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-full md:max-w-lg bg-card border-2 border-foreground rounded-2xl shadow-cartoon-lg z-50 max-h-[80vh] overflow-auto"
          >
            <div className="sticky top-0 bg-card border-b-2 border-foreground p-4 flex items-center justify-between rounded-t-2xl">
              <h2 className="font-fredoka text-xl font-bold">
                {mode === "create" ? "Tambah Transaksi" : mode === "edit" ? "Edit Transaksi" : "Detail Transaksi"}
              </h2>
              <Button size="icon" variant="ghost" onClick={onClose}>
                <X className="w-5 h-5" />
              </Button>
            </div>

            {isViewMode ? (
              <div className="p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-14 h-14 rounded-xl border-2 border-foreground shadow-cartoon-sm flex items-center justify-center ${
                      isIncome ? "bg-accent" : "bg-highlight"
                    }`}
                  >
                    {isIncome ? (
                      <TrendingUp className="w-7 h-7 text-accent-foreground" />
                    ) : (
                      <TrendingDown className="w-7 h-7 text-highlight-foreground" />
                    )}
                  </div>
                  <div>
                    <Badge variant={isIncome ? "accent" : "highlight"}>
                      {isIncome ? "Pemasukan" : "Pengeluaran"}
                    </Badge>
                    <p
                      className={`font-fredoka text-2xl font-bold mt-1 ${
                        isIncome ? "text-accent" : "text-highlight"
                      }`}
                    >
                      {isIncome ? "+" : "-"} {formatCurrency(formData.amount)}
                    </p>
                  </div>
                </div>
                <h3 className="font-fredoka text-xl font-bold">{formData.title}</h3>
                <p className="text-muted-foreground font-nunito">{formData.description}</p>
                <div className="space-y-3 pt-4 border-t-2 border-foreground/10">
                  <div className="flex items-center gap-3 text-sm">
                    <Tag className="w-5 h-5 text-primary-foreground" />
                    <span>{formData.category}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Calendar className="w-5 h-5 text-accent" />
                    <span>{formatDate(formData.date)}</span>
                  </div>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Tipe Transaksi</label>
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant={formData.type === "income" ? "accent" : "outline"}
                      className="flex-1"
                      onClick={() => setFormData({ ...formData, type: "income" })}
                    >
                      <TrendingUp className="w-4 h-4 mr-2" />
                      Pemasukan
                    </Button>
                    <Button
                      type="button"
                      variant={formData.type === "expense" ? "highlight" : "outline"}
                      className="flex-1"
                      onClick={() => setFormData({ ...formData, type: "expense" })}
                    >
                      <TrendingDown className="w-4 h-4 mr-2" />
                      Pengeluaran
                    </Button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Judul</label>
                  <Input
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Masukkan judul transaksi"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Deskripsi</label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Jelaskan detail transaksi"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Jumlah (Rp)</label>
                    <Input
                      type="number"
                      value={formData.amount}
                      onChange={(e) => setFormData({ ...formData, amount: parseInt(e.target.value) || 0 })}
                      placeholder="0"
                      min={0}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Tanggal</label>
                    <Input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Kategori</label>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((cat) => (
                      <Button
                        key={cat}
                        type="button"
                        variant={formData.category === cat ? "default" : "outline"}
                        size="sm"
                        onClick={() => setFormData({ ...formData, category: cat })}
                      >
                        {cat}
                      </Button>
                    ))}
                  </div>
                </div>
                <div className="flex gap-3 pt-4">
                  <Button type="button" variant="outline" className="flex-1" onClick={onClose}>
                    Batal
                  </Button>
                  <Button type="submit" variant="accent" className="flex-1">
                    {mode === "create" ? "Tambah" : "Simpan"}
                  </Button>
                </div>
              </form>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
