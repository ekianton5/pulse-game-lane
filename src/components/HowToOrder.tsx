import { Card, CardContent } from "@/components/ui/card";
import { ClipboardList, MessageCircle, CreditCard, CheckCircle } from "lucide-react";

const steps = [
  {
    icon: ClipboardList,
    title: "Pilih Layanan",
    description: "Pilih game dan layanan yang kamu inginkan (Joki atau Top Up)",
  },
  {
    icon: MessageCircle,
    title: "Hubungi Kami",
    description: "Isi form order atau langsung chat via WhatsApp",
  },
  {
    icon: CreditCard,
    title: "Lakukan Pembayaran",
    description: "Transfer sesuai metode pembayaran yang dipilih",
  },
  {
    icon: CheckCircle,
    title: "Proses Selesai",
    description: "Pesanan akan diproses dan selesai sesuai estimasi waktu",
  },
];

const HowToOrder = () => {
  return (
    <section id="cara-order" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">Cara Order</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Mudah dan cepat, hanya 4 langkah!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <Card 
                key={index}
                className="relative group hover:border-primary transition-all duration-300 hover:neon-glow-cyan bg-card/80 backdrop-blur-sm"
              >
                <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-2xl font-bold neon-glow-cyan">
                  {index + 1}
                </div>
                <CardContent className="p-6 pt-8">
                  <IconComponent className="h-12 w-12 text-primary mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowToOrder;
