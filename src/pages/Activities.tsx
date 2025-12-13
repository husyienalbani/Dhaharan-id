import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Calendar, Search } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import ActivityCard from "@/components/activities/ActivityCard";
import ActivityModal from "@/components/activities/ActivityModal";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { initialActivities } from "@/data/mockData";
import { Activity, ModalMode } from "@/types";
import { toast } from "@/hooks/use-toast";

export default function Activities() {
  const [activities, setActivities] = useLocalStorage<Activity[]>("activities", initialActivities);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<ModalMode>("create");
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);

  const filteredActivities = activities.filter(
    (a) =>
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreate = () => {
    setModalMode("create");
    setSelectedActivity(null);
    setIsModalOpen(true);
  };

  const handleView = (activity: Activity) => {
    setModalMode("view");
    setSelectedActivity(activity);
    setIsModalOpen(true);
  };

  const handleEdit = (activity: Activity) => {
    setModalMode("edit");
    setSelectedActivity(activity);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    setActivities(activities.filter((a) => a.id !== id));
    toast({
      title: "Kegiatan Dihapus",
      description: "Kegiatan berhasil dihapus dari daftar.",
    });
  };

  const handleSave = (data: Omit<Activity, "id" | "createdAt">) => {
    if (modalMode === "create") {
      const newActivity: Activity = {
        ...data,
        id: Date.now().toString(),
        createdAt: new Date().toISOString().split("T")[0],
      };
      setActivities([newActivity, ...activities]);
      toast({
        title: "Kegiatan Ditambahkan! 🎉",
        description: "Kegiatan baru berhasil ditambahkan.",
      });
    } else if (modalMode === "edit" && selectedActivity) {
      setActivities(
        activities.map((a) =>
          a.id === selectedActivity.id ? { ...a, ...data } : a
        )
      );
      toast({
        title: "Kegiatan Diperbarui",
        description: "Perubahan berhasil disimpan.",
      });
    }
    setIsModalOpen(false);
  };

  return (
    <DashboardLayout>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <motion.div
              whileHover={{ rotate: [0, -10, 10, 0] }}
              transition={{ duration: 0.5 }}
              className="w-12 h-12 rounded-xl bg-accent border-2 border-foreground shadow-cartoon flex items-center justify-center"
            >
              <Calendar className="w-6 h-6 text-accent-foreground" />
            </motion.div>
            <div>
              <h1 className="font-fredoka text-2xl md:text-3xl font-bold">
                Kegiatan Sosial
              </h1>
              <p className="text-muted-foreground font-nunito text-sm">
                Kelola semua kegiatan organisasi
              </p>
            </div>
          </div>
          <Button onClick={handleCreate} variant="accent">
            <Plus className="w-5 h-5" />
            Tambah Kegiatan
          </Button>
        </div>
      </motion.div>

      {/* Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-6"
      >
        <div className="relative max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Cari kegiatan..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12"
          />
        </div>
      </motion.div>

      {/* Activities List */}
      {filteredActivities.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2">
          {filteredActivities.map((activity, index) => (
            <ActivityCard
              key={activity.id}
              activity={activity}
              index={index}
              onView={handleView}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardContent className="py-16 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-secondary border-2 border-foreground shadow-cartoon flex items-center justify-center">
                <Calendar className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="font-fredoka text-lg font-semibold mb-2">
                {searchQuery ? "Tidak Ada Hasil" : "Belum Ada Kegiatan"}
              </h3>
              <p className="text-muted-foreground font-nunito text-sm mb-4">
                {searchQuery
                  ? "Coba kata kunci lain"
                  : "Tambahkan kegiatan pertama Anda"}
              </p>
              {!searchQuery && (
                <Button onClick={handleCreate} variant="accent">
                  <Plus className="w-5 h-5" />
                  Tambah Kegiatan
                </Button>
              )}
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Modal */}
      <ActivityModal
        isOpen={isModalOpen}
        mode={modalMode}
        activity={selectedActivity}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
      />
    </DashboardLayout>
  );
}
