import { Button } from "@/components/ui/button";
import { Zap, Shield, Clock } from "lucide-react";
import heroBanner from "@/assets/hero-banner.jpg";

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${heroBanner})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-background/90 backdrop-blur-sm"></div>
      </div>

      <div className="container mx-auto px-4 z-10 relative">
        <div className="text-center max-w-4xl mx-auto animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="text-gradient">Joki & Top Up Game</span>
          </h1>
          <p className="text-2xl md:text-3xl mb-4 text-foreground">
            Murah, Cepat, Aman
          </p>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Layanan joki rank & top up game terpercaya untuk semua game favorit kamu. 
            Proses cepat, harga terjangkau, dan 100% aman!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              variant="neon" 
              size="lg" 
              className="text-lg"
              onClick={() => {
                document.getElementById('order-form')?.scrollIntoView({ 
                  behavior: 'smooth',
                  block: 'start'
                });
              }}
            >
              <Zap className="mr-2 h-5 w-5" />
              Order Sekarang
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="text-lg border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              onClick={() => {
                document.getElementById('topup')?.scrollIntoView({ 
                  behavior: 'smooth',
                  block: 'start'
                });
              }}
            >
              Lihat Harga
            </Button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="bg-card/50 backdrop-blur-sm p-6 rounded-lg border border-border hover:border-primary transition-all hover:neon-glow-cyan">
              <Zap className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Proses Cepat</h3>
              <p className="text-muted-foreground">Dikerjakan oleh pro player berpengalaman</p>
            </div>
            <div className="bg-card/50 backdrop-blur-sm p-6 rounded-lg border border-border hover:border-secondary transition-all hover:neon-glow-purple">
              <Shield className="h-12 w-12 text-secondary mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">100% Aman</h3>
              <p className="text-muted-foreground">Privasi akun terjamin dan dijamin aman</p>
            </div>
            <div className="bg-card/50 backdrop-blur-sm p-6 rounded-lg border border-border hover:border-accent transition-all hover:neon-glow-green">
              <Clock className="h-12 w-12 text-accent mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">24/7 Support</h3>
              <p className="text-muted-foreground">Customer service siap membantu kapan saja</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
