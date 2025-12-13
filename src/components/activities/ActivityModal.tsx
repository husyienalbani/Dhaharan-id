import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, MapPin, Users, FileText, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Activity, ModalMode } from "@/types";
import { formatDate } from "@/utils/formatters";

interface ActivityModalProps {
  isOpen: boolean;
  mode: ModalMode;
  activity: Activity | null;
  onClose: () => void;
  onSave: (activity: Omit<Activity, "id" | "createdAt">) => void;
}

const statusConfig = {
  upcoming: { label: "Akan Datang", variant: "accent" as const },
  ongoing: { label: "Berlangsung", variant: "highlight" as const },
  completed: { label: "Selesai", variant: "secondary" as const },
};

export default function ActivityModal({
  isOpen,
  mode,
  activity,
  onClose,
  onSave,
}: ActivityModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    status: "upcoming" as Activity["status"],
    participants: 0,
    photos: [] as File[], // State for uploaded photos
  });

  const [loadingLocation, setLoadingLocation] = useState(false);

  const handleUseMyLocation = () => {
    if (!navigator.geolocation) {
      alert("Browser Anda tidak mendukung GPS.");
      return;
    }

    setLoadingLocation(true);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        const formatted = `${latitude}, ${longitude}`;
        setFormData((prev) => ({
          ...prev,
          location: formatted,
        }));
        setLoadingLocation(false);
      },
      () => {
        alert("Tidak bisa mengambil lokasi. Pastikan GPS aktif.");
        setLoadingLocation(false);
      }
    );
  };

  useEffect(() => {
    if (activity && (mode === "edit" || mode === "view")) {
      setFormData({
        title: activity.title,
        description: activity.description,
        date: activity.date,
        location: activity.location,
        status: activity.status,
        participants: activity.participants,
        photos: activity.photos || [], // Initialize with existing photos if available
      });
    } else {
      setFormData({
        title: "",
        description: "",
        date: "",
        location: "",
        status: "upcoming",
        participants: 0,
        photos: [],
      });
    }
  }, [activity, mode, isOpen]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData((prev) => ({
        ...prev,
        photos: Array.from(e.target.files), // Update photos state
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const isViewMode = mode === "view";

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
                {mode === "create"
                  ? "Tambah Kegiatan"
                  : mode === "edit"
                  ? "Edit Kegiatan"
                  : "Detail Kegiatan"}
              </h2>
              <Button size="icon" variant="ghost" onClick={onClose}>
                <X className="w-5 h-5" />
              </Button>
            </div>

            {isViewMode ? (
              <div className="p-6 space-y-4">
                <Badge variant={statusConfig[formData.status].variant}>
                  {statusConfig[formData.status].label}
                </Badge>
                <h3 className="font-fredoka text-2xl font-bold">
                  {formData.title}
                </h3>
                <p className="text-muted-foreground font-nunito">
                  {formData.description}
                </p>

                <div className="space-y-3 pt-4 border-t-2 border-foreground/10">
                  <div className="flex items-center gap-3 text-sm">
                    <Calendar className="w-5 h-5 text-accent" />
                    <span>{formatDate(formData.date)}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <MapPin className="w-5 h-5 text-highlight" />
                    <span>{formData.location}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Users className="w-5 h-5 text-primary-foreground" />
                    <span>{formData.participants} peserta</span>
                  </div>
                  {/* Display uploaded photos */}
                  <div className="pt-4">
                    <h4 className="font-semibold">Foto Kegiatan:</h4>
                    <ul>
                      {formData.photos.map((photo, index) => (
                        <li key={index}>{photo.name}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Judul Kegiatan
                  </label>
                  <Input
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    placeholder="Masukkan judul kegiatan"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Deskripsi
                  </label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        description: e.target.value,
                      })
                    }
                    placeholder="Jelaskan detail kegiatan"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Tanggal
                    </label>
                    <Input
                      type="date"
                      value={formData.date}
                      onChange={(e) =>
                        setFormData({ ...formData, date: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Peserta
                    </label>
                    <Input
                      type="number"
                      value={formData.participants}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          participants: parseInt(e.target.value) || 0,
                        })
                      }
                      placeholder="0"
                      min={0}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Lokasi
                  </label>
                  <Input
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                    placeholder="Masukkan lokasi kegiatan"
                    required
                  />
                  <Button
                    type="button"
                    variant="outline"
                    className="mt-2 w-full flex items-center gap-2"
                    onClick={handleUseMyLocation}
                    disabled={loadingLocation}
                  >
                    {loadingLocation ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <MapPin className="w-5 h-5" />
                    )}
                    Gunakan Lokasi Saya
                  </Button>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Status
                  </label>
                  <div className="flex gap-2">
                    {(Object.keys(statusConfig) as Array<
                      keyof typeof statusConfig
                    >).map((status) => (
                      <Button
                        key={status}
                        type="button"
                        variant={
                          formData.status === status
                            ? statusConfig[status].variant
                            : "outline"
                        }
                        size="sm"
                        onClick={() =>
                          setFormData({ ...formData, status })
                        }
                      >
                        {statusConfig[status].label}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* File Upload Section */}
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Upload Foto
                  </label>
                  <Input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleFileChange}
                  />
                  {/* Display selected file names */}
                  <ul className="mt-2">
                    {formData.photos.map((photo, index) => (
                      <li key={index}>{photo.name}</li>
                    ))}
                  </ul>
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