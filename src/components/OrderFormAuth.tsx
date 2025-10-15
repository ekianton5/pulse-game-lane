import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { ShoppingCart, LogOut } from "lucide-react";
import { z } from "zod";

const orderSchema = z.object({
  gameId: z.string().trim().min(1, "Game ID wajib diisi").max(50, "Game ID terlalu panjang"),
  game: z.string().min(1, "Pilih game terlebih dahulu"),
  service: z.string().min(1, "Pilih layanan terlebih dahulu"),
  package: z.string().trim().min(1, "Package wajib diisi").max(100, "Package terlalu panjang"),
  payment: z.string().min(1, "Pilih metode pembayaran"),
});

const OrderFormAuth = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    gameId: "",
    game: "",
    service: "",
    package: "",
    payment: "",
  });

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate("/auth");
      return;
    }
    setUserId(session.user.id);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const validated = orderSchema.parse(formData);
      
      if (!userId) {
        toast.error("Session expired. Please login again.");
        navigate("/auth");
        return;
      }

      setIsLoading(true);

      const { error } = await supabase.from("orders").insert({
        user_id: userId,
        game_id: validated.gameId,
        game: validated.game,
        service: validated.service,
        package: validated.package,
        payment: validated.payment,
        status: "pending",
      });

      if (error) throw error;

      toast.success("Order berhasil dibuat! Menunggu konfirmasi admin.");
      
      // Reset form
      setFormData({
        gameId: "",
        game: "",
        service: "",
        package: "",
        payment: "",
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error(error.errors[0].message);
      } else {
        console.error("Error creating order:", error);
        toast.error("Gagal membuat order. Silakan coba lagi.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="order-form" className="py-20 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="flex justify-end mb-4">
          <Button onClick={handleLogout} variant="outline" size="sm">
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
        
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
                  <Label htmlFor="gameId">ID Game / Username</Label>
                  <Input
                    id="gameId"
                    placeholder="Masukkan ID game atau username"
                    value={formData.gameId}
                    onChange={(e) => setFormData({ ...formData, gameId: e.target.value })}
                    maxLength={50}
                    required
                    disabled={isLoading}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="game">Pilih Game</Label>
                  <Select 
                    value={formData.game} 
                    onValueChange={(value) => setFormData({ ...formData, game: value })}
                    disabled={isLoading}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih game" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Mobile Legends">Mobile Legends</SelectItem>
                      <SelectItem value="Valorant">Valorant</SelectItem>
                      <SelectItem value="PUBG Mobile">PUBG Mobile</SelectItem>
                      <SelectItem value="Free Fire">Free Fire</SelectItem>
                      <SelectItem value="Genshin Impact">Genshin Impact</SelectItem>
                      <SelectItem value="Call of Duty Mobile">Call of Duty Mobile</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="service">Jenis Layanan</Label>
                  <Select 
                    value={formData.service} 
                    onValueChange={(value) => setFormData({ ...formData, service: value })}
                    disabled={isLoading}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih layanan" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Joki Rank">Joki Rank</SelectItem>
                      <SelectItem value="Top Up">Top Up</SelectItem>
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
                    disabled={isLoading}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="payment">Metode Pembayaran</Label>
                  <Select 
                    value={formData.payment} 
                    onValueChange={(value) => setFormData({ ...formData, payment: value })}
                    disabled={isLoading}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih metode pembayaran" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="QRIS">QRIS</SelectItem>
                      <SelectItem value="DANA">DANA</SelectItem>
                      <SelectItem value="OVO">OVO</SelectItem>
                      <SelectItem value="GoPay">GoPay</SelectItem>
                      <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button type="submit" variant="neon" size="lg" className="w-full" disabled={isLoading}>
                  {isLoading ? "Loading..." : "Buat Order"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default OrderFormAuth;
