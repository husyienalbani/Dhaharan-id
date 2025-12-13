import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Calendar,
  Wallet,
  Settings,
  Heart,
  Menu,
  X,
  LogOut,
  DollarSign
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
  { icon: Calendar, label: "Kegiatan", path: "/activities" },
  { icon: Wallet, label: "Cashflow", path: "/addcashflow" },
  { icon: Settings, label: "Pengaturan", path: "/settings" },
  { icon: Calendar, label: "Volunteer", path: "/volunteersview" },
  { icon: DollarSign, label: "Donasi", path: "/donationsview" },
];

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  // LOGOUT FUNCTION
  const handleLogout = () => {
    localStorage.removeItem("user"); // bersihkan data login
    navigate("/login"); // arahkan ke halaman login
  };

  return (
    <>
      {/* FLOATING ICON BUTTON */}
      <motion.button
        onClick={() => setIsOpen(true)}
        whileTap={{ scale: 0.9 }}
        className="
          fixed top-8 left-4 z-[2]          /* 👈 turun 2–3 cm */
          bg-primary w-12 h-12 rounded-2xl border-2 border-foreground
          shadow-cartoon flex items-center justify-center
        "
      >
        <Menu className="w-6 h-6 text-primary-foreground" />
      </motion.button>

      {/* OVERLAY */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/40 backdrop-blur-[1px] z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <motion.aside
        initial={{ x: -300 }}
        animate={{ x: isOpen ? 0 : -300 }}
        transition={{ type: "spring", stiffness: 260, damping: 25 }}
        className="
          fixed top-0 left-0 h-full w-[260px] 
          bg-card border-r-2 border-foreground 
          z-50 flex flex-col shadow-cartoon
        "
      >
        {/* Header + Close */}
        <div className="p-4 border-b-2 border-foreground flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary border-2 border-foreground shadow-cartoon flex items-center justify-center">
              <Heart className="w-5 h-5 text-primary-foreground" />
            </div>
            <h1 className="font-fredoka text-lg font-bold">Dhaharan.id</h1>
          </div>

          <button onClick={() => setIsOpen(false)}>
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;

            return (
              <motion.div
                key={item.path}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link to={item.path} onClick={() => setIsOpen(false)}>
                  <div
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-xl border-2 transition-all font-nunito font-semibold",
                      isActive
                        ? "bg-primary border-foreground shadow-cartoon"
                        : "border-transparent hover:bg-secondary hover:border-foreground hover:shadow-cartoon-sm"
                    )}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </nav>

        <div className="mt-10 flex justify-center">
        <Button
          variant="destructive"
          className="flex items-center gap-2 px-6 py-30 text-lg font-semibold"
          onClick={handleLogout}
        >
          <LogOut className="w-5 h-5" />
          Keluar
        </Button>
      </div>

        <div className="p-4 border-t-2 border-foreground"></div>
      </motion.aside>
    </>
  );
}
