import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trophy, Star, Crown } from "lucide-react";

const jokiPackages = [
  {
    game: "Mobile Legends",
    icon: Trophy,
    packages: [
      { name: "Epic → Legend", price: "25.000", duration: "1-2 hari" },
      { name: "Legend → Mythic", price: "50.000", duration: "2-3 hari" },
      { name: "Mythic → Mythic Glory", price: "100.000", duration: "3-5 hari" },
    ],
  },
 
 
];

const JokiServices = () => {
  return (
    <section id="joki" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">Layanan Joki Rank</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Naik rank dengan cepat bersama pro player terpercaya
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 justify-items-center">
          {jokiPackages.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <Card 
                key={index}
                className="group hover:border-primary transition-all duration-300 hover:neon-glow-cyan bg-card/80 backdrop-blur-sm"
              >
                <CardHeader>
                  <IconComponent className="h-12 w-12 text-primary mb-4 group-hover:scale-110 transition-transform" />
                  <CardTitle className="text-2xl">{item.game}</CardTitle>
                  <CardDescription>Pilih paket joki sesuai kebutuhan</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {item.packages.map((pkg, pkgIndex) => (
                    <div 
                      key={pkgIndex}
                      className="flex justify-between items-center p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                    >
                      <div>
                        <p className="font-semibold">{pkg.name}</p>
                        <p className="text-xs text-muted-foreground">{pkg.duration}</p>
                      </div>
                      <p className="text-primary font-bold">Rp {pkg.price}</p>
                    </div>
                  ))}
                </CardContent>
                <CardFooter>
                  <Button variant="neon" className="w-full">
                    Order Sekarang
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default JokiServices;
