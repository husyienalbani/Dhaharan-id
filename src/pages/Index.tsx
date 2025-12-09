import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar, Map, Users, Heart, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Mock data for recent activities
const recentActivities = [
  {
    id: 1,
    title: "Bagi-bagi Takjil Ramadhan",
    date: "15 Maret 2024",
    location: "Masjid Al-Ikhlas, Jakarta",
    category: "Ramadhan",
    image: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=400",
  },
  {
    id: 2,
    title: "Santunan Anak Yatim",
    date: "20 Februari 2024",
    location: "Panti Asuhan Harapan",
    category: "Santunan",
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400",
  },
  {
    id: 3,
    title: "Bakti Sosial Desa Binaan",
    date: "10 Januari 2024",
    location: "Desa Sukamaju, Bogor",
    category: "Baksos",
    image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=400",
  },
];

const stats = [
  { icon: Users, value: "500+", label: "Anggota Aktif" },
  { icon: Calendar, value: "120+", label: "Kegiatan" },
  { icon: Heart, value: "1000+", label: "Penerima Manfaat" },
  { icon: Map, value: "25+", label: "Lokasi Kegiatan" },
];

const features = [
  {
    icon: Calendar,
    title: "Agenda Kegiatan",
    description: "Lihat jadwal dan agenda kegiatan komunitas yang akan datang",
    link: "/kegiatan",
    color: "bg-primary",
  },
  {
    icon: Wallet,
    title: "Cashflow Transparan",
    description: "Transparansi pengelolaan dana komunitas untuk kepercayaan bersama",
    link: "/cashflow",
    color: "bg-accent",
  },
  {
    icon: Map,
    title: "Peta Kegiatan",
    description: "Jelajahi lokasi-lokasi kegiatan yang telah dilaksanakan",
    link: "/peta",
    color: "bg-highlight",
  },
];

export default function Index() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-primary/30 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-accent/30 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-secondary/50 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge className="mb-6" variant="highlight">
                🌟 Komunitas Sosial Indonesia
              </Badge>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-fredoka text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
            >
              Bersama{" "}
              <span className="text-highlight relative inline-block">
                Dhaharan
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none">
                  <path d="M2 8C50 4 150 4 198 8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                </svg>
              </span>
              <br />
              Berbagi Kebaikan
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="font-nunito text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
            >
              Komunitas sosial yang berfokus pada kegiatan dan agenda sosial 
              untuk membangun kebersamaan, kepedulian, dan semangat berbagi.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link to="/kegiatan">
                <Button size="xl" className="w-full sm:w-auto">
                  Lihat Kegiatan
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link to="/register">
                <Button size="xl" variant="outline" className="w-full sm:w-auto">
                  Gabung Sekarang
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-primary border-2 border-foreground shadow-cartoon-sm flex items-center justify-center">
                    <Icon className="w-7 h-7" />
                  </div>
                  <div className="font-fredoka text-3xl md:text-4xl font-bold mb-1">
                    {stat.value}
                  </div>
                  <div className="font-nunito text-muted-foreground text-sm">
                    {stat.label}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4">Fitur Kami</Badge>
            <h2 className="font-fredoka text-3xl md:text-4xl font-bold mb-4">
              Jelajahi Komunitas Kami
            </h2>
            <p className="font-nunito text-muted-foreground max-w-2xl mx-auto">
              Temukan berbagai fitur yang memudahkan Anda untuk mengetahui dan 
              berpartisipasi dalam kegiatan komunitas Dhaharan.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link to={feature.link}>
                    <Card className="h-full group cursor-pointer">
                      <CardHeader>
                        <div className={`w-14 h-14 rounded-2xl ${feature.color} border-2 border-foreground shadow-cartoon-sm flex items-center justify-center mb-4 group-hover:animate-bounce-soft`}>
                          <Icon className="w-7 h-7" />
                        </div>
                        <CardTitle>{feature.title}</CardTitle>
                        <CardDescription>{feature.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <span className="inline-flex items-center gap-2 text-highlight font-fredoka font-semibold text-sm group-hover:gap-4 transition-all">
                          Selengkapnya <ArrowRight className="w-4 h-4" />
                        </span>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Recent Activities Section */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <Badge className="mb-4" variant="accent">Kegiatan Terbaru</Badge>
              <h2 className="font-fredoka text-3xl md:text-4xl font-bold">
                Aktivitas Terakhir Kami
              </h2>
            </div>
            <Link to="/kegiatan">
              <Button variant="outline">
                Lihat Semua
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {recentActivities.map((activity, index) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="overflow-hidden h-full">
                  <div className="aspect-video relative overflow-hidden">
                    <img
                      src={activity.image}
                      alt={activity.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <Badge className="absolute top-3 left-3" variant="highlight">
                      {activity.category}
                    </Badge>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-lg">{activity.title}</CardTitle>
                    <CardDescription className="flex flex-col gap-1">
                      <span className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {activity.date}
                      </span>
                      <span className="flex items-center gap-2">
                        <Map className="w-4 h-4" />
                        {activity.location}
                      </span>
                    </CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Card className="bg-primary border-2 border-foreground shadow-cartoon-lg p-8 md:p-12 text-center">
              <h2 className="font-fredoka text-3xl md:text-4xl font-bold mb-4">
                Siap Berbagi Kebaikan?
              </h2>
              <p className="font-nunito text-primary-foreground/80 max-w-2xl mx-auto mb-8">
                Bergabunglah bersama kami dalam membangun komunitas yang penuh 
                kepedulian dan semangat berbagi. Mari bersama-sama menciptakan 
                dampak positif bagi masyarakat.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/register">
                  <Button size="xl" variant="secondary" className="w-full sm:w-auto">
                    Daftar Sekarang
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
                <Link to="/kegiatan">
                  <Button size="xl" variant="outline" className="w-full sm:w-auto bg-transparent">
                    Lihat Kegiatan
                  </Button>
                </Link>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
