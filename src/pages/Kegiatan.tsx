import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin, Clock, Filter, Search, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

// Mock data for activities
const activities = [
  {
    id: 1,
    title: "Bagi-bagi Takjil Ramadhan",
    description: "Kegiatan pembagian takjil untuk masyarakat di area masjid dan sekitarnya.",
    date: "15 Maret 2024",
    time: "15:00 - 18:00 WIB",
    location: "Masjid Al-Ikhlas, Jakarta",
    category: "Ramadhan",
    status: "upcoming",
    participants: 45,
    image: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=400",
  },
  {
    id: 2,
    title: "Santunan Anak Yatim",
    description: "Program pemberian santunan dan perlengkapan sekolah untuk anak-anak yatim.",
    date: "20 Februari 2024",
    time: "09:00 - 12:00 WIB",
    location: "Panti Asuhan Harapan",
    category: "Santunan",
    status: "completed",
    participants: 30,
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400",
  },
  {
    id: 3,
    title: "Bakti Sosial Desa Binaan",
    description: "Kegiatan bakti sosial meliputi pembagian sembako dan pengobatan gratis.",
    date: "10 Januari 2024",
    time: "08:00 - 16:00 WIB",
    location: "Desa Sukamaju, Bogor",
    category: "Baksos",
    status: "completed",
    participants: 60,
    image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=400",
  },
  {
    id: 4,
    title: "Pengajian Bulanan",
    description: "Kajian rutin bulanan membahas tema keislaman dan pengembangan diri.",
    date: "25 Maret 2024",
    time: "19:00 - 21:00 WIB",
    location: "Aula Dhaharan, Depok",
    category: "Pengajian",
    status: "upcoming",
    participants: 100,
    image: "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=400",
  },
  {
    id: 5,
    title: "Donor Darah",
    description: "Kegiatan donor darah bekerja sama dengan PMI untuk membantu sesama.",
    date: "5 April 2024",
    time: "08:00 - 14:00 WIB",
    location: "Gedung Serbaguna, Jakarta",
    category: "Kesehatan",
    status: "upcoming",
    participants: 80,
    image: "https://images.unsplash.com/photo-1615461066841-6116e61058f4?w=400",
  },
  {
    id: 6,
    title: "Bersih-Bersih Lingkungan",
    description: "Kegiatan gotong royong membersihkan lingkungan dan sungai.",
    date: "15 Desember 2023",
    time: "06:00 - 10:00 WIB",
    location: "Kampung Melayu, Jakarta",
    category: "Lingkungan",
    status: "completed",
    participants: 40,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400",
  },
];

const categories = ["Semua", "Ramadhan", "Santunan", "Baksos", "Pengajian", "Kesehatan", "Lingkungan"];

export default function Kegiatan() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [showUpcoming, setShowUpcoming] = useState(true);

  const filteredActivities = activities.filter((activity) => {
    const matchesSearch = activity.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "Semua" || activity.category === selectedCategory;
    const matchesStatus = showUpcoming ? activity.status === "upcoming" : activity.status === "completed";
    return matchesSearch && matchesCategory && matchesStatus;
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
          <Badge className="mb-4" variant="highlight">
            <Calendar className="w-4 h-4 mr-1" />
            Agenda Komunitas
          </Badge>
          <h1 className="font-fredoka text-4xl md:text-5xl font-bold mb-4">
            Kegiatan & Agenda
          </h1>
          <p className="font-nunito text-muted-foreground max-w-2xl mx-auto">
            Temukan berbagai kegiatan sosial yang telah dan akan dilaksanakan 
            oleh komunitas Dhaharan. Mari berkontribusi bersama!
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8 space-y-4"
        >
          {/* Search & Toggle */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Cari kegiatan..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={showUpcoming ? "default" : "outline"}
                onClick={() => setShowUpcoming(true)}
              >
                Akan Datang
              </Button>
              <Button
                variant={!showUpcoming ? "default" : "outline"}
                onClick={() => setShowUpcoming(false)}
              >
                Selesai
              </Button>
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            <Filter className="w-5 h-5 text-muted-foreground self-center mr-2" />
            {categories.map((category) => (
              <Badge
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                className="cursor-pointer hover:shadow-cartoon transition-all"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Badge>
            ))}
          </div>
        </motion.div>

        {/* Activities Grid */}
        {filteredActivities.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredActivities.map((activity, index) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="overflow-hidden h-full group">
                  <div className="aspect-video relative overflow-hidden">
                    <img
                      src={activity.image}
                      alt={activity.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute top-3 left-3 flex gap-2">
                      <Badge variant={activity.status === "upcoming" ? "highlight" : "secondary"}>
                        {activity.status === "upcoming" ? "Akan Datang" : "Selesai"}
                      </Badge>
                      <Badge variant="accent">{activity.category}</Badge>
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-lg line-clamp-2">
                      {activity.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-2">
                      {activity.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>{activity.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>{activity.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span className="line-clamp-1">{activity.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="w-4 h-4" />
                      <span>{activity.participants} peserta</span>
                    </div>
                    {activity.status === "upcoming" && (
                      <Button className="w-full mt-4">Daftar Sekarang</Button>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-secondary border-2 border-foreground shadow-cartoon flex items-center justify-center">
              <Calendar className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="font-fredoka text-xl font-semibold mb-2">
              Tidak ada kegiatan ditemukan
            </h3>
            <p className="font-nunito text-muted-foreground">
              Coba ubah filter atau kata kunci pencarian Anda.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
