import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { ShoppingCart } from "lucide-react";

const OrderForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    gameId: "",
    game: "",
    service: "",
    package: "",
    payment: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validasi form
    if (!formData.name || !formData.gameId || !formData.game || !formData.service || !formData.package || !formData.payment) {
      toast.error("Mohon lengkapi semua field!");
      return;
    }

    // Validasi panjang input
    if (formData.name.length > 100) {
      toast.error("Nama terlalu panjang (maksimal 100 karakter)");
      return;
    }

    if (formData.gameId.length > 50) {
      toast.error("ID Game terlalu panjang (maksimal 50 karakter)");
      return;
    }

    // Buat pesan WhatsApp
    const message = `Halo, saya ingin order:
Nama: ${formData.name}
ID Game: ${formData.gameId}
Game: ${formData.game}
Layanan: ${formData.service}
Paket: ${formData.package}
Pembayaran: ${formData.payment}`;

    const whatsappUrl = `https://wa.me/62895701071431?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
    
    toast.success("Redirecting ke WhatsApp...");
  };

  return (
    <section id="order-form" className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <Card className="border-gradient bg-card/90 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <ShoppingCart className="h-10 w-10 text-primary" />
                <CardTitle className="text-3xl">Form Order</CardTitle>
              </div>
              <CardDescription>Isi form di bawah untuk melakukan pemesanan</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nama Lengkap</Label>
                  <Input
                    id="name"
                    placeholder="Masukkan nama lengkap"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    maxLength={100}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gameId">ID Game / Username</Label>
                  <Input
                    id="gameId"
                    placeholder="Masukkan ID game atau username"
                    value={formData.gameId}
                    onChange={(e) => setFormData({ ...formData, gameId: e.target.value })}
                    maxLength={50}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="game">Pilih Game</Label>
                  <Select value={formData.game} onValueChange={(value) => setFormData({ ...formData, game: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih game" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ml">Mobile Legends</SelectItem>
                      <SelectItem value="valorant">Valorant</SelectItem>
                      <SelectItem value="pubg">PUBG Mobile</SelectItem>
                      <SelectItem value="ff">Free Fire</SelectItem>
                      <SelectItem value="genshin">Genshin Impact</SelectItem>
                      <SelectItem value="codm">Call of Duty Mobile</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="service">Jenis Layanan</Label>
                  <Select value={formData.service} onValueChange={(value) => setFormData({ ...formData, service: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih layanan" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="joki">Joki Rank</SelectItem>
                      <SelectItem value="topup">Top Up</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="package">Pilih Paket/Nominal</Label>
                  <Input
                    id="package"
                    placeholder="Contoh: Epic → Legend atau 86 Diamonds"
                    value={formData.package}
                    onChange={(e) => setFormData({ ...formData, package: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="payment">Metode Pembayaran</Label>
                  <Select value={formData.payment} onValueChange={(value) => setFormData({ ...formData, payment: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih metode pembayaran" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="qris">QRIS</SelectItem>
                      <SelectItem value="dana">DANA</SelectItem>
                      <SelectItem value="ovo">OVO</SelectItem>
                      <SelectItem value="gopay">GoPay</SelectItem>
                      <SelectItem value="transfer">Bank Transfer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button type="submit" variant="neon" size="lg" className="w-full">
                  Order via WhatsApp
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default OrderForm;
