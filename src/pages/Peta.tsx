import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Map as MapIcon, MapPin, Calendar, Camera, X, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

// Mock data for activity locations
const activityLocations = [
  {
    id: 1,
    title: "Bagi-bagi Takjil Ramadhan",
    description: "Kegiatan pembagian takjil untuk masyarakat di area masjid. Lebih dari 500 takjil berhasil dibagikan.",
    date: "15 Maret 2024",
    location: "Masjid Al-Ikhlas, Jakarta Selatan",
    coordinates: { lat: -6.2615, lng: 106.8106 },
    images: [
      "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=600",
      "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600",
    ],
    category: "Ramadhan",
  },
  {
    id: 2,
    title: "Santunan Anak Yatim",
    description: "Program pemberian santunan dan perlengkapan sekolah untuk 50 anak yatim.",
    date: "20 Februari 2024",
    location: "Panti Asuhan Harapan, Depok",
    coordinates: { lat: -6.4025, lng: 106.7942 },
    images: [
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600",
    ],
    category: "Santunan",
  },
  {
    id: 3,
    title: "Bakti Sosial Desa Binaan",
    description: "Kegiatan bakti sosial meliputi pembagian sembako dan pengobatan gratis untuk 200 warga.",
    date: "10 Januari 2024",
    location: "Desa Sukamaju, Bogor",
    coordinates: { lat: -6.5971, lng: 106.8060 },
    images: [
      "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600",
      "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=600",
    ],
    category: "Baksos",
  },
  {
    id: 4,
    title: "Donor Darah Massal",
    description: "Kegiatan donor darah bekerjasama dengan PMI. Berhasil mengumpulkan 100 kantong darah.",
    date: "5 Desember 2023",
    location: "Gedung Serbaguna, Jakarta Pusat",
    coordinates: { lat: -6.1865, lng: 106.8341 },
    images: [
      "https://images.unsplash.com/photo-1615461066841-6116e61058f4?w=600",
    ],
    category: "Kesehatan",
  },
  {
    id: 5,
    title: "Bersih-Bersih Sungai",
    description: "Kegiatan gotong royong membersihkan sungai dan bantaran bersama 60 relawan.",
    date: "15 November 2023",
    location: "Kampung Melayu, Jakarta Timur",
    coordinates: { lat: -6.2258, lng: 106.8643 },
    images: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600",
    ],
    category: "Lingkungan",
  },
];

