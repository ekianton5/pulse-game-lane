import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Coins } from "lucide-react";

const topUpData = [
  {
    game: "Mobile Legends",
    items: [
      { amount: "86 Diamonds", price: "20.000" },
      { amount: "172 Diamonds", price: "40.000" },
      { amount: "257 Diamonds", price: "60.000" },
      { amount: "344 Diamonds", price: "80.000" },
      { amount: "429 Diamonds", price: "100.000" },
    ],
  },
  {
    game: "Free Fire",
    items: [
      { amount: "70 Diamonds", price: "10.000" },
      { amount: "140 Diamonds", price: "20.000" },
      { amount: "355 Diamonds", price: "50.000" },
      { amount: "720 Diamonds", price: "100.000" },
      { amount: "1450 Diamonds", price: "200.000" },
    ],
  },
  {
    game: "PUBG Mobile",
    items: [
      { amount: "60 UC", price: "15.000" },
      { amount: "325 UC", price: "75.000" },
      { amount: "660 UC", price: "150.000" },
      { amount: "1800 UC", price: "400.000" },
      { amount: "3850 UC", price: "850.000" },
    ],
  },
  {
    game: "Genshin Impact",
    items: [
      { amount: "60 Genesis", price: "15.000" },
      { amount: "330 Genesis", price: "75.000" },
      { amount: "1090 Genesis", price: "250.000" },
      { amount: "2240 Genesis", price: "500.000" },
      { amount: "3880 Genesis", price: "850.000" },
    ],
  },
];

const TopUpServices = () => {
  return (
    <section id="topup" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">Top Up Game</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Top up cepat dengan harga terjangkau untuk semua game
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {topUpData.map((game, index) => (
            <Card 
              key={index}
              className="group hover:border-secondary transition-all duration-300 hover:neon-glow-purple bg-card/80 backdrop-blur-sm"
            >
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Coins className="h-10 w-10 text-secondary group-hover:scale-110 transition-transform" />
                  <CardTitle className="text-2xl">{game.game}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {game.items.map((item, itemIndex) => (
                    <div 
                      key={itemIndex}
                      className="flex justify-between items-center p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors group/item"
                    >
                      <span className="font-semibold">{item.amount}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-secondary font-bold">Rp {item.price}</span>
                        <Button size="sm" variant="secondary" className="opacity-0 group-hover/item:opacity-100 transition-opacity">
                          Beli
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopUpServices;
