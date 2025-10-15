import { Facebook, Instagram, Mail, Phone } from "lucide-react";


const Footer = () => {
  return (
    <footer id="kontak" className="bg-card border-t border-border py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold text-gradient mb-4">ArenaGame</h3>
            <p className="text-muted-foreground mb-4">
              Layanan joki rank dan top up game terpercaya dengan harga terjangkau dan proses cepat.
            </p>
          </div>

          {/* Kontak */}
          <div>
            <h4 className="text-lg font-bold mb-4">Hubungi Kami</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                <Phone className="h-4 w-4" />
                <span>+62 895-7010-71431</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                <Mail className="h-4 w-4" />
                <span>info@arenagame.com</span>
              </div>
            </div>
          </div>

          {/* Metode Pembayaran */}
          <div>
            <h4 className="text-lg font-bold mb-4">Metode Pembayaran</h4>
            <div className="flex flex-wrap gap-2">
              {["QRIS", "DANA", "OVO", "GoPay", "Bank Transfer"].map((method) => (
                <span 
                  key={method}
                  className="px-3 py-1 bg-muted rounded-md text-sm hover:bg-primary hover:text-primary-foreground transition-colors cursor-default"
                >
                  {method}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Social Media & Copyright */}
        <div className="pt-8 border-t border-border">
          <div className="flex flex-col items-center gap-4">
            <div className="flex gap-4 justify-center">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-secondary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" aria-label="TikTok" className="text-muted-foreground hover:text-accent transition-colors">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
              </a>
            </div>
            <p className="text-muted-foreground text-sm text-center">
              © 2024 ArenaGame. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
