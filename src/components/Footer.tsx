import { Link } from "react-router-dom";
import { Heart, Instagram, Mail, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-secondary border-t-2 border-foreground mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo & Description */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
            <img
              src="src/assets/logo-dhaharan.png"
              alt="Logo"
              className="w-10 h-10 rounded-xl border-2 border-foreground shadow-cartoon-sm object-cover"
            />
              <span className="font-fredoka text-xl font-bold">dhaharan.id</span>
            </div>
            <p className="text-muted-foreground font-nunito text-sm leading-relaxed">
              Komunitas sosial yang berfokus pada kegiatan dan agenda sosial 
              untuk membangun kebersamaan dan kepedulian.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-fredoka font-semibold text-lg">Menu Cepat</h3>
            <nav className="flex flex-col gap-2">
              <Link to="/kegiatan" className="text-muted-foreground hover:text-foreground transition-colors font-nunito text-sm">
                Kegiatan & Agenda
              </Link>
              <Link to="/cashflow" className="text-muted-foreground hover:text-foreground transition-colors font-nunito text-sm">
                Informasi Cashflow
              </Link>
              <Link to="/peta" className="text-muted-foreground hover:text-foreground transition-colors font-nunito text-sm">
                Peta Kegiatan
              </Link>
              <Link to="/login" className="text-muted-foreground hover:text-foreground transition-colors font-nunito text-sm">
                Login / Register
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-fredoka font-semibold text-lg">Kontak</h3>
            <div className="flex flex-col gap-3">
              <a href="mailto:hello@dhaharan.id" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors font-nunito text-sm">
                <Mail className="w-4 h-4" />
                hello@dhaharan.id
              </a>
              <a href="https://instagram.com/dhaharan.id" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors font-nunito text-sm">
                <Instagram className="w-4 h-4" />
                @dhaharan.id
              </a>
              <span className="flex items-center gap-2 text-muted-foreground font-nunito text-sm">
                <MapPin className="w-4 h-4" />
                Indonesia
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t-2 border-foreground/20 mt-8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground font-nunito text-sm">
            © 2024 dhaharan.id. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
