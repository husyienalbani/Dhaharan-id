import { motion } from "framer-motion";
import { Settings as SettingsIcon, User, Bell, Palette, Database, Trash2 } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";

export default function Settings() {
  const handleClearData = () => {
    localStorage.removeItem("activities");
    localStorage.removeItem("cashflow");
    toast({
      title: "Data Dihapus",
      description: "Semua data telah direset ke default.",
    });
    window.location.reload();
  };

  const settingSections = [
    {
      icon: User,
      title: "Profil Organisasi",
      description: "Kelola informasi organisasi Anda",
      color: "bg-primary",
    },
    {
      icon: Bell,
      title: "Notifikasi",
      description: "Atur preferensi notifikasi",
      color: "bg-accent",
    },
    {
      icon: Palette,
      title: "Tampilan",
      description: "Sesuaikan tema dan tampilan",
      color: "bg-highlight",
    },
    {
      icon: Database,
      title: "Data & Backup",
      description: "Kelola data dan backup",
      color: "bg-secondary",
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
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ rotate: 90 }}
            transition={{ duration: 0.3 }}
            className="w-12 h-12 rounded-xl bg-secondary border-2 border-foreground shadow-cartoon flex items-center justify-center"
          >
            <SettingsIcon className="w-6 h-6" />
          </motion.div>
          <div>
            <h1 className="font-fredoka text-2xl md:text-3xl font-bold">
              Pengaturan
            </h1>
            <p className="text-muted-foreground font-nunito text-sm">
              Kelola preferensi aplikasi
            </p>
          </div>
        </div>
      </motion.div>

      {/* Settings Grid */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {settingSections.map((section, index) => {
          const Icon = section.icon;
          return (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="hover:shadow-cartoon-lg transition-all cursor-pointer">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 rounded-xl ${section.color} border-2 border-foreground shadow-cartoon-sm flex items-center justify-center`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <CardTitle>{section.title}</CardTitle>
                      <CardDescription>{section.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Organization Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Informasi Organisasi</CardTitle>
            <CardDescription>
              Detail informasi organisasi Anda
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Nama Organisasi</label>
              <Input defaultValue="Dhaharan.id" />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Email</label>
              <Input type="email" defaultValue="contact@dhaharan.id" />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Telepon</label>
              <Input defaultValue="+62 8888-8888-8888" />
            </div>
            <Button variant="accent">Simpan Perubahan</Button>
          </CardContent>
        </Card>
      </motion.div>

      {/* Danger Zone */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-8"
      >
        <Card className="border-destructive/50">
          <CardHeader>
            <CardTitle className="text-destructive flex items-center gap-2">
              <Trash2 className="w-5 h-5" />
              Zona Berbahaya
            </CardTitle>
            <CardDescription>
              Tindakan ini tidak dapat dibatalkan
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="destructive" onClick={handleClearData}>
              <Trash2 className="w-4 h-4" />
              Reset Semua Data
            </Button>
          </CardContent>
        </Card>

      </motion.div>
    </DashboardLayout>
  );
}