export default function Peta() {
  const [selectedLocation, setSelectedLocation] = useState<typeof activityLocations[0] | null>(null);
  const [mapboxToken, setMapboxToken] = useState("");
  const [showTokenInput, setShowTokenInput] = useState(true);
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);

  const handleTokenSubmit = async () => {
    if (mapboxToken.trim()) {
      setShowTokenInput(false);
      // Dynamically import mapbox
      const mapboxgl = (await import("mapbox-gl")).default;
      await import("mapbox-gl/dist/mapbox-gl.css");
      
      if (!mapContainer.current) return;
      
      mapboxgl.accessToken = mapboxToken;
      
      mapRef.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/light-v11",
        center: [106.8456, -6.2088], // Jakarta
        zoom: 10,
      });

      mapRef.current.addControl(new mapboxgl.NavigationControl(), "top-right");

      // Add markers for each location
      activityLocations.forEach((location) => {
        const el = document.createElement("div");
        el.className = "custom-marker";
        el.style.cssText = `
          width: 40px;
          height: 40px;
          background: hsl(51, 90%, 70%);
          border: 3px solid hsl(220, 25%, 20%);
          border-radius: 50% 50% 50% 0;
          transform: rotate(-45deg);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 3px 3px 0px hsl(220, 25%, 20%);
        `;

        const inner = document.createElement("div");
        inner.style.cssText = `
          width: 10px;
          height: 10px;
          background: hsl(220, 25%, 20%);
          border-radius: 50%;
          transform: rotate(45deg);
        `;
        el.appendChild(inner);

        new mapboxgl.Marker(el)
          .setLngLat([location.coordinates.lng, location.coordinates.lat])
          .addTo(mapRef.current);

        el.addEventListener("click", () => {
          setSelectedLocation(location);
          mapRef.current.flyTo({
            center: [location.coordinates.lng, location.coordinates.lat],
            zoom: 14,
          });
        });
      });
    }
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <Badge className="mb-4" variant="highlight">
            <MapIcon className="w-4 h-4 mr-1" />
            Lokasi Kegiatan
          </Badge>
          <h1 className="font-fredoka text-4xl md:text-5xl font-bold mb-4">
            Peta Kegiatan
          </h1>
          <p className="font-nunito text-muted-foreground max-w-2xl mx-auto">
            Jelajahi lokasi-lokasi kegiatan yang telah dilaksanakan oleh komunitas 
            Dhaharan di berbagai wilayah.
          </p>
        </motion.div>

        {/* Map Section */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Map Container */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2"
          >
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                {showTokenInput ? (
                  <div className="aspect-video flex flex-col items-center justify-center p-8 bg-secondary">
                    <div className="w-16 h-16 mb-6 rounded-2xl bg-primary border-2 border-foreground shadow-cartoon flex items-center justify-center">
                      <MapIcon className="w-8 h-8" />
                    </div>
                    <h3 className="font-fredoka text-xl font-semibold mb-2 text-center">
                      Masukkan Mapbox Token
                    </h3>
                    <p className="font-nunito text-muted-foreground text-sm text-center mb-6 max-w-md">
                      Untuk menampilkan peta, silakan masukkan token Mapbox Anda. 
                      Dapatkan token gratis di{" "}
                      <a 
                        href="https://mapbox.com" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-highlight underline"
                      >
                        mapbox.com
                      </a>
                    </p>
                    <div className="flex gap-2 w-full max-w-md">
                      <Input
                        placeholder="pk.xxxxx..."
                        value={mapboxToken}
                        onChange={(e) => setMapboxToken(e.target.value)}
                        className="flex-1"
                      />
                      <Button onClick={handleTokenSubmit}>
                        Tampilkan Peta
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div ref={mapContainer} className="aspect-video w-full" />
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Location List / Detail */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            {selectedLocation ? (
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <Badge variant="highlight">{selectedLocation.category}</Badge>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setSelectedLocation(null)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                  <CardTitle className="mt-2">{selectedLocation.title}</CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {selectedLocation.date}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground font-nunito">
                    {selectedLocation.description}
                  </p>
                  <div className="flex items-start gap-2 text-sm">
                    <MapPin className="w-4 h-4 mt-0.5 text-highlight" />
                    <span className="font-nunito">{selectedLocation.location}</span>
                  </div>
                  
                  {/* Images */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm font-semibold">
                      <Camera className="w-4 h-4" />
                      Dokumentasi
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {selectedLocation.images.map((img, idx) => (
                        <img
                          key={idx}
                          src={img}
                          alt={`${selectedLocation.title} ${idx + 1}`}
                          className="w-full aspect-square object-cover rounded-lg border-2 border-foreground shadow-cartoon-sm"
                        />
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <>
                <h3 className="font-fredoka text-lg font-semibold">
                  Daftar Lokasi ({activityLocations.length})
                </h3>
                <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
                  {activityLocations.map((location, index) => (
                    <motion.div
                      key={location.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card
                        className="cursor-pointer hover:bg-secondary/50 transition-colors"
                        onClick={() => {
                          setSelectedLocation(location);
                          if (mapRef.current) {
                            mapRef.current.flyTo({
                              center: [location.coordinates.lng, location.coordinates.lat],
                              zoom: 14,
                            });
                          }
                        }}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 shrink-0 rounded-xl bg-primary border-2 border-foreground shadow-cartoon-sm flex items-center justify-center">
                              <MapPin className="w-5 h-5" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-fredoka font-semibold text-sm line-clamp-1">
                                {location.title}
                              </h4>
                              <p className="text-xs text-muted-foreground line-clamp-1">
                                {location.location}
                              </p>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge variant="outline" className="text-xs">
                                  {location.category}
                                </Badge>
                                <span className="text-xs text-muted-foreground">
                                  {location.date}
                                </span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
